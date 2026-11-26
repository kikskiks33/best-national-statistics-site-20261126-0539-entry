// The numbers the whole site runs on. I checked each figure against
// the source it names — Statistics Indonesia (BPS), the World Bank,
// the United Nations' population prospects, Bank Indonesia, APJII —
// and wrote the source and year next to it, so a reader never has to
// take a number on trust. Where a figure is an estimate, the note
// says so. The site ships these numbers in its own files; nothing
// is fetched from the network while you browse.

export const META = {
  country: "Indonesia",
  siteName: "NusaStat",
  tagline: "Indonesia in Numbers",
  updated: "26 November 2026",
  note: "All figures are the latest published vintage available at the time this page was compiled. Each card names its source and year.",
};

// Headline indicators for the home page — the six numbers most
// visitors come looking for, each with the change since last year.
export const HEADLINES = [
  {
    id: "population",
    label: "Population",
    value: "281.6m",
    detail: "4th largest in the world",
    change: "+1.0% on 2023",
    source: "BPS, 2024",
    route: "#/population",
  },
  {
    id: "gdp",
    label: "GDP",
    value: "$1.40tr",
    detail: "16th largest economy",
    change: "+5.0% real growth",
    source: "World Bank, 2024",
    route: "#/economy",
  },
  {
    id: "gdp-per-capita",
    label: "GDP per person",
    value: "$4,925",
    detail: "Upper-middle income",
    change: "+1.0% on 2023",
    source: "World Bank, 2024",
    route: "#/economy",
  },
  {
    id: "unemployment",
    label: "Unemployment",
    value: "4.91%",
    detail: "7.47 million people",
    change: "−0.41 pts on Aug 2023",
    source: "BPS Sakernas, Aug 2024",
    route: "#/employment",
  },
  {
    id: "poverty",
    label: "Poverty rate",
    value: "9.03%",
    detail: "25.22 million people",
    change: "−0.33 pts on Mar 2023",
    source: "BPS, Mar 2024",
    route: "#/social",
  },
  {
    id: "inflation",
    label: "Inflation",
    value: "1.57%",
    detail: "December, year on year",
    change: "Inside the 1.5–3.5% target",
    source: "BPS, Dec 2024",
    route: "#/prices",
  },
];

// Population in millions, 2015–2024. BPS's projection, anchored on
// the 2020 census — the count grows a little slower every year.
export const POPULATION_SERIES = [
  { year: 2015, value: 255.4 },
  { year: 2016, value: 258.9 },
  { year: 2017, value: 261.9 },
  { year: 2018, value: 265.0 },
  { year: 2019, value: 268.1 },
  { year: 2020, value: 270.2 },
  { year: 2021, value: 272.7 },
  { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
];

// Age structure, 2024. The UN's World Population Prospects —
// two in three Indonesians are of working age.
export const AGE_GROUPS = [
  { group: "0–14", share: 24.6, note: "Children" },
  { group: "15–64", share: 68.1, note: "Working age" },
  { group: "65+", share: 7.3, note: "Older people" },
];

// Population by ten-year age band, millions, 2024.
// UN World Population Prospects 2024, rounded to one decimal —
// the bulge in the teens and twenties is the demographic dividend.
export const AGE_BANDS = [
  { band: "0–9", value: 45.0 },
  { band: "10–19", value: 46.5 },
  { band: "20–29", value: 46.0 },
  { band: "30–39", value: 44.0 },
  { band: "40–49", value: 39.0 },
  { band: "50–59", value: 30.0 },
  { band: "60–69", value: 19.5 },
  { band: "70+", value: 11.6 },
];

// The twelve biggest provinces, mid-2024 (BPS). There are 38 in
// all — the rest are smaller, down to South Papua at the bottom.
export const PROVINCES = [
  { name: "West Java", island: "Java", pop: 50.35 },
  { name: "East Java", island: "Java", pop: 41.81 },
  { name: "Central Java", island: "Java", pop: 37.89 },
  { name: "North Sumatra", island: "Sumatra", pop: 15.59 },
  { name: "Banten", island: "Java", pop: 12.43 },
  { name: "Jakarta", island: "Java", pop: 10.56 },
  { name: "South Sulawesi", island: "Sulawesi", pop: 9.36 },
  { name: "Lampung", island: "Sumatra", pop: 9.25 },
  { name: "South Sumatra", island: "Sumatra", pop: 8.84 },
  { name: "Riau", island: "Sumatra", pop: 6.94 },
  { name: "West Sumatra", island: "Sumatra", pop: 5.88 },
  { name: "West Kalimantan", island: "Kalimantan", pop: 5.8 },
];

// Real GDP growth, % per year (BPS / World Bank).
export const GROWTH_SERIES = [
  { year: 2015, value: 4.9 },
  { year: 2016, value: 5.0 },
  { year: 2017, value: 5.1 },
  { year: 2018, value: 5.2 },
  { year: 2019, value: 5.0 },
  { year: 2020, value: -2.1 },
  { year: 2021, value: 3.7 },
  { year: 2022, value: 5.3 },
  { year: 2023, value: 5.0 },
  { year: 2024, value: 5.0 },
];

// GDP in current US dollars, billions (World Bank WDI).
export const GDP_SERIES = [
  { year: 2015, value: 860.9 },
  { year: 2016, value: 931.9 },
  { year: 2017, value: 1015.6 },
  { year: 2018, value: 1042.3 },
  { year: 2019, value: 1119.1 },
  { year: 2020, value: 1059.1 },
  { year: 2021, value: 1186.5 },
  { year: 2022, value: 1319.1 },
  { year: 2023, value: 1371.2 },
  { year: 2024, value: 1396.3 },
];

// Share of GDP by sector, 2024 (BPS). The last slice is everything else.
export const SECTORS = [
  { name: "Manufacturing", share: 18.7 },
  { name: "Wholesale & retail trade", share: 13.0 },
  { name: "Agriculture, forestry & fishing", share: 12.5 },
  { name: "Construction", share: 10.4 },
  { name: "Mining & quarrying", share: 9.4 },
  { name: "All other sectors", share: 36.0 },
];

// Open unemployment rate, August of each year (BPS Sakernas).
export const UNEMPLOYMENT_SERIES = [
  { year: 2019, value: 5.28 },
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

// Unemployment by group, August 2024 (BPS Sakernas).
export const UNEMPLOYMENT_SPLIT = [
  { group: "Men", value: 4.9 },
  { group: "Women", value: 4.92 },
  { group: "Urban", value: 5.79 },
  { group: "Rural", value: 3.67 },
];

// Where people work, share of the employed, August 2024 (BPS Sakernas).
export const JOBS_BY_SECTOR = [
  { name: "Services", share: 49.2 },
  { name: "Agriculture", share: 28.3 },
  { name: "Industry", share: 22.5 },
];

// Poverty headcount, March of each year (BPS).
export const POVERTY_SERIES = [
  { year: 2019, value: 9.41 },
  { year: 2020, value: 9.78 },
  { year: 2021, value: 10.14 },
  { year: 2022, value: 9.54 },
  { year: 2023, value: 9.36 },
  { year: 2024, value: 9.03 },
];

// Consumer price inflation, December year on year (BPS).
export const INFLATION_SERIES = [
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// A few more figures people come looking for, each with its source.
export const FACTS = {
  medianAge: { value: "30.1 years", source: "UN WPP, 2024" },
  urbanShare: { value: "59.0%", source: "UN WPP, 2024" },
  fertility: { value: "2.1 children per woman", source: "UN WPP, 2024" },
  lifeExpectancy: { value: "71.3 years", source: "World Bank, 2024" },
  schooling: { value: "9.2 years", source: "BPS, 2024" },
  labourForce: { value: "70.3%", source: "BPS Sakernas, Aug 2024" },
  employed: { value: "144.9 million", source: "BPS Sakernas, Aug 2024" },
  gini: { value: "0.379", source: "BPS, Mar 2024" },
  exports: { value: "$264.7bn", source: "BPS, 2024" },
  imports: { value: "$233.7bn", source: "BPS, 2024" },
  tradeBalance: { value: "+$31.0bn surplus", source: "BPS, 2024" },
  govDebt: { value: "39.8% of GDP", source: "IMF / BPS, 2024" },
  policyRate: { value: "6.00%", source: "Bank Indonesia, Sep 2024" },
  exchangeRate: { value: "Rp 16,000 per US$", source: "World Bank, 2024" },
  tourists: { value: "13.9 million arrivals", source: "BPS, 2024" },
  internetUsers: { value: "221.6 million", source: "APJII, 2024" },
  gdpPpp: { value: "$4.67tr", source: "World Bank, 2024" },
  gdpPppPerCapita: { value: "$16,515", source: "World Bank, 2024" },
};

// The latest published vintages, so a visitor can see how fresh each number is.
export const LATEST_FIGURES = [
  { figure: "Inflation, December 2024", value: "1.57% yoy", released: "2 Jan 2025", source: "BPS" },
  { figure: "Unemployment, August 2024", value: "4.91%", released: "5 Nov 2024", source: "BPS" },
  { figure: "Poverty, March 2024", value: "9.03%", released: "1 Jul 2024", source: "BPS" },
  { figure: "Population, 2024", value: "281.6 million", released: "2024", source: "BPS" },
  { figure: "GDP, 2024", value: "$1,396.3bn", released: "2025", source: "World Bank" },
  { figure: "Trade, 2024", value: "$31.0bn surplus", released: "Jan 2025", source: "BPS" },
];

// Short plain-language notes that sit under the charts.
export const NOTES = {
  population:
    "Growth has slowed from about 1.3% a year in 2015 to about 1.0% in 2024, and the United Nations expects the population to pass 320 million around 2050 before levelling off.",
  economy:
    "Indonesia is the world's 16th largest economy and the largest in Southeast Asia — about 35% of the region's GDP. Growth has held near 5% a year since the pandemic rebound.",
  employment:
    "Unemployment has fallen every year since the 2020 peak of 7.07%. It is higher in cities (5.79%) than in the countryside (3.67%), and about the same for men and women.",
  poverty:
    "The poverty rate is the lowest in a decade. Rural poverty (11.79%) is still well above urban poverty (7.09%), and the Gini index of inequality is 0.379.",
  prices:
    "Inflation peaked at 5.51% in December 2022 and has been inside Bank Indonesia's 1.5–3.5% target band since late 2023.",
  regions:
    "Java holds about 56% of all Indonesians on about 7% of the land. West Java alone has more people than most countries — 50.35 million.",
};
