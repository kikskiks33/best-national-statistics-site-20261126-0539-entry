// Boots the site: starts the router, then wires up the search box
// in the header. Search looks through the site's topics and headline
// figures and shows matching links in a little dropdown below the box;
// picking one jumps straight there. Enter takes the first match.

import { startRouter } from "./views.js";
import { HEADLINES } from "./data.js";

const TOPICS = [
  { name: "Population", route: "#/population", hint: "281.6 million people, age structure, provinces" },
  { name: "Economy", route: "#/economy", hint: "GDP, growth, sectors, trade, debt" },
  { name: "Jobs", route: "#/employment", hint: "unemployment, labour force, sectors of work" },
  { name: "Prices", route: "#/prices", hint: "inflation, cost of living, policy rate" },
  { name: "Society", route: "#/social", hint: "poverty, inequality, health, schooling" },
  { name: "Regions", route: "#/regions", hint: "38 provinces compared, sortable table" },
  { name: "About", route: "#/about", hint: "sources, methods, how to read a figure" },
];

function wireSearch() {
  const box = document.getElementById("site-search");
  const drop = document.getElementById("search-results");
  if (!box || !drop) return;

  // The search list is small and fixed, so it is built once here
  // from the topics and the headline figures — no index to fetch.
  const entries = [
    ...TOPICS.map((t) => ({ name: t.name, route: t.route, hint: t.hint })),
    ...HEADLINES.map((h) => ({ name: h.label, route: h.route, hint: `${h.value} — ${h.detail}` })),
  ];

  function show(q) {
    const query = q.trim().toLowerCase();
    if (!query) {
      drop.innerHTML = "";
      drop.hidden = true;
      return;
    }
    const hits = entries.filter(
      (e) => e.name.toLowerCase().includes(query) || e.hint.toLowerCase().includes(query),
    );
    if (!hits.length) {
      drop.innerHTML = `<p class="search-empty">Nothing matches “${q}”. Try “population”, “GDP” or “poverty”.</p>`;
    } else {
      drop.innerHTML = hits
        .map((h) => `<a href="${h.route}" class="search-hit"><strong>${h.name}</strong><span>${h.hint}</span></a>`)
        .join("");
    }
    drop.hidden = false;
  }

  box.addEventListener("input", () => show(box.value));
  box.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const first = drop.querySelector("a.search-hit");
      if (first) {
        window.location.hash = first.getAttribute("href");
        drop.hidden = true;
        box.value = "";
      }
    }
    if (e.key === "Escape") {
      drop.hidden = true;
      box.value = "";
    }
  });
  drop.addEventListener("click", () => {
    drop.hidden = true;
    box.value = "";
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) drop.hidden = true;
  });
}

startRouter();
wireSearch();
