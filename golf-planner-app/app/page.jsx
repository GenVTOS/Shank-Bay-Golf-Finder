'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Clock, DollarSign, ChevronDown, ChevronUp, ArrowUpDown, ExternalLink, Coffee, Bookmark, BookmarkCheck } from 'lucide-react';

const DESTINATIONS = [
  {
    id: 1,
    name: "Sanctuary Cove – The Palms & Links",
    region: "Gold Coast (Hope Island)",
    tagline: "Premium resort, two championship courses on Stay & Play package",
    driveMinutes: 55,
    distanceKm: 70,
    courses: [
      { name: "The Palms (Sanctuary Cove)", detail: "$120 inc. cart, weekday – Ross Watson redesign, Top-100 calibre" },
      { name: "Links Golf & Wellbeing (Hope Island)", detail: "$125 inc. cart – Peter Thomson links design, 117 pot bunkers" },
      { name: "The Pines (optional upgrade)", detail: "$255-295 inc. cart – Australia's only Arnold Palmer signature design, members-only/IC guests only" },
    ],
    accom: "InterContinental Sanctuary Cove Resort, twin-share rooms, on-resort. Sanctuary Cove Country Club Stay & Play 3 Nights/3 Rounds package quoted from $619/night for 2 = ~$310 pp/night.",
    saturday9: "Stop at Coolangatta-Tweed Heads or Lakelands for 9 holes en route (~$45-55 inc. cart pp).",
    breakfast: true,
    breakfastNote: "Included in the Stay & Play 3 Night package",
    costLow: 1380, costHigh: 1700,
    verdict: "BLOWS THE BUDGET — but if anyone's keen for a one-off blowout. The Stay 3/Play 3 package automatically includes Palms/Links/Pines. Pricier than $1200 unless you negotiate group rates.",
    website: "sanctuarycove.intercontinental.com",
    websiteUrl: "https://www.sanctuarycove.intercontinental.com",
    tier: "premium",
  },
  {
    id: 2,
    name: "RACV Royal Pines Resort",
    region: "Gold Coast (Benowa)",
    tagline: "27 holes on-site, Aus PGA host – the classic blokes' trip",
    driveMinutes: 70,
    distanceKm: 80,
    courses: [
      { name: "Royal Pines – Green/Gold/Blue 27 holes", detail: "Approx $89-110 pp inc. cart for guests – host of Australian PGA Championship, Graham Marsh redesign" },
      { name: "Same course rotated for 3x 18", detail: "Play different combinations of the three nines for variety" },
    ],
    accom: "RACV Royal Pines, Superior King or Twin Rooms (sleeps 4 with 2 doubles). B&B package from ~$330/night/room (2 pax) = ~$165 pp/night. Stay 3+ nights gets up to 40% off rates plus complimentary breakfast.",
    saturday9: "Detour through Mt Tamborine for 9 at Tamborine Mountain GC (~$30) or stop at Lakelands ($55).",
    breakfast: true,
    breakfastNote: "Buffet breakfast at Kalinda included in B&B rate",
    costLow: 950, costHigh: 1200,
    verdict: "STRONG BUDGET FIT. Single venue, breakfast on-site, full bar/restaurant scene, championship course. Probably the best 'classic resort' option that fits the budget.",
    website: "racv.com.au/royalpines",
    websiteUrl: "https://www.racv.com.au/travel-experiences/resorts/royal-pines-gold-coast.html",
    tier: "core",
  },
  {
    id: 3,
    name: "Hope Island Resort – Links Hope Island",
    region: "Gold Coast (Hope Island)",
    tagline: "Top-10 resort course, cheaper way to play Hope Island",
    driveMinutes: 50,
    distanceKm: 65,
    courses: [
      { name: "Links Hope Island (Peter Thomson)", detail: "$125 pp inc. cart – ranked top-10 resort course, signature 17th over water 230m" },
      { name: "Sanctuary Cove Palms (option)", detail: "$120 inc. cart for resort guests" },
    ],
    accom: "Hope Harbour Hotel or local Hope Island apartments. Hope Harbour ~$150-200/room/night (2 pax) = ~$80-100 pp/night. Alternatively Airbnb villas in Hope Island/Coomera for groups (~$100-150 pp/night for 11 in a 5-6 bedroom villa).",
    saturday9: "9 at Lakelands ($55 inc. cart) or Coolangatta-Tweed on the way.",
    breakfast: false,
    breakfastNote: "Not included – Hope Island has good cafes nearby",
    costLow: 850, costHigh: 1100,
    verdict: "GREAT VALUE. Lets you play a top course without resort markup. Group Airbnbs in Hope Island make this even cheaper.",
    website: "linkshopeisland.com.au",
    websiteUrl: "https://www.linkshopeisland.com.au",
    tier: "core",
  },
  {
    id: 4,
    name: "Lakelands + Glades + Royal Pines",
    region: "Gold Coast (Surfers/Broadbeach)",
    tagline: "Three different top-ranked courses, classic Gold Coast hotel base",
    driveMinutes: 75,
    distanceKm: 80,
    courses: [
      { name: "Lakelands GC", detail: "$95-120 inc. cart – Jack Nicklaus Signature, Top-100 public access" },
      { name: "The Glades", detail: "$95-115 inc. cart – Greg Norman design, bentgrass greens" },
      { name: "Royal Pines (Blue/Green)", detail: "$89-110 inc. cart – PGA host" },
    ],
    accom: "Mantra Sun City / Mantra on View / similar Surfers Paradise apartments. Group rates around $200-280/2-bed apartment/night; 11 guys across 3-4 apartments = ~$70-100 pp/night.",
    saturday9: "9 holes at Coolangatta-Tweed River course ($55 inc cart) on the drive down.",
    breakfast: false,
    breakfastNote: "Self-serve in apartments or local cafes",
    costLow: 950, costHigh: 1200,
    verdict: "VARIETY CHAMPION. Different course every day, plenty of nightlife, good price. The trade-off is you're driving 15-25 min to each course.",
    website: "lakelandsgolfclub.com.au",
    websiteUrl: "https://www.lakelandsgolfclub.com.au",
    tier: "core",
  },
  {
    id: 5,
    name: "Coolangatta-Tweed Heads – Sebel Twin Towns",
    region: "Northern NSW (Tweed)",
    tagline: "36 holes, on-site casino, walk-everywhere",
    driveMinutes: 90,
    distanceKm: 100,
    courses: [
      { name: "Coolangatta & Tweed Heads – River Course", detail: "$70-90 inc. cart – top-100 in Australia, on the Tweed River" },
      { name: "Coolangatta & Tweed Heads – West Course", detail: "$70-90 inc. cart – similar pedigree, slightly tougher" },
      { name: "Same River course again or Kingscliff", detail: "Mix and match for variety" },
    ],
    accom: "The Sebel Twin Towns Coolangatta – directly connected to Twin Towns Services Club casino. Twin/King rooms ~$210-260/room/night (2 pax) = ~$110-130 pp/night. Walking distance to beach, food, bars.",
    saturday9: "9 holes at Tweed Heads on arrival, OR stop at Coomera Lakes / Lakelands on the drive down.",
    breakfast: false,
    breakfastNote: "Available next door at Twin Towns club, not included by default",
    costLow: 850, costHigh: 1100,
    verdict: "BUDGET-FRIENDLY + FUN. 36 holes at one club is hard to beat for a four-day trip. Twin Towns' bars, restaurants, casino mean nights take care of themselves.",
    website: "cooltweedgolf.com.au",
    websiteUrl: "https://www.cooltweedgolf.com.au",
    tier: "core",
  },
  {
    id: 6,
    name: "Kingscliff – Peppers Salt + Cool Tweed",
    region: "Northern NSW (Salt Village)",
    tagline: "Beach village, top resort, championship golf 10 min up the road",
    driveMinutes: 100,
    distanceKm: 110,
    courses: [
      { name: "Coolangatta & Tweed Heads – River", detail: "$70-90 inc. cart – 15 min north" },
      { name: "Coolangatta & Tweed Heads – West", detail: "$70-90 inc. cart" },
      { name: "Kingscliff GC or Murwillumbah GC", detail: "$45-60 – cheaper, casual round" },
    ],
    accom: "Peppers Salt Resort & Spa or Mantra on Salt Beach – 1, 2, 3 bedroom apartments. 3-bed apartments at Peppers can sleep 6+ and share works well. Estimate ~$250-340/apt/night for 3-bed; with 11 guys across 3-4 apartments works out ~$90-130 pp/night.",
    saturday9: "9 at Coolangatta Tweed Heads on the drive in.",
    breakfast: false,
    breakfastNote: "Season Restaurant on-site (paid) or walking distance to Salt Village cafes",
    costLow: 950, costHigh: 1200,
    verdict: "BEACH VIBE WITHIN BUDGET. Salt Village is easy to walk between bars/restaurants/beach. Good middle-ground for blokes who want golf + downtime.",
    website: "peppers.com.au/salt",
    websiteUrl: "https://www.peppers.com.au/salt",
    tier: "core",
  },
  {
    id: 7,
    name: "Pelican Waters Resort + GC",
    region: "Sunshine Coast (Caloundra)",
    tagline: "On-site Greg Norman course, freshly reopened in 2023",
    driveMinutes: 90,
    distanceKm: 100,
    courses: [
      { name: "Pelican Waters GC (Greg Norman)", detail: "$95-130 inc. cart – fully reconfigured 2023, par 71, 6000m" },
      { name: "Same course Mon & Tue (different tees)", detail: "Plus optional shorter hit on Norman's 6-hole course" },
    ],
    accom: "Pelican Waters Resort apartments – 1, 2, 3 bedroom configurations, walk to clubhouse. 2-bed apartments around $230-320/night sleep 4 (queen + 2 doubles). 11 guys across 3 apartments = ~$80-110 pp/night.",
    saturday9: "9 at Caloundra GC ($35) or Beerwah GC en route.",
    breakfast: false,
    breakfastNote: "Waterlilies Restaurant on-site (paid) or local Caloundra cafes",
    costLow: 800, costHigh: 1050,
    verdict: "GOOD VALUE. On-resort, fresh course, easy to walk between rooms and clubhouse. Same course three rounds may bore some — mitigate by playing different tees and a 9-hole detour.",
    website: "pelicanwatersresort.com.au",
    websiteUrl: "https://pelicanwatersresort.com.au",
    tier: "core",
  },
  {
    id: 8,
    name: "Maroochy River + Novotel Twin Waters",
    region: "Sunshine Coast (Bli Bli/Twin Waters)",
    tagline: "Top-100 course + lagoon resort, only 5 min apart",
    driveMinutes: 100,
    distanceKm: 105,
    courses: [
      { name: "Maroochy River GC (Graham Marsh)", detail: "$65 walking + $40 cart = $105 pp – Top-100 course, links-style, Mt Coolum backdrop" },
      { name: "Maroochy River again or Headland GC", detail: "Headland $70-90 inc. cart" },
      { name: "Caloundra GC", detail: "$40-50 inc. cart" },
    ],
    accom: "Novotel Sunshine Coast Resort at Twin Waters – on a private lagoon, beach access, multiple pools. Standard rooms ~$240-320/night for 2 (= ~$120-160 pp/night). Cheaper 1-2 bedroom suites at The Sebel Twin Waters next door.",
    saturday9: "9 at Beerwah GC or Caloundra on the drive up.",
    breakfast: false,
    breakfastNote: "Buffet breakfast available (paid) at Novotel or walk to Twin Waters North Shore Shopping",
    costLow: 950, costHigh: 1250,
    verdict: "VERY POPULAR. Twin Waters is genuinely beautiful — lagoon, pools, beach. Maroochy River is a top course. Slight drive between resort and golf (5 km). Mid-budget.",
    website: "novotelsunshinecoast.com.au",
    websiteUrl: "https://www.novotelsunshinecoast.com.au",
    tier: "core",
  },
  {
    id: 9,
    name: "Pacific Harbour – Bribie Island",
    region: "Bribie Island (Banksia Beach)",
    tagline: "Top-100 island links + on-course apartment retreat",
    driveMinutes: 70,
    distanceKm: 80,
    courses: [
      { name: "Pacific Harbour G&CC (Ross Watson)", detail: "$89 weekday / $99 weekend inc. cart – Top-100 ranked island links, the 7th hole is a homage to TPC Sawgrass" },
      { name: "Bribie Island GC (Woorim)", detail: "$50-65 inc. cart – on Fabulous Fairways doorstep" },
      { name: "Caboolture GC", detail: "$40-55 inc. cart – option on the way home" },
    ],
    accom: "Fabulous Fairways Golf & Beach Retreat at Bribie Island GC, Woorim – 2-bed and 3-bed self-contained apartments. ~$220-280/2-bed/night, $260-340/3-bed/night. 11 guys across 3 apartments = ~$80-110 pp/night.",
    saturday9: "9 at Caboolture GC on the way over (~$40 with cart).",
    breakfast: false,
    breakfastNote: "Self-catering in apartments – BYO or get supplies in Caboolture",
    costLow: 750, costHigh: 1000,
    verdict: "BUDGET-FRIENDLY + UNDERRATED. Closest of all options. Pacific Harbour is genuinely a top-tier course and Fabulous Fairways means you can stagger out of the apartment into a round.",
    website: "pacificharbourgolf.com.au",
    websiteUrl: "https://www.pacificharbourgolf.com.au",
    tier: "core",
  },
  {
    id: 10,
    name: "Toowoomba – City Golf Club + Motel",
    region: "Darling Downs (Toowoomba)",
    tagline: "Cheapest premium option in the lot — and the QLD PGA host",
    driveMinutes: 90,
    distanceKm: 130,
    courses: [
      { name: "City Golf Club (Ross Watson redesign)", detail: "$30-45 walking, $75-90 with cart – host of QLD PGA Championship" },
      { name: "Toowoomba GC (separate club)", detail: "$40-55 inc. cart – 27 holes parkland" },
      { name: "Highfields GC or Gowrie Junction GC", detail: "$30-45 with cart" },
    ],
    accom: "City Golf Club Motel – 600m from clubhouse with free shuttle. Stay & Play packages from $125/night twin share = ~$62.50 pp/night. Cheapest of any option.",
    saturday9: "Stop at Lake Apex Lions Park GC (Gatton) or Laidley GC on the way up the range (~$25).",
    breakfast: false,
    breakfastNote: "Café 19 at the club, plus Toowoomba CBD options 5 min away. Some packages bundle breakfast.",
    costLow: 600, costHigh: 800,
    verdict: "BIGGEST BUDGET WIN. You'd come in roughly half what you'd pay on the Coast. Toowoomba is genuinely cooler (helpful late March) and the courses are well-regarded. Less 'holiday vibe' though.",
    website: "citygolf.com.au",
    websiteUrl: "https://citygolf.com.au",
    tier: "value",
  },
  {
    id: 11,
    name: "Stanthorpe / Granite Belt",
    region: "Granite Belt (3 hr SW of Brisbane)",
    tagline: "Wine country + cool weather + casual golf",
    driveMinutes: 180,
    distanceKm: 220,
    courses: [
      { name: "Stanthorpe GC", detail: "$30-40 walking, $55-65 with cart – par 72 at altitude, kikuyu/bentgrass" },
      { name: "Warwick GC (on the way up/back)", detail: "$30-40 walking, $55-65 with cart" },
      { name: "Killarney GC", detail: "$25-35 – very casual, scenic hills" },
    ],
    accom: "Granite Belt cottages, lodges, Queenslanders (Banjo's Retreat, The Sanctuary Stanthorpe, Briar Rose, Stanthorpe Country Resort). Group house/lodge sleeping 10-12 around $700-1000/night. Per pp ~$70-100/night.",
    saturday9: "9 at Warwick GC or Goombungee on the drive down.",
    breakfast: false,
    breakfastNote: "Self-catering in the lodges – or breakfast at one of the local wineries",
    costLow: 700, costHigh: 900,
    verdict: "DIFFERENT TRIP ENTIRELY. Cooler, quieter, vineyards instead of beach bars. Golf is good not great. Stretches the 3-hour drive limit but worth flagging if anyone wants something different.",
    website: "southerndownsandgranitebelt.com.au",
    websiteUrl: "https://southerndownsandgranitebelt.com.au",
    tier: "value",
  },
  {
    id: 12,
    name: "Brookwater + Ipswich/Springfield",
    region: "Ipswich (30 min west of Brisbane)",
    tagline: "Greg Norman course at half the Sanctuary Cove price",
    driveMinutes: 35,
    distanceKm: 35,
    courses: [
      { name: "Brookwater Golf & Country Club", detail: "$95-130 inc. cart – Greg Norman, recently re-renovated, top-50 in Australia" },
      { name: "Brookwater again or Brisbane parkland courses", detail: "Carbrook, Pacific GC: $80-110 inc. cart" },
      { name: "Royal Pines or Lakelands as a day trip", detail: "Adds 45-60 min drive each way" },
    ],
    accom: "No on-course accommodation. Quest at Robelle Domain (Springfield) – serviced apartments ~$190-240/night for 2-bed. Or Mercure Brisbane Carindale or Airbnb villas in Springfield Lakes/Yamanto. ~$80-100 pp/night.",
    saturday9: "9 at Brookwater on arrival, or Lake Apex Lions Park on the highway.",
    breakfast: false,
    breakfastNote: "Boulevard Restaurant at Brookwater, plus Springfield Central cafes",
    costLow: 850, costHigh: 1100,
    verdict: "MINIMAL DRIVE. If the group wants to maximise golf and minimise travel time, Brookwater plus a couple of Brisbane parkland courses works. Less of a 'holiday' though — you're 30 min from home.",
    website: "brookwater.com.au",
    websiteUrl: "https://brookwater.com.au",
    tier: "core",
  },
  {
    id: 13,
    name: "Ballina + Northern Rivers",
    region: "Northern NSW (Ballina/Lennox)",
    tagline: "Riverfront golf, beach village, easy pace",
    driveMinutes: 130,
    distanceKm: 200,
    courses: [
      { name: "Ballina Golf & Sports Club", detail: "$40-55 walking, $70-90 with cart – tree-lined parkland on North Creek, recently refurbished clubhouse" },
      { name: "Casino Golf Club", detail: "$30-45 walking – championship course in beef country, 30 min west" },
      { name: "Teven Valley or Lennox Head GC", detail: "$30-50 walking – casual rounds" },
    ],
    accom: "Ballina Manor Boutique Hotel (12 rooms, breakfast included) ~$220-280/room/night for 2 = ~$120 pp. Or Ballina Beach Holiday Apartments / Ramada Hotel Ballina from ~$160-220/night.",
    saturday9: "9 at Murwillumbah GC or Tweed Heads en route south.",
    breakfast: true,
    breakfastNote: "Included at Ballina Manor; otherwise local Ballina cafes are excellent",
    costLow: 800, costHigh: 1050,
    verdict: "QUIET ALTERNATIVE TO THE GOLD COAST. If the group wants something more chill — fishing village vibes, less traffic, real beach. Golf is solid not spectacular.",
    website: "ballinagolfclub.com.au",
    websiteUrl: "https://www.ballinagolfclub.com.au",
    tier: "value",
  },
  {
    id: 14,
    name: "Hervey Bay + Oaks Resort",
    region: "Fraser Coast (3.5 hr north of Brisbane)",
    tagline: "Stretch destination — beachfront resort, multiple courses",
    driveMinutes: 210,
    distanceKm: 290,
    courses: [
      { name: "Hervey Bay Golf & Country Club", detail: "$45-60 walking, $75-95 with cart – Fraser Coast Legends Classic host" },
      { name: "Fraser Lakes Golf Course", detail: "$30-45 with cart – casual" },
      { name: "Maryborough GC (30 min south)", detail: "$45-60 walking – well-regarded country course" },
    ],
    accom: "Oaks Resort & Spa Hervey Bay – 1, 2, 3 bedroom apartments on the Esplanade, Fraser Island views. ~$240-320/2-bed apartment/night = ~$80-110 pp/night across 3-4 apartments.",
    saturday9: "9 at Caboolture or Gympie on the drive up – breaks up the long haul.",
    breakfast: false,
    breakfastNote: "Apartments are fully self-contained, or beachside cafes nearby",
    costLow: 800, costHigh: 1050,
    verdict: "STRETCHES THE 3-HOUR LIMIT. ~30 min over your drive cap. Compensates with genuinely beautiful scenery and you can fit in a quick afternoon Fraser Island look. Worth flagging for completeness.",
    website: "oakshotels.com/hervey-bay",
    websiteUrl: "https://www.oakshotels.com/en/oaks-resort-and-spa-hervey-bay",
    tier: "stretch",
  },
  {
    id: 15,
    name: "Gainsborough Greens + Hope Island",
    region: "Gold Coast (Pimpama/Hope Island)",
    tagline: "Most affordable Gold Coast play – ex-QLD PGA host with good Stay options",
    driveMinutes: 55,
    distanceKm: 70,
    courses: [
      { name: "Gainsborough Greens GC", detail: "$59 weekday / $69 weekend inc. cart with GPS – ex-Queensland PGA host" },
      { name: "Links Hope Island", detail: "$125 inc. cart – splurge round to elevate the trip" },
      { name: "Coomera Lakes or Lakelands", detail: "$55-95 inc. cart" },
    ],
    accom: "Mantra at Sharks (Tweed Heads) or Mantra Sun City Surfers Paradise apartments. Self-contained 2-bed apartments ~$200-260/night = ~$70-95 pp/night across 3 apartments. Alternatively Hope Island Resort villas via Airbnb for the group.",
    saturday9: "9 at Coolangatta-Tweed or Coomera on arrival.",
    breakfast: false,
    breakfastNote: "Self-catering in apartments",
    costLow: 700, costHigh: 950,
    verdict: "CHEAPEST GOLD COAST OPTION. Lets the trip stay sub-$1000pp while still ticking off the 'on the Coast' box. Mix one big-name round (Links Hope Island) with cheaper local courses.",
    website: "gainsboroughgolf.com.au",
    websiteUrl: "https://www.gainsboroughgolf.com.au",
    tier: "value",
  },
];

const TIER_INFO = {
  value: { label: "Best Value", description: "Comes in well under budget" },
  core: { label: "Core Option", description: "Fits the $1,200 budget comfortably" },
  premium: { label: "Premium", description: "Blows the budget" },
  stretch: { label: "Stretch", description: "Pushes the 3-hour drive limit" },
};

const formatDrive = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
};

const tierBadgeStyle = (tier) => {
  const styles = {
    value: "bg-emerald-50 text-emerald-900 border-emerald-200",
    core: "bg-stone-100 text-stone-800 border-stone-300",
    premium: "bg-amber-50 text-amber-900 border-amber-200",
    stretch: "bg-rose-50 text-rose-900 border-rose-200",
  };
  return styles[tier] || styles.core;
};

const tierAccentColor = (tier) => {
  const colors = {
    value: "#059669",
    core: "#78716c",
    premium: "#d97706",
    stretch: "#e11d48",
  };
  return colors[tier];
};

const STORAGE_KEY = 'boys-golf-trip-shortlist';

export default function GolfTripPlanner() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("cost-low");
  const [expandedId, setExpandedId] = useState(null);
  const [shortlist, setShortlist] = useState(new Set());
  const [showShortlistOnly, setShowShortlistOnly] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load shortlist from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const ids = JSON.parse(saved);
        setShortlist(new Set(ids));
      }
    } catch (e) {
      // No prior shortlist or storage unavailable
    }
    setHydrated(true);
  }, []);

  // Persist shortlist on changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(shortlist)));
    } catch (e) {
      // Storage write failed, ignore
    }
  }, [shortlist, hydrated]);

  const toggleShortlist = (id) => {
    setShortlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = [...DESTINATIONS];
    if (filter !== "all") {
      result = result.filter(d => d.tier === filter);
    }
    if (showShortlistOnly) {
      result = result.filter(d => shortlist.has(d.id));
    }
    switch (sort) {
      case "cost-low": result.sort((a, b) => a.costLow - b.costLow); break;
      case "cost-high": result.sort((a, b) => b.costLow - a.costLow); break;
      case "drive-near": result.sort((a, b) => a.driveMinutes - b.driveMinutes); break;
      case "drive-far": result.sort((a, b) => b.driveMinutes - a.driveMinutes); break;
      case "name": result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return result;
  }, [filter, sort, showShortlistOnly, shortlist]);

  const tierCounts = useMemo(() => {
    const counts = { all: DESTINATIONS.length };
    Object.keys(TIER_INFO).forEach(t => {
      counts[t] = DESTINATIONS.filter(d => d.tier === t).length;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-stone-50" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      {/* HEADER */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, #0d3b25 0%, #195e3c 50%, #2d8a52 100%)"
        }}></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(212,134,30,0.4) 0%, transparent 50%)"
        }}></div>
        <div className="relative px-5 pt-10 pb-8 text-white max-w-5xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] opacity-75 mb-3">
            Boys' Golf Trip · 2026
          </div>
          <h1 className="leading-[0.95] mb-4" style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em"
          }}>
            Fifteen<br/>destinations,<br/>one trip.
          </h1>
          <p className="text-base opacity-90 max-w-md leading-relaxed">
            Eleven blokes. Late March / early April. Three rounds plus a Saturday 9-hole detour. Budget target: $1,200 pp all-in.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-7 max-w-md">
            {[
              { num: "15", label: "Options" },
              { num: "11", label: "Players" },
              { num: "3hr", label: "Max drive" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur rounded-lg px-4 py-3 border border-white/15">
                <div className="text-2xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}>{stat.num}</div>
                <div className="text-[10px] uppercase tracking-widest opacity-80 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* CONTROLS */}
      <div className="sticky top-0 z-30 bg-stone-50/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <button
              onClick={() => setFilter("all")}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filter === "all"
                  ? "bg-emerald-900 text-white border-emerald-900"
                  : "bg-white text-stone-700 border-stone-300 hover:border-stone-400"
              }`}
            >
              All <span className="opacity-60 ml-1">{tierCounts.all}</span>
            </button>
            {Object.entries(TIER_INFO).map(([tier, info]) => (
              <button
                key={tier}
                onClick={() => setFilter(tier)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  filter === tier
                    ? "bg-emerald-900 text-white border-emerald-900"
                    : `${tierBadgeStyle(tier)} hover:border-stone-400`
                }`}
              >
                {info.label} <span className="opacity-60 ml-1">{tierCounts[tier]}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-xs font-medium bg-transparent outline-none cursor-pointer pr-1"
              >
                <option value="cost-low">Cost: low to high</option>
                <option value="cost-high">Cost: high to low</option>
                <option value="drive-near">Drive: closest first</option>
                <option value="drive-far">Drive: furthest first</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {shortlist.size > 0 && (
              <button
                onClick={() => setShowShortlistOnly(!showShortlistOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  showShortlistOnly
                    ? "bg-amber-100 text-amber-900 border-amber-300"
                    : "bg-white text-stone-700 border-stone-300"
                }`}
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
                Shortlist ({shortlist.size})
              </button>
            )}

            <div className="ml-auto text-xs text-stone-500">
              {filtered.length} of {DESTINATIONS.length}
            </div>
          </div>
        </div>
      </div>

      {/* CARDS */}
      <main className="max-w-5xl mx-auto px-4 py-5 pb-24">
        <div className="space-y-3">
          {filtered.map((dest) => {
            const isExpanded = expandedId === dest.id;
            const isShortlisted = shortlist.has(dest.id);
            const tierColor = tierAccentColor(dest.tier);

            return (
              <article
                key={dest.id}
                className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden transition-all hover:shadow-md"
                style={{ borderLeftWidth: "4px", borderLeftColor: tierColor }}
              >
                <div
                  className="px-5 pt-4 pb-3 cursor-pointer select-none"
                  onClick={() => setExpandedId(isExpanded ? null : dest.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${tierBadgeStyle(dest.tier)}`}
                    >
                      {TIER_INFO[dest.tier].label}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleShortlist(dest.id); }}
                      className="p-1.5 -m-1.5 hover:bg-stone-100 rounded transition-colors"
                      aria-label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
                    >
                      {isShortlisted ? (
                        <BookmarkCheck className="w-5 h-5 fill-amber-500 text-amber-600" />
                      ) : (
                        <Bookmark className="w-5 h-5 text-stone-400 hover:text-stone-600" />
                      )}
                    </button>
                  </div>

                  <h2
                    className="text-emerald-950 leading-tight mb-1"
                    style={{ fontFamily: "'Fraunces', serif", fontSize: "1.4rem", fontWeight: 600, letterSpacing: "-0.01em" }}
                  >
                    {dest.name}
                  </h2>

                  <div className="flex items-center gap-1 text-stone-500 text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    {dest.region}
                  </div>

                  <p className="text-sm text-stone-600 italic leading-snug mb-3">
                    "{dest.tagline}"
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-1">
                    <div className="flex flex-col items-start bg-stone-50 px-3 py-2 rounded-lg">
                      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">
                        <Clock className="w-3 h-3" />
                        Drive
                      </div>
                      <div className="font-bold text-emerald-950 text-sm">{formatDrive(dest.driveMinutes)}</div>
                    </div>
                    <div className="flex flex-col items-start bg-stone-50 px-3 py-2 rounded-lg">
                      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">
                        <DollarSign className="w-3 h-3" />
                        Per person
                      </div>
                      <div className="font-bold text-emerald-950 text-sm">${dest.costLow}–${dest.costHigh}</div>
                    </div>
                    <div className="flex flex-col items-start bg-stone-50 px-3 py-2 rounded-lg">
                      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">
                        <Coffee className="w-3 h-3" />
                        Brekky
                      </div>
                      <div className="font-bold text-emerald-950 text-sm">{dest.breakfast ? "Included" : "Extra"}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end mt-2 text-stone-400 text-xs">
                    {isExpanded ? (
                      <span className="flex items-center gap-1">Less <ChevronUp className="w-3.5 h-3.5" /></span>
                    ) : (
                      <span className="flex items-center gap-1">Details <ChevronDown className="w-3.5 h-3.5" /></span>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-stone-100 pt-4 bg-gradient-to-b from-stone-50/50 to-white">
                    <Section label="Course rotation">
                      <ul className="space-y-2 mt-2">
                        {dest.courses.map((c, i) => (
                          <li key={i} className="bg-white border border-stone-200 rounded-lg px-3 py-2.5"
                              style={{ borderLeftWidth: "3px", borderLeftColor: tierColor }}>
                            <div className="font-semibold text-emerald-950 text-sm">{c.name}</div>
                            <div className="text-xs text-stone-600 mt-1 leading-snug">{c.detail}</div>
                          </li>
                        ))}
                      </ul>
                    </Section>

                    <Section label="Saturday 9-hole detour">
                      <p className="text-sm text-stone-700 mt-1.5 leading-snug">{dest.saturday9}</p>
                    </Section>

                    <Section label="Accommodation">
                      <p className="text-sm text-stone-700 mt-1.5 leading-snug">{dest.accom}</p>
                      {dest.breakfast && (
                        <p className="text-xs text-emerald-700 mt-1.5 italic">✓ {dest.breakfastNote}</p>
                      )}
                      {!dest.breakfast && (
                        <p className="text-xs text-stone-500 mt-1.5 italic">{dest.breakfastNote}</p>
                      )}
                    </Section>

                    <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg px-4 py-3">
                      <div className="text-[10px] uppercase tracking-widest text-amber-800 font-bold mb-1">Verdict</div>
                      <p className="text-sm text-stone-800 leading-snug">{dest.verdict}</p>
                    </div>

                    <a
                      href={dest.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-sm text-emerald-700 hover:text-emerald-900 font-semibold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit {dest.website}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-stone-500">
              <p className="text-sm">No destinations match those filters.</p>
              <button
                onClick={() => { setFilter("all"); setShowShortlistOnly(false); }}
                className="mt-3 text-emerald-700 underline text-sm font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <footer className="mt-16 pt-8 border-t border-stone-200 text-center">
          <p className="text-xs text-stone-500 leading-relaxed max-w-md mx-auto">
            Pricing reflects 2026 public rack rates and known package deals. Group rates negotiated direct with pro shops typically reduce green-fee components 15-25%. Confirm directly with venues before booking.
          </p>
          <p className="text-xs text-stone-400 mt-3" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}>
            Boys' Golf Trip · Brisbane Edition · 2026
          </p>
        </footer>
      </main>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div className="mt-4 first:mt-2">
      <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">{label}</div>
      {children}
    </div>
  );
}
