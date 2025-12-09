const productGrid = document.getElementById("productGrid");
const productEmpty = document.getElementById("productEmpty");

const renderProducts = (products) => {
  if (!productGrid) return;
  if (!products.length) {
    productGrid.innerHTML = "";
    productEmpty?.classList.remove("hidden");
    return;
  }
  productEmpty?.classList.add("hidden");
  productGrid.innerHTML = products
    .map(
      (p) => `
      <article class="card">
        <p class="label">${p.type}</p>
        <h3>${p.name}</h3>
        <div class="pill-row">
          ${p.skinType.map((s) => `<span class="chip">${s}</span>`).join("")}
          <span class="pill">Budget: ${p.budget}</span>
          <span class="chip">${p.tag}</span>
        </div>
        <p class="muted-text">For: ${p.for} • Price range: ${budgetLegend[p.budget] || p.budget}</p>
      </article>
    `
    )
    .join("");
};

const filterProducts = (allProducts) => {
  const skinType = document.getElementById("filterSkin")?.value || "";
  const budgetChecks = Array.from(document.querySelectorAll('.budget-group input[type="checkbox"]'));
  const budgets = budgetChecks.filter((c) => c.checked).map((c) => c.value);
  return allProducts.filter((p) => {
    const bySkin = !skinType || p.skinType.includes(skinType) || p.skinType.includes("All");
    const byBudget = budgets.includes(p.budget);
    return bySkin && byBudget;
  });
};

const budgetLegend = {
  "₹": "Under ₹500",
  "₹₹": "₹500 – ₹1200",
  "₹₹₹": "₹1200+"
};

fetch("data/products.json")
  .then((res) => res.json())
  .then((products) => {
    renderProducts(products);
    const skinSelect = document.getElementById("filterSkin");
    const budgetChecks = Array.from(document.querySelectorAll('.budget-group input[type="checkbox"]'));
    const apply = () => renderProducts(filterProducts(products));
    skinSelect?.addEventListener("change", apply);
    budgetChecks.forEach((c) => c.addEventListener("change", apply));
  })
  .catch(() => {
    if (productGrid) productGrid.innerHTML = "<p class='muted-text'>Could not load products.</p>";
  });

