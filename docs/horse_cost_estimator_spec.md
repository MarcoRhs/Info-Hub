# Horse Ownership Cost & Time Estimator — Revised Specification

## Goals & Context
- Provide horse owners with an editable budgeting tool that reflects common recurring, seasonal, and one-time expenses without double counting shared inclusions (e.g., hay in board).
- Surface toggles for lifestyle differences (DIY vs. full care, competing vs. leisure, kept at home vs. boarded) so that only relevant cost lines are shown.
- Output transparent monthly and annual totals, compare them to typical ownership ranges (USD $3,000–$10,000+/year depending on region), and export data (CSV/PDF) with clear disclaimers.

## High-Level Implementation Checklist
- [ ] Location & currency inputs (country, region/state, urbanity) with adjustable price factors and auto-set VAT/tax guidance.
- [ ] Boarding cost inputs with inclusion checkboxes and logic that prevents double counting bundled services (e.g., disable hay cost when board includes hay).
- [ ] Feed & forage controls covering hay quantity, waste percentage, pasture contribution, grain/balancer, and supplements.
- [ ] Care & health modules: veterinary, dental, vaccinations, parasite control, farrier options, farm call fees.
- [ ] Lifestyle toggles that reveal optional groupings (training, competing/showing, travelling/hauling, saddle fitting/bodywork).
- [ ] Home-keeping mode that enables property-related upkeep (manure removal, fencing, pasture maintenance, utilities).
- [ ] Insurance split into liability and mortality/medical (or veterinary fee) policies.
- [ ] Replacement/consumables and contingency sinking funds (emergency reserve, end-of-life, retirement).
- [ ] Outputs summarizing monthly/annual totals, VAT-inclusive totals when enabled, one-time expenses, time commitment, and comparison against typical annual ownership ranges.
- [ ] Export updates (CSV/PDF) that mirror the expanded breakdowns and note one-time amortization where shown.

## Input & Control Structure

### 1. Location & Currency
- **Country selector**: maintain DE, EU, UK, US. Auto-fill currency symbol per country and allow manual override.
- **Region detail**:
  - EU: "Eurozone (average)" baseline factor.
  - DE/UK: existing Bundesland/region options.
  - US: provide every state and DC individually (list in "Reference Data"). Grouping buckets are replaced by per-state entries with corresponding price factors (to be supplied separately).
- **Urbanity** dropdown: Rural / Town / City / Capital (retained).
- **Pasture climate context**: optional info message referencing local forage seasons when pasture months are adjusted.

### 2. Boarding & Housing
- **Board type** selector (Pasture, Partial/DIY, Full care) with updated presets.
- **Monthly board input** with "Use suggested" helper tied to location factor.
- **Inclusion checkboxes** (all default unchecked):
  - Hay included?
  - Grain/Balancer included?
  - Bedding included?
  - Blanketing/Clipping included?
  - Turnout included?
- When "Hay included" is checked, disable or hide the standalone hay cost controls to prevent double counting. Show contextual note if user overrides this manually.
- **DIY bedding inputs** (visible when bedding not included or board type indicates DIY/stall board):
  - Bedding material selector (straw, shavings, pellets, other) with reference weight/coverage assumptions.
  - Quantity per week (bags/bales).
  - Price per unit.
  - Convert to monthly cost.
- **Board-provided services**: use inclusion chips in summary to indicate what the board fee covers.

### 3. Feed & Forage
- **Horse weight (kg or lbs)** — support toggle if needed.
- **Forage % bodyweight/day** (default 2%).
- **Hay waste slider**: presets "Loose (~20%)", "Slow-feed nets (~5%)", "Custom" with range 0–30%.
- **Pasture seasonality**:
  - Input: Pasture months per year (0–12).
  - Input: % of forage met by pasture during pasture months (0–100%).
  - Calculation: reduce hay requirement during pasture months accordingly, yielding annual hay kg and average monthly cost.
- **Bale weight & price** inputs maintained; adjust placeholder to reflect typical local bale type.
- **Concentrates & supplements**:
  - Monthly line for Grain/Balancer with default $0.
  - Monthly line for Supplements + Salt with default $0.
  - If board includes grain, allow users to zero out this line but leave editable.

### 4. Training, Lessons & Time
- **Include training/lessons** toggle retains existing behavior.
- Add optional inputs for "Trainer ride or day fee" when competing toggle is on.
- **Time presets**: maintain but allow editing independent of preset once selected.

### 5. Veterinary & Health Care
- **Routine vet (annual)** and **dental (annual)** remain but move farm call fees to separate controls.
- **Farm call / trip fees**:
  - Separate inputs for veterinary call-out and dental call-out (per visit) with checkbox "Share call with barn mates" to divide cost by number of owners when selected.
  - Multiply by estimated number of visits/year and convert to monthly equivalents.
- **Vaccinations**:
  - Split into: Core vaccines (annual cost), Risk-based vaccines (influenza/EHV, strangles), and Travel compliance (US: Coggins + health certificate; EU/UK: passport/flu boosters).
  - Add toggle "Horse travels/competes"; risk-based + travel compliance sections show only when enabled.
- **Parasite control**:
  - Fecal egg counts (tests/year × price/test).
  - Dewormers (treatments/year × price/treatment, default 1–2).
- **Emergency & savings**: keep configurable emergency reserve (% of annual total) plus add optional "End-of-life fund" and "Retirement fund" with default contributions ($0 unless user opts in).

### 6. Farrier & Hoof Care
- Replace single cost/interval inputs with:
  - Radio buttons: Trim only, Fronts shod, All four shod.
  - Each option has default cost per visit and interval (6–8 weeks). Allow user overrides.
  - Optional add-ons toggles: Pads, Studs, Corrective shoeing (each adds configurable extra cost per visit).
  - Calculation: convert per-visit total to monthly cost based on interval.

### 7. Grooming, Apparel & Seasonal Care
- **Blanket care**: annual cost input for cleaning/repairs (visible when blanketing not included or horse competes).
- **Fly control**: monthly or seasonal cost line covering sprays, masks, sheets, traps (default $0, editable).
- **Clipping/Braiding/Show prep**: show when "Horse travels/competes" toggle is active; include per-session cost and expected frequency.

### 8. Transport & Activities
- **Transport toggle** (on when travelling/competing enabled or user selects "Haul out").
- Inputs: trips per year, average miles per trip, cost per mile (fuel + maintenance) or manual total, tolls/parking per trip, show/arena day-use fees.
- **Compliance per trip**: optional checkboxes to add Coggins/health certificate (US) or paperwork fees; these tie back to vaccination/travel compliance items to avoid duplicate entries.

### 9. Insurance & Liability
- Separate monthly/annual lines for:
  - Equine liability policy (note homeowners overlap in help text).
  - Mortality & major medical (US) or Veterinary fee insurance (UK/EU).
  - Optional care/custody/control coverage if boarding others (hidden by default).

### 10. Property Upkeep (“Kept at Home” Mode)
- Toggle "Horse kept at home" reveals:
  - Manure removal / composting (pick-up frequency × price or dump fees).
  - Pasture maintenance (seed, fertilizer, lime) — allow annual budget.
  - Fencing repair & replacement (annualized budget).
  - Water & electric (heated troughs, barn lighting) — monthly utility estimate.
  - Equipment depreciation (tractor, implements) — optional annual line.
- When off, hide these lines to avoid duplication with board costs.

### 11. Replacement & Consumables
- Annual "Barn consumables" line covering small tools, buckets, halter/lead replacements, first-aid restock, fly spray stock-ups.
- Optionally amortize one-time tack purchase over configurable months to show a "monthly equivalent" while keeping the core amount in one-time totals.

### 12. One-Time Costs
- Pre-purchase exam (PPE) remains in one-time section.
- Tack starter kit remains one-time with optional amortized display.
- Add optional "Initial setup" lines for fencing/equipment if "kept at home" toggle is enabled.

## Calculations & Output Rules
- **Monthly totals**: sum all active monthly conversions (board, feed, health, training, transport, insurance, property, consumables) plus VAT if applicable.
- **Annual totals**: monthly × 12 plus annual-only lines (vaccinations, blanket care, pasture maintenance, etc.)/converted to monthly for UI but maintain accurate annual sum.
- Ensure items toggled off contribute $0.
- **Double counting safeguards**:
  - When board includes hay, disable hay controls and annotate summary (“Hay covered in board”).
  - If grain/balancer included, auto-set that line to $0 but keep editable.
  - Call-out fees should not be embedded in routine vet/dental totals; provide helper text reminding users to exclude them from those fields.
- **Context module**: display how the user’s annual total compares to reference bands (e.g., "Below $3k", "$3k–$10k", "Above $10k"), with short interpretive text.
- **Exports**: extend CSV/PDF breakdowns to include all new categories grouped under headings (Board & Housing, Feed, Health, Hoof Care, Seasonal & Activities, Insurance, Property, Savings). Note toggles/inclusions in PDF summary.

## Reference Data
### U.S. States (for region selector)
- Alabama
- Alaska
- Arizona
- Arkansas
- California
- Colorado
- Connecticut
- Delaware
- District of Columbia
- Florida
- Georgia
- Hawaii
- Idaho
- Illinois
- Indiana
- Iowa
- Kansas
- Kentucky
- Louisiana
- Maine
- Maryland
- Massachusetts
- Michigan
- Minnesota
- Mississippi
- Missouri
- Montana
- Nebraska
- Nevada
- New Hampshire
- New Jersey
- New Mexico
- New York
- North Carolina
- North Dakota
- Ohio
- Oklahoma
- Oregon
- Pennsylvania
- Rhode Island
- South Carolina
- South Dakota
- Tennessee
- Texas
- Utah
- Vermont
- Virginia
- Washington
- West Virginia
- Wisconsin
- Wyoming

### Calculation Defaults (to confirm during implementation)
- Pasture months default: 0 in winter-heavy regions, 4–6 otherwise; allow user override.
- Waste slider default: 5% (assume slow-feed nets as best practice) with helper text about range.
- Deworming default: 2 fecals/year, 1 dewormer/year at low shed.
- Farrier intervals: Trim = 6 weeks, Fronts shod = 6 weeks, All four = 6 weeks (with editable range 4–8 weeks).

## Documentation & Help Text
- Provide inline notes explaining each toggle, especially inclusions/exclusions, insurance distinctions, and seasonal adjustments.
- Update PDF disclaimer to mention that inclusions and toggles are user-provided and that actual costs vary widely.

## One-Time vs. Recurring Summary
- Maintain a distinct "One-time" total for PPE, tack, and setup expenses.
- Provide optional "Monthly equivalent" display for amortized one-time items (calculated as one-time ÷ amortization months) without adding it twice to totals.

