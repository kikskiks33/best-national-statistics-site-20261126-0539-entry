// The pages of the site. Each one is a function that returns its HTML,
// and a small router swaps them in when the address after the # changes.
// Everything here runs from the files the site ships — no fetch, no network,
// and every button on a page does what it says it does.

import {
  META,
  HEADLINES,
  POPULATION_SERIES,
  AGE_GROUPS,
  AGE_BANDS,
  PROVINCES,
  GROWTH_SERIES,
  GDP_SERIES,
  SECTORS,
  UNEMPLOYMENT_SERIES,
  UNEMPLOYMENT_SPLIT,
  JOBS_BY_SECTOR,
  POVERTY_SERIES,
  INFLATION_SERIES,
  FACTS,
  LATEST_FIGURES,
  NOTES,
} from "./data.js";
import { lineChart, barChart, donutChart, hbarChart } from "./charts.js";

const TOTAL_POP = 281.6;

function fmtMillions(v) {
  return v.toFixed(1) + "m";
}

function sourceLine(source) {
  return `<p class="source">Source: ${source}</p>`;
}

function headlineCard(h) {
  return `<a class="card headline" href="${h.route}">
    <span class="k-label">${h.label}</span>
    <span class="k-value">${h.value}</span>
    <span class="k-detail">${h.detail}</span>
    <span class="k-change">${h.change}</span>
    <span class="k-source">Source: ${h.source}</span>
  </a>`;
}

function topicCard(title, blurb, route, figure) {
  return `<a class="card topic" href="${route}">
    <span class="t-figure">${figure}</span>
    <span class="t-title">${title}</span>
    <span class="t-blurb">${blurb}</span>
    <span class="t-link">Explore →</span>
  </a>`;
}

function renderHome() {
  const cards = HEADLINES.map(headlineCard).join("");
  const latest = LATEST_FIGURES.map(
    (f) => `<tr><td>${f.figure}</td><td><strong>${f.value}</strong></td><td>${f.released}</td><td>${f.source}</td></tr>`,
  ).join("");
  return `
  <section class="hero">
    <p class="eyebrow">Statistics Indonesia · Updated ${META.updated}</p>
    <h1>Indonesia in numbers.</h1>
    <p class="lede">Population, the economy, jobs, prices and daily life — the country's official figures, checked against their sources and explained in plain language. Every number on this site names where it came from and when.</p>
    <div class="hero-stats">
      <div><strong>281.6m</strong><span>people, 2024</span></div>
      <div><strong>$1.40tr</strong><span>GDP, 2024</span></div>
      <div><strong>38</strong><span>provinces</span></div>
      <div><strong>17,000+</strong><span>islands</span></div>
    </div>
  </section>

  <section aria-label="Headline indicators">
    <h2>Headline indicators</h2>
    <div class="grid-3">${cards}</div>
  </section>

  <section class="split">
    <div class="panel">
      <h2>Population, 2015–2024</h2>
      <p class="panel-sub">Millions of people. The census of 2020 anchors the series; later years are projections.</p>
      ${lineChart(POPULATION_SERIES, { format: fmtMillions, height: 250, axisFormat: (v) => v.toFixed(0) + "m" })}
      ${sourceLine("BPS (Statistics Indonesia), population projection 2020–2050")}
      <p class="note">${NOTES.population}</p>
    </div>
    <div class="panel">
      <h2>Real GDP growth</h2>
      <p class="panel-sub">Annual change in gross domestic product, percent. The 2020 dip is the pandemic year.</p>
      ${barChart(GROWTH_SERIES, { format: (v) => v.toFixed(1) + "%", height: 250, axisFormat: (v) => v.toFixed(0) + "%" })}
      ${sourceLine("BPS / World Bank, 2015–2024")}
      <p class="note">${NOTES.economy}</p>
    </div>
  </section>

  <section aria-label="Browse by topic">
    <h2>Browse by topic</h2>
    <div class="grid-3">
      ${topicCard("Population", "Who lives here, how old they are, and where — province by province.", "#/population", "281.6m")}
      ${topicCard("Economy", "GDP, growth, what the country makes and sells, and what it owes.", "#/economy", "$1.40tr")}
      ${topicCard("Jobs", "Who works, who is looking for work, and in which sectors.", "#/employment", "4.91%")}
      ${topicCard("Prices", "Inflation, the cost of living, and the central bank's rate.", "#/prices", "1.57%")}
      ${topicCard("Society", "Poverty, inequality, health and schooling.", "#/social", "9.03%")}
      ${topicCard("Regions", "All 38 provinces compared — the biggest table on this site.", "#/regions", "38")}
    </div>
  </section>

  <section class="panel">
    <h2>Latest figures</h2>
    <p class="panel-sub">The newest published vintage of each headline series, with the date it was released.</p>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Figure</th><th>Value</th><th>Released</th><th>Source</th></tr></thead>
      <tbody>${latest}</tbody>
    </table></div>
  </section>`;
}

function renderPopulation() {
  const rows = PROVINCES.slice(0, 6).map(
    (p) => `<tr><td>${p.name}</td><td>${p.island}</td><td>${p.pop.toFixed(2)}m</td><td>${((p.pop / TOTAL_POP) * 100).toFixed(1)}%</td></tr>`,
  ).join("");
  const ageRows = AGE_GROUPS.map(
    (a) => `<tr><td>${a.group} years</td><td>${a.note}</td><td>${a.share}%</td></tr>`,
  ).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Topic · Population</p>
    <h1>281.6 million people</h1>
    <p class="lede">Indonesia is the world's fourth most populous country, on more than 17,000 islands. Growth is slowing, the population is still young, and more than half of everyone lives on Java.</p>
  </section>

  <section class="grid-3" aria-label="Key population facts">
    <div class="card fact"><span class="k-label">Median age</span><span class="k-value">${FACTS.medianAge.value}</span><span class="k-source">Source: ${FACTS.medianAge.source}</span></div>
    <div class="card fact"><span class="k-label">Living in towns &amp; cities</span><span class="k-value">${FACTS.urbanShare.value}</span><span class="k-source">Source: ${FACTS.urbanShare.source}</span></div>
    <div class="card fact"><span class="k-label">Fertility rate</span><span class="k-value">${FACTS.fertility.value}</span><span class="k-source">Source: ${FACTS.fertility.source}</span></div>
  </section>

  <section class="split">
    <div class="panel">
      <h2>How the population grew</h2>
      <p class="panel-sub">Millions of people, 2015–2024.</p>
      ${lineChart(POPULATION_SERIES, { format: fmtMillions, height: 250, axisFormat: (v) => v.toFixed(0) + "m" })}
      ${sourceLine("BPS, population projection 2020–2050")}
      <p class="note">${NOTES.population}</p>
    </div>
    <div class="panel">
      <h2>Who is how old</h2>
      <p class="panel-sub">Millions of people in each ten-year band, 2024.</p>
      ${barChart(AGE_BANDS, { format: fmtMillions, height: 250, color: "#d97706", axisFormat: (v) => v.toFixed(0) + "m" })}
      ${sourceLine("UN World Population Prospects 2024, rounded")}
      <p class="note">The bulge in the 10–29 bands is the demographic dividend: about 68% of Indonesians are of working age.</p>
    </div>
  </section>

  <section class="split">
    <div class="panel">
      <h2>Age structure</h2>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Age group</th><th>Who they are</th><th>Share</th></tr></thead>
        <tbody>${ageRows}</tbody>
      </table></div>
      ${sourceLine("UN World Population Prospects 2024")}
    </div>
    <div class="panel">
      <h2>Biggest provinces</h2>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Province</th><th>Island</th><th>Population</th><th>Share</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
      ${sourceLine("BPS, mid-2024")}
      <p><a class="btn" href="#/regions">See all 38 provinces →</a></p>
    </div>
  </section>`;
}

function renderEconomy() {
  return `
  <section class="page-head">
    <p class="eyebrow">Topic · Economy</p>
    <h1>A $1.40 trillion economy</h1>
    <p class="lede">The largest economy in Southeast Asia and the 16th largest in the world. Growth has held near 5% a year since the pandemic, and income per person keeps climbing.</p>
  </section>

  <section class="grid-3" aria-label="Key economic facts">
    <div class="card fact"><span class="k-label">GDP per person</span><span class="k-value">${FACTS.gdpPppPerCapita.value}</span><span class="k-source">PPP, ${FACTS.gdpPppPerCapita.source}</span></div>
    <div class="card fact"><span class="k-label">GDP (PPP)</span><span class="k-value">${FACTS.gdpPpp.value}</span><span class="k-source">Source: ${FACTS.gdpPpp.source}</span></div>
    <div class="card fact"><span class="k-label">Government debt</span><span class="k-value">${FACTS.govDebt.value}</span><span class="k-source">Source: ${FACTS.govDebt.source}</span></div>
  </section>

  <section class="panel">
    <h2>Output and growth</h2>
    <p class="panel-sub">Pick a measure — the chart and the figures change together.</p>
    <div class="switcher" role="group" aria-label="Choose a measure">
      <button class="switch-btn active" data-metric="gdp">GDP, $bn</button>
      <button class="switch-btn" data-metric="growth">Growth, %</button>
      <button class="switch-btn" data-metric="percapita">GDP per person, $</button>
    </div>
    <div id="economy-chart">${barChart(GDP_SERIES, { format: (v) => "$" + v.toLocaleString("en-US"), height: 260, axisFormat: (v) => "$" + (v >= 1000 ? (v / 1000).toFixed(1) + "k" : v.toFixed(0)) })}</div>
    <p class="source" id="economy-source">Source: World Bank, World Development Indicators 2024</p>
    <p class="note">${NOTES.economy}</p>
  </section>

  <section class="split">
    <div class="panel">
      <h2>What the economy makes</h2>
      <p class="panel-sub">Share of GDP by sector, 2024.</p>
      ${donutChart(SECTORS, { height: 300 })}
      ${sourceLine("BPS, 2024")}
    </div>
    <div class="panel">
      <h2>Trade with the world</h2>
      <p class="panel-sub">Goods exports and imports, 2024.</p>
      <div class="trade">
        <div><span class="k-label">Exports</span><strong>${FACTS.exports.value}</strong><span class="k-source">${FACTS.exports.source}</span></div>
        <div><span class="k-label">Imports</span><strong>${FACTS.imports.value}</strong><span class="k-source">${FACTS.imports.source}</span></div>
        <div><span class="k-label">Balance</span><strong>${FACTS.tradeBalance.value}</strong><span class="k-source">${FACTS.tradeBalance.source}</span></div>
      </div>
      <p class="note">Indonesia has run a goods trade surplus every year since 2020, carried by coal, palm oil, nickel and manufactured goods. Foreign visitors are back too: ${FACTS.tourists.value} in 2024 (BPS).</p>
      <h3>Money</h3>
      <div class="table-wrap"><table class="data-table">
        <tbody>
          <tr><td>Policy rate</td><td><strong>${FACTS.policyRate.value}</strong></td><td>${FACTS.policyRate.source}</td></tr>
          <tr><td>Exchange rate</td><td><strong>${FACTS.exchangeRate.value}</strong></td><td>${FACTS.exchangeRate.source}</td></tr>
          <tr><td>Internet users</td><td><strong>${FACTS.internetUsers.value}</strong></td><td>${FACTS.internetUsers.source}</td></tr>
        </tbody>
      </table></div>
    </div>
  </section>`;
}

function renderEmployment() {
  return `
  <section class="page-head">
    <p class="eyebrow">Topic · Jobs</p>
    <h1>144.9 million people at work</h1>
    <p class="lede">Unemployment is at its lowest in years, but the labour market still leans informal: most people work in services and farming, not in factories or offices.</p>
  </section>

  <section class="grid-3" aria-label="Key jobs facts">
    <div class="card fact"><span class="k-label">Labour force participation</span><span class="k-value">${FACTS.labourForce.value}</span><span class="k-source">Source: ${FACTS.labourForce.source}</span></div>
    <div class="card fact"><span class="k-label">People employed</span><span class="k-value">${FACTS.employed.value}</span><span class="k-source">Source: ${FACTS.employed.source}</span></div>
    <div class="card fact"><span class="k-label">Unemployed</span><span class="k-value">7.47 million</span><span class="k-source">Source: BPS Sakernas, Aug 2024</span></div>
  </section>

  <section class="split">
    <div class="panel">
      <h2>Unemployment is falling</h2>
      <p class="panel-sub">Open unemployment rate, August of each year, percent.</p>
      ${lineChart(UNEMPLOYMENT_SERIES, { format: (v) => v.toFixed(2) + "%", height: 250, color: "#b45309", axisFormat: (v) => v.toFixed(1) + "%" })}
      ${sourceLine("BPS Sakernas, 2019–2024")}
      <p class="note">${NOTES.employment}</p>
    </div>
    <div class="panel">
      <h2>Who is out of work</h2>
      <p class="panel-sub">Unemployment rate by group, August 2024.</p>
      ${hbarChart(UNEMPLOYMENT_SPLIT, { format: (v) => v.toFixed(2) + "%", color: "#b45309" })}
      ${sourceLine("BPS Sakernas, August 2024")}
      <p class="note">City jobseekers wait longer than rural ones, and the rate is almost identical for men (4.90%) and women (4.92%).</p>
      <h3>Where people work</h3>
      ${hbarChart(JOBS_BY_SECTOR, { format: (v) => v.toFixed(1) + "%" })}
      ${sourceLine("BPS Sakernas, August 2024")}
    </div>
  </section>`;
}

function renderPrices() {
  return `
  <section class="page-head">
    <p class="eyebrow">Topic · Prices</p>
    <h1>Prices are calm again</h1>
    <p class="lede">After the 2022 spike, inflation is back inside Bank Indonesia's target band — 1.57% in December 2024, the lowest December reading in years.</p>
  </section>

  <section class="grid-3" aria-label="Key prices facts">
    <div class="card fact"><span class="k-label">Inflation, Dec 2024</span><span class="k-value">1.57%</span><span class="k-source">Source: BPS, Dec 2024</span></div>
    <div class="card fact"><span class="k-label">Target band</span><span class="k-value">1.5–3.5%</span><span class="k-source">Source: Bank Indonesia</span></div>
    <div class="card fact"><span class="k-label">Policy rate</span><span class="k-value">${FACTS.policyRate.value}</span><span class="k-source">Source: ${FACTS.policyRate.source}</span></div>
  </section>

  <section class="split">
    <div class="panel">
      <h2>Inflation, year by year</h2>
      <p class="panel-sub">Consumer prices, December year on year, percent.</p>
      ${barChart(INFLATION_SERIES, { format: (v) => v.toFixed(2) + "%", height: 250, color: "#1d4ed8", axisFormat: (v) => v.toFixed(0) + "%" })}
      ${sourceLine("BPS, 2021–2024")}
      <p class="note">${NOTES.prices}</p>
    </div>
    <div class="panel">
      <h2>What moved prices in 2024</h2>
      <p class="panel-sub">The December 2024 reading was driven by food and gold, while administered prices and transport stayed soft.</p>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Driver</th><th>Direction</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>Food prices</td><td><strong>Up</strong></td><td>Main upward push in December</td></tr>
          <tr><td>Gold jewellery</td><td><strong>Up</strong></td><td>Followed world gold prices</td></tr>
          <tr><td>Transport</td><td><strong>Flat</strong></td><td>Fuel prices held steady</td></tr>
          <tr><td>Core inflation</td><td><strong>Low</strong></td><td>Underlying demand stayed soft</td></tr>
        </tbody>
      </table></div>
      ${sourceLine("BPS press release, 2 January 2025")}
      <h3>Money in your pocket</h3>
      <p class="note">The rupiah averaged about ${FACTS.exchangeRate.value} in 2024 (World Bank). Bank Indonesia cut its policy rate to 6.00% in September 2024 as inflation cooled.</p>
    </div>
  </section>`;
}

function renderSocial() {
  return `
  <section class="page-head">
    <p class="eyebrow">Topic · Society</p>
    <h1>Fewer people in poverty</h1>
    <p class="lede">The poverty rate is the lowest in a decade, people live longer and stay in school longer — but the gaps between city and countryside, and between provinces, are still wide.</p>
  </section>

  <section class="grid-3" aria-label="Key social facts">
    <div class="card fact"><span class="k-label">Life expectancy</span><span class="k-value">${FACTS.lifeExpectancy.value}</span><span class="k-source">Source: ${FACTS.lifeExpectancy.source}</span></div>
    <div class="card fact"><span class="k-label">Mean years of schooling</span><span class="k-value">${FACTS.schooling.value}</span><span class="k-source">Source: ${FACTS.schooling.source}</span></div>
    <div class="card fact"><span class="k-label">Gini index</span><span class="k-value">${FACTS.gini.value}</span><span class="k-source">Source: ${FACTS.gini.source}</span></div>
  </section>

  <section class="split">
    <div class="panel">
      <h2>Poverty is falling</h2>
      <p class="panel-sub">Share of the population below the national poverty line, March of each year.</p>
      ${lineChart(POVERTY_SERIES, { format: (v) => v.toFixed(2) + "%", height: 250, axisFormat: (v) => v.toFixed(0) + "%" })}
      ${sourceLine("BPS, 2019–2024")}
      <p class="note">${NOTES.poverty}</p>
    </div>
    <div class="panel">
      <h2>The gap, in one table</h2>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Measure</th><th>Urban</th><th>Rural</th></tr></thead>
        <tbody>
          <tr><td>Poverty rate, Mar 2024</td><td>7.09%</td><td>11.79%</td></tr>
          <tr><td>Unemployment, Aug 2024</td><td>5.79%</td><td>3.67%</td></tr>
          <tr><td>Share of population</td><td>59.0%</td><td>41.0%</td></tr>
        </tbody>
      </table></div>
      ${sourceLine("BPS Sakernas &amp; Susenas, 2024; UN WPP 2024")}
      <h3>Daily life</h3>
      <p class="note">About ${FACTS.internetUsers.value} Indonesians are online (APJII, 2024) — nearly four in five people. ${FACTS.tourists.value} visited in 2024 (BPS), the most since before the pandemic.</p>
    </div>
  </section>`;
}

function renderRegions() {
  const rows = PROVINCES.map(
    (p) => `<tr><td>${p.name}</td><td>${p.island}</td><td data-num="${p.pop}">${p.pop.toFixed(2)}</td><td>${((p.pop / TOTAL_POP) * 100).toFixed(1)}%</td></tr>`,
  ).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Topic · Regions</p>
    <h1>38 provinces, one country</h1>
    <p class="lede">The twelve largest provinces hold most of the country. Click a column heading to sort the table, type in the box to filter it, or download the whole table as a spreadsheet file.</p>
  </section>

  <section class="panel">
    <div class="table-tools">
      <label class="filter-label">Filter provinces
        <input id="province-filter" type="search" placeholder="Type a province or island…" aria-label="Filter provinces">
      </label>
      <button class="btn" id="download-csv" type="button">Download table (CSV)</button>
    </div>
    <div class="table-wrap"><table class="data-table sortable" id="province-table">
      <thead><tr>
        <th data-sort="name">Province ↕</th>
        <th data-sort="island">Island ↕</th>
        <th data-sort="pop">Population, millions ↕</th>
        <th data-sort="share">Share of Indonesia ↕</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    <p class="source">Source: BPS, mid-2024. The twelve largest provinces are shown here; the other 26 are smaller, down to South Papua, the least populous.</p>
    <p class="note">${NOTES.regions}</p>
  </section>`;
}

function renderAbout() {
  return `
  <section class="page-head">
    <p class="eyebrow">About this site</p>
    <h1>What NusaStat is</h1>
    <p class="lede">NusaStat is an independent reader's guide to Indonesia's official statistics. It is not the statistics office, and it is not affiliated with it — it collects the figures the office and the World Bank publish, checks them, and explains them in plain language.</p>
  </section>

  <section class="split">
    <div class="panel">
      <h2>Where the numbers come from</h2>
      <ul class="plain-list">
        <li><strong>BPS — Statistics Indonesia</strong>: population, poverty, unemployment, inflation, trade and the sectors of the economy.</li>
        <li><strong>World Bank, World Development Indicators</strong>: GDP, GDP per person, life expectancy and the exchange rate.</li>
        <li><strong>United Nations, World Population Prospects 2024</strong>: age structure, median age, fertility and the urban share.</li>
        <li><strong>Bank Indonesia</strong>: the policy rate and the inflation target band.</li>
        <li><strong>APJII</strong>: internet users.</li>
      </ul>
      <p class="note">Every figure on this site names its source and year next to the number. If a figure is a projection or an estimate, the note says so.</p>
    </div>
    <div class="panel">
      <h2>How to read a figure</h2>
      <ul class="plain-list">
        <li><strong>Year matters.</strong> A 2024 figure and a 2023 figure are not the same number — check the year before you quote one.</li>
        <li><strong>Rates have a month.</strong> Unemployment is measured in August, poverty in March, inflation in December. The month is part of the figure.</li>
        <li><strong>Shares add up.</strong> Sector shares are of GDP; age shares are of the population. The denominator is named in the chart.</li>
        <li><strong>Money is nominal unless it says PPP.</strong> GDP per person is $4,925 at market prices and $16,515 adjusted for what money buys locally.</li>
      </ul>
      <h2>What this site is not</h2>
      <p class="note">It is not a news site and it does not forecast. Figures appear here after their source publishes them; nothing here is a prediction.</p>
    </div>
  </section>`;
}

const ROUTES = {
  "/": renderHome,
  "/population": renderPopulation,
  "/economy": renderEconomy,
  "/employment": renderEmployment,
  "/prices": renderPrices,
  "/social": renderSocial,
  "/regions": renderRegions,
  "/about": renderAbout,
};

function routeFromHash() {
  const hash = window.location.hash || "#/";
  const path = hash.slice(1) || "/";
  return ROUTES[path] ? path : "/";
}

// Paints the page for the current address, marks the matching nav
// link, and hands the page to wirePage so its own controls work.
function showPage() {
  const route = routeFromHash();
  const page = document.getElementById("page");
  page.innerHTML = ROUTES[route]();
  document.querySelectorAll(".nav-link").forEach((a) => {
    const target = a.getAttribute("href");
    a.classList.toggle("active", target === "#" + route);
  });
  window.scrollTo(0, 0);
  wirePage(route);
}

// Controls that only exist on one page get wired after that page renders.
function wirePage(route) {
  if (route === "/economy") {
    const perCapita = GDP_SERIES.map((d) => ({ year: d.year, value: Math.round((d.value * 1000) / POPULATION_SERIES.find((p) => p.year === d.year).value) }));
    const charts = {
      gdp: { html: barChart(GDP_SERIES, { format: (v) => "$" + v.toLocaleString("en-US"), height: 260, axisFormat: (v) => "$" + (v >= 1000 ? (v / 1000).toFixed(1) + "k" : v.toFixed(0)) }), source: "Source: World Bank, World Development Indicators 2024" },
      growth: { html: barChart(GROWTH_SERIES, { format: (v) => v.toFixed(1) + "%", height: 260, axisFormat: (v) => v.toFixed(0) + "%" }), source: "Source: BPS / World Bank, 2015–2024" },
      percapita: { html: barChart(perCapita, { format: (v) => "$" + v.toLocaleString("en-US"), height: 260, axisFormat: (v) => "$" + (v >= 1000 ? (v / 1000).toFixed(1) + "k" : v.toFixed(0)) }), source: "Source: World Bank GDP divided by BPS population, 2015–2024" },
    };
    document.querySelectorAll(".switch-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".switch-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const picked = charts[btn.dataset.metric];
        document.getElementById("economy-chart").innerHTML = picked.html;
        document.getElementById("economy-source").textContent = picked.source;
      });
    });
  }

  if (route === "/regions") {
    const table = document.getElementById("province-table");
    const tbody = table.querySelector("tbody");
    let sortKey = null;
    let ascending = true;
    const valueOf = (row, key) => {
      const cells = row.querySelectorAll("td");
      if (key === "name") return cells[0].textContent;
      if (key === "island") return cells[1].textContent;
      if (key === "pop") return parseFloat(cells[2].dataset.num);
      return parseFloat(cells[3].textContent);
    };
    table.querySelectorAll("th[data-sort]").forEach((th) => {
      th.addEventListener("click", () => {
        const key = th.dataset.sort;
        ascending = key === sortKey ? !ascending : true;
        sortKey = key;
        const rows = Array.from(tbody.querySelectorAll("tr"));
        rows.sort((a, b) => {
          const va = valueOf(a, key);
          const vb = valueOf(b, key);
          if (typeof va === "number") return ascending ? va - vb : vb - va;
          return ascending ? va.localeCompare(vb) : vb.localeCompare(va);
        });
        rows.forEach((r) => tbody.appendChild(r));
      });
    });
    document.getElementById("province-filter").addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      tbody.querySelectorAll("tr").forEach((row) => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });
    document.getElementById("download-csv").addEventListener("click", () => {
      const lines = ["Province,Island,Population (millions),Share of Indonesia (%)"];
      PROVINCES.forEach((p) => lines.push(`${p.name},${p.island},${p.pop.toFixed(2)},${((p.pop / TOTAL_POP) * 100).toFixed(1)}`));
      const blob = new Blob([lines.join("\n")], { type: "text/csv" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "nusastat-provinces-2024.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
  }
}

export function startRouter() {
  window.addEventListener("hashchange", showPage);
  showPage();
}
