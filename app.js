// =============================================================================
// SWELLO — APP LOGIC
// =============================================================================
// Handles: autocomplete, GPS, wave/wind/tide API calls, card rendering, search
// Depends on: spots.js (SURF_SPOTS), scoring.js (scoreConditions etc.)
// =============================================================================

// ── STATE ─────────────────────────────────────────────────────────────────────
let selectedLat = null, selectedLng = null, selectedLabel = null;
let userLat = null, userLng = null, userLocationName = null;
let acDebounce = null, acActiveIndex = -1, acResults = [];
let distUnit    = 'mi';
let lastResults = null;
let SURF_SPOTS  = [];   // populated from spots.json at startup

// ── DOM REFS ──────────────────────────────────────────────────────────────────
const locationInput = document.getElementById('locationInput');
const acDropdown    = document.getElementById('acDropdown');

// ── STARTUP: load JSON data files ─────────────────────────────────────────────
(async function loadData() {
  try {
    const [spotsRes, configRes] = await Promise.all([
      fetch('spots.json'),
      fetch('scoring-config.json')
    ]);
    SURF_SPOTS = await spotsRes.json();
    const config = await configRes.json();
    initScoringConfig(config);
    console.log(`SwellAI ready — ${SURF_SPOTS.length} surf spots loaded.`);
  } catch (err) {
    console.error('Failed to load data files:', err);
    document.getElementById('resultsArea').innerHTML =
      `<div class="error-msg">Failed to load surf spot data. Please refresh the page.</div>`;
  }
})();

// ── AUTOCOMPLETE ──────────────────────────────────────────────────────────────

function closeDropdown() {
  acDropdown.classList.remove('open');
  acDropdown.innerHTML = '';
  acActiveIndex = -1;
  acResults = [];
}

function openDropdown(html) {
  acDropdown.innerHTML = html;
  acDropdown.classList.add('open');
}

function highlightItem(idx) {
  acDropdown.querySelectorAll('.ac-item').forEach((el, i) =>
    el.classList.toggle('active', i === idx));
}

function selectResult(r) {
  selectedLat   = r.latitude;
  selectedLng   = r.longitude;
  selectedLabel = [r.name, r.admin1, r.country_code].filter(Boolean).join(', ');
  locationInput.value = selectedLabel;
  userLat = null; userLng = null; userLocationName = null;
  document.getElementById('gpsStatus').textContent = '';
  document.getElementById('gpsBtn').innerHTML = '<span>📡</span> Use my location';
  closeDropdown();
}

async function fetchSuggestions(query) {
  if (query.length < 2) { closeDropdown(); return; }
  openDropdown(`<div class="ac-spinner"><div class="ac-spinner-dot"></div> Searching…</div>`);
  try {
    const res  = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`);
    const data = await res.json();
    acResults = data.results || [];
    if (!acResults.length) { openDropdown(`<div class="ac-spinner">No results for "${query}"</div>`); return; }
    acActiveIndex = -1;
    openDropdown(acResults.map((r, i) => {
      const sub  = [r.admin1, r.admin2, r.country].filter(Boolean).join(', ');
      const flag = r.country_code
        ? String.fromCodePoint(...[...r.country_code.toUpperCase()].map(c => 0x1F1E0 - 65 + c.charCodeAt(0)))
        : '📍';
      return `<div class="ac-item" data-idx="${i}">
        <div class="ac-icon">${flag}</div>
        <div><div class="ac-name">${r.name || ''}</div><div class="ac-sub">${sub}</div></div>
      </div>`;
    }).join(''));
    acDropdown.querySelectorAll('.ac-item').forEach(el =>
      el.addEventListener('mousedown', e => { e.preventDefault(); selectResult(acResults[parseInt(el.dataset.idx)]); }));
  } catch { closeDropdown(); }
}

locationInput.addEventListener('input', () => {
  selectedLat = null; selectedLng = null; selectedLabel = null;
  clearTimeout(acDebounce);
  acDebounce = setTimeout(() => fetchSuggestions(locationInput.value.trim()), 280);
});

locationInput.addEventListener('keydown', e => {
  const items = acDropdown.querySelectorAll('.ac-item');
  if (e.key === 'ArrowDown') { e.preventDefault(); acActiveIndex = Math.min(acActiveIndex + 1, items.length - 1); highlightItem(acActiveIndex); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); acActiveIndex = Math.max(acActiveIndex - 1, -1); highlightItem(acActiveIndex); }
  else if (e.key === 'Enter') {
    if (acActiveIndex >= 0 && acResults[acActiveIndex]) { e.preventDefault(); selectResult(acResults[acActiveIndex]); }
    else { closeDropdown(); runSearch(); }
  } else if (e.key === 'Escape') closeDropdown();
});

locationInput.addEventListener('blur', () => setTimeout(closeDropdown, 150));

// ── GPS ───────────────────────────────────────────────────────────────────────

function useMyLocation() {
  const btn    = document.getElementById('gpsBtn');
  const status = document.getElementById('gpsStatus');
  if (!navigator.geolocation) { status.textContent = 'Geolocation not supported. Please type your location.'; return; }
  btn.disabled = true; btn.innerHTML = '<span>⏳</span> Locating…';
  status.textContent = 'Getting your GPS location…';
  navigator.geolocation.getCurrentPosition(async pos => {
    userLat = pos.coords.latitude; userLng = pos.coords.longitude;
    selectedLat = userLat; selectedLng = userLng;
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${userLat}&longitude=${userLng}&language=en&format=json`);
      const d   = await res.json();
      userLocationName = d && d.name ? [d.name, d.admin1, d.country_code].filter(Boolean).join(', ') : `${userLat.toFixed(2)}°, ${userLng.toFixed(2)}°`;
    } catch { userLocationName = `${userLat.toFixed(2)}°, ${userLng.toFixed(2)}°`; }
    selectedLabel = userLocationName;
    locationInput.value = ''; locationInput.placeholder = userLocationName;
    status.textContent = `📍 Located: ${userLocationName}`;
    btn.disabled = false; btn.innerHTML = '<span>✅</span> Location set';
  }, () => {
    status.textContent = 'Could not get location. Please type your city.';
    btn.disabled = false; btn.innerHTML = '<span>📡</span> Use my location';
  }, { timeout: 10000 });
}

// ── UNIT TOGGLE ───────────────────────────────────────────────────────────────

function setUnit(unit) {
  distUnit = unit;
  if (lastResults) renderResults(lastResults);
}

function distStr(miles) {
  if (miles == null) return '';
  return distUnit === 'km' ? (miles * 1.60934).toFixed(0) + ' km' : miles.toFixed(0) + ' mi';
}

function unitToggleHTML() {
  return `<div class="unit-toggle">
    <button class="tog ${distUnit === 'mi' ? 'active' : ''}" onclick="setUnit('mi')">mi</button>
    <span class="sep">|</span>
    <button class="tog ${distUnit === 'km' ? 'active' : ''}" onclick="setUnit('km')">km</button>
  </div>`;
}

// ── UTILS ─────────────────────────────────────────────────────────────────────

function deg2rad(d) { return d * Math.PI / 180; }

function distanceMiles(lat1, lng1, lat2, lng2) {
  const R = 3958.8, dLat = deg2rad(lat2 - lat1), dLng = deg2rad(lng2 - lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function degreesToCompass(deg, short) {
  if (deg == null) return '—';
  const shortDirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  const longDirs  = [
    'North','N-Northeast','Northeast','E-Northeast',
    'East','E-Southeast','Southeast','S-Southeast',
    'South','S-Southwest','Southwest','W-Southwest',
    'West','W-Northwest','Northwest','N-Northwest'
  ];
  const idx = Math.round(deg / 22.5) % 16;
  return short ? shortDirs[idx] : longDirs[idx];
}

function mToFt(m) { return m == null ? null : m * 3.281; }

// ── API CALLS ─────────────────────────────────────────────────────────────────

async function getWaveData(lat, lng) {
  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&hourly=wave_height,swell_wave_height,swell_wave_period,swell_wave_direction&forecast_days=1&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('no_marine');
  const d   = await res.json();
  const idx = Math.min(new Date().getHours(), (d.hourly?.time?.length || 1) - 1);

  const waveHeightM  = d.hourly?.wave_height?.[idx] ?? null;
  const waveHeightFt = mToFt(waveHeightM);

  // Surf height range from significant wave height
  // Low end = ~50% of sig wave height (lulls), high end = ~85% (better sets)
  // Add + if high end >= 5ft, meaning overhead+ sets are possible
  let surfRange = null;
  if (waveHeightFt != null) {
    const lo  = Math.max(1, Math.round(waveHeightFt * 0.5));
    const hi  = Math.round(waveHeightFt * 0.85);
    const plus = hi >= 5;
    surfRange = { lo, hi, plus };
  }

  return {
    waveHeight:  waveHeightFt,
    swellHeight: mToFt(d.hourly?.swell_wave_height?.[idx] ?? null),
    swellPeriod: d.hourly?.swell_wave_period?.[idx]    ?? null,
    swellDir:    d.hourly?.swell_wave_direction?.[idx] ?? null,
    surfRange,
  };
}

// ── NOAA TIDE DATA ────────────────────────────────────────────────────────────
// Fetches today's high/low predictions from NOAA Tides & Currents API.
// Heights are in feet above MLLW — the standard surfers' tide reference.
// API docs: https://api.tidesandcurrents.noaa.gov/api/prod/

async function getNOAATideData(noaaStationId) {
  try {
    // Fetch today's high/low predictions (hilo interval) in English units, MLLW datum
    const today = new Date();
    const dateStr = today.getFullYear().toString() +
      String(today.getMonth()+1).padStart(2,'0') +
      String(today.getDate()).padStart(2,'0');

    const url = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter` +
      `?begin_date=${dateStr}&end_date=${dateStr}` +
      `&station=${noaaStationId}` +
      `&product=predictions&datum=MLLW&interval=hilo` +
      `&units=english&time_zone=lst_ldt&format=json`;

    const res  = await fetch(url);
    const data = await res.json();

    if (!data.predictions || !data.predictions.length) return null;

    const now = new Date();
    const predictions = data.predictions.map(p => ({
      time: new Date(p.t),
      ft:   parseFloat(p.v),
      type: p.type  // 'H' or 'L'
    }));

    // Find the two predictions that bracket now (prev and next)
    let prev = null, nextHigh = null, nextLow = null;
    for (let i = 0; i < predictions.length; i++) {
      if (predictions[i].time <= now) {
        prev = predictions[i];
      } else {
        // This prediction is in the future
        if (!nextHigh && predictions[i].type === 'H') nextHigh = predictions[i];
        if (!nextLow  && predictions[i].type === 'L') nextLow  = predictions[i];
      }
    }

    // Determine current tide height by linear interpolation between prev and next event
    const allFuture = predictions.filter(p => p.time > now);
    const nextEvent = allFuture.length ? allFuture[0] : null;

    let currentFt = null;
    let rising     = false;

    if (prev && nextEvent) {
      const totalMs  = nextEvent.time - prev.time;
      const elapsedMs = now - prev.time;
      const ratio    = elapsedMs / totalMs;
      currentFt = prev.ft + (nextEvent.ft - prev.ft) * ratio;
      rising    = nextEvent.ft > prev.ft;
    } else if (prev) {
      currentFt = prev.ft;
      rising    = false;
    }

    return {
      currentFt: currentFt != null ? Math.round(currentFt * 10) / 10 : null,
      rising,
      nextHigh: nextHigh ? { time: nextHigh.time.toISOString(), ft: nextHigh.ft } : null,
      nextLow:  nextLow  ? { time: nextLow.time.toISOString(),  ft: nextLow.ft  } : null,
    };
  } catch (err) {
    console.warn('NOAA tide fetch failed:', err);
    return null;
  }
}

function formatTideTime(isoStr) {
  if (!isoStr) return '—';
  const d = new Date(isoStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

async function getWindData(lat, lng) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=windspeed_10m,winddirection_10m&forecast_days=1&timezone=auto`;
    const res = await fetch(url);
    const d   = await res.json();
    const idx = Math.min(new Date().getHours(), (d.hourly?.time?.length || 1) - 1);
    return {
      speed: (d.hourly?.windspeed_10m?.[idx]    ?? 0) * 0.6214,
      dir:    d.hourly?.winddirection_10m?.[idx] ?? null,
    };
  } catch { return { speed: 0, dir: null }; }
}

// ── WIND COMPASS SVG ──────────────────────────────────────────────────────────

function windCompassSVG(windDirDeg, windSpeedMph, spot) {
  // Determine arrow color from wind scoring
  const isCalm          = windSpeedMph <= 5;
  const withinTolerance = windSpeedMph <= spot.windTolerance;
  const arrowColor = isCalm ? '#0a7c5c' : withinTolerance ? '#b87a1a' : '#c0392b';
  const ringBg     = isCalm ? 'rgba(10,124,92,0.08)' : withinTolerance ? 'rgba(184,122,26,0.08)' : 'rgba(192,57,43,0.07)';
  const hasDir     = windDirDeg != null;
  const arrowRot   = windDirDeg != null ? windDirDeg : 0;

  return `<svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" style="display:block;width:52px;height:52px;">
    <circle cx="26" cy="26" r="24" fill="${ringBg}" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
    <!-- Cardinals -->
    <text x="26" y="7.5" text-anchor="middle" font-size="5.5" fill="rgba(0,0,0,0.3)" font-family="sans-serif">N</text>
    <text x="26" y="49"  text-anchor="middle" font-size="5.5" fill="rgba(0,0,0,0.3)" font-family="sans-serif">S</text>
    <text x="4.5" y="28.5" text-anchor="middle" font-size="5.5" fill="rgba(0,0,0,0.3)" font-family="sans-serif">W</text>
    <text x="47.5" y="28.5" text-anchor="middle" font-size="5.5" fill="rgba(0,0,0,0.3)" font-family="sans-serif">E</text>
    <!-- Tick marks -->
    <line x1="26" y1="11" x2="26" y2="14" stroke="rgba(0,0,0,0.12)" stroke-width="1" transform="rotate(45,26,26)"/>
    <line x1="26" y1="11" x2="26" y2="14" stroke="rgba(0,0,0,0.12)" stroke-width="1" transform="rotate(135,26,26)"/>
    <line x1="26" y1="11" x2="26" y2="14" stroke="rgba(0,0,0,0.12)" stroke-width="1" transform="rotate(225,26,26)"/>
    <line x1="26" y1="11" x2="26" y2="14" stroke="rgba(0,0,0,0.12)" stroke-width="1" transform="rotate(315,26,26)"/>
    ${hasDir ? `
    <g transform="rotate(${arrowRot}, 26, 26)">
      <line x1="26" y1="32" x2="26" y2="16" stroke="${arrowColor}" stroke-width="2.5" stroke-linecap="round"/>
      <polygon points="26,13 22.5,19 29.5,19" fill="${arrowColor}"/>
      <line x1="23" y1="30" x2="26" y2="33.5" stroke="${arrowColor}" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="30" x2="26" y2="33.5" stroke="${arrowColor}" stroke-width="2" stroke-linecap="round"/>
    </g>` : `
    <circle cx="26" cy="26" r="4" fill="none" stroke="${arrowColor}" stroke-width="2"/>
    <line x1="23" y1="23" x2="29" y2="29" stroke="${arrowColor}" stroke-width="1.5"/>
    <line x1="29" y1="23" x2="23" y2="29" stroke="${arrowColor}" stroke-width="1.5"/>`}
  </svg>`;
}

// ── TIDE SECTION HTML ─────────────────────────────────────────────────────────

function tideHTML(tide) {
  if (!tide) return '';

  const heightFt   = tide.currentFt != null ? tide.currentFt.toFixed(1) + ' ft' : '—';
  const arrow      = tide.rising ? '↑' : '↓';
  const arrowColor = tide.rising ? '#0a7c5c' : '#2980b9';
  const arrowLabel = tide.rising ? 'Rising' : 'Falling';

  const nextHighStr = tide.nextHigh
    ? `${formatTideTime(tide.nextHigh.time)} (${tide.nextHigh.ft.toFixed(1)} ft)`
    : '—';
  const nextLowStr  = tide.nextLow
    ? `${formatTideTime(tide.nextLow.time)} (${tide.nextLow.ft.toFixed(1)} ft)`
    : '—';

  return `<div class="tide-row">
    <div class="tide-current">
      <span class="tide-lbl">Tide</span>
      <span class="tide-val">${heightFt}</span>
      <span class="tide-arrow" style="color:${arrowColor};" title="${arrowLabel}">${arrow}</span>
    </div>
    <div class="tide-next">
      <span class="tide-next-item"><span class="tide-next-lbl">Next high</span> <span class="tide-next-val">${nextHighStr}</span></span>
      <span class="tide-next-item"><span class="tide-next-lbl">Next low</span> <span class="tide-next-val">${nextLowStr}</span></span>
    </div>
  </div>`;
}

// ── CARD RENDERING ────────────────────────────────────────────────────────────

function renderCard(spot, wave, wind, matchScore, reasons, warnings) {
  const swellFt   = mToFt(wave.swellHeight ?? wave.waveHeight);
  const tier      = tierFromScore(matchScore);
  const verdict   = verdictText(spot, matchScore, reasons, warnings, swellFt, wave.swellPeriod, wind.speed);
  const verdictCls = tier === 'best' ? 'verdict-good' : tier === 'avg' ? 'verdict-fair' : 'verdict-poor';

  // Skill colors
  const skillColors  = { beginner:'#1D9E75', intermediate:'#b87a1a', advanced:'#e87a4a', expert:'#c0392b' };
  const skillBg      = { beginner:'rgba(29,158,117,0.12)', intermediate:'rgba(184,122,26,0.12)', advanced:'rgba(232,122,74,0.12)', expert:'rgba(192,57,43,0.12)' };
  const skillColor   = skillColors[spot.skill]  || '#888';
  const skillBgColor = skillBg[spot.skill]      || 'rgba(0,0,0,0.06)';

  // Distance pill (replaces Go/Maybe badge)
  const distDisplay  = spot.dist != null ? distStr(spot.dist) : '';
  const swellDirLabel = wave.swellDir != null ? degreesToCompass(wave.swellDir, false) : '—';
  const windDirLabel  = degreesToCompass(wind.dir, true);
  const windSpeedFmt  = Math.round(wind.speed) + ' mph';
  const compassSVG    = windCompassSVG(wind.dir, wind.speed, spot);

  return `
    <div class="spot-card tier-${tier}">

      <!-- NAME + DISTANCE PILL (replaces Go/Maybe) -->
      <div class="spot-top">
        <div class="spot-name" style="white-space:nowrap;">${spot.name}</div>
        ${distDisplay ? `<div class="dist-pill">${distDisplay}</div>` : ''}
      </div>

      <!-- STATS: SURF | SWELL | PERIOD | WIND -->
      <div class="stats-row">

        <!-- Surf height range -->
        <div class="stat-block">
          <div class="stat-lbl">Surf</div>
          <div class="stat-val-line">
            <span class="stat-val-big">${wave.surfRange ? `${wave.surfRange.lo}-${wave.surfRange.hi}${wave.surfRange.plus ? '+' : ''}` : '—'}</span>
          </div>
          <div class="stat-unit" style="text-align:center;">ft</div>
          <div class="stat-sub">&nbsp;</div>
        </div>

        <div class="stat-divider"></div>

        <!-- Swell height + direction -->
        <div class="stat-block">
          <div class="stat-lbl">Swell</div>
          <div class="stat-val-line">
            <span class="stat-val-big">${swellFt != null ? swellFt.toFixed(1) : '—'}</span>
            <span class="stat-unit">feet</span>
          </div>
          <div class="stat-sub">${swellDirLabel}</div>
        </div>

        <div class="stat-divider"></div>

        <!-- Period -->
        <div class="stat-block">
          <div class="stat-lbl">Period</div>
          <div class="stat-val-line">
            <span class="stat-val-big">${wave.swellPeriod ? Math.round(wave.swellPeriod) : '—'}</span>
            <span class="stat-unit">s</span>
          </div>
          <div class="stat-sub">&nbsp;</div>
        </div>

        <div class="stat-divider"></div>

        <!-- Wind: compass on left, speed+dir text on right -->
        <div class="stat-block-wide">
          <div class="stat-lbl">Wind</div>
          <div class="wind-row">
            <div class="wind-compass">${compassSVG}</div>
            <div class="wind-text">
              <div class="wind-speed-val">${windSpeedFmt}</div>
              <div class="wind-dir-val">${windDirLabel}</div>
            </div>
          </div>
          <div class="stat-sub">&nbsp;</div>
        </div>

      </div>

      <!-- TIDE -->
      ${tideHTML(wave.tide)}

      <!-- VERDICT -->
      <div class="spot-verdict ${verdictCls}">${verdict}</div>

      <!-- FOOTER: break type + skill -->
      <div class="spot-footer">
        <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
          <span class="spot-pill" style="background:rgba(0,0,0,0.06);color:var(--text-muted);">🌊 ${spot.breakType}</span>
          <span class="spot-pill" style="background:${skillBgColor};color:${skillColor};">${spot.skill}</span>
        </div>
        <div class="spot-region">${spot.region}</div>
      </div>

    </div>`;
}

// ── RENDER RESULTS ────────────────────────────────────────────────────────────

function renderResults(data) {
  const { valid, label, radius, now } = data;
  const resultsArea = document.getElementById('resultsArea');

  const best  = valid.filter(d => tierFromScore(d.score) === 'best');
  const avg   = valid.filter(d => tierFromScore(d.score) === 'avg');
  const worst = valid.filter(d => tierFromScore(d.score) === 'worst');

  let html = `
    <div class="results-meta">
      <h3>Conditions near ${label}</h3>
      <div class="results-meta-right">
        <span>${now.toLocaleDateString([], { weekday:'short', month:'short', day:'numeric' })} · ${now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })} · ${valid.length} spot${valid.length !== 1 ? 's' : ''} within ${radius} ${distUnit}</span>
        ${unitToggleHTML()}
      </div>
    </div>`;

  if (best.length) {
    html += `<div class="tier-label tier-go">✅ Worth the drive (${best.length})</div>`;
    html += `<div class="spot-grid">${best.map(d => renderCard(d.spot, d.wave, d.wind, d.score, d.reasons, d.warnings)).join('')}</div>`;
  }
  if (avg.length) {
    html += `<div class="tier-label tier-maybe">👍 Maybe (${avg.length})</div>`;
    html += `<div class="spot-grid">${avg.map(d => renderCard(d.spot, d.wave, d.wind, d.score, d.reasons, d.warnings)).join('')}</div>`;
  }
  if (worst.length) {
    html += `<div class="tier-label tier-skip">😴 Skip today (${worst.length})</div>`;
    html += `<div class="spot-grid">${worst.map(d => renderCard(d.spot, d.wave, d.wind, d.score, d.reasons, d.warnings)).join('')}</div>`;
  }

  resultsArea.innerHTML = html;
}

// ── MAIN SEARCH ───────────────────────────────────────────────────────────────

async function runSearch() {
  const resultsArea = document.getElementById('resultsArea');
  const btn         = document.getElementById('searchBtn');
  const radius      = parseInt(document.getElementById('radiusInput').value);
  const sortBy      = document.getElementById('sortInput').value;

  let lat   = selectedLat, lng = selectedLng, label = selectedLabel;
  const typedVal = locationInput.value.trim();

  if (!lat && typedVal) {
    btn.disabled = true; btn.textContent = 'Searching…';
    resultsArea.innerHTML = `<div class="loading"><div class="loader"></div><p>Finding "${typedVal}"…</p></div>`;
    try {
      const res  = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(typedVal)}&count=1&language=en&format=json`);
      const data = await res.json();
      if (!data.results?.length) throw new Error(`Couldn't find "${typedVal}". Try a nearby city name.`);
      const r = data.results[0];
      lat = r.latitude; lng = r.longitude;
      label = [r.name, r.admin1, r.country_code].filter(Boolean).join(', ');
    } catch(err) {
      resultsArea.innerHTML = `<div class="error-msg">${err.message}</div>`;
      btn.disabled = false; btn.textContent = 'Find Waves 🌊'; return;
    }
  }

  if (!lat) {
    resultsArea.innerHTML = `<div class="error-msg">Please enter your location or tap <strong>"Use my location"</strong>.</div>`;
    return;
  }

  btn.disabled = true; btn.textContent = 'Searching…';
  resultsArea.innerHTML = `<div class="loading"><div class="loader"></div><p>Scanning ${radius}-mile radius from ${label}…</p></div>`;

  const nearby = SURF_SPOTS
    .map(s => ({ ...s, dist: distanceMiles(lat, lng, s.lat, s.lng) }))
    .filter(s => s.dist <= radius)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 12);

  if (!nearby.length) {
    resultsArea.innerHTML = `<div class="no-results"><p>No surf spots found within <strong>${radius} miles</strong> of <strong>${label}</strong>.<br>Try bumping up your drive radius!</p></div>`;
    btn.disabled = false; btn.textContent = 'Find Waves 🌊'; return;
  }

  resultsArea.innerHTML = `<div class="loading"><div class="loader"></div><p>Fetching live swell + tide data for ${nearby.length} spots…</p></div>`;

  const results = await Promise.all(nearby.map(async spot => {
    try {
      const [wave, wind, tide] = await Promise.all([
        getWaveData(spot.lat, spot.lng),
        getWindData(spot.lat, spot.lng),
        getNOAATideData(spot.noaaStationId),
      ]);
      wave.tide = tide;
      const { score, reasons, warnings } = scoreConditions(spot, wave, wind.speed, wave.swellDir, wind.dir);
      return { spot, wave, wind, score, reasons, warnings };
    } catch { return null; }
  }));

  const valid = results.filter(Boolean);
  if (!valid.length) {
    resultsArea.innerHTML = `<div class="error-msg">Couldn't fetch wave data. The marine API covers ocean coastlines only.</div>`;
    btn.disabled = false; btn.textContent = 'Find Waves 🌊'; return;
  }

  if (sortBy === 'distance') valid.sort((a, b) => a.spot.dist - b.spot.dist);
  else                       valid.sort((a, b) => b.score - a.score);

  const now = new Date();
  lastResults = { valid, label, radius, now };
  renderResults(lastResults);
  btn.disabled = false; btn.textContent = 'Find Waves 🌊';
}
