// =============================================================================
// SWELLO — CALIFORNIA SURF SPOT DATABASE
// San Francisco to the Mexican Border — North to South by County
// =============================================================================
// Fields:
//   name            — Display name
//   lat / lng       — Coordinates (decimal degrees, WGS84)
//   region          — County / city label shown on card
//   breakType       — point | beach | reef | river mouth
//   skill           — beginner | intermediate | advanced | expert
//   idealSwellDir   — Best swell in compass degrees (0=N, 90=E, 180=S, 270=W)
//   idealSwellDirLabel — Human-readable swell direction
//   idealSizeMin    — Minimum ideal swell in feet
//   idealSizeMax    — Maximum ideal swell in feet
//   idealPeriodMin  — Minimum ideal period in seconds
//   windTolerance   — Max acceptable wind in mph
//   idealWindLabel  — Best wind (offshore = good)
//   notes           — Plain-English spot description
// =============================================================================

const SURF_SPOTS = [

  // ============================================================
  // SAN FRANCISCO COUNTY
  // ============================================================

  { name:"Fort Point", lat:37.810, lng:-122.477, region:"San Francisco, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:292, idealSwellDirLabel:"NW/W", idealSizeMin:4, idealSizeMax:10,
    idealPeriodMin:13, windTolerance:10, idealWindLabel:"E (offshore)",
    notes:"Left-hander that breaks directly under the Golden Gate Bridge — one of the most unique surf spots on earth. Fast currents, submerged rocks, and strong localism. Only fires on NW/W swell with E offshore wind and lower tide." },

  { name:"Ocean Beach — Kelly's Cove", lat:37.770, lng:-122.510, region:"San Francisco, CA",
    breakType:"beach", skill:"advanced",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:4, idealSizeMax:15,
    idealPeriodMin:14, windTolerance:10, idealWindLabel:"E (offshore)",
    notes:"North end of Ocean Beach at the seawall. Picks up the most swell and often has the best sandbars. Powerful, shifty peaks with rip currents. NW groundswell and E offshore wind produces classic SF beach break." },

  { name:"Ocean Beach — VFW/Noriega", lat:37.758, lng:-122.510, region:"San Francisco, CA",
    breakType:"beach", skill:"advanced",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:4, idealSizeMax:12,
    idealPeriodMin:14, windTolerance:10, idealWindLabel:"E (offshore)",
    notes:"Mid-section of Ocean Beach. Three miles of shifting, powerful beach break immortalized by William Finnegan in Barbarian Days. Open to every NW and S swell. Strong currents can shift sandbars hour to hour." },

  { name:"Ocean Beach — Sloat", lat:37.734, lng:-122.508, region:"San Francisco, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW/W", idealSizeMin:3, idealSizeMax:10,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"South end of Ocean Beach. Slightly more protected than the north end. Sandbars shift constantly. Best in autumn with NW groundswell. Bring a 4/3mm wetsuit minimum — water rarely exceeds 58°F." },

  // ============================================================
  // SAN MATEO COUNTY
  // ============================================================

  { name:"Rockaway Beach", lat:37.609, lng:-122.493, region:"Pacifica, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:7,
    idealPeriodMin:11, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Pacifica beach break just south of SF. Can produce a left-hand point off the rocky south end when conditions align. Rip currents run along the cliffs on big days. Fun intermediate spot on smaller NW swell." },

  { name:"Linda Mar (Pacifica State Beach)", lat:37.601, lng:-122.494, region:"Pacifica, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:15, idealWindLabel:"E (offshore)",
    notes:"Most popular beginner break in the Bay Area. Wide cove shelters the worst swell. Headland deflects NW groundswell into forgiving peaks. Watch for jellyfish. Home of the Nor-Cal Surf Shop." },

  { name:"Surfer's Beach (El Granada)", lat:37.505, lng:-122.491, region:"Half Moon Bay, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Exposed beach break north of Half Moon Bay proper. Picks up solid NW swell. Multiple peaks along a sandy shore. Less crowded than Linda Mar. Good intermediate option before paddling out at Mavericks nearby." },

  { name:"Pedro Point", lat:37.585, lng:-122.509, region:"Pacifica, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:315, idealSwellDirLabel:"NNW/N", idealSizeMin:4, idealSizeMax:10,
    idealPeriodMin:13, windTolerance:10, idealWindLabel:"E (offshore)",
    notes:"Exposed reef break just north of Half Moon Bay. Lefts and rights off the peak. Can bowl on the inside. A training ground for those working up to Mavericks. Best on NNW or N swell with E or light SE wind." },

  { name:"Montara State Beach", lat:37.538, lng:-122.516, region:"San Mateo County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Hollow sandbar break south of Pacifica, sometimes called 'Mini Mavericks.' Can barrel nicely on the right sandbar. Rip currents can be dangerous. NW groundswell with E offshore wind is the formula." },

  { name:"Mavericks", lat:37.494, lng:-122.499, region:"Half Moon Bay, CA",
    breakType:"reef", skill:"expert",
    idealSwellDir:315, idealSwellDirLabel:"NNW", idealSizeMin:15, idealSizeMax:60,
    idealPeriodMin:18, windTolerance:15, idealWindLabel:"E (offshore)",
    notes:"California's premier big-wave reef. Paddle-in or tow-in only. Enormous NNW groundswell focuses over a submerged reef producing 20-60ft faces. World Surf League holds the Mavericks Invitational here. Expert only." },

  { name:"Half Moon Bay State Beach", lat:37.463, lng:-122.429, region:"Half Moon Bay, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Wide sandy beach with multiple peaks. Good alternative on days when Mavericks is too big. NW groundswell, E offshore wind. Consistent mid-week option when Bay Area crowds are thin." },

  { name:"Tunitas Creek", lat:37.379, lng:-122.403, region:"San Mateo County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Remote, uncrowded beach break accessible by dirt road south of Half Moon Bay. NW swell creates peaks along a wide beach. Rarely surfed on weekdays. A reward for those willing to make the effort." },

  // ============================================================
  // SANTA CRUZ COUNTY
  // ============================================================

  { name:"Waddell Creek", lat:37.098, lng:-122.279, region:"Santa Cruz County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"World kiteboarding capital but also has legitimate surf. Exposed NW-facing beach picks up solid groundswell. Strong afternoon winds make for rough sessions — arrive early. Less crowded than Santa Cruz proper." },

  { name:"Scott Creek Beach", lat:37.056, lng:-122.230, region:"Santa Cruz County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:7,
    idealPeriodMin:11, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Low-key beach break north of Santa Cruz. River mouth produces fun sandbars after rain. Uncrowded on weekdays. Best in winter on NW groundswell with E offshore wind." },

  { name:"Davenport Landing", lat:37.010, lng:-122.195, region:"Santa Cruz County, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW/W", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"E (offshore)",
    notes:"Exposed reef and beach break north of Santa Cruz. Picks up lots of swell. Several peaks along the beach. Sharky area — be aware. One of the more consistent and uncrowded spots between SF and Santa Cruz." },

  { name:"Four Mile Beach", lat:36.988, lng:-122.170, region:"Santa Cruz County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Named for its distance from Santa Cruz. Accessible via clifftop trail. Less crowded than town breaks. NW groundswell wraps in well. Part of Great White shark territory — be shark-aware." },

  { name:"Bonny Doon", lat:36.976, lng:-122.159, region:"Santa Cruz County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Remote beach break north of Santa Cruz accessible by steep cliff trail. Picks up strong W/NW swell. Usually uncrowded due to access difficulty. Rocky shore on sides — stay in the sandy middle." },

  { name:"Natural Bridges State Beach", lat:36.952, lng:-122.058, region:"Santa Cruz, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:2, idealSizeMax:5,
    idealPeriodMin:10, windTolerance:15, idealWindLabel:"E (offshore)",
    notes:"Sandy beach break at the western end of Santa Cruz near the famous rock arch. More sheltered than Steamer Lane. Good beginner option when conditions are clean. Named for the sea arches carved into the coastal bluffs." },

  { name:"Steamer Lane — Indicators", lat:36.952, lng:-122.028, region:"Santa Cruz, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:6, idealSizeMax:20,
    idealPeriodMin:15, windTolerance:10, idealWindLabel:"E (offshore)",
    notes:"The outer section of Steamer Lane. Long right-hander that only works on large NW groundswell. Can link all the way through to Middle Peak on the right day. Very competitive lineup of Santa Cruz's best surfers." },

  { name:"Steamer Lane — Middle Peak", lat:36.951, lng:-122.026, region:"Santa Cruz, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:4, idealSizeMax:15,
    idealPeriodMin:14, windTolerance:10, idealWindLabel:"E (offshore)",
    notes:"The heart of Steamer Lane. A-frame peak with rights and lefts. The right is longer and more rippable; the left is faster and hollower. World Surf Reserve. Heavy localism and a brutally competitive lineup. Best in fall/winter." },

  { name:"Steamer Lane — The Slot", lat:36.951, lng:-122.025, region:"Santa Cruz, CA",
    breakType:"reef", skill:"expert",
    idealSwellDir:315, idealSwellDirLabel:"NNW", idealSizeMin:8, idealSizeMax:20,
    idealPeriodMin:16, windTolerance:10, idealWindLabel:"E (offshore)",
    notes:"The inner, most critical section of Steamer Lane. Rarely breaks but when it does it's a slab over a shallow rock ledge called 'The Sidewalk.' Expert only — heavy wipeouts close to rocks." },

  { name:"Cowells Beach", lat:36.963, lng:-122.022, region:"Santa Cruz, CA",
    breakType:"reef", skill:"beginner",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:2, idealSizeMax:5,
    idealPeriodMin:10, windTolerance:15, idealWindLabel:"SE (offshore)",
    notes:"Protected by the headland — Santa Cruz's best beginner break. Long, slow right-handers peel gently. Home of several surf schools. Very crowded on weekends. Best at low tide." },

  { name:"Twin Lakes Beach", lat:36.960, lng:-121.998, region:"Santa Cruz, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:202, idealSwellDirLabel:"SSW/S", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NW (offshore)",
    notes:"Beach break inside Santa Cruz harbor near the yacht basin. Picks up south and SSW swell wrapping into the bay. Jetty creates defined peaks. Sheltered from north wind. Good summer option when S swell fills in." },

  { name:"Seabright / Rivermouth", lat:36.957, lng:-122.001, region:"Santa Cruz, CA",
    breakType:"river mouth", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW/S", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NW (offshore)",
    notes:"River mouth at the east end of Santa Cruz. Sandbars shift after rain and produce fun peaks. Works on S and SW swell that wraps into the bay. Territorial east-side locals — surf with respect." },

  { name:"Pleasure Point — 36th Ave", lat:36.964, lng:-121.981, region:"Santa Cruz, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:4, idealSizeMax:12,
    idealPeriodMin:13, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"The main peak at Pleasure Point. Long right-handers over a rocky reef. Multiple sections that link up on the right swell. Heavy localism and fierce competition. Best in autumn with NW swell and NE offshore wind." },

  { name:"Pleasure Point — 38th Ave", lat:36.961, lng:-121.978, region:"Santa Cruz, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:10,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"The outside peak further down the Pleasure Point reef. Slightly more accessible than 36th. Longer paddle but can produce excellent long rights. Same NW swell, NE offshore wind formula as the rest of Pleasure Point." },

  { name:"Privates (Jack O'Neill's)", lat:36.957, lng:-121.974, region:"Santa Cruz, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Semi-secret spot east of Pleasure Point. Lower crowds than 36th/38th. Right-hander over reef. Needs decent NW swell to work. Named for its semi-private beach access." },

  { name:"Capitola Village Beach", lat:36.975, lng:-121.952, region:"Capitola, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:202, idealSwellDirLabel:"SSW/S", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:9, windTolerance:15, idealWindLabel:"N/NW (offshore)",
    notes:"Protected sandy beach inside Capitola's small bay. Very mellow and forgiving. Works on S/SW swell that wraps into the bay. Good learning spot. California's oldest beach resort town." },

  { name:"Manresa State Beach", lat:36.930, lng:-121.856, region:"Santa Cruz County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Wide sandy beach south of Santa Cruz. Consistent beach break peaks. Less crowded than town. WSW swell produces the best banks. Good summer and fall option." },

  { name:"Sunset State Beach", lat:36.889, lng:-121.831, region:"Santa Cruz County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Remote beach break south of Capitola with state campground. Multiple peaks that shift with sandbars. Less crowded than Santa Cruz proper. Great autumn option." },

  { name:"Moss Landing Harbor Entrance", lat:36.802, lng:-121.787, region:"Monterey County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:11, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Jetty creates semi-consistent peaks near the harbor mouth. W/NW swell bounces off jetty walls for interesting wedge effects. Uncrowded compared to Santa Cruz. Cold water with sea otters nearby." },

  // ============================================================
  // MONTEREY COUNTY
  // ============================================================

  { name:"Asilomar State Beach", lat:36.619, lng:-121.940, region:"Pacific Grove, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Rocky reef break along the rugged Pacific Grove coastline. Multiple peaks over rock and reef. Picks up strong NW swell. Cold water, kelp, sea otters. Uncrowded and scenic — a hidden gem." },

  { name:"Carmel Beach", lat:36.548, lng:-121.924, region:"Carmel, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW/W", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Stunning white-sand beach backed by Monterey pines. Beach break with shifting peaks. NW/W swell is most consistent. Very cold water. Dogs allowed on leash. Small but passionate local crew." },

  { name:"Carmel Point", lat:36.539, lng:-121.923, region:"Carmel, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:315, idealSwellDirLabel:"NW/NNW", idealSizeMin:4, idealSizeMax:10,
    idealPeriodMin:13, windTolerance:10, idealWindLabel:"E (offshore)",
    notes:"Rocky reef point south of Carmel Beach. Exposed to strong NW/NNW groundswell. Quality lefts and rights. Rocks everywhere — advanced surfers only. Rarely crowded due to rugged access." },

  { name:"Ghost Tree (Pescadero Point)", lat:36.559, lng:-121.961, region:"Pebble Beach, CA",
    breakType:"reef", skill:"expert",
    idealSwellDir:315, idealSwellDirLabel:"NNW", idealSizeMin:20, idealSizeMax:60,
    idealPeriodMin:18, windTolerance:15, idealWindLabel:"SE (offshore)",
    notes:"Big-wave reef off Pebble Beach producing 20-60ft waves on massive NNW groundswell. Tow-in only at size. Surfers wear helmets and inflatable vests. One of California's most impressive big-wave venues." },

  // ============================================================
  // SAN LUIS OBISPO COUNTY
  // ============================================================

  { name:"Sand Dollar Beach (Big Sur)", lat:35.925, lng:-121.463, region:"Big Sur, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Big Sur's most accessible surf beach. Backed by dramatic cliffs. W/NW groundswell produces consistent peaks. Remote and often uncrowded. Cold water and potential shark activity. Stunning scenery." },

  { name:"Spooner's Cove (Montana de Oro)", lat:35.277, lng:-120.890, region:"San Luis Obispo County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Inside Montana de Oro State Park. Rocky cove with beach break peaks. Protected somewhat by the headland. W/NW swell wraps in. Beautiful state park setting with hiking and camping. Uncrowded on weekdays." },

  { name:"Morro Rock / The Spit", lat:35.365, lng:-120.862, region:"Morro Bay, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:11, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Sandy spit at the base of iconic Morro Rock. Channel creates fun sandbar peaks. W/NW swell is best. Iconic views of the volcanic plug backdrop make this one of California's most photogenic surf spots." },

  { name:"Cayucos Pier", lat:35.442, lng:-120.891, region:"Cayucos, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:2, idealSizeMax:5,
    idealPeriodMin:9, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Classic Central Coast beach break around the historic pier. Fun peaks in a range of conditions. Beginner-friendly on smaller days. Cayucos has kept its 1950s beach town character — charming and relaxed." },

  { name:"Pismo Beach Pier", lat:35.141, lng:-120.641, region:"Pismo Beach, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:2, idealSizeMax:5,
    idealPeriodMin:9, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Wide sandy beach break around the Pismo pier. Very consistent and forgiving. Great for beginners and longboarders. Works on WSW swell that wraps around Point Sal." },

  { name:"Avila Beach", lat:35.179, lng:-120.731, region:"San Luis Obispo County, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:202, idealSwellDirLabel:"SSW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:9, windTolerance:15, idealWindLabel:"N (offshore)",
    notes:"Protected harbor beach facing south. Picks up S/SSW swell. Very calm and forgiving — ideal for first-timers. The calmest water on the Central Coast. Warmer than neighboring beaches due to its sheltered position." },

  { name:"Jalama Beach", lat:34.503, lng:-120.501, region:"Santa Barbara County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:10,
    idealPeriodMin:13, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"The only public access in the legendary Hollister Ranch stretch. Wild, exposed beach break catching massive W/NW groundswell. Cold, powerful and sharky — as raw as California gets. The county park burger stand is legendary." },

  // ============================================================
  // SANTA BARBARA COUNTY
  // ============================================================

  { name:"Hollister Ranch (Cojo/Government Point)", lat:34.450, lng:-120.426, region:"Santa Barbara County, CA",
    breakType:"point", skill:"advanced",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:4, idealSizeMax:12,
    idealPeriodMin:14, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Private ranch with some of California's best point breaks. Access strictly limited — must know a parcel owner or come by boat from Gaviota. Named points include Cojo, Government Point, and Drakes. Legendary quality and zero crowds." },

  { name:"El Capitan State Beach", lat:34.457, lng:-120.019, region:"Santa Barbara County, CA",
    breakType:"point", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:13, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"One of the best right points in California when it fires. State campground provides easy overnight access. Needs W swell with enough period to wrap around the point. Fickle but magical when it works." },

  { name:"Refugio State Beach", lat:34.462, lng:-120.069, region:"Santa Barbara County, CA",
    breakType:"point", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W", idealSizeMin:3, idealSizeMax:7,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Serene right-hand point break in a cove with a campground. Protected from the NW — needs more westerly swell. Long, mellow rides when on. A great overnight surf trip destination." },

  { name:"Naples Point", lat:34.421, lng:-119.950, region:"Santa Barbara County, CA",
    breakType:"point", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"N (offshore)",
    notes:"Long right-breaking point north of Goleta. 30-minute low-tide walk from Haskells Beach. Kelpy, rocky, and uncrowded. W swell essential — Channel Islands block S swell here." },

  { name:"Campus Point (UCSB)", lat:34.408, lng:-119.846, region:"Santa Barbara, CA",
    breakType:"point", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"N (offshore)",
    notes:"Right-hand point break on the UCSB campus. Kelpy and rocky but produces quality walls on W swell. Parking requires permit weekdays. Dominated by UCSB students but relatively easy-going vibe." },

  { name:"Coal Oil Point", lat:34.413, lng:-119.878, region:"Santa Barbara, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"N (offshore)",
    notes:"Reef break between Naples and Campus Point. Works on W swell. Named for natural oil seeps offshore. Kelp beds smooth out wind chop. Several peaks across a wide area. Uncrowded midweek." },

  { name:"Leadbetter Point", lat:34.404, lng:-119.698, region:"Santa Barbara, CA",
    breakType:"point", skill:"beginner",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:9, windTolerance:15, idealWindLabel:"N (offshore)",
    notes:"Protected point west of Sterns Wharf. Very mellow, slow-rolling right-hander. Local surfers call it 'Bedwetters' — that tells you about the wave quality. Perfect for beginners and longboarders." },

  { name:"Santa Barbara Harbor / Poles", lat:34.402, lng:-119.689, region:"Santa Barbara, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:202, idealSwellDirLabel:"SSW", idealSizeMin:1, idealSizeMax:3,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"N (offshore)",
    notes:"Inside the harbor breakwater. Very sheltered and gentle. Picks up small S swell wrapping around the breakwater. Best for absolute beginners or stand-up paddle. Summer-only option." },

  { name:"Rincon Point", lat:34.373, lng:-119.473, region:"Santa Barbara/Ventura, CA",
    breakType:"point", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:10,
    idealPeriodMin:14, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"The 'Queen of the Coast.' World-class right-hand point break on the county line. Three sections — Indicator, Rivermouth, and the Cove — can link on big NW swell. Best late fall through spring. Gets extremely crowded." },

  // ============================================================
  // VENTURA COUNTY
  // ============================================================

  { name:"Pitas Point", lat:34.319, lng:-119.336, region:"Ventura County, CA",
    breakType:"point", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:4, idealSizeMax:10,
    idealPeriodMin:14, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Underrated point break between Rincon and Ventura. Same NW swell formula as Rincon but far fewer crowds. Long right-handers when it fires. Access via dirt path off PCH. Best winter option if Rincon is overwhelmed." },

  { name:"Solimar Beach", lat:34.321, lng:-119.393, region:"Ventura County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"NW/W", idealSizeMin:3, idealSizeMax:7,
    idealPeriodMin:11, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Quiet beach break on PCH between Rincon and Ventura. Private community limits parking but public access exists. Multiple peaks along the beach. Uncrowded and often overlooked." },

  { name:"Faria Beach", lat:34.307, lng:-119.357, region:"Ventura County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:7,
    idealPeriodMin:11, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Beach break on PCH with a state campground. Picks up NW swell well. Multiple peaks. Good overnight surf base between Rincon and Ventura." },

  { name:"Emma Wood — Mushpots", lat:34.295, lng:-119.306, region:"Ventura, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"NW/W", idealSizeMin:3, idealSizeMax:10,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Reef break under PCH at Emma Wood. A-frame peaks with the right being the standout. Has an uncanny ability to stay glassy and can hold 10ft on strong W/NW swell. East offshore winds come down from the mountains." },

  { name:"Ventura Overhead", lat:34.298, lng:-119.313, region:"Ventura, CA",
    breakType:"reef", skill:"expert",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:10, idealSizeMax:25,
    idealPeriodMin:16, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Famous big-wave break at Emma Wood that only fires a few times per year. Wedgy, open-face rights that funnel for hundreds of yards on massive W/NW groundswell. Was the Sunset Beach training ground for California's big-wave pioneers." },

  { name:"Ventura Overhead — Mondo's", lat:34.285, lng:-119.290, region:"Ventura, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:270, idealSwellDirLabel:"NW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:9, windTolerance:15, idealWindLabel:"E (offshore)",
    notes:"Mellow beginner-friendly break north of Ventura proper. Easy waves and long rides make it suitable for longboards and stand-up paddleboards. Free parking. Popular with local surf schools." },

  { name:"Ventura Point — Pipe", lat:34.279, lng:-119.286, region:"Ventura, CA",
    breakType:"point", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"The top section of the C Street point break system, named for the large drainage pipe. The highest-quality and most competitive peak of the Ventura point. Long right walls on NW swell. Very crowded dawn patrol crew." },

  { name:"C Street (California Street)", lat:34.272, lng:-119.280, region:"Ventura, CA",
    breakType:"point", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:2, idealSizeMax:7,
    idealPeriodMin:11, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Ventura's signature wave — a long peeling right-hand point. Three-quarter mile series of points that can link on big NW swell. Venue of the world's first pro contest in 1965. Also excellent for kitesurfing on windy afternoons." },

  { name:"C Street — Inside Point", lat:34.270, lng:-119.278, region:"Ventura, CA",
    breakType:"point", skill:"beginner",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:2, idealSizeMax:5,
    idealPeriodMin:10, windTolerance:15, idealWindLabel:"E (offshore)",
    notes:"The inside section of C Street, closest to the pier. Long, flawless walls at minus low tide. Longboarder's dream wave — compared to Malibu First Point without the aggressive crowds. Friendly atmosphere." },

  { name:"Ventura Harbor — South Jetty", lat:34.252, lng:-119.263, region:"Ventura, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Left-hander that peels off the large rock jetty inside Ventura Harbor. A shortboard spot often overrun by local groms. Good left on SW swell with the right sandbar. Less consistent than C Street but less crowded." },

  { name:"Surfers Knoll", lat:34.249, lng:-119.260, region:"Ventura, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"E (offshore)",
    notes:"Sandy beach break just south of Ventura Harbor jetty. Average beach break with no rocks. Works on SW swell. Easy access, easy-going vibe — a calm alternative for those wanting to avoid the competition at C Street." },

  { name:"Santa Clara Rivermouth", lat:34.222, lng:-119.232, region:"Oxnard, CA",
    breakType:"river mouth", skill:"intermediate",
    idealSwellDir:202, idealSwellDirLabel:"SSW/S", idealSizeMin:2, idealSizeMax:7,
    idealPeriodMin:10, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"River mouth south of Ventura where the Santa Clara River meets the sea. Sandbars shift after rain events and can produce exceptional hollow peaks. Best on S swell with NE offshore wind. Can tube on the right day." },

  { name:"Silver Strand — The Jetty", lat:34.194, lng:-119.213, region:"Oxnard, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"North end of Silver Strand near the jetty. Mellow waves suited for beginners and boogie boarders. Swells typically stay 3-5ft here. Good option for those new to surfing." },

  { name:"Silver Strand — The Bowl", lat:34.191, lng:-119.212, region:"Oxnard, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:9, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Middle section of Silver Strand's mile-long beach. Harder sandbar waves that suit shortboards and boogie boards. After winter rainstorms cause a nearby berm to break, swells can double in size. Crowded with locals on good days." },

  { name:"Silver Strand — La Jenelle", lat:34.186, lng:-119.210, region:"Oxnard, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"South end of Silver Strand. Smaller, gentler waves suited to beginners and swimmers. Protected by the curve of the coastline. Quieter than The Bowl. Good entry-level option in Oxnard." },

  { name:"Port Hueneme Beach", lat:34.149, lng:-119.204, region:"Port Hueneme, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:1, idealSizeMax:5,
    idealPeriodMin:9, windTolerance:15, idealWindLabel:"N/NE (offshore)",
    notes:"Trustworthy beach break year-round south of Oxnard. Often uncrowded with plenty of peaks. A-frames appear in fall and hollow waves when the swells hit right. A consistent and accessible Ventura County option." },

  // ============================================================
  // LOS ANGELES COUNTY
  // ============================================================

  { name:"Point Mugu", lat:34.105, lng:-119.060, region:"LA County, CA",
    breakType:"point", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Point break on PCH near the Navy base. Public access on PCH side is limited. Wraps around the rocky point on W/NW swell. Worth checking when other spots are crowded. Rock and kelp hazards." },

  { name:"Leo Carrillo State Beach", lat:34.046, lng:-118.934, region:"Malibu, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"SW/W", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"North Malibu beach break with camping. Multiple peaks along sandy beach. Rock reef at the north end produces better-organized waves. S and SW swell works well. Campground makes overnight trips easy." },

  { name:"County Line Beach", lat:34.042, lng:-118.914, region:"LA/Ventura border, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"SW/W", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Right-hand cobblestone reef break at the north end plus 500 yards of beach break to the south. Versatile for all skill levels but beginners should be cautious on larger swells. Always worth checking on the drive north." },

  { name:"Zuma Beach", lat:34.015, lng:-118.822, region:"Malibu, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:247, idealSwellDirLabel:"SW", idealSizeMin:2, idealSizeMax:5,
    idealPeriodMin:9, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Malibu's biggest and most accessible beach. Wide sandy shore with multiple peaks. Forgiving and beginner-friendly on smaller days. NE offshore wind cleans it up. Gets choppy with onshore afternoon sea breezes." },

  { name:"Point Dume (Pirates Cove)", lat:34.000, lng:-118.806, region:"Malibu, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:4, idealSizeMax:12,
    idealPeriodMin:13, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Powerful reef break at the base of Point Dume cliffs. Accessed via narrow trail down the cliffs. W/NW groundswell wraps around the point. Heavy shore pound and rocks. Advanced surfers only. Rarely crowded." },

  { name:"Malibu — First Point (Surfrider Beach)", lat:34.035, lng:-118.779, region:"Malibu, CA",
    breakType:"point", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"California's most iconic wave. Long, perfect right-hand point break made famous in the 1950s and '60s. Extremely crowded on any surf day. Best on S/SW swell with long period and NE offshore. A pilgrimage spot for every surfer." },

  { name:"Malibu — Second Point", lat:34.035, lng:-118.777, region:"Malibu, CA",
    breakType:"point", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:3, idealSizeMax:7,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Less-known section of Malibu behind First Point. More powerful and faster than the main break. Can link with First Point on big S swell. Slightly less crowded than the famous First Point." },

  { name:"Malibu — Third Point", lat:34.034, lng:-118.775, region:"Malibu, CA",
    breakType:"point", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:3, idealSizeMax:7,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"The inside section nearest the parking lot. First spot to break on smaller swells. Short, fun right-handers. World Surfing Reserve area. All three Malibu points can link on a perfect S swell day." },

  { name:"Las Tunas Beach", lat:34.025, lng:-118.742, region:"Malibu, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Reef break between Malibu and Topanga. Rocky bottom creates consistent peaks on SW swell. Limited parking on PCH. Less crowded than Malibu or Topanga. Fun mid-tide option." },

  { name:"Topanga Beach", lat:34.033, lng:-118.600, region:"LA County, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW/S", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Consistent beach break at the mouth of Topanga Canyon. Jetty creates fun peaks. Both S and NW swell works here. Popular with the local Topanga crowd. Good fallback when Malibu is blown out." },

  { name:"Sunset Beach (Pacific Palisades)", lat:34.049, lng:-118.533, region:"Pacific Palisades, CA",
    breakType:"point", skill:"beginner",
    idealSwellDir:202, idealSwellDirLabel:"SSW/S", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Long, mellow right-hand point break at the base of Sunset Blvd. Easy right-hand rollers on S swell. Least crowded point break in LA. Beginner and longboarder friendly. Free parking along PCH." },

  { name:"Ocean Park Beach (Santa Monica)", lat:34.009, lng:-118.499, region:"Santa Monica, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW/S", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Beach break at the south end of Santa Monica near Main Street. Fun peaks on most swell directions. Often crowded but generally friendly and welcoming. Good beginner option with many surf schools nearby." },

  { name:"Santa Monica Pier", lat:34.009, lng:-118.499, region:"Santa Monica, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW/S", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Beach break around the famous pier. Small, forgiving waves perfect for beginners. Picks up S swell in summer. More of a crowd-watching spot than a serious surf destination — but fun on smaller days." },

  { name:"Venice Beach", lat:33.992, lng:-118.473, region:"Venice, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW/S", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Fun and quirky beach break. Mostly mellow waves. Cultural epicenter of SoCal beach life — boardwalk, muscle beach, food. Good beginner spot with surf schools and rentals everywhere nearby." },

  { name:"El Segundo Beach", lat:33.919, lng:-118.429, region:"El Segundo, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Beach break at the south end of Santa Monica Bay near the refinery. Works on WSW swell. Less crowded than El Porto to the south. Can have quality peaks when the sandbars line up. Worth checking." },

  { name:"El Porto", lat:33.902, lng:-118.419, region:"Manhattan Beach, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"WSW/W", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Most consistent beach break in the South Bay. Works on both NW and SW swells. Often the best peaks in the area — consistently 1-2ft bigger than neighboring spots in winter. Early morning glass before the sea breeze." },

  { name:"Manhattan Beach Pier", lat:33.886, lng:-118.413, region:"Manhattan Beach, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:2, idealSizeMax:5,
    idealPeriodMin:9, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Classic SoCal beach break around the Roundhouse Aquarium pier. Both sides produce different waves. Good on SW swell. Can get hollow on bigger days. The pier creates interesting wave effects." },

  { name:"Hermosa Beach", lat:33.862, lng:-118.398, region:"Hermosa Beach, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"E (offshore)",
    notes:"Wide sandy beach break. Great for beginners and longboarders. The Strand boardwalk runs parallel — fun surf culture scene. SW swell is most direct. Morning glass can be surprisingly good." },

  { name:"Redondo Beach Pier", lat:33.845, lng:-118.394, region:"Redondo Beach, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"E (offshore)",
    notes:"South Bay beach break near the busy pier and marina. Sheltered by King Harbor breakwater. Small, mellow waves most of the year. Consistent but rarely exceptional. Good beginner option." },

  { name:"Palos Verdes — Haggerty's", lat:33.780, lng:-118.416, region:"Palos Verdes, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:292, idealSwellDirLabel:"NW/W", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E/SE (offshore)",
    notes:"One of the first spots to feel NW winter swells. Lower Haggerty's is a slow left drop into a mushy left-hander; the main peak gets busier with drops ins. Best November through April on NW groundswell." },

  { name:"Palos Verdes — Middles (PV Cove)", lat:33.762, lng:-118.413, region:"Palos Verdes, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/WSW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:12, idealWindLabel:"E/SE (offshore)",
    notes:"Premier longboarder wave in PV. Light and cruisy — can go both left and right with excellent ride length. Excellent water quality thanks to preserved kelp forests. Resident seals are common companions in the lineup." },

  { name:"Palos Verdes — Lunada Bay", lat:33.762, lng:-118.421, region:"Palos Verdes, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:4, idealSizeMax:12,
    idealPeriodMin:13, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Powerful reef break in a dramatic cove below the PV cliffs. High-quality right-hander that focuses W swell into the bay. Notorious for extremely aggressive localism — the 'Lunada Bay Boys' have historically intimidated visitors." },

  { name:"Palos Verdes — Portuguese Bend", lat:33.731, lng:-118.395, region:"Palos Verdes, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:247, idealSwellDirLabel:"SW/W", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Rocky reef break along the rugged PV coastline. Multiple peaks over kelp-covered rocks. Needs SW or W swell to reach these south-facing reefs. Beautiful setting with rocks and kelp as constant hazards." },

  { name:"Cabrillo Beach (San Pedro)", lat:33.706, lng:-118.283, region:"San Pedro, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:157, idealSwellDirLabel:"SE/S", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NW (offshore)",
    notes:"Beach break at the tip of the Palos Verdes peninsula. South-facing beach picks up SE and S swell. Protected from NW wind. Rarely surfed but can offer fun waves on the right day. Aquarium next door." },

  // ============================================================
  // ORANGE COUNTY
  // ============================================================

  { name:"Seal Beach Pier", lat:33.739, lng:-118.106, region:"Seal Beach, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Consistent beach break in a quiet beach city. Both sides of the pier pick up S and SW swell. Friendly local vibe — less intense than nearby Huntington Beach. Good beginner spot with easy parking." },

  { name:"Huntington Beach — Bolsa Chica", lat:33.709, lng:-118.052, region:"Huntington Beach, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Wide state beach north of the HB pier. Multiple peaks along a long shoreline. Less crowded than the pier area. Great for beginners who want space to learn. Campground access right on the beach." },

  { name:"Huntington Beach Pier — North Side", lat:33.660, lng:-118.000, region:"Huntington Beach, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW/S", idealSizeMin:2, idealSizeMax:7,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"North side of Surf City USA's pier. Consistent peaks responding to S and SW swell. Home of the US Open of Surfing. Best sandbar formation drifts around — check both sides before paddling out." },

  { name:"Huntington Beach Pier — South Side", lat:33.658, lng:-117.999, region:"Huntington Beach, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:2, idealSizeMax:7,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"South side can get hollower and more powerful than the north. WSW swell wraps more directly into this side. Extremely crowded on weekends — early morning is the move." },

  { name:"The Wedge", lat:33.594, lng:-117.882, region:"Newport Beach, CA",
    breakType:"beach", skill:"expert",
    idealSwellDir:157, idealSwellDirLabel:"SSE/SE", idealSizeMin:5, idealSizeMax:25,
    idealPeriodMin:14, windTolerance:10, idealWindLabel:"W (offshore)",
    notes:"One of the world's most dangerous shore breaks. SE swell reflects off the Newport jetty producing massive wedging waves breaking directly on dry sand. Bodyboarders and bodysurfers dominate. Expert/freak of nature only." },

  { name:"Newport Beach Pier", lat:33.598, lng:-117.882, region:"Newport Beach, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW/S", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:9, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Fun beach break on both sides of the Newport pier. SW and S swell from summer tropical systems is prime. The pier creates interesting sand formations. 54th/56th Street peaks nearby are local favorites." },

  { name:"Newport Jetties", lat:33.603, lng:-117.880, region:"Newport Beach, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:202, idealSwellDirLabel:"SSW/S", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:9, windTolerance:12, idealWindLabel:"W (offshore)",
    notes:"Harbor jetties create consistent peaks on either side of the channel entrance. S swell from tropical storms in summer is prime. Both sides of the jetty offer slightly different waves." },

  { name:"Laguna Beach — Brooks Street", lat:33.541, lng:-117.784, region:"Laguna Beach, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Laguna's most popular reef break. A-frame peak with lefts and rights. Picks up SW and S swell well. Rocky entry and exit — booties recommended. Consistent and reliable." },

  { name:"Laguna Beach — Thalia Street", lat:33.535, lng:-117.782, region:"Laguna Beach, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Quality Laguna reef. Short paddle from the street. Right and left peaks over reef. SW swell is best. Part of the collection of reef breaks that make Laguna one of OC's most interesting surf zones." },

  { name:"Salt Creek", lat:33.471, lng:-117.730, region:"Dana Point, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:11, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"The Ritz Carlton overlooks this quality reef break. Long right-hander over reef. Gets hollow on bigger SW swell. One of Orange County's better waves. Accessible from the upper bluffs." },

  { name:"Doheny State Beach", lat:33.461, lng:-117.674, region:"Dana Point, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:202, idealSwellDirLabel:"SSW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Protected beach break inside Dana Point harbor. Very mellow and consistent — ideal for complete beginners. Once home to Killer Dana, one of California's best waves before the harbor was built." },

  { name:"San Onofre State Beach — Old Man's", lat:33.370, lng:-117.558, region:"San Clemente, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:9, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Home of classic California longboard culture. Gentle, rolling waves over a sandy bottom. State beach with camping. Nuclear plant provides a unique backdrop. The most laid-back surf scene in California." },

  { name:"Trestles — Uppers", lat:33.390, lng:-117.592, region:"San Clemente, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"The outer break at Trestles. More accessible than Lowers and works on a wider range of swell. Left and right peaks over reef. Popular with intermediate surfers who find Lowers too competitive." },

  { name:"Trestles — Middles", lat:33.388, lng:-117.590, region:"San Clemente, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:11, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Middle section between Lowers and Uppers. Slightly more accessible vibe than Lowers. Both left and right peaks. A good stepping-stone for surfers working up to the intensity of Lowers." },

  { name:"Trestles — Lowers", lat:33.387, lng:-117.589, region:"San Clemente, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:13, windTolerance:8, idealWindLabel:"NE (offshore)",
    notes:"World-class performance wave and 2028 Olympic venue. Perfect lefts and rights over cobble reef. Works best on SW swell with NE offshore wind. Long hike from parking. Pros in the water regularly." },

  { name:"Cotton's Point / Church", lat:33.398, lng:-117.601, region:"San Clemente, CA",
    breakType:"point", skill:"advanced",
    idealSwellDir:292, idealSwellDirLabel:"NW", idealSizeMin:4, idealSizeMax:10,
    idealPeriodMin:13, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Private point break adjacent to Nixon's former Western White House. Rarely surfed due to access restrictions. Long, winding rights on NW swell. Fewer crowds than Trestles." },

  { name:"San Clemente Pier — T-Street", lat:33.421, lng:-117.617, region:"San Clemente, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"South San Clemente beach break near the pier. Multiple peaks responding to SW and S swell. Fun and consistent. The pier area creates slightly better organization. Passionate local crew." },

  // ============================================================
  // SAN DIEGO COUNTY — NORTH COUNTY
  // ============================================================

  { name:"Oceanside Harbor Jetty", lat:33.215, lng:-117.398, region:"Oceanside, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Harbor entrance creates consistent peaks on both sides. South jetty typically has the better waves. Less crowded than the pier area. Sand shifts regularly around the jetty creating varying conditions." },

  { name:"Oceanside Pier", lat:33.195, lng:-117.381, region:"Oceanside, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:9, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Consistent beach break swell magnet. Both sides of the pier work. Can get hollow on the right sandbar. WSW swell from Pacific storms produces best conditions. Super Girl Surf Pro held here annually." },

  { name:"Buccaneer/Tyson Street", lat:33.180, lng:-117.367, region:"Oceanside, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"South Oceanside beach breaks. Multiple peaks along an open beach. Often less crowded than the pier. Picks up both NW and SW swell. Good fallback when the main pier break is overwhelmed." },

  { name:"Carlsbad State Beach", lat:33.137, lng:-117.340, region:"Carlsbad, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Sandy beach break stretching through Carlsbad. All-sandy bottom makes it forgiving. Works on a wide range of swell directions. Popular with families. RV campground on the bluffs above." },

  { name:"Terramar", lat:33.120, lng:-117.316, region:"Carlsbad, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Reef break south of Carlsbad State Beach. More consistent than nearby beaches due to reef. Works on SW and NW swell. Less known than Swami's but produces quality waves on the right day." },

  { name:"Warm Water Jetty", lat:33.107, lng:-117.307, region:"Carlsbad, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Break at the power plant warm water outlet. Warmer water temperature near the outlet is a bonus in winter. Jetty creates consistent peaks. A solid alternative when Swami's is crowded." },

  { name:"Swami's", lat:33.037, lng:-117.293, region:"Encinitas, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"NW/W", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"E (offshore)",
    notes:"Named for the Self-Realization Fellowship temple on the bluff above. Consistent reef break with a well-defined peak, often bigger than neighboring spots. Left and right peaks over reef. One of North County's crown jewels." },

  { name:"Moonlight Beach", lat:33.049, lng:-117.292, region:"Encinitas, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Encinitas's main beach with excellent facilities. Sandy bottom and gentle beach break waves. Great for beginners. Beach volleyball nets add to the scene. Wide beach means room for everyone." },

  { name:"D Street / Stone Steps", lat:33.030, lng:-117.291, region:"Encinitas, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"NW/W", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"E (offshore)",
    notes:"Reef and beach break south of Moonlight. Stone staircase access. Several reef peaks to choose from. Picks up NW swell directly. Less crowded than Swami's but often overlooked." },

  { name:"Cardiff Reef", lat:33.019, lng:-117.280, region:"Cardiff-by-the-Sea, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"E (offshore)",
    notes:"San Elijo State Beach reef break. Quality left and right peaks. Picks up NW swell very well. Where pros including Rob Machado and Taylor Knox honed their craft. North section called 'Pipes'." },

  { name:"Seaside Reef", lat:33.012, lng:-117.278, region:"Cardiff-by-the-Sea, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:11, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Fast, high-performance reef at the south end of Cardiff. Best on SW swell — can get hollow and rippable. Taylor Knox and Rob Machado's home break. Ideal for aerial surfing when it's firing." },

  { name:"Tabletops", lat:33.011, lng:-117.277, region:"Cardiff-by-the-Sea, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:225, idealSwellDirLabel:"SW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Reef break south of Seaside. Several reef peaks offer variety. SW swell produces the best waves. Adjacent to the San Elijo lagoon mouth. Fun intermediate break with quality waves." },

  { name:"Del Mar 15th Street", lat:32.959, lng:-117.267, region:"Del Mar, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Del Mar's main surf break. Good exposure to all swell directions with a mix of sand and patchy reef. Reliable and consistent. Works on both NW and SW swell." },

  { name:"Del Mar Rivermouth", lat:32.963, lng:-117.268, region:"Del Mar, CA",
    breakType:"river mouth", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:7,
    idealPeriodMin:11, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"San Dieguito River mouth creates sandbars that produce excellent peaks after rainfall. Sandbar quality varies significantly. When it's good, can rival Trestles in quality. Check after significant rainfall for best banks." },

  { name:"Torrey Pines State Beach", lat:32.921, lng:-117.255, region:"San Diego, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:11, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Long stretch of beach below the scenic Torrey Pines cliffs. Multiple peaks with varying quality. More NW exposed than spots further south. Access via 1.5-mile beach walk or from Black's to the south." },

  { name:"Black's Beach", lat:32.878, lng:-117.254, region:"La Jolla, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:12,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"San Diego's best beach break. Submarine canyon offshore funnels swell creating powerful A-frame peaks. Long hike down the cliff keeps crowds manageable. Clothing-optional beach. Can hold surf to 12ft." },

  // ============================================================
  // SAN DIEGO — LA JOLLA
  // ============================================================

  { name:"Scripps Pier", lat:32.867, lng:-117.254, region:"La Jolla, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Beach break around the UCSD research pier. South of the pier typically has the best waves. Rights along the pier pylons on the right swell. Picks up NW swell well." },

  { name:"La Jolla Shores", lat:32.858, lng:-117.254, region:"La Jolla, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW/S", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"San Diego's premier beginner beach. Sandy bottom, gentle waves, full amenities, lifeguards, surf schools. All surf schools operate here. Most crowded beginner spot in the county." },

  { name:"Hospitals", lat:32.845, lng:-117.280, region:"La Jolla, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Northernmost of La Jolla's reef breaks near La Jolla Cove. Exposed rock reef with lefts and rights. Access via the blufftop path. Localized and fickle — only fires on the right swell and tide." },

  { name:"Windansea Beach", lat:32.831, lng:-117.280, region:"La Jolla, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"NW/SW", idealSizeMin:2, idealSizeMax:8,
    idealPeriodMin:11, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"San Diego's most famous and most consistent reef break. A-frame peak over rock reef. Home of the Windansea Surf Club founded by Skip Frye and Mike Hynson. Works on almost any swell and tide. Significant localism." },

  { name:"Big Rock", lat:32.822, lng:-117.281, region:"La Jolla, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:4, idealSizeMax:10,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Heavy right-hander south of Windansea over shallow rock reef. Requires significant NW groundswell to work. Fast, powerful wave with hollow sections. Expert level on bigger days." },

  { name:"Bird Rock", lat:32.804, lng:-117.279, region:"La Jolla, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:3, idealSizeMax:8,
    idealPeriodMin:12, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Right-hand point that can produce long, winding waves on the right swell. Fickle but spectacular when it fires. Difficult access via rocky tidepools. Highly localized La Jolla reef community." },

  { name:"Tourmaline Surfing Park", lat:32.808, lng:-117.271, region:"Pacific Beach, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"SW/W", idealSizeMin:2, idealSizeMax:5,
    idealPeriodMin:10, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"San Diego's dedicated longboard paradise. Slow, mellow right-hander that peels into the cove. Can link with PB Point on big days. City park with parking and facilities. Most welcoming spot in San Diego." },

  // ============================================================
  // SAN DIEGO — PACIFIC / MISSION / OCEAN BEACH
  // ============================================================

  { name:"Pacific Beach Point (PB Point)", lat:32.800, lng:-117.263, region:"Pacific Beach, CA",
    breakType:"reef", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"SW", idealSizeMin:2, idealSizeMax:5,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Right-hand reef point at the south end of Pacific Beach. Long paddle from Tourmaline or steep stairs from Neptune Place. Can produce a long, winding right on SW swell." },

  { name:"Pacific Beach (Crystal Pier)", lat:32.791, lng:-117.256, region:"Pacific Beach, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Fun beach break around the iconic Crystal Pier. Both sides offer slightly different waves. Consistent and accessible. Great for beginners and intermediate surfers." },

  { name:"South Mission Beach Jetty", lat:32.762, lng:-117.228, region:"Mission Beach, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"WSW", idealSizeMin:2, idealSizeMax:5,
    idealPeriodMin:9, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Best wave along the Mission Beach stretch. Jetty creates consistent peaks with some organization. Works on WSW and NW swell. More reliable than the rest of Mission Beach." },

  { name:"Ocean Beach Pier", lat:32.745, lng:-117.253, region:"Ocean Beach, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:270, idealSwellDirLabel:"NW/W", idealSizeMin:2, idealSizeMax:7,
    idealPeriodMin:10, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"OB's most consistent break. The pier creates interesting sand formations and wave effects. South side tends to be faster and hollower. NW and W swell is most direct. Territorial but passionate local crew." },

  { name:"Sunset Cliffs — Osprey Street", lat:32.721, lng:-117.256, region:"Ocean Beach, CA",
    breakType:"reef", skill:"advanced",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:4, idealSizeMax:10,
    idealPeriodMin:13, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Crown jewel of the Sunset Cliffs reef system. Access down cliff staircase. Powerful left and right peaks over deep reef. W/NW groundswell produces hollow barrels. Advanced surfers only." },

  { name:"Sunset Cliffs — Ab's", lat:32.717, lng:-117.258, region:"Ocean Beach, CA",
    breakType:"reef", skill:"expert",
    idealSwellDir:270, idealSwellDirLabel:"W/NW", idealSizeMin:5, idealSizeMax:12,
    idealPeriodMin:14, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"Heavy slab reef break south of Osprey. Big, square barrels over shallow reef. Only accessible at low tide. Expert-only wave that needs significant W/NW groundswell. Rocks directly behind the takeoff zone." },

  // ============================================================
  // SAN DIEGO — SOUTH COUNTY
  // ============================================================

  { name:"Coronado Beach", lat:32.685, lng:-117.183, region:"Coronado, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:225, idealSwellDirLabel:"SW/S", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Wide sandy beach on Coronado Island in front of the Hotel del Coronado. Gentle beach break best on small SW swell. Very beginner-friendly. Scenic and well-maintained." },

  { name:"Silver Strand State Beach (Coronado)", lat:32.632, lng:-117.138, region:"Coronado, CA",
    breakType:"beach", skill:"beginner",
    idealSwellDir:202, idealSwellDirLabel:"SSW/S", idealSizeMin:1, idealSizeMax:4,
    idealPeriodMin:8, windTolerance:15, idealWindLabel:"NE (offshore)",
    notes:"Silver Strand connects Coronado Island to the mainland. Long sandy beach picks up S and SSW swell wrapping around Point Loma. Very consistent on small days. Campground access." },

  { name:"Imperial Beach Pier", lat:32.580, lng:-117.133, region:"Imperial Beach, CA",
    breakType:"beach", skill:"intermediate",
    idealSwellDir:247, idealSwellDirLabel:"SW/WSW", idealSizeMin:2, idealSizeMax:6,
    idealPeriodMin:9, windTolerance:12, idealWindLabel:"NE (offshore)",
    notes:"Southernmost surf city in the continental US. Consistent beach break with good swell exposure. SW and WSW swell is most direct. Host of the annual Imperial Beach Surf Contest. Less crowded than more northern spots." },

  { name:"Tijuana Sloughs", lat:32.560, lng:-117.124, region:"Imperial Beach, CA",
    breakType:"beach", skill:"advanced",
    idealSwellDir:247, idealSwellDirLabel:"SW/WSW", idealSizeMin:4, idealSizeMax:12,
    idealPeriodMin:13, windTolerance:10, idealWindLabel:"NE (offshore)",
    notes:"California's southernmost surf break at the Mexican border. Powerful beach break handling larger SW swell. Tijuana River mouth creates sandbars that can be exceptional after floods. Check water quality before surfing." },

];
