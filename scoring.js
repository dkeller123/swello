// =============================================================================
// SWELLO — CONDITION SCORING ENGINE
// =============================================================================
// Matches live wave data against each spot's ideal conditions profile.
// Returns 0-100 score + human-readable reasons and warnings.
//
// WIND DIRECTION LOGIC:
//   Each spot has an idealWindDir (degrees) representing the ideal OFFSHORE
//   wind direction. We score by how close the actual wind direction is to
//   that ideal. Wind blowing FROM land (offshore) = clean faces.
//   Wind blowing FROM sea (onshore) = choppy, messy conditions.
// =============================================================================

function angularDiff(a, b) {
  const d = Math.abs((a - b + 360) % 360);
  return d > 180 ? 360 - d : d;
}

function mToFt(m) {
  return m == null ? null : m * 3.281;
}

// ── OFFSHORE WIND DIRECTION TABLE ─────────────────────────────────────────────
// Maps each spot's idealWindLabel to a compass degree for comparison.
// Used when spot doesn't have an explicit idealWindDeg field.
const WIND_DIR_DEGREES = {
  'N':  0,   'NNE': 22,  'NE': 45,  'ENE': 67,
  'E':  90,  'ESE': 112, 'SE': 135, 'SSE': 157,
  'S':  180, 'SSW': 202, 'SW': 225, 'WSW': 247,
  'W':  270, 'WNW': 292, 'NW': 315, 'NNW': 337,
};

// Parse the idealWindLabel field to extract primary offshore direction degrees
// e.g. "E (offshore)" → 90, "NE (offshore)" → 45, "NE/E (offshore)" → 67
function parseIdealWindDeg(label) {
  if (!label) return null;
  // Extract the directional part before the parenthesis
  const match = label.match(/^([A-Z/]+)/);
  if (!match) return null;
  const dirs = match[1].split('/');
  const degs = dirs.map(d => WIND_DIR_DEGREES[d.trim()]).filter(d => d !== undefined);
  if (!degs.length) return null;
  // Average if multiple directions listed
  if (degs.length === 1) return degs[0];
  // Circular average
  const sinSum = degs.reduce((s, d) => s + Math.sin(d * Math.PI / 180), 0);
  const cosSum = degs.reduce((s, d) => s + Math.cos(d * Math.PI / 180), 0);
  return (Math.atan2(sinSum, cosSum) * 180 / Math.PI + 360) % 360;
}

// ── MAIN SCORING FUNCTION ─────────────────────────────────────────────────────
// Returns { score: 0-100, reasons: [], warnings: [] }

function scoreConditions(spot, wave, windSpeedMph, swellDirDeg, windDirDeg) {
  let score = 0;
  const reasons = [];
  const warnings = [];
  const swellFt = mToFt(wave.swellHeight || wave.waveHeight);
  const period  = wave.swellPeriod;

  // ── 1. SWELL SIZE (0–30 pts) ──────────────────────────────────────────────
  if (swellFt != null) {
    if (swellFt >= spot.idealSizeMin && swellFt <= spot.idealSizeMax) {
      score += 30;
      reasons.push(`Size is in the ideal ${spot.idealSizeMin}–${spot.idealSizeMax}ft range`);
    } else if (swellFt < spot.idealSizeMin) {
      const deficit = spot.idealSizeMin - swellFt;
      score += Math.max(0, 30 - deficit * 10);
      if (deficit > 1.5) warnings.push(`Under ideal size (${swellFt.toFixed(1)}ft, needs ${spot.idealSizeMin}ft+)`);
      else reasons.push('Slightly small but manageable');
    } else {
      const excess = swellFt - spot.idealSizeMax;
      score += Math.max(0, 30 - excess * 8);
      if (excess > 2) warnings.push(`Overhead+ — may be too big for a casual session`);
      else reasons.push('Slightly overhead — pumping');
    }
  }

  // ── 2. SWELL PERIOD (0–20 pts) ────────────────────────────────────────────
  if (period != null) {
    if (period >= spot.idealPeriodMin) {
      score += 20;
      reasons.push(`Good period (${Math.round(period)}s — groundswell quality)`);
    } else if (period >= spot.idealPeriodMin - 3) {
      score += 11;
      reasons.push(`Decent period (${Math.round(period)}s)`);
    } else {
      score += 3;
      warnings.push(`Short period (${Math.round(period)}s — choppy, wind-swell)`);
    }
  }

  // ── 3. SWELL DIRECTION (0–20 pts) ────────────────────────────────────────
  if (swellDirDeg != null) {
    const diff = angularDiff(swellDirDeg, spot.idealSwellDir);
    if (diff <= 22)      { score += 20; reasons.push(`Swell direction is optimal (${spot.idealSwellDirLabel})`); }
    else if (diff <= 45) { score += 14; reasons.push(`Swell direction is good (close to ${spot.idealSwellDirLabel})`); }
    else if (diff <= 70) { score += 6;  warnings.push(`Swell direction off-angle from ideal ${spot.idealSwellDirLabel}`); }
    else                 { score += 0;  warnings.push(`Swell direction is poor for this spot`); }
  }

  // ── 4. WIND SPEED (0–15 pts) ─────────────────────────────────────────────
  if (windSpeedMph != null) {
    if (windSpeedMph <= 5)                        { score += 15; reasons.push('Glassy / very light wind'); }
    else if (windSpeedMph <= spot.windTolerance)  { score += 10; reasons.push(`Light ${windSpeedMph.toFixed(0)}mph wind — manageable`); }
    else if (windSpeedMph <= spot.windTolerance * 1.5) { score += 4; warnings.push(`${windSpeedMph.toFixed(0)}mph wind — getting choppy`); }
    else                                          { score += 0;  warnings.push(`${windSpeedMph.toFixed(0)}mph wind — blown out`); }
  }

  // ── 5. WIND DIRECTION (0–15 pts) — NEW ───────────────────────────────────
  // Offshore wind = wind blowing FROM land toward sea = cleans up wave faces.
  // We compare actual wind direction to the spot's ideal offshore direction.
  // Wind direction convention: the direction the wind is COMING FROM.
  if (windDirDeg != null && windSpeedMph > 3) {
    const idealOffshore = parseIdealWindDeg(spot.idealWindLabel);
    if (idealOffshore != null) {
      const windDiff = angularDiff(windDirDeg, idealOffshore);
      if (windDiff <= 22) {
        score += 15;
        reasons.push(`Wind direction is ideal offshore (${spot.idealWindLabel})`);
      } else if (windDiff <= 45) {
        score += 10;
        reasons.push(`Wind direction is mostly offshore`);
      } else if (windDiff <= 90) {
        score += 5;
        // Sideshore — neutral
        reasons.push(`Wind is sideshore — not ideal but workable`);
      } else if (windDiff <= 135) {
        score += 0;
        warnings.push(`Wind is cross-onshore — conditions will be choppy`);
      } else {
        score += 0;
        warnings.push(`Wind is onshore — wave faces will be blown out`);
      }
    }
  } else if (windSpeedMph <= 3) {
    // Calm wind — always good regardless of direction
    score += 15;
  }

  return { score: Math.round(Math.min(100, score)), reasons, warnings };
}

// ── TIER CLASSIFICATION ───────────────────────────────────────────────────────

function tierFromScore(score) {
  if (score >= 65) return 'best';
  if (score >= 38) return 'avg';
  return 'worst';
}

function tierLabel(tier) {
  if (tier === 'best') return { css: 'match-fire', label: '🔥 Go' };
  if (tier === 'avg')  return { css: 'match-good', label: '👍 Maybe' };
  return { css: 'match-poor', label: '😴 Skip' };
}

// ── VERDICT TEXT ──────────────────────────────────────────────────────────────

function verdictText(spot, score, reasons, warnings, swellFt, period, windSpeed) {
  const sizeStr   = swellFt   != null ? swellFt.toFixed(1) + 'ft' : null;
  const periodStr = period    != null ? Math.round(period) + 's'  : null;
  const windStr   = windSpeed != null ? Math.round(windSpeed) + 'mph' : null;

  if (score >= 65) {
    const parts = [];
    if (sizeStr)   parts.push(`${sizeStr} swell`);
    if (periodStr) parts.push(`${periodStr} period`);
    if (windStr && windSpeed <= 5) parts.push('glassy conditions');
    else if (windStr && windSpeed <= spot.windTolerance) parts.push(`light ${windStr} wind`);
    const dataSnippet = parts.length ? `${parts.join(', ')} — ` : '';
    const best = reasons.find(r =>
      r.toLowerCase().includes('optimal') ||
      r.toLowerCase().includes('ideal')   ||
      r.toLowerCase().includes('glassy')  ||
      r.toLowerCase().includes('offshore')
    ) || reasons[0] || '';
    return `${dataSnippet}${best ? best + '. ' : ''}${spot.notes.split('.')[0]}.`;
  }

  if (score >= 38) {
    const parts = [];
    if (sizeStr)   parts.push(`${sizeStr} swell`);
    if (periodStr) parts.push(`${periodStr} period`);
    const dataSnippet = parts.length ? `${parts.join(', ')} — ` : '';
    const mainWarning = warnings[0] || '';
    const noteTeaser  = spot.notes.split('.')[0];
    return `${dataSnippet}${mainWarning ? mainWarning + '. ' : 'Conditions are mediocre. '}Could be worth it if you know the spot — ${noteTeaser.toLowerCase()}.`;
  }

  const blockers = warnings.slice(0, 2).join('; ');
  return blockers
    ? `Not today — ${blockers.toLowerCase()}. Check back when conditions improve.`
    : `Conditions don't match this spot's ideal profile. Save the drive for another day.`;
}

// ── BAR COLOR HELPER (kept for any future use) ────────────────────────────────
function barClass(pct) {
  if (pct >= 65) return 'bar-great';
  if (pct >= 35) return 'bar-ok';
  return 'bar-poor';
}
