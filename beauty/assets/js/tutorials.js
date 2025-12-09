const tutorialGrid = document.getElementById("tutorialGrid");
const tutorialEmpty = document.getElementById("tutorialEmpty");
const tutorialContent = document.getElementById("tutorialContent");

const favoritesKey = "glowup-favorites";
const loadFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(favoritesKey)) || [];
  } catch {
    return [];
  }
};
const saveFavorites = (ids) => localStorage.setItem(favoritesKey, JSON.stringify(ids));

const matchesFilters = (tutorial, filters) => {
  const byOccasion = !filters.occasion || tutorial.occasion.includes(filters.occasion);
  const bySkill = !filters.skill || tutorial.difficulty === filters.skill;
  let byTime = true;
  if (filters.time === "under10") byTime = tutorial.time < 10;
  if (filters.time === "10to20") byTime = tutorial.time >= 10 && tutorial.time <= 20;
  if (filters.time === "20plus") byTime = tutorial.time > 20;
  return byOccasion && bySkill && byTime;
};

const renderTutorialCards = (tutorials) => {
  if (!tutorialGrid) return;
  if (!tutorials.length) {
    tutorialGrid.innerHTML = "";
    tutorialEmpty?.classList.remove("hidden");
    return;
  }
  tutorialEmpty?.classList.add("hidden");
  tutorialGrid.innerHTML = tutorials
    .map(
      (t) => `
      <article class="card">
        <p class="label">${t.difficulty}</p>
        <h3>${t.title}</h3>
        <ul class="tutorial-meta">
          <li class="pill">${t.time} min</li>
          ${t.occasion.map((o) => `<li class="chip">${o}</li>`).join("")}
        </ul>
        <div class="tag-row">
          ${(t.tags || []).map((tag) => `<span class="chip">${tag}</span>`).join("")}
        </div>
        <a class="btn primary" href="tutorial.html?id=${t.id}">Open tutorial</a>
      </article>
    `
    )
    .join("");
};

const renderTutorialDetail = (tutorial) => {
  if (!tutorialContent) return;
  const favorites = loadFavorites();
  const isFavorite = favorites.includes(tutorial.id);
  tutorialContent.innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">${tutorial.difficulty} • ${tutorial.time} min</p>
      <h1>${tutorial.title}</h1>
      <div class="pill-row">
        ${tutorial.occasion.map((o) => `<span class="chip">${o}</span>`).join("")}
      </div>
    </div>
    <div class="card">
      <h3>Products (generic)</h3>
      <ul class="pill-row">
        ${tutorial.products.map((p) => `<li class="chip">${p}</li>`).join("")}
      </ul>
      <button class="btn ghost" id="favoriteBtn">${isFavorite ? "Remove from" : "Add to"} favorites</button>
    </div>
    <div class="card">
      <h3>Steps</h3>
      <ol class="tutorial-steps">
        ${tutorial.steps.map((s) => `<li>${s}</li>`).join("")}
      </ol>
    </div>
  `;

  const favoriteBtn = document.getElementById("favoriteBtn");
  favoriteBtn?.addEventListener("click", () => {
    const current = loadFavorites();
    const updated = current.includes(tutorial.id)
      ? current.filter((id) => id !== tutorial.id)
      : [...current, tutorial.id];
    saveFavorites(updated);
    favoriteBtn.textContent = `${updated.includes(tutorial.id) ? "Remove from" : "Add to"} favorites`;
  });
};

const initTutorialList = (tutorials) => {
  if (!tutorialGrid) return;
  const urlParams = new URLSearchParams(window.location.search);
  const occasionParam = urlParams.get("occasion");
  if (occasionParam) {
    const occSelect = document.getElementById("filterOccasion");
    if (occSelect) occSelect.value = occasionParam;
  }

  const filterOccasion = document.getElementById("filterOccasion");
  const filterSkill = document.getElementById("filterSkill");
  const filterTime = document.getElementById("filterTime");

  const applyFilters = () => {
    const filtered = tutorials.filter((t) =>
      matchesFilters(t, {
        occasion: filterOccasion?.value || "",
        skill: filterSkill?.value || "",
        time: filterTime?.value || "",
      })
    );
    renderTutorialCards(filtered);
  };

  [filterOccasion, filterSkill, filterTime].forEach((el) => el?.addEventListener("change", applyFilters));
  applyFilters();
};

const initTutorialDetail = (tutorials) => {
  if (!tutorialContent) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const match = tutorials.find((t) => t.id === id);
  if (!match) {
    tutorialContent.innerHTML = "<p class='muted-text'>Tutorial not found.</p>";
    return;
  }
  renderTutorialDetail(match);
};

fetch("data/tutorials.json")
  .then((res) => res.json())
  .then((tutorials) => {
    initTutorialList(tutorials);
    initTutorialDetail(tutorials);
  })
  .catch(() => {
    if (tutorialGrid) tutorialGrid.innerHTML = "<p class='muted-text'>Could not load tutorials.</p>";
    if (tutorialContent) tutorialContent.innerHTML = "<p class='muted-text'>Could not load tutorial.</p>";
  });

