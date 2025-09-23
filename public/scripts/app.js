import { PRESET_DATA } from "./presets.js";

const STORAGE_KEY = "manemap.v2";
const formatNumber = (value) => (Number.isFinite(value) ? value : 0);
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const numericIds = [
  "horseKg",
  "pctBW",
  "baleKg",
  "balePrice",
  "wastePct",
  "pastureMonths",
  "pasturePct",
  "grainMonthly",
  "suppMonthly",
  "beddingQtyWeek",
  "beddingUnitPrice",
  "farrierWeeks",
  "farrierVisit",
  "farrierExtras",
  "vetCallAnnual",
  "dentalCallAnnual",
  "dentalAnnual",
  "vaccCore",
  "vaccRisk",
  "vaccTravel",
  "fecalCount",
  "fecalPrice",
  "dewormerAnnual",
  "blanketAnnual",
  "flyAnnual",
  "bodyworkAnnual",
  "saddleAnnual",
  "tripsYear",
  "fuelPerTrip",
  "arenaPerTrip",
  "showsYear",
  "entriesPerShow",
  "trainerPerShow",
  "transportPerShow",
  "membershipsAnnual",
  "consumablesAnnual",
  "eolRetAnnual",
  "insLiability",
  "insMedical",
  "fencingAnnual",
  "pastureAnnual",
  "utilitiesAnnual",
  "manureAnnual"
];

const booleanIds = [
  "withTax",
  "incHay",
  "useHayModule",
  "incBedding",
  "toggleHaul",
  "toggleCompete",
  "toggleHome"
];

const selectIds = ["wastePreset", "displayMode"];
const textIds = [];

const haySummary = $("#haySummary");
const hayFields = $("#hayFields");
const wastePreset = $("#wastePreset");
const wastePct = $("#wastePct");

let presetChart;
let adjustmentChart;

const scenarioIndex = buildScenarioIndex(PRESET_DATA);

function buildScenarioIndex(data) {
  const countries = [];
  const scenarioMap = new Map();

  Object.entries(data).forEach(([country, config]) => {
    const currency = config.currency || "";
    const entry = { country, currency, scenarios: [] };

    if (config.scenarios) {
      Object.entries(config.scenarios).forEach(([scenarioName, scenario]) => {
        const id = `${country}::${scenarioName}`;
        const descriptor = {
          id,
          country,
          region: null,
          scenarioName,
          displayName: scenarioName,
          description: scenario.description || "",
          currency: scenario.currency || currency,
          categories: scenario.categories
        };
        entry.scenarios.push(descriptor);
        scenarioMap.set(id, descriptor);
      });
    }

    if (config.regions) {
      Object.entries(config.regions).forEach(([regionName, regionConfig]) => {
        Object.entries(regionConfig.scenarios || {}).forEach(([scenarioName, scenario]) => {
          const id = `${country}::${regionName}::${scenarioName}`;
          const descriptor = {
            id,
            country,
            region: regionName,
            scenarioName,
            displayName: `${regionName} — ${scenarioName}`,
            description: scenario.description || "",
            currency: scenario.currency || regionConfig.currency || currency,
            categories: scenario.categories
          };
          entry.scenarios.push(descriptor);
          scenarioMap.set(id, descriptor);
        });
      });
    }

    entry.scenarios.sort((a, b) => a.displayName.localeCompare(b.displayName));
    countries.push(entry);
  });

  countries.sort((a, b) => a.country.localeCompare(b.country));
  return { countries, scenarioMap };
}

function detectDefaultCountry() {
  return scenarioIndex.countries[0]?.country ?? "";
}

function populateCountrySelect() {
  const countrySelect = $("#country");
  countrySelect.innerHTML = "";
  scenarioIndex.countries.forEach(({ country }) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.append(option);
  });
}

function populateScenarioSelect(country, selectedId) {
  const scenarioSelect = $("#scenario");
  scenarioSelect.innerHTML = "";
  const countryEntry = scenarioIndex.countries.find((c) => c.country === country);
  if (!countryEntry) return;
  countryEntry.scenarios.forEach((scenario) => {
    const option = document.createElement("option");
    option.value = scenario.id;
    option.textContent = scenario.displayName;
    option.dataset.description = scenario.description || "";
    if (selectedId && selectedId === scenario.id) {
      option.selected = true;
    }
    scenarioSelect.append(option);
  });
}

function getInputNumber(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const raw = el.value.replace(/,/g, ".");
  const number = Number.parseFloat(raw);
  return Number.isFinite(number) ? number : 0;
}

function isChecked(id) {
  const el = document.getElementById(id);
  return Boolean(el?.checked);
}

function getSelectValue(id) {
  return document.getElementById(id)?.value ?? "";
}

function getTextValue(id) {
  return document.getElementById(id)?.value ?? "";
}

function saveState() {
  const snapshot = {
    country: $("#country").value,
    scenarioId: $("#scenario").value,
    withTax: isChecked("withTax"),
    currency: getTextValue("currency"),
    displayMode: getSelectValue("displayMode"),
    inputs: {}
  };

  numericIds.forEach((id) => {
    snapshot.inputs[id] = getInputNumber(id);
  });
  booleanIds.forEach((id) => {
    snapshot.inputs[id] = isChecked(id);
  });
  selectIds.forEach((id) => {
    snapshot.inputs[id] = getSelectValue(id);
  });
  textIds.forEach((id) => {
    snapshot.inputs[id] = getTextValue(id);
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (error) {
    console.warn("Unable to persist state", error);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (error) {
    console.warn("Unable to load state", error);
    return null;
  }
}

function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

function toggleHayFields() {
  const includeHay = isChecked("incHay");
  const useModule = isChecked("useHayModule");
  hayFields.hidden = includeHay || !useModule;
  wastePct.disabled = getSelectValue("wastePreset") !== "custom";
}

function computeHayModule(currencySymbol) {
  const includeHay = isChecked("incHay");
  const useModule = isChecked("useHayModule");

  if (includeHay) {
    haySummary.textContent = "Hay included in board";
    return { monthlyCost: 0, monthlyKg: 0, baleCount: 0 };
  }

  if (!useModule) {
    haySummary.textContent = "Manual entry only";
    return { monthlyCost: 0, monthlyKg: 0, baleCount: 0 };
  }

  const weightKg = Math.max(0, getInputNumber("horseKg"));
  const pctBW = Math.max(0, getInputNumber("pctBW")) / 100;
  const baleKg = Math.max(1, getInputNumber("baleKg"));
  const balePrice = Math.max(0, getInputNumber("balePrice"));
  const wasteSelection = getSelectValue("wastePreset");
  const wastePercent = wasteSelection === "custom" ? getInputNumber("wastePct") : Number(wasteSelection);
  const waste = Math.max(0, wastePercent) / 100;
  const pastureMonths = Math.min(12, Math.max(0, getInputNumber("pastureMonths")));
  const pastureContribution = Math.min(100, Math.max(0, getInputNumber("pasturePct"))) / 100;

  const daysPerMonth = 30;
  const monthlyForageDemand = weightKg * pctBW * daysPerMonth;
  const pastureMonthsKg = monthlyForageDemand * pastureContribution;
  const dryLotMonths = 12 - pastureMonths;

  const annualForageKg =
    dryLotMonths * monthlyForageDemand +
    pastureMonths * (monthlyForageDemand - pastureMonthsKg);

  const adjustedAnnualKg = annualForageKg * (1 + waste);
  const monthlyKg = adjustedAnnualKg / 12;
  const monthlyBales = monthlyKg / baleKg;
  const monthlyCost = balePrice > 0 ? monthlyBales * balePrice : 0;

  const formattedCost = `${currencySymbol}${monthlyCost.toFixed(0)}`;
  haySummary.textContent = `${formattedCost} / month • ${monthlyBales.toFixed(1)} bales`;

  return { monthlyCost, monthlyKg, baleCount: monthlyBales };
}

function beddingMonthly() {
  if (isChecked("incBedding")) return 0;
  const qty = getInputNumber("beddingQtyWeek");
  const unitPrice = getInputNumber("beddingUnitPrice");
  return qty * unitPrice * (52 / 12);
}

function farrierMonthlyAdjustment() {
  const weeks = Math.max(1, getInputNumber("farrierWeeks"));
  const visit = getInputNumber("farrierVisit");
  const extras = getInputNumber("farrierExtras");
  return (visit + extras) * (4.345 / weeks);
}

function haulMonthly() {
  if (!isChecked("toggleHaul")) return 0;
  const trips = getInputNumber("tripsYear");
  const perTrip = getInputNumber("fuelPerTrip") + getInputNumber("arenaPerTrip");
  return (trips * perTrip) / 12;
}

function competeMonthly() {
  if (!isChecked("toggleCompete")) return 0;
  const shows = getInputNumber("showsYear");
  const perShow = getInputNumber("entriesPerShow") + getInputNumber("trainerPerShow") + getInputNumber("transportPerShow");
  const memberships = getInputNumber("membershipsAnnual");
  return (shows * perShow) / 12 + memberships / 12;
}

function homeMonthly() {
  if (!isChecked("toggleHome")) return 0;
  const annual =
    getInputNumber("fencingAnnual") +
    getInputNumber("pastureAnnual") +
    getInputNumber("utilitiesAnnual") +
    getInputNumber("manureAnnual");
  return annual / 12;
}

function collectAdjustments(currencySymbol) {
  const hay = computeHayModule(currencySymbol).monthlyCost;
  const grain = getInputNumber("grainMonthly");
  const supplements = getInputNumber("suppMonthly");
  const bedding = beddingMonthly();
  const farrier = farrierMonthlyAdjustment();
  const callouts = (getInputNumber("vetCallAnnual") + getInputNumber("dentalCallAnnual")) / 12;
  const dental = getInputNumber("dentalAnnual") / 12;
  const vaccinations = (getInputNumber("vaccCore") + getInputNumber("vaccRisk") + getInputNumber("vaccTravel")) / 12;
  const parasite = ((getInputNumber("fecalCount") * getInputNumber("fecalPrice")) + getInputNumber("dewormerAnnual")) / 12;
  const blanket = getInputNumber("blanketAnnual") / 12;
  const fly = getInputNumber("flyAnnual") / 12;
  const bodywork = getInputNumber("bodyworkAnnual") / 12;
  const saddle = getInputNumber("saddleAnnual") / 12;
  const haul = haulMonthly();
  const insurance = (getInputNumber("insLiability") + getInputNumber("insMedical")) / 12;
  const home = homeMonthly();
  const competing = competeMonthly();
  const consumables = getInputNumber("consumablesAnnual") / 12;
  const funds = getInputNumber("eolRetAnnual") / 12;

  const rows = [
    { label: "Hay", monthly: hay },
    { label: "Grain & balancer", monthly: grain },
    { label: "Supplements", monthly: supplements },
    { label: "Bedding", monthly: bedding },
    { label: "Farrier", monthly: farrier },
    { label: "Vet & dental call-outs", monthly: callouts },
    { label: "Dental exam", monthly: dental },
    { label: "Vaccinations", monthly: vaccinations },
    { label: "Parasite control", monthly: parasite },
    { label: "Blanket care", monthly: blanket },
    { label: "Fly control", monthly: fly },
    { label: "Bodywork", monthly: bodywork },
    { label: "Saddle fitting", monthly: saddle },
    { label: "Transport / haul-out", monthly: haul, hidden: !isChecked("toggleHaul") && haul === 0 },
    { label: "Insurance", monthly: insurance },
    { label: "Home upkeep", monthly: home, hidden: !isChecked("toggleHome") && home === 0 },
    { label: "Shows & memberships", monthly: competing, hidden: !isChecked("toggleCompete") && competing === 0 },
    { label: "Consumables", monthly: consumables },
    { label: "Retirement fund", monthly: funds }
  ];

  const visibleRows = rows.filter((row) => row.monthly > 0.01);
  const monthly = visibleRows.reduce((total, row) => total + row.monthly, 0);
  return { monthly, annual: monthly * 12, rows: visibleRows };
}

function sumScenario(descriptor, useWithTax) {
  const breakdown = [];
  let monthlyTotal = 0;
  let annualTotal = 0;

  Object.entries(descriptor.categories).forEach(([category, values]) => {
    const annual = useWithTax ? values.annual.withTax : values.annual.preTax;
    const monthlyCandidate = useWithTax ? values.monthly.withTax : values.monthly.preTax;
    const monthly = monthlyCandidate || (annual ? annual / 12 : 0);

    breakdown.push({
      label: category,
      monthly: formatNumber(monthly),
      annual: formatNumber(annual)
    });
    monthlyTotal += formatNumber(monthly);
    annualTotal += formatNumber(annual);
  });

  return { monthly: monthlyTotal, annual: annualTotal, breakdown };
}

function formatCurrency(symbol, value) {
  const trimmed = (symbol || "").trim();
  const prefix = trimmed.length > 1 ? `${trimmed} ` : trimmed;
  return `${prefix}${Math.round(value).toLocaleString()}`.trim();
}

function renderChips(descriptor, mode, withTax) {
  const chipList = $("#chipList");
  chipList.innerHTML = "";
  const chips = [
    `Region: ${descriptor.country}${descriptor.region ? ` / ${descriptor.region}` : ""}`,
    `Scenario: ${descriptor.scenarioName}`,
    `Mode: ${withTax ? "with tax" : "pre-tax"}`,
    `View: ${mode}`
  ];
  chips.forEach((label) => {
    const span = document.createElement("span");
    span.className = "chip";
    span.textContent = label;
    chipList.append(span);
  });
}

let lastDescriptionEl = null;
function renderScenarioDescription(text) {
  if (lastDescriptionEl) {
    lastDescriptionEl.remove();
    lastDescriptionEl = null;
  }
  if (!text) return;
  const desc = document.createElement("p");
  desc.className = "panel__summary";
  desc.textContent = text;
  $("#chipList").after(desc);
  lastDescriptionEl = desc;
}

function updateTables(preset, adjustments, currency) {
  const presetTableBody = $("#presetTable tbody");
  const adjustmentTableBody = $("#adjustmentTable tbody");
  presetTableBody.innerHTML = "";
  adjustmentTableBody.innerHTML = "";

  if (preset.breakdown.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td colspan="3">No preset data available.</td>';
    presetTableBody.append(tr);
  } else {
    preset.breakdown.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.label}</td>
        <td class="numeric">${formatCurrency(currency, row.monthly)}</td>
        <td class="numeric">${formatCurrency(currency, row.annual)}</td>
      `;
      presetTableBody.append(tr);
    });
  }

  if (adjustments.rows.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td colspan="3">No adjustments added yet.</td>';
    adjustmentTableBody.append(tr);
  } else {
    adjustments.rows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.label}</td>
        <td class="numeric">${formatCurrency(currency, row.monthly)}</td>
        <td class="numeric">${formatCurrency(currency, row.monthly * 12)}</td>
      `;
      adjustmentTableBody.append(tr);
    });
  }
}

function ensureCharts() {
  if (!window.Chart) return;
  if (!presetChart) {
    const ctx = $("#presetChart").getContext("2d");
    presetChart = new Chart(ctx, {
      type: "doughnut",
      data: { labels: [], datasets: [{ data: [], backgroundColor: [], borderWidth: 0 }] },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom", labels: { color: "#d3ece3" } }
        },
        cutout: "62%",
        radius: "90%"
      }
    });
  }
  if (!adjustmentChart) {
    const ctx = $("#adjustmentChart").getContext("2d");
    adjustmentChart = new Chart(ctx, {
      type: "doughnut",
      data: { labels: [], datasets: [{ data: [], backgroundColor: [], borderWidth: 0 }] },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom", labels: { color: "#d3ece3" } }
        },
        cutout: "62%",
        radius: "90%"
      }
    });
  }
}

function buildChartPalette(size) {
  const base = ["#47c0a7", "#8bd8c9", "#3f9180", "#6ec4b0", "#2f6a59", "#9fe2d4", "#275348"];
  const palette = [];
  for (let i = 0; i < size; i += 1) {
    palette.push(base[i % base.length]);
  }
  return palette;
}

function updateCharts(preset, adjustments) {
  ensureCharts();
  if (!presetChart || !adjustmentChart) return;

  const presetLabels = preset.breakdown.map((row) => row.label);
  const presetValues = preset.breakdown.map((row) => Math.max(0.1, Math.round(row.monthly)));
  if (presetLabels.length === 0) {
    presetChart.data.labels = ["No preset data"];
    presetChart.data.datasets[0].data = [1];
    presetChart.data.datasets[0].backgroundColor = ["#1f3a30"];
  } else {
    presetChart.data.labels = presetLabels;
    presetChart.data.datasets[0].data = presetValues;
    presetChart.data.datasets[0].backgroundColor = buildChartPalette(presetLabels.length);
  }
  presetChart.update();

  const adjLabels = adjustments.rows.map((row) => row.label);
  const adjValues = adjustments.rows.map((row) => Math.max(0.1, Math.round(row.monthly)));
  if (adjLabels.length === 0) {
    adjustmentChart.data.labels = ["No adjustments yet"];
    adjustmentChart.data.datasets[0].data = [1];
    adjustmentChart.data.datasets[0].backgroundColor = ["#1f3a30"];
  } else {
    adjustmentChart.data.labels = adjLabels;
    adjustmentChart.data.datasets[0].data = adjValues;
    adjustmentChart.data.datasets[0].backgroundColor = buildChartPalette(adjLabels.length);
  }
  adjustmentChart.update();
}

function updateTotals(preset, adjustments, currency, mode) {
  const presetTotal = mode === "monthly" ? preset.monthly : preset.annual;
  const adjustmentTotal = mode === "monthly" ? adjustments.monthly : adjustments.annual;
  const combinedTotal = presetTotal + adjustmentTotal;

  $("#presetTotal").textContent = formatCurrency(currency, presetTotal);
  $("#adjTotal").textContent = formatCurrency(currency, adjustmentTotal);
  $("#combinedTotal").textContent = formatCurrency(currency, combinedTotal);
}

function compute() {
  const country = $("#country").value;
  const scenarioId = $("#scenario").value;
  const descriptor = scenarioIndex.scenarioMap.get(scenarioId);
  if (!descriptor) {
    return;
  }

  const withTax = isChecked("withTax");
  const currency = getTextValue("currency") || descriptor.currency || PRESET_DATA[country]?.currency || "";
  const displayMode = getSelectValue("displayMode");

  renderChips(descriptor, displayMode, withTax);
  renderScenarioDescription(descriptor.description);
  toggleHayFields();

  const presetTotals = sumScenario(descriptor, withTax);
  const adjustments = collectAdjustments(currency);

  updateTotals(presetTotals, adjustments, currency, displayMode);
  updateTables(presetTotals, adjustments, currency);
  updateCharts(presetTotals, adjustments);

  $("#lastUpdated").textContent = new Date().toISOString().slice(0, 10);

  window.__manemapSnapshot = {
    country,
    scenario: descriptor.displayName,
    mode: withTax ? "with tax" : "pre-tax",
    displayMode,
    currency,
    preset: presetTotals,
    adjustments,
    totals: {
      monthly: presetTotals.monthly + adjustments.monthly,
      annual: presetTotals.annual + adjustments.annual
    },
    breakdown: {
      preset: presetTotals.breakdown,
      adjustments: adjustments.rows
    }
  };

  saveState();
}

function hookInputs() {
  $("#country").addEventListener("change", () => {
    const country = $("#country").value;
    populateScenarioSelect(country);
    const descriptor = scenarioIndex.scenarioMap.get($("#scenario").value);
    const autoCurrency = descriptor?.currency || PRESET_DATA[country]?.currency || getTextValue("currency");
    if (!getTextValue("currency") || getTextValue("currency").trim().length <= 1) {
      $("#currency").value = autoCurrency || "";
    }
    compute();
  });

  $("#scenario").addEventListener("change", () => {
    const descriptor = scenarioIndex.scenarioMap.get($("#scenario").value);
    const autoCurrency = descriptor?.currency || PRESET_DATA[$("#country").value]?.currency || "";
    const current = getTextValue("currency");
    if (!current || current.trim().length <= 1) {
      $("#currency").value = autoCurrency;
    }
    compute();
  });

  ["#withTax", "#currency", "#displayMode"].forEach((selector) => {
    $(selector).addEventListener("change", compute);
    $(selector).addEventListener("input", compute);
  });

  [...numericIds, ...booleanIds, ...selectIds, ...textIds]
    .filter((id) => !["withTax", "currency", "displayMode"].includes(id))
    .forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const eventName = el.type === "checkbox" ? "change" : "input";
      el.addEventListener(eventName, compute);
    });

  wastePreset.addEventListener("change", () => {
    if (wastePreset.value !== "custom") {
      wastePct.value = wastePreset.value;
    }
    wastePct.disabled = wastePreset.value !== "custom";
    compute();
  });

  $("[data-action=reset-all]").addEventListener("click", resetState);

  $("[data-action=download-csv]").addEventListener("click", downloadCsv);
  $("[data-action=download-pdf]").addEventListener("click", downloadPdf);
}

function hydrateState(saved) {
  const countrySelect = $("#country");
  const country = saved?.country && scenarioIndex.countries.some((c) => c.country === saved.country)
    ? saved.country
    : detectDefaultCountry();
  countrySelect.value = country;
  populateScenarioSelect(country, saved?.scenarioId);

  if (!saved?.scenarioId || !scenarioIndex.scenarioMap.has(saved.scenarioId)) {
    $("#scenario").selectedIndex = 0;
  }

  const descriptor = scenarioIndex.scenarioMap.get($("#scenario").value);
  const initialCurrency = descriptor?.currency || PRESET_DATA[country]?.currency || "";
  $("#currency").value = saved?.currency || initialCurrency;
  $("#withTax").checked = saved?.withTax ?? true;
  $("#displayMode").value = saved?.displayMode || "monthly";

  const inputs = saved?.inputs || {};
  numericIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const value = inputs[id];
    if (typeof value === "number" && Number.isFinite(value)) {
      el.value = value;
    }
  });
  booleanIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (typeof inputs[id] === "boolean") {
      el.checked = inputs[id];
    }
  });
  selectIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (typeof inputs[id] === "string") {
      el.value = inputs[id];
    }
  });
  textIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (typeof inputs[id] === "string" && id !== "currency") {
      el.value = inputs[id];
    }
  });

  toggleHayFields();
}

function setupTabs() {
  const navButtons = $$(".adjustments__nav .tag");
  const panels = $$(".adjustments__panel");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      navButtons.forEach((btn) => btn.classList.toggle("tag--active", btn === button));
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.tabPanel !== tab;
      });
    });
  });
}

function downloadCsv() {
  const snapshot = window.__manemapSnapshot;
  if (!snapshot) return;
  const rows = [
    ["Region", `${snapshot.country}`],
    ["Scenario", snapshot.scenario],
    ["Mode", snapshot.mode],
    [],
    ["Preset monthly", snapshot.preset.monthly.toFixed(2)],
    ["Preset annual", snapshot.preset.annual.toFixed(2)],
    [],
    ["Preset breakdown", "Monthly", "Annual"],
    ...snapshot.breakdown.preset.map((row) => [row.label, row.monthly.toFixed(2), row.annual.toFixed(2)]),
    [],
    ["Adjustments monthly", snapshot.adjustments.monthly.toFixed(2)],
    ["Adjustments annual", snapshot.adjustments.annual.toFixed(2)],
    [],
    ["Adjustments breakdown", "Monthly", "Annual"],
    ...snapshot.breakdown.adjustments.map((row) => [row.label, row.monthly.toFixed(2), (row.monthly * 12).toFixed(2)]),
    [],
    ["Combined monthly", snapshot.totals.monthly.toFixed(2)],
    ["Combined annual", snapshot.totals.annual.toFixed(2)]
  ];
  const csv = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  saveAs(blob, "manemap-estimate.csv");
}

function downloadPdf() {
  const snapshot = window.__manemapSnapshot;
  if (!snapshot || !window.jspdf) return;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const currency = snapshot.currency || "";
  const fmt = (value) => `${currency}${Math.round(value).toLocaleString()}`;

  doc.setFillColor(16, 38, 31);
  doc.rect(0, 0, width, 90, "F");
  doc.setTextColor(230, 245, 239);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("ManeMap", margin, 50);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(170, 210, 200);
  doc.text("Horse ownership cost studio", margin, 70);

  doc.autoTable({
    startY: 110,
    head: [["Summary", "Value"]],
    body: [
      ["Region", `${snapshot.country}`],
      ["Scenario", snapshot.scenario],
      ["Mode", snapshot.mode],
      ["Preset monthly", fmt(snapshot.preset.monthly)],
      ["Preset annual", fmt(snapshot.preset.annual)],
      ["Adjustments monthly", fmt(snapshot.adjustments.monthly)],
      ["Adjustments annual", fmt(snapshot.adjustments.annual)],
      ["Combined monthly", fmt(snapshot.totals.monthly)],
      ["Combined annual", fmt(snapshot.totals.annual)]
    ],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [71, 192, 167], textColor: [6, 35, 28], halign: "left" },
    columnStyles: { 1: { halign: "right" } },
    margin: { left: margin, right: margin }
  });

  const presetRows = snapshot.breakdown.preset.length
    ? snapshot.breakdown.preset.map((row) => [row.label, fmt(row.monthly), fmt(row.annual)])
    : [["No preset data", "-", "-"]];
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 14,
    head: [["Preset breakdown", "Monthly", "Annual"]],
    body: presetRows,
    theme: "striped",
    styles: { fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [16, 38, 31], textColor: [230, 245, 239], halign: "left" },
    columnStyles: { 1: { halign: "right" }, 2: { halign: "right" } },
    margin: { left: margin, right: margin }
  });

  const adjustmentRows = snapshot.breakdown.adjustments.length
    ? snapshot.breakdown.adjustments.map((row) => [row.label, fmt(row.monthly), fmt(row.monthly * 12)])
    : [["No adjustments added", "-", "-"]];
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 14,
    head: [["Adjustments breakdown", "Monthly", "Annual"]],
    body: adjustmentRows,
    theme: "striped",
    styles: { fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [16, 38, 31], textColor: [230, 245, 239], halign: "left" },
    columnStyles: { 1: { halign: "right" }, 2: { halign: "right" } },
    margin: { left: margin, right: margin }
  });

  let cursor = doc.lastAutoTable.finalY + 20;
  if (cursor > height - 120) {
    doc.addPage();
    cursor = margin;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(50, 60, 56);
  doc.text("Notes", margin, cursor);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90, 100, 96);
  doc.text(
    "Values combine dataset presets with your adjustments. Adjust hay, transport and competition sliders to explore scenarios.",
    margin,
    cursor + 16,
    { maxWidth: width - margin * 2 }
  );

  const totalPages = doc.internal.getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    doc.setFontSize(9);
    doc.setTextColor(140, 150, 145);
    doc.text(
      `Page ${page}/${totalPages}  •  © ${new Date().getFullYear()} ManeMap`,
      width - margin,
      height - 24,
      { align: "right" }
    );
  }

  doc.save("manemap-estimate.pdf");
}

function init() {
  populateCountrySelect();
  const saved = loadState();
  hydrateState(saved);
  hookInputs();
  setupTabs();
  compute();
}

init();
