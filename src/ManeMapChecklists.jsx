import React, { useEffect, useMemo, useRef, useState } from "react"

function multiline(fn) {
  const s = fn.toString()
  const start = s.indexOf("/*")
  const end = s.lastIndexOf("*/")
  return start >= 0 && end > start ? s.slice(start + 2, end) : ""
}

const HTML1 = multiline(function () {/*
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>ManeMap — Equine Budget Planner</title>
<style>
  :root{
    --primary:#295E2B; --primary-dark:#1F4A23; --secondary:#10b981; --accent:#f59e0b;
    --text-primary:#1e293b; --text-secondary:#64748b; --text-muted:#94a3b8;
    --bg-primary:#ffffff; --bg-secondary:#f8fafc;
    --bg-gradient:linear-gradient(135deg,#f1f5f9 0%,#e2e8f0 100%);
    --border:#e2e8f0; --border-focus:#295E2B;
    --shadow-sm:0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow:0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-lg:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --radius:12px; --radius-lg:16px;
    --notice-bg:rgba(41,94,43,0.08); --notice-border:rgba(41,94,43,0.35);
    --brand-title-size:2.5rem;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;background:var(--bg-gradient);color:var(--text-primary);line-height:1.6;padding:20px;min-height:100vh}
  .calculator-container{max-width:1200px;margin:0 auto;background:var(--bg-primary);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);overflow:hidden}
  .header{background:linear-gradient(135deg,var(--primary) 0%,var(--primary-dark) 100%);color:#fff;padding:32px;text-align:center}
  .brand{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px;width:100%;margin-bottom:4px;}
  .brand h1{grid-column:2;justify-self:center;font-size:var(--brand-title-size);font-weight:700;line-height:1.05;text-shadow:0 2px 4px rgb(0 0 0 / 0.1);white-space:nowrap;}
  .badge{display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.2);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.3);border-radius:999px;padding:10px 18px;font-size:1rem;font-weight:600;letter-spacing:.2px;margin-top:12px}
  .content{padding:32px}
  .notice{border:1px solid var(--notice-border);background:var(--notice-bg);padding:12px 14px;border-radius:10px;margin-bottom:20px;font-size:0.95rem}
  .card{background:var(--bg-primary);border:1px solid var(--border);border-radius:var(--radius);padding:24px;margin-bottom:24px;box-shadow:var(--shadow);transition:all .2s ease;break-inside:auto;page-break-inside:auto}
  .card:hover{box-shadow:var(--shadow-lg);transform:translateY(-2px)}
  .card-header{margin-bottom:20px}
  .card-title{font-size:1.375rem;font-weight:600;margin-bottom:4px;color:var(--text-primary)}
  .card-description{font-size:.875rem;color:var(--text-secondary)}
  .grid{display:grid;gap:20px;margin-bottom:20px}
  .grid-2{grid-template-columns:repeat(2,1fr)}
  .grid-3{grid-template-columns:repeat(3,1fr)}
  .grid-4{grid-template-columns:repeat(4,1fr)}
  @media (max-width:768px){.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}}
  @media (max-width:480px){:root{--brand-title-size:2rem}.header{padding:24px 20px}.content{padding:20px}.card{padding:20px}}
  .form-group{display:flex;flex-direction:column}
  .label{font-size:.875rem;font-weight:500;color:var(--text-primary);margin-bottom:6px;display:flex;align-items:center;gap:4px}
  .input,.select{width:100%;padding:12px 14px;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg-primary);font-size:.875rem;transition:all .2s ease;outline:none}
  .input:focus,.select:focus{border-color:var(--border-focus);box-shadow:0 0 0 3px rgba(41,94,43,.15)}
  .input[readonly]{background:var(--bg-secondary);color:var(--text-muted)}
  .help-text{font-size:.75rem;color:var(--text-muted);margin-top:4px;line-height:1.4}
  .totals-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-top:16px}
  .total-card{background:linear-gradient(135deg,var(--bg-secondary) 0%,var(--bg-primary) 100%);border:1px solid var(--border);border-radius:var(--radius);padding:20px;text-align:center;transition:all .2s ease}
  .total-card:hover{transform:translateY(-2px);box-shadow:var(--shadow)}
  .total-label{font-size:.875rem;color:var(--text-secondary);margin-bottom:8px;font-weight:500}
  .total-amount{font-size:1.5rem;font-weight:700;color:var(--primary)}
  .terms-link,.terms-link:visited{color:var(--primary);text-decoration:underline}
  .disclaimer-inline{font-size:.85rem;color:var(--text-secondary);border-left:3px solid var(--primary);padding-left:10px;margin-bottom:8px}
  .subtle-box{border:1px dashed var(--border);background:#fbfdff;border-radius:8px;padding:10px 12px;color:#475569;font-size:.875rem}
  @media print{ .card{break-inside:auto; page-break-inside:auto;} }
</style>
</head>
<body>
  <div class="calculator-container" id="calculatorRoot">
    <div class="header">
      <div class="brand"><h1>ManeMap</h1></div>
      <div class="badge"><span>Equine Budget Planner</span></div>
    </div>

    <div class="content">
      <div class="notice">This tool estimates ongoing ownership costs only. It doesn’t include the purchase price or equipment.</div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📍Location</h3>
          <p class="card-description">Your location determines currency and regional pricing adjustments for accurate cost estimates.</p>
        </div>

        <div class="grid grid-4">
          <div class="form-group">
            <label class="label">Home Country</label>
            <select class="select" id="homeCountry">
              <option value="DE">🇩🇪 Germany</option>
              <option value="UK">🇬🇧 United Kingdom</option>
              <option value="USA">🇺🇸 United States</option>
              <option value="EU">🇪🇺 EU (Other)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="label">Region/State</label>
            <select class="select" id="homeSub"></select>
            <div class="help-text" id="homeSubHelp"></div>
          </div>

          <div class="form-group">
            <label class="label">Area Type</label>
            <select class="select" id="area">
              <option value="rural">Rural (-6%)</option>
              <option value="suburban">Suburban (base)</option>
              <option value="city">City (+8%)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="label">Currency</label>
            <input class="input" id="currencyField" readonly />
          </div>
        </div>

        <input type="hidden" id="applyTax" />
        <input type="hidden" id="taxRate" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🏠 Horse Boarding Arrangements</h3>
          <p class="card-description">Boarding costs are automatically estimated based on your location and can be customized.</p>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label class="label">Board Type</label>
            <select class="select" id="boardType">
              <option value="full">Full Board (complete care)</option>
              <option value="half">Half/Partial Board</option>
              <option value="selfcare">Selfcare</option>
            </select>
          </div>

          <div class="form-group">
            <label class="label">Monthly Board Cost</label>
            <input class="input" id="boardMonthly" type="number" min="0" step="10" />
            <div class="help-text">Typical ranges: US $300–$700 • UK £433–£650+ • DE €300–€400 (higher in cities)</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">⚕️ Horse Essentials</h3>
          <p class="card-description">Regular health and maintenance services with location-based estimates.</p>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label class="label">Farrier (monthly)</label>
            <input class="input" id="farrierMonthly" type="number" min="0" step="5" />
            <div class="help-text">Hoof trimming and shoeing</div>
          </div>

          <div class="form-group">
            <label class="label">Veterinary Visits (monthly)</label>
            <input class="input" id="vetMonthly" type="number" min="0" step="5" />
            <div class="help-text">Averaged monthly; region- and area-adjusted</div>
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label class="label">Dental Care (annual)</label>
            <input class="input" id="dentAnnual" type="number" min="0" step="10" />
            <div class="help-text">Routine float/check (prorated monthly)</div>
          </div>

          <div class="form-group">
            <label class="label">Physiotherapist (monthly)</label>
            <input class="input" id="physioMonthly" type="number" min="0" step="5" />
            <div class="help-text">Physical therapy and bodywork</div>
          </div>
        </div>

        <div class="grid grid-2">
          <div class="form-group">
            <label class="label">Feed Supplements (monthly)</label>
            <input class="input" id="feedAddMonthly" type="number" min="0" step="5" />
            <div class="help-text">Mineral supplements and feed additions</div>
          </div>

          <div class="form-group">
            <label class="label">Saddle Adjustments (annual)</label>
            <input class="input" id="saddleAnnual" type="number" min="0" step="10" />
            <div class="help-text">Fitting checks / flocking (prorated). <span id="saddleMonthlyPreview"></span></div>
          </div>
        </div>

        <div class="subtle-box">All amounts are pre-tax and do not include VAT or other taxes.</div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">💰 Cost Summary</h3>
          <p class="card-description">Complete breakdown of estimated ownership costs.</p>
        </div>

        <div class="disclaimer-inline">
          <a class="terms-link" href="#" id="openDisclaimer">Estimates only—confirm locally. Read full disclaimer.</a>
        </div>

        <div class="totals-grid">
          <div class="total-card"><div class="total-label">Monthly (Pre-Tax)</div><div class="total-amount" id="mPre">—</div></div>
          <div class="total-card"><div class="total-label">Monthly (With Tax)</div><div class="total-amount" id="mWith">—</div></div>
          <div class="total-card"><div class="total-label">Annual (Pre-Tax)</div><div class="total-amount" id="aPre">—</div></div>
          <div class="total-card"><div class="total-label">Annual (With Tax)</div><div class="total-amount" id="aWith">—</div></div>
        </div>

        <div style="text-align:center; margin-top:16px;">
          <button id="downloadPdfBtn"
                  style="background:var(--primary); color:#fff; border:none; border-radius:12px;
                         padding:12px 18px; box-shadow:var(--shadow); cursor:pointer; font-weight:600;">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- html2pdf -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" referrerpolicy="no-referrer"></script>
  <script>
    const CURRENCY_BY_COUNTRY = { DE:"€", UK:"£", USA:"$", EU:"€" };
    const AREA_FACTOR = { rural:0.94, suburban:1.00, city:1.08 };
    const US_STATE_MULTIPLIER = { AL:0.90, AK:1.04, AZ:0.98, AR:0.87, CA:1.13, CO:1.03, CT:1.06, DE:0.99, DC:1.11, FL:1.00, GA:0.94, HI:1.09, ID:0.96, IL:0.98, IN:0.92, IA:0.91, KS:0.90, KY:0.90, LA:0.90, ME:1.01, MD:1.05, MA:1.09, MI:0.94, MN:0.98, MS:0.87, MO:0.92, MT:0.90, NE:0.90, NV:0.96, NH:1.08, NJ:1.09, NM:0.91, NY:1.08, NC:0.94, ND:0.89, OH:0.92, OK:0.89, OR:1.07, PA:0.99, RI:1.03, SC:0.93, SD:0.88, TN:0.93, TX:0.95, UT:0.98, VT:1.05, VA:1.01, WA:1.08, WV:0.90, WI:0.93, WY:0.92 };
    const US_STATES = [["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["DC","District of Columbia"],["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],["MD","Maryland"],["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],["MS","Mississippi"],["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],["UT","Utah"],["VT","Vermont"],["VA","Virginia"],["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"]];
    const US_CODE_TO_NAME = Object.fromEntries(US_STATES);
    const DE_STATES = ["Baden-Württemberg","Bayern","Berlin","Brandenburg","Bremen","Hamburg","Hessen","Mecklenburg-Vorpommern","Niedersachsen","Nordrhein-Westfalen","Rheinland-Pfalz","Saarland","Sachsen","Sachsen-Anhalt","Schleswig-Holstein","Thüringen"];
    const DE_STATE_MULTIPLIER = {"Berlin":1.08,"Hamburg":1.08,"Bremen":1.06,"Bayern":1.04,"Baden-Württemberg":1.04,"Hessen":1.04,"Brandenburg":0.96,"Mecklenburg-Vorpommern":0.96,"Sachsen":0.96,"Sachsen-Anhalt":0.96,"Thüringen":0.96,"Nordrhein-Westfalen":1.00,"Niedersachsen":1.00,"Rheinland-Pfalz":1.00,"Saarland":1.00,"Schleswig-Holstein":1.00};
    const UK_REGIONS = ["London","South East","East of England","South West","West Midlands","East Midlands","North West","North East","Yorkshire & the Humber","Scotland","Wales","Northern Ireland"];
    const UK_REGION_MULTIPLIER = {"London":1.12,"South East":1.07,"East of England":1.04,"South West":1.03,"West Midlands":0.97,"East Midlands":0.98,"North West":0.96,"North East":0.94,"Yorkshire & the Humber":0.96,"Scotland":0.95,"Wales":0.94,"Northern Ireland":0.90};
    const EU_SUBZONES = ["Benelux","Nordics","Central/East","Mediterranean","Other EU"];
    const EU_SUBZONE_MULTIPLIER = { "Benelux":1.04,"Nordics":1.08,"Central/East":0.94,"Mediterranean":0.98,"Other EU":1.00 };
    const BOARD_BASE = { USA:600, UK:600, DE:380, EU:320 };
    const BOARD_TYPE_FACTOR = { full:1.00, half:0.60, selfcare:0.40 };
    const SERVICE_BASES = { USA:{ farrier:60, vetMonthly:25, dentAnnual:240, physio:20, feedAdd:40, saddleAnnual:200 }, UK:{ farrier:45, vetMonthly:18, dentAnnual:60, physio:15, feedAdd:35, saddleAnnual:90 }, DE:{ farrier:55, vetMonthly:15, dentAnnual:120, physio:15, feedAdd:40, saddleAnnual:120 }, EU:{ farrier:50, vetMonthly:15, dentAnnual:100, physio:15, feedAdd:35, saddleAnnual:100 } };
    const VAT_DEFAULTS = { USA:{apply:false,rate:0}, UK:{apply:true,rate:20}, DE:{apply:true,rate:19}, EU:{apply:true,rate:21} };

    const JSON_DATA_PATH = './global_horse_costs_q1_2025.json';
    let COST_INDEX = new Map();
    const UI_COUNTRY_TO_JSON = { DE:'Germany', UK:'UK', USA:'USA', EU:'EU' };
    const UI_BOARD_TO_JSON   = { full:'Full Board', half:'Half/Partial Board', selfcare:'Selfcare' };

    function indexCostRows(rows){ COST_INDEX.clear(); rows.forEach(r=>{ const key = `${(r.country||'').trim()}|${(r.region_or_state||'').trim()}|${(r.board_type||'').trim()}`; COST_INDEX.set(key, r); }); }
    function getJsonRow(){ const jsonCountry = UI_COUNTRY_TO_JSON[state.homeCountry] || state.homeCountry; const regionLabel = state.homeCountry === 'USA' ? (US_CODE_TO_NAME[state.homeSub] || state.homeSub) : state.homeSub; const boardLabel  = UI_BOARD_TO_JSON[state.boardType] || state.boardType; const key = `${jsonCountry}|${regionLabel}|${boardLabel}`; return COST_INDEX.get(key) || null; }
    function val(obj, prefer){ const key = prefer || 'monthly_pre_tax'; if (!obj) return undefined; return obj[key] ?? obj.monthly ?? obj.pre_tax ?? obj.annual_pre_tax ?? obj.value ?? undefined; }

    const $ = id => document.getElementById(id);
    const formatMoney = (amount, currency) => { const code = currency==="€" ? "EUR" : currency==="£" ? "GBP" : "USD"; return new Intl.NumberFormat(undefined,{style:"currency",currency:code,maximumFractionDigits:0}).format(Number(amount)||0); };
    const applyTax = (pre, apply, rate) => apply ? pre*(1+(rate||0)/100) : pre;

    function getRegionMultiplier(country, subkey){
      switch(country){
        case "USA": return US_STATE_MULTIPLIER[subkey] || 1.00;
        case "DE":  return DE_STATE_MULTIPLIER[subkey] || 1.00;
        case "UK":  return UK_REGION_MULTIPLIER[subkey] || 1.00;
        case "EU":  return EU_SUBZONE_MULTIPLIER[subkey] || 1.00;
        default:    return 1.00;
      }
    }
    function calculateBoardCost(country, subkey, area, boardType){
      const base = BOARD_BASE[country] || 0;
      const typeM = BOARD_TYPE_FACTOR[boardType] || 1;
      const regionM = getRegionMultiplier(country, subkey);
      const areaM = AREA_FACTOR[area] || 1;
      return Math.round(base * typeM * regionM * areaM);
    }
    function calculateServiceCost(country, subkey, area, key){
      const base = SERVICE_BASES[country] && SERVICE_BASES[country][key] || 0;
      const regionM = getRegionMultiplier(country, subkey);
      const areaM = AREA_FACTOR[area] || 1;
      return Math.round(base * regionM * areaM);
    }
    function getSubregionOptions(country){
      switch(country){
        case "USA": return US_STATES.map(([code, name]) => ({key:code, label:name}));
        case "DE":  return DE_STATES.map(s => ({key:s,label:s}));
        case "UK":  return UK_REGIONS.map(r => ({key:r,label:r}));
        case "EU":  return EU_SUBZONES.map(z => ({key:z,label:z}));
        default:    return [];
      }
    }

    const elements = {
      homeCountry: $("homeCountry"),
      homeSub: $("homeSub"),
      homeSubHelp: $("homeSubHelp"),
      area: $("area"),
      currency: $("currencyField"),
      applyTax: $("applyTax"),
      taxRate: $("taxRate"),
      boardType: $("boardType"),
      boardMonthly: $("boardMonthly"),
      farrier: $("farrierMonthly"),
      vet: $("vetMonthly"),
      dentAnnual: $("dentAnnual"),
      physio: $("physioMonthly"),
      feedAdd: $("feedAddMonthly"),
      saddleAnnual: $("saddleAnnual"),
      saddleMonthlyPreview: $("saddleMonthlyPreview"),
      totals: { monthlyPre: $("mPre"), monthlyWith: $("mWith"), annualPre: $("aPre"), annualWith: $("aWith") }
    };

    let state = { homeCountry:"DE", homeSub:"Berlin", area:"suburban", boardType:"full" };

    function populateSubregions(selectEl, country, selectedKey){
      const options = getSubregionOptions(country);
      selectEl.innerHTML = "";
      options.forEach(o=>{ const opt = document.createElement("option"); opt.value = o.key; opt.textContent = o.label; if (o.key === selectedKey) opt.selected = true; selectEl.appendChild(opt); });
      if (!options.find(o=>o.key===selectedKey) && options[0]) selectEl.value = options[0].key;
      const hintMap = { USA:"US states", DE:"German Bundesländer", UK:"UK regions", EU:"EU subzones" };
      elements.homeSubHelp.textContent = hintMap[country] || "";
    }

    function updateSaddleMonthlyPreview(){
      const currency = elements.currency.value || "€";
      const monthly = (Number(elements.saddleAnnual.value)||0)/12;
      elements.saddleMonthlyPreview.textContent = monthly>0 ? `≈ ${formatMoney(monthly, currency)} / mo` : "";
    }

    function updateEstimates(){
      elements.currency.value = CURRENCY_BY_COUNTRY[state.homeCountry];
      const vat = VAT_DEFAULTS[state.homeCountry] || { apply:false, rate:0 };
      elements.applyTax.value = vat.apply ? "yes" : "no";
      elements.taxRate.value  = vat.rate;

      const row = getJsonRow();

      if (row && row.expenses){
        if (row.currency) elements.currency.value = row.currency;
        if (typeof row.tax_rate === "number"){ elements.taxRate.value  = Math.round(row.tax_rate * 100); elements.applyTax.value = (row.tax_rate > 0) ? "yes" : "no"; }
        const e = row.expenses;
        if (e.monthly_board_cost) { const m = e.monthly_board_cost.monthly_pre_tax ?? e.monthly_board_cost.monthly ?? e.monthly_board_cost.value; if (m != null) elements.boardMonthly.value = m; }
        if (e.farrier)           elements.farrier.value = val(e.farrier);
        if (e.veterinary_visits) elements.vet.value     = val(e.veterinary_visits);
        if (e.physiotherapist)   elements.physio.value  = val(e.physiotherapist);
        if (e.feed_supplements)  elements.feedAdd.value = val(e.feed_supplements);
        if (e.dental_care){ const annual = e.dental_care.annual_pre_tax ?? (e.dental_care.monthly_pre_tax != null ? e.dental_care.monthly_pre_tax*12 : undefined); if (annual != null) elements.dentAnnual.value = annual; }
        if (e.saddle_adjustments){ const annual = e.saddle_adjustments.annual_pre_tax ?? (e.saddle_adjustments.monthly_pre_tax != null ? e.saddle_adjustments.monthly_pre_tax*12 : undefined); if (annual != null) elements.saddleAnnual.value = annual; }
      } else {
        elements.farrier.value = calculateServiceCost(state.homeCountry, state.homeSub, state.area, "farrier");
        elements.vet.value     = calculateServiceCost(state.homeCountry, state.homeSub, state.area, "vetMonthly");
        elements.physio.value  = calculateServiceCost(state.homeCountry, state.homeSub, state.area, "physio");
        elements.feedAdd.value = calculateServiceCost(state.homeCountry, state.homeSub, state.area, "feedAdd");
        const serviceDefaults = SERVICE_BASES[state.homeCountry] || SERVICE_BASES.DE;
        elements.dentAnnual.value   = serviceDefaults.dentAnnual;
        elements.saddleAnnual.value = serviceDefaults.saddleAnnual;
        elements.boardMonthly.value = calculateBoardCost(state.homeCountry, state.homeSub, state.area, state.boardType);
      }
      updateSaddleMonthlyPreview();
    }

    function calculateTotals(){
      const currency = elements.currency.value || "€";
      const shouldApplyTax = elements.applyTax.value === "yes";
      const taxRateValue = Number(elements.taxRate.value) || 0;

      const monthlyPreTax =
        (Number(elements.boardMonthly.value) || 0) +
        (Number(elements.farrier.value) || 0) +
        (Number(elements.vet.value) || 0) +
        (Number(elements.physio.value) || 0) +
        (Number(elements.feedAdd.value) || 0) +
        ((Number(elements.dentAnnual.value) || 0)/12) +
        ((Number(elements.saddleAnnual.value) || 0)/12);

      const monthlyWithTax = applyTax(monthlyPreTax, shouldApplyTax, taxRateValue);
      const annualPreTax   = monthlyPreTax * 12;
      const annualWithTax  = monthlyWithTax * 12;

      elements.totals.monthlyPre.textContent = formatMoney(monthlyPreTax, currency);
      elements.totals.monthlyWith.textContent = formatMoney(monthlyWithTax, currency);
      elements.totals.annualPre.textContent = formatMoney(annualPreTax, currency);
      elements.totals.annualWith.textContent = formatMoney(annualWithTax, currency);
    }

    function initDisclaimerLink(){
      const link = document.getElementById("openDisclaimer");
      if (!link) return;
      const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>ManeMap — Disclaimer</title><style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,system-ui,sans-serif;margin:0;background:#f6f8fa;color:#0f172a}.wrap{max-width:860px;margin:0 auto;padding:28px}h1{font-size:1.6rem;margin:0 0 8px}.sub{color:#475569;margin:0 0 24px}.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;line-height:1.65;box-shadow:0 1px 3px rgba(0,0,0,.06)}a{color:#295E2B}.topbar{background:#295E2B;color:#fff;padding:14px 0;margin-bottom:16px}.topbar .wrap{padding:0 28px}</style></head><body><div class="topbar"><div class="wrap"><strong>ManeMap</strong></div></div><div class="wrap"><h1>Full Disclaimer</h1><p class="sub">Please read carefully before relying on any outputs of the Equine Budget Planner.</p><div class="card"><p>The Calculator and all outputs are provided “as is” for general information only. Results are non-binding estimates derived from user inputs, assumptions, and third-party sources; they are not guarantees, quotes, offers, or professional advice. Actual costs vary by location, provider, season, market conditions, and applicable taxes. You remain responsible for verifying prices, taxes, and services with local providers before making decisions.</p><p><a href="javascript:window.close()">Close this window</a></p></div></div></body></html>`;
      link.addEventListener("click", (e)=>{ e.preventDefault(); const w = window.open("", "_blank"); if (w){ w.document.open(); w.document.write(html); w.document.close(); } });
    }

    function sanitize(str){ return String(str||'').replace(/[^\w\-]+/g,'_'); }
    function waitForImages(el){
      const imgs = Array.from(el.querySelectorAll('img'));
      return Promise.all(imgs.map(i=>{
        if ('decode' in i) { try { return i.decode(); } catch (e) {} }
        if (i.complete && i.naturalWidth) return Promise.resolve();
        return new Promise(res => { i.addEventListener('load',res,{once:true}); i.addEventListener('error',res,{once:true}); });
      }));
    }

    function initPdfButton() {
      const btn = document.getElementById('downloadPdfBtn');
      if (!btn) return;
      btn.addEventListener('click', async () => {
        calculateTotals();
        const element = document.getElementById('calculatorRoot');
        await waitForImages(element);
        const fileName = `ManeMap_Equine_Budget_${sanitize(state.homeCountry)}_${sanitize(state.homeSub)}_${sanitize(state.boardType)}.pdf`;
        const opt = {
          margin: 0.5,
          filename: fileName,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff', scrollX: 0, scrollY: -window.scrollY },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all','css','legacy'], before: '.card' }
        };
        html2pdf().set(opt).from(element).save();
      });
    }

    function handleCountryChange(e){
      state.homeCountry = e.target.value;
      const defaults = { USA:"CA", DE:"Berlin", UK:"London", EU:"Other EU" };
      populateSubregions(elements.homeSub, state.homeCountry, defaults[state.homeCountry]);
      state.homeSub = elements.homeSub.value;
      updateEstimates(); calculateTotals();
      sendHeight();
    }
    function handleSubregionChange(e){ state.homeSub = e.target.value; updateEstimates(); calculateTotals(); sendHeight(); }
    function handleAreaChange(e){ state.area = e.target.value; updateEstimates(); calculateTotals(); sendHeight(); }
    function handleBoardType(e){ state.boardType = e.target.value; updateEstimates(); calculateTotals(); sendHeight(); }

    function addInputRecalcListeners(){
      ["boardMonthly","farrierMonthly","vetMonthly","physioMonthly","feedAddMonthly","dentAnnual","saddleAnnual"].forEach(id => {
        const el = document.getElementById(id); if (!el) return;
        el.addEventListener("input", () => { if (id==="saddleAnnual") updateSaddleMonthlyPreview(); calculateTotals(); sendHeight(); });
      });
    }

    async function loadCostJsonAndInit(){
      try{
        const res = await fetch(JSON_DATA_PATH, { cache:"no-store" });
        if(res.ok){
          const data = await res.json();
          if (Array.isArray(data)) {
            indexCostRows(data);
          }
        }
      }catch(err){
        console.warn("Could not load cost JSON; using modeled estimates.", err);
      }finally{
        initDisclaimerLink();
        initPdfButton();

        elements.homeCountry.value = state.homeCountry;
        populateSubregions(elements.homeSub, state.homeCountry, state.homeSub);
        elements.homeSub.value = state.homeSub;

        elements.homeCountry.addEventListener("change", handleCountryChange);
        elements.homeSub.addEventListener("change", handleSubregionChange);
        elements.area.addEventListener("change", handleAreaChange);
        elements.boardType.addEventListener("change", handleBoardType);
        addInputRecalcListeners();

        updateEstimates(); calculateTotals();
        sendHeight();
      }
    }

    function sendHeight(){
      try{
        var b = document.body, d = document.documentElement;
        var h = Math.max(
          b.scrollHeight, d.scrollHeight,
          b.offsetHeight, d.offsetHeight,
          b.clientHeight, d.clientHeight
        );
        parent.postMessage({ type:"MM_IFRAME_HEIGHT", h: h }, "*");
      }catch(e){}
    }
    window.addEventListener("load", sendHeight);
    window.addEventListener("resize", sendHeight);
    window.addEventListener("message", (e)=>{
      if (e && e.data && e.data.type === "MM_PING_HEIGHT") sendHeight();
    });

    document.addEventListener("DOMContentLoaded", loadCostJsonAndInit);
  </script>
</body>
</html>
*/})

/* ======================================
   PAGE 2 — Buyer & Stable Checklist
   (mobile layout tightened under 540px)
   ====================================== */
const HTML2 = multiline(function () {/*
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#295E2B" />
<title>ManeMap — Horse Buyer & Stable Checklist</title>
<style>
  :root{
    --primary:#295E2B; --primary-2:#1F4A23;
    --ink:#1e293b; --ink-2:#475569; --ink-3:#64748b;
    --bg:#ffffff; --bg-2:#f6f9fc;
    --stroke:#e2e8f0; --radius:12px; --radius-lg:16px;
    --shadow-sm:0 1px 2px rgba(0,0,0,.06);
    --shadow:0 2px 8px rgba(0,0,0,.08);
    --shadow-lg:0 10px 24px rgba(0,0,0,.10);
    --brand-size:2.4rem;
    --notice-bg:rgba(41,94,43,.07);
    --notice-stroke:rgba(41,94,43,.28);
    --focus:0 0 0 3px rgba(41,94,43,.25);
    --subitem-checked:#e6f4ea;
    --bar-bg:#e5e7eb;
  }
  html,body{height:100%}
  *{box-sizing:border-box}
  body{
    margin:0;
    font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,"Noto Sans",sans-serif;
    color:var(--ink);
    background:linear-gradient(135deg,var(--bg-2) 0%,var(--bg) 100%);
    line-height:1.6;
    -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
  }
  button,input,select,textarea{font:inherit;color:inherit}
  ul{padding-left:0;margin:0} .check{list-style:none}
  :focus-visible{outline:none; box-shadow:var(--focus)}

  .wrap{max-width:1200px;margin:24px auto 64px;padding:0 20px}
  .container{background:var(--bg);border:1px solid var(--stroke);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);overflow:hidden}
  .header{background:linear-gradient(135deg,var(--primary) 0%,var(--primary-2) 100%);color:#fff;padding:28px 20px;text-align:center}
  .brand{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px;margin-bottom:6px}
  .brand h1{grid-column:2;justify-self:center;font-weight:800;font-size:var(--brand-size);line-height:1.05;text-shadow:0 2px 6px rgba(0,0,0,.25);margin:0;white-space:nowrap}
  .badge{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;background:rgba(255,255,255,.22);border:1px solid rgba(255,255,255,.35);font-weight:700;letter-spacing:.2px}

  .content{padding:28px}
  .notice{background:var(--notice-bg);border:1px solid var(--notice-stroke);color:var(--ink-2);padding:12px 14px;border-radius:10px;margin-bottom:16px;font-size:.95rem}

  .card{background:var(--bg);border:1px solid var(--stroke);border-radius:var(--radius);padding:22px;margin-bottom:20px;box-shadow:var(--shadow);transition:transform .15s;break-inside:auto;page-break-inside:auto}
  .card:hover{transform:translateY(-2px)}
  .card-title{font-weight:800;font-size:1.2rem;line-height:1.2;margin:0 0 4px}
  .card-desc{color:var(--ink-3);font-size:.95rem;margin:0 0 10px}

  .toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
  .btn{--btn-bg:#fff;--btn-ink:var(--ink);--btn-stroke:var(--stroke);display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid var(--btn-stroke);border-radius:10px;background:var(--btn-bg);color:var(--btn-ink);cursor:pointer;font-weight:700;box-shadow:var(--shadow-sm);transition:background .15s,transform .1s,border-color .15s,color .15s}
  .btn:hover{transform:translateY(-1px)}
  .btn.primary{--btn-bg:var(--primary);--btn-ink:#fff;--btn-stroke:transparent}
  .btn.ghost{--btn-bg:transparent}
  .btn[disabled]{opacity:.55;cursor:not-allowed}
  .spinner{width:14px;height:14px;border:2px solid rgba(255,255,255,.5);border-top-color:#fff;border-radius:50%;animation:spin .9s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}

  .meter{display:flex;gap:12px;align-items:center;margin-top:12px}
  .bar{flex:1;height:12px;background:var(--bar-bg);border-radius:999px;overflow:hidden}
  .bar>span{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--primary),#27AE60);transition:width .25s ease}
  .stat{min-width:180px;color:var(--ink-3);font-weight:700}

  li.group{display:flex;gap:12px;align-items:flex-start;padding:12px;border:1px dashed var(--stroke);border-radius:12px;background:linear-gradient(180deg,var(--bg),var(--bg-2))}
  .parent{width:18px;height:18px;accent-color:var(--primary);margin-top:2px}

  .sub{margin:10px 0 0 28px;display:grid;gap:8px}
  label.subitem{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--stroke);border-radius:12px;background:var(--bg);box-shadow:var(--shadow-sm);transition:border-color .2s,box-shadow .2s,background .2s,transform .12s}
  label.subitem:hover{box-shadow:var(--shadow);transform:translateY(-1px)}
  label.subitem input{margin-top:0;width:18px;height:18px;accent-color:var(--primary)}
  label.subitem[data-checked="true"]{border-color:var(--primary);background:var(--subitem-checked);box-shadow:0 0 0 2px rgba(41,94,43,.12) inset,var(--shadow)}
  .hint{color:var(--ink-3);font-size:.9rem}
  .chip{display:inline-block;font-size:12px;font-weight:800;color:var(--primary);background:rgba(41,94,43,.12);padding:4px 8px;border-radius:999px;margin-left:6px}

  /* Mobile tweaks */
  @media (max-width:540px){
    :root{ --brand-size:2rem }
    .content{ padding:20px }
    .card{ padding:18px }
    li.group{ flex-direction:column; gap:10px; padding:10px }
    .parent{ width:18px; height:18px; margin-top:0 }
    .sub{ margin:8px 0 0 0; display:flex; flex-direction:column; gap:8px }
    label.subitem{ align-items:flex-start; padding:10px; }
    label.subitem span{ display:block; line-height:1.43; word-break:break-word }
  }
  @media print{.toolbar,.notice{display:none !important} body{background:#fff}}
</style>
</head>
<body>
  <div class="wrap" id="page">
    <main class="container" id="root" aria-describedby="top-note">
      <header class="header">
        <div class="brand"><h1>ManeMap</h1></div>
        <p class="badge" id="app-title">Horse Buyer &amp; Stable Checklist</p>
      </header>

      <div class="content">
        <p class="notice" id="top-note">Tick items to track progress. Use “Download PDF” for a printable copy. Your progress persists on this device.</p>

        <section class="card" aria-label="Checklist controls and progress">
          <div class="toolbar" role="toolbar" aria-label="Checklist controls">
            <button class="btn primary" id="btn-pdf" type="button"><span class="btn-label">Download PDF</span></button>
            <button class="btn ghost" id="btn-toggle" aria-pressed="false" aria-label="Show only incomplete items" type="button">Show incomplete</button>
            <button class="btn" id="btn-checkall" type="button">Check all</button>
            <button class="btn" id="btn-clearall" type="button">Clear all</button>
            <button class="btn" id="btn-reset" title="Clear saved progress" type="button">Reset data</button>
            <button class="btn" id="btn-theme" aria-label="Toggle dark mode" type="button">Toggle theme</button>
          </div>
          <div class="meter" aria-live="polite" aria-atomic="true">
            <div class="bar" aria-hidden="true"><span id="bar"></span></div>
            <div class="stat"><span id="statText">0/0 complete</span></div>
          </div>
        </section>

        <!-- Buying a Horse -->
        <section class="card" aria-labelledby="h-buy">
          <h2 class="card-title" id="h-buy">🟠 Buying a Horse</h2>
          <p class="card-desc">From first contact to final decision.</p>
          <ul class="check">
            <li class="group">
              <input type="checkbox" class="parent" aria-label="Contact seller parent">
              <div>
                <strong>Contact seller</strong>
                <div class="sub">
                  <label class="subitem"><input type="checkbox" data-key="c1" data-role="sub"> <span>Ask details: medical history, injuries, character, experience.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="c2" data-role="sub"> <span>Ownership history &amp; reason for sale.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="c3" data-role="sub"> <span>Request current videos (handling, groundwork, riding).</span></label>
                  <label class="subitem"><input type="checkbox" data-key="c4" data-role="sub"> <span>Training level &amp; discipline match to your needs.</span></label>
                </div>
              </div>
            </li>

            <li class="group">
              <input type="checkbox" class="parent" aria-label="Go see the horse parent">
              <div>
                <strong>Go see the horse</strong>
                <div class="sub">
                  <label class="subitem"><input type="checkbox" data-key="g1" data-role="sub"> <span>Observe first: catching, leading, saddling, mounting.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="g2" data-role="sub"> <span>Test ride &amp; evaluate.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="g3" data-role="sub"> <span>Visit more than once (2–3× minimum).</span></label>
                  <label class="subitem"><input type="checkbox" data-key="g4" data-role="sub"> <span>Bring a trainer/mentor if possible.</span></label>
                </div>
              </div>
            </li>

            <li class="group">
              <input type="checkbox" class="parent" aria-label="Confirm medical record parent">
              <div>
                <strong>Confirm medical record &amp; exams</strong>
                <div class="sub">
                  <label class="subitem"><input type="checkbox" data-key="m1" data-role="sub"> <span>Deworming, farrier, dental up to date.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="m2" data-role="sub"> <span>Pre-purchase vet exam (basic + extended as needed).</span></label>
                  <label class="subitem"><input type="checkbox" data-key="m3" data-role="sub"> <span>Registration/papers checked.</span></label>
                </div>
              </div>
            </li>

            <li class="group">
              <input type="checkbox" class="parent" aria-label="Final decision parent">
              <div>
                <strong>Final decision &amp; logistics</strong>
                <div class="sub">
                  <label class="subitem"><input type="checkbox" data-key="f1" data-role="sub"> <span>Trailer loading test / transport arranged.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="f2" data-role="sub"> <span>Insurance arranged (liability/mortality/medical).</span></label>
                </div>
              </div>
            </li>

            <li class="group">
              <input type="checkbox" class="parent" aria-label="What to look for parent">
              <div>
                <strong>What to look for</strong> <span class="chip">Inspection</span>
                <div class="sub">
                  <label class="subitem"><input type="checkbox" data-key="w1" data-role="sub"> <span>Conformation (straightness, proportions, feet).</span></label>
                  <label class="subitem"><input type="checkbox" data-key="w2" data-role="sub"> <span>Muscle mass vs. fat distribution.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="w3" data-role="sub"> <span>Lameness, pain, or discomfort signs.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="w4" data-role="sub"> <span>Used to being handled?</span></label>
                  <label class="subitem"><input type="checkbox" data-key="w5" data-role="sub"> <span>Coat &amp; herd behavior.</span></label>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <!-- Picking a Stable -->
        <section class="card" aria-labelledby="h-stable">
          <h2 class="card-title" id="h-stable">🟢 Picking a Stable</h2>
          <p class="card-desc">Boarding type, responsibilities, community, and facility check.</p>
          <ul class="check">
            <li class="group">
              <input type="checkbox" class="parent" aria-label="Boarding type parent">
              <div>
                <strong>Boarding type</strong>
                <div class="sub">
                  <label class="subitem"><input type="checkbox" data-key="b1" data-role="sub"> <span>Choose: Full board / Partial board / Self-care.</span></label>
                </div>
              </div>
            </li>

            <li class="group">
              <input type="checkbox" class="parent" aria-label="Who covers what parent">
              <div>
                <strong>Who covers what?</strong> <span class="hint">(stable vs. you)</span>
                <div class="sub">
                  <label class="subitem"><input type="checkbox" data-key="cw1" data-role="sub"> <span>Feeding &amp; water.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="cw2" data-role="sub"> <span>Turn-in / Turn-out.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="cw3" data-role="sub"> <span>Blanketing &amp; medication.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="cw4" data-role="sub"> <span>Vet visits coordination.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="cw5" data-role="sub"> <span>Deworming, farrier, dental.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="cw6" data-role="sub"> <span>Supplements.</span></label>
                </div>
              </div>
            </li>

            <li class="group">
              <input type="checkbox" class="parent" aria-label="Stable community parent">
              <div>
                <strong>Stable community &amp; services</strong>
                <div class="sub">
                  <label class="subitem"><input type="checkbox" data-key="sc1" data-role="sub"> <span>Friendly, safe atmosphere &amp; clear barn rules.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="sc2" data-role="sub"> <span>In-house trainer &amp; lesson pricing.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="sc3" data-role="sub"> <span>Riding arenas, round pen, trails; footing quality.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="sc4" data-role="sub"> <span>Manager responsiveness for issues.</span></label>
                </div>
              </div>
            </li>

            <li class="group">
              <input type="checkbox" class="parent" aria-label="Look & feel parent">
              <div>
                <strong>Look &amp; feel (facility)</strong>
                <div class="sub">
                  <label class="subitem"><input type="checkbox" data-key="lf1" data-role="sub"> <span>Organized &amp; clean; good ventilation.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="lf2" data-role="sub"> <span>Proper drainage; free of damp/mold.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="lf3" data-role="sub"> <span>Horse wellness: turnout time, herd compatibility, shade/water.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="lf4" data-role="sub"> <span>Feed looks fresh; hay storage dry.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="lf5" data-role="sub"> <span>Regular stall cleaning &amp; fresh bedding.</span></label>
                  <label class="subitem"><input type="checkbox" data-key="lf6" data-role="sub"> <span>Regular grain &amp; hay feeding schedule posted.</span></label>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  </div>

  <!-- html2pdf -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" referrerpolicy="no-referrer"></script>
  <script>
    (function(){
      const page = document.getElementById('page');
      const root = document.getElementById('root');

      const STORAGE_KEY='mm_checklist_v1';
      const THEME_KEY='mm_theme_v1';
      const INCOMPLETE_KEY='mm_incomplete_v1';

      const qsa = (sel, scope=root)=>scope.querySelectorAll(sel);

      const bar=document.getElementById('bar');
      const statText=document.getElementById('statText');

      const btnPdf=document.getElementById('btn-pdf');
      const btnToggle=document.getElementById('btn-toggle');
      const btnAll=document.getElementById('btn-checkall');
      const btnNone=document.getElementById('btn-clearall');
      const btnReset=document.getElementById('btn-reset');
      const btnTheme=document.getElementById('btn-theme');

      const parentChecks=qsa('input.parent');
      const subChecks=qsa('input[type="checkbox"][data-role="sub"]');

      function applyTheme(mode){ if(mode) page.setAttribute('data-theme',mode); else page.removeAttribute('data-theme'); }
      function currentTheme(){ try{return localStorage.getItem(THEME_KEY)||'';}catch(e){return '';} }
      function toggleTheme(){ const cur=currentTheme(); const next=cur===''?'dark':(cur==='dark'?'light':''); try{localStorage.setItem(THEME_KEY,next);}catch(e){} applyTheme(next); sendHeight(); }

      function loadState(){ try{const raw=localStorage.getItem(STORAGE_KEY); return raw?JSON.parse(raw):{};}catch(e){return{};} }
      function saveState(){ const data={}; subChecks.forEach(cb=>data[cb.dataset.key]=!!cb.checked); try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}catch(e){} }

      function reflectSubLabels(){ qsa('label.subitem').forEach(l=>{ const cb=l.querySelector('input[type="checkbox"]'); l.setAttribute('data-checked', cb.checked?'true':'false'); }); }
      function reflectParentsFromChildren(){ parentChecks.forEach(p=>{ const group=p.closest('li.group'); const kids=qsa('.sub input[type="checkbox"]',group); p.checked=Array.from(kids).every(k=>k.checked); }); }
      function setChildren(group,val){ qsa('.sub input[type="checkbox"]',group).forEach(c=>c.checked=val); }
      function updateMeter(){
        const total=subChecks.length+parentChecks.length;
        const done=Array.from(subChecks).filter(c=>c.checked).length+Array.from(parentChecks).filter(c=>c.checked).length;
        const pct=total?(done/total*100):0;
        bar.style.width=pct.toFixed(1)+'%';
        statText.textContent=`${done}/${total} complete`;
      }

      function applyIncompleteFilter(enabled){
        qsa('li.group').forEach(li=>{
          const p=li.querySelector(':scope > input.parent');
          const kids=qsa('.sub input[type="checkbox"]',li);
          const isDone=p.checked && Array.from(kids).every(k=>k.checked);
          li.style.display=(enabled && isDone)?'none':'';
        });
        btnToggle.setAttribute('aria-pressed', enabled?'true':'false');
        btnToggle.textContent=enabled?'Show all':'Show incomplete';
        sendHeight();
      }

      function waitForImages(el){
        const imgs=Array.from(el.querySelectorAll('img'));
        return Promise.all(imgs.map(i=>{
          if('decode' in i){ try{return i.decode();}catch(e){} }
          if(i.complete && i.naturalWidth) return Promise.resolve();
          return new Promise(res=>{ i.addEventListener('load',res,{once:true}); i.addEventListener('error',res,{once:true}); });
        }));
      }
      function sanitize(s){ return String(s||'').replace(/[^\w\-]+/g,'_'); }
      async function exportPdf(){
        const label=btnPdf.querySelector('.btn-label');
        const spinner=document.createElement('span'); spinner.className='spinner';
        btnPdf.disabled=true; label.textContent='Generating…'; btnPdf.appendChild(spinner);
        try{
          const el=root; await waitForImages(el);
          const now=new Date();
          const fname=`ManeMap_Checklist_${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}.pdf`;
          const worker=html2pdf().set({
            margin:0.5,
            image:{type:'jpeg',quality:0.98},
            html2canvas:{scale:2,useCORS:true,allowTaint:true,backgroundColor:'#ffffff',scrollX:0,scrollY:-window.scrollY},
            jsPDF:{unit:'in',format:'a4',orientation:'portrait'},
            pagebreak:{mode:['avoid-all','css','legacy'],before:'.card'}
          }).from(el).toPdf();
          const blob=await worker.output('blob');
          const url=URL.createObjectURL(blob);
          const a=document.createElement('a'); a.href=url; a.download=sanitize(fname); document.body.appendChild(a); a.click(); a.remove();
          URL.revokeObjectURL(url);
        }catch(e){
          console.warn('PDF export failed; using print()', e);
          window.print();
        }finally{
          btnPdf.disabled=false; spinner.remove(); label.textContent='Download PDF';
        }
      }

      function sendHeight(){
        try{
          var b=document.body, d=document.documentElement;
          var h=Math.max(b.scrollHeight,d.scrollHeight,b.offsetHeight,d.offsetHeight,b.clientHeight,d.clientHeight);
          parent.postMessage({ type:"MM_IFRAME_HEIGHT", h:h }, "*");
        }catch(e){}
      }

      root.addEventListener('change', (e)=>{
        const t=e.target;
        if(t.matches('input[type="checkbox"][data-role="sub"]')){
          reflectSubLabels(); reflectParentsFromChildren(); updateMeter(); saveState(); sendHeight();
        } else if(t.matches('input.parent')){
          const group=t.closest('li.group'); setChildren(group,t.checked);
          reflectSubLabels(); reflectParentsFromChildren(); updateMeter(); saveState(); sendHeight();
        }
      });
      btnAll.addEventListener('click', ()=>{ subChecks.forEach(cb=>cb.checked=true); reflectSubLabels(); reflectParentsFromChildren(); updateMeter(); saveState(); sendHeight(); });
      btnNone.addEventListener('click', ()=>{ subChecks.forEach(cb=>cb.checked=false); reflectSubLabels(); reflectParentsFromChildren(); updateMeter(); saveState(); sendHeight(); });
      btnReset.addEventListener('click', ()=>{ if(confirm('Clear all saved progress on this device?')){ try{localStorage.removeItem(STORAGE_KEY);}catch(e){} subChecks.forEach(cb=>cb.checked=false); reflectSubLabels(); reflectParentsFromChildren(); updateMeter(); saveState(); sendHeight(); } });
      btnToggle.addEventListener('click', ()=>{ const enabled=btnToggle.getAttribute('aria-pressed')!=='true'; applyIncompleteFilter(enabled); try{localStorage.setItem(INCOMPLETE_KEY,enabled?'1':'0');}catch(e){} });
      btnTheme.addEventListener('click', toggleTheme);
      btnPdf.addEventListener('click', exportPdf);

      (function restore(){ const data=loadState(); subChecks.forEach(cb=>cb.checked=!!data[cb.dataset.key]); })();
      reflectSubLabels(); reflectParentsFromChildren(); updateMeter();
      applyIncompleteFilter((function(){try{return localStorage.getItem(INCOMPLETE_KEY)==='1';}catch(e){return false}})());

      window.addEventListener("load", sendHeight);
      window.addEventListener("resize", sendHeight);
      window.addEventListener("message", (e)=>{ if(e && e.data && e.data.type==="MM_PING_HEIGHT") sendHeight(); });
      setTimeout(sendHeight, 120);
      setTimeout(sendHeight, 600);
    })();
  </script>
</body>
</html>
*/})

/* ==========================================
   Framer Code Component: tabbed iframe host
   - Listens for child height messages
   - Pings child after tab switch
   ========================================== */
export default function ManeMapChecklists() {
  const [tab, setTab] = useState("planner")
  const iframeRef = useRef(null)
  const [height, setHeight] = useState(900)

  const activeHtml = useMemo(() => (tab === "planner" ? HTML1 : HTML2), [tab])
  const title = tab === "planner" ? "Equine Budget Planner" : "Buyer & Stable Checklist"

  useEffect(() => {
    function onMessage(e) {
      const data = e?.data
      if (data && data.type === "MM_IFRAME_HEIGHT") {
        const h = Number(data.h) || 900
        setHeight(Math.max(700, Math.min(h, 6000)))
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  useEffect(() => {
    const iframe = iframeRef.current
    setHeight(900)
    const ping = () => {
      try {
        iframe?.contentWindow?.postMessage({ type: "MM_PING_HEIGHT" }, "*")
      } catch (e) {
        // ignored — iframe may not be ready yet
      }
    }
    const t1 = setTimeout(ping, 120)
    const t2 = setTimeout(ping, 400)
    const t3 = setTimeout(ping, 900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [tab])

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <button
          type="button"
          onClick={() => setTab("planner")}
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            cursor: "pointer",
            border: `1px solid ${tab === "planner" ? "#295E2B" : "rgba(0,0,0,0.15)"}`,
            background: tab === "planner" ? "#295E2B" : "#fff",
            color: tab === "planner" ? "#fff" : "#000",
            fontWeight: 700,
          }}
        >
          Budget Planner
        </button>
        <button
          type="button"
          onClick={() => setTab("buyer")}
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            cursor: "pointer",
            border: `1px solid ${tab === "buyer" ? "#295E2B" : "rgba(0,0,0,0.15)"}`,
            background: tab === "buyer" ? "#295E2B" : "#fff",
            color: tab === "buyer" ? "#fff" : "#000",
            fontWeight: 700,
          }}
        >
          Buyer &amp; Stable Checklist
        </button>
      </div>

      <iframe
        key={tab}
        ref={iframeRef}
        title={title}
        srcDoc={activeHtml}
        sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-downloads"
        style={{
          width: "100%",
          height,
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 12,
          background: "#fff",
        }}
      />
    </div>
  )
}
