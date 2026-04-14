// =============================================================================
// SWELLO — CONDITION SCORING ENGINE
// =============================================================================
// Scoring weights and thresholds are loaded from scoring-config.json.
// Wind direction logic: offshore wind (land→sea) = clean faces = good score.
// Onshore wind (sea→land) = choppy = low score.
// =============================================================================

// Config is loaded asynchronously at startup by app.js and stored here.
let SCORING_CONFIG = null;
let WIND_DIR_DEGREES = {};

function initScoringConfig(config) {
  SCORING_CONFIG = config;
  WIND_DIR_DEGREES = config.windDirDegrees;
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

function angularDiff(a, b) {
  const d = Math.abs((a - b + 360) % 360);
  return d > 180 ? 360 - d : d;
}

function mToFt(m) {
  return m == null ? null : m * 3.281;
}

function parseIdealWindDeg(label) {
  if (!label) return null;
  const match = label.match(/^([A-Z/]+)/);
  if (!match) return null;
  const dirs = match[1].split('/');
  const degs = dirs.map(d => WIND_DIR_DEGREES[d.trim()]).filter(d => d !== undefined);
  if (!degs.length) return null;
  if (degs.length === 1) return degs[0];
  const sinSum = degs.reduce((s, d) => s + Math.sin(d * Math.PI / 180), 0);
  const cosSum = degs.reduce((s, d) => s + Math.cos(d * Math.PI / 180), 0);
  return (Math.atan2(sinSum, cosSum) * 180 / Math.PI + 360) % 360;
}

// ── MAIN SCORING FUNCTION ─────────────────────────────────────────────────────

function scoreConditions(spot, wave, windSpeedMph, swellDirDeg, windDirDeg) {
  const cfg    = SCORING_CONFIG;
  let score    = 0;
  const reasons  = [];
  const warnings = [];
  const swellFt  = mToFt(wave.swellHeight || wave.waveHeight);
  const period   = wave.swellPeriod;

  // ── 1. SWELL SIZE ─────────────────────────────────────────────────────────
  if (swellFt != null) {
    const w = cfg.weights.swellSize;
    if (swellFt >= spot.idealSizeMin && swellFt <= spot.idealSizeMax) {
      score += w;
      reasons.push(`Size is in the ideal ${spot.idealSizeMin}–${spot.idealSizeMax}ft range`);
    } else if (swellFt < spot.idealSizeMin) {
      const deficit = spot.idealSizeMin - swellFt;
      score += Math.max(0, w - deficit * cfg.swellSize.pointsPerFootUnder);
      if (deficit > 1.5) warnings.push(`Under ideal size (${swellFt.toFixed(1)}ft, needs ${spot.idealSizeMin}ft+)`);
      else reasons.push('Slightly small but manageable');
    } else {
      const excess = swellFt - spot.idealSizeMax;
      score += Math.max(0, w - excess * cfg.swellSize.pointsPerFootOver);
      if (excess > 2) warnings.push(`Overhead+ — may be too big for a casual session`);
      else reasons.push('Slightly overhead — pumping');
    }
  }

  // ── 2. SWELL PERIOD ───────────────────────────────────────────────────────
  if (period != null) {
    const sp = cfg.swellPeriod;
    if (period >= spot.idealPeriodMin) {
      score += sp.goodPoints;
      reasons.push(`Good period (${Math.round(period)}s — groundswell quality)`);
    } else if (period >= spot.idealPeriodMin - sp.decentThreshold) {
      score += sp.decentPoints;
      reasons.push(`Decent period (${Math.round(period)}s)`);
    } else {
      score += sp.poorPoints;
      warnings.push(`Short period (${Math.round(period)}s — choppy, wind-swell)`);
    }
  }

  // ── 3. SWELL DIRECTION ────────────────────────────────────────────────────
  if (swellDirDeg != null) {
    const sd = cfg.swellDirection;
    const diff = angularDiff(swellDirDeg, spot.idealSwellDir);
    if      (diff <= sd.optimalDeg) { score += sd.optimalPts; reasons.push(`Swell direction is optimal (${spot.idealSwellDirLabel})`); }
    else if (diff <= sd.goodDeg)    { score += sd.goodPts;    reasons.push(`Swell direction is good (close to ${spot.idealSwellDirLabel})`); }
    else if (diff <= sd.fairDeg)    { score += sd.fairPts;    warnings.push(`Swell direction off-angle from ideal ${spot.idealSwellDirLabel}`); }
    else                            { score += sd.poorPts;    warnings.push(`Swell direction is poor for this spot`); }
  }

  // ── 4. WIND SPEED ─────────────────────────────────────────────────────────
  if (windSpeedMph != null) {
    const ws = cfg.windSpeed;
    if      (windSpeedMph <= ws.glassyMax)                      { score += ws.glassyPts;       reasons.push('Glassy / very light wind'); }
    else if (windSpeedMph <= spot.windTolerance)                { score += ws.tolerancePts;    reasons.push(`Light ${windSpeedMph.toFixed(0)}mph wind — manageable`); }
    else if (windSpeedMph <= spot.windTolerance * ws.overToleranceMult) { score += ws.overTolerancePts; warnings.push(`${windSpeedMph.toFixed(0)}mph wind — getting choppy`); }
    else                                                         { score += ws.blownOutPts;     warnings.push(`${windSpeedMph.toFixed(0)}mph wind — blown out`); }
  }

  // ── 5. WIND DIRECTION ─────────────────────────────────────────────────────
  if (windDirDeg != null && windSpeedMph > 3) {
    const wd = cfg.windDirection;
    const idealOffshore = parseIdealWindDeg(spot.idealWindLabel);
    if (idealOffshore != null) {
      const windDiff = angularDiff(windDirDeg, idealOffshore);
      if      (windDiff <= wd.offshoreDeg)       { score += wd.offshorePts;    reasons.push(`Wind direction is ideal offshore (${spot.idealWindLabel})`); }
      else if (windDiff <= wd.mostlyOffshoreDeg) { score += wd.mostlyOffPts;   reasons.push(`Wind direction is mostly offshore`); }
      else if (windDiff <= wd.sidesoreDeg)       { score += wd.sideshorePts;   reasons.push(`Wind is sideshore — not ideal but workable`); }
      else if (windDiff <= wd.crossOnshDeg)      { score += wd.crossOnshPts;   warnings.push(`Wind is cross-onshore — conditions will be choppy`); }
      else                                       { score += wd.onshPts;        warnings.push(`Wind is onshore — wave faces will be blown out`); }
    }
  } else if (windSpeedMph <= 3) {
    score += cfg.windDirection.offshorePts;
  }

  return { score: Math.round(Math.min(100, score)), reasons, warnings };
}

// ── TIER CLASSIFICATION ───────────────────────────────────────────────────────

function tierFromScore(score) {
  const t = SCORING_CONFIG?.tiers || { goThreshold: 65, maybeThreshold: 38 };
  if (score >= t.goThreshold)    return 'best';
  if (score >= t.maybeThreshold) return 'avg';
  return 'worst';
}

function tierLabel(tier) {
  if (tier === 'best') return { css: 'match-fire', label: '🔥 Go' };
  if (tier === 'avg')  return { css: 'match-good', label: '👍 Maybe' };
  return { css: 'match-poor', label: '😴 Skip' };
}

// ── VERDICT TEXT ──────────────────────────────────────────────────────────────

function verdictText(spot, score, reasons, warnings, swellFt, period, windSpeed) {
  const t    = SCORING_CONFIG?.tiers || { goThreshold: 65, maybeThreshold: 38 };
  const sizeStr   = swellFt   != null ? swellFt.toFixed(1) + 'ft' : null;
  const periodStr = period    != null ? Math.round(period) + 's'  : null;
  const windStr   = windSpeed != null ? Math.round(windSpeed) + 'mph' : null;

  if (score >= t.goThreshold) {
    const parts = [];
    if (sizeStr)   parts.push(`${sizeStr} swell`);
    if (periodStr) parts.push(`${periodStr} period`);
    if (windStr && windSpeed <= 5) parts.push('glassy conditions');
    else if (windStr && windSpeed <= spot.windTolerance) parts.push(`light ${windStr} wind`);
    const dataSnippet = parts.length ? `${parts.join(', ')} — ` : '';
    const best = reasons.find(r =>
      r.toLowerCase().includes('optimal') || r.toLowerCase().includes('ideal') ||
      r.toLowerCase().includes('glassy')  || r.toLowerCase().includes('offshore')
    ) || reasons[0] || '';
    return `${dataSnippet}${best ? best + '. ' : ''}${spot.notes.split('.')[0]}.`;
  }

  if (score >= t.maybeThreshold) {
    const parts = [];
    if (sizeStr)   parts.push(`${sizeStr} swell`);
    if (periodStr) parts.push(`${periodStr} period`);
    const dataSnippet  = parts.length ? `${parts.join(', ')} — ` : '';
    const mainWarning  = warnings[0] || '';
    const noteTeaser   = spot.notes.split('.')[0];
    return `${dataSnippet}${mainWarning ? mainWarning + '. ' : 'Conditions are mediocre. '}Could be worth it if you know the spot — ${noteTeaser.toLowerCase()}.`;
  }

  const blockers = warnings.slice(0, 2).join('; ');
  return blockers
    ? `Not today — ${blockers.toLowerCase()}. Check back when conditions improve.`
    : `Conditions don't match this spot's ideal profile. Save the drive for another day.`;
}
