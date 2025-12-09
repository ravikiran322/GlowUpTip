const navToggle = document.getElementById("navToggle");
const navbar = document.getElementById("navbar");

if (navToggle && navbar) {
  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
  });
}

// Newsletter demo handler
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = new FormData(newsletterForm).get("email");
    alert(`Thanks! We’ll send weekly tips to ${email}.`);
    newsletterForm.reset();
  });
}

// Home page featured tutorials
const featuredContainer = document.getElementById("featuredTutorials");
if (featuredContainer) {
  fetch("data/tutorials.json")
    .then((res) => res.json())
    .then((tutorials) => {
      const featured = tutorials.slice(0, 3);
      featuredContainer.innerHTML = featured
        .map(
          (t) => `
        <article class="card">
          <p class="label">${t.difficulty}</p>
          <h3>${t.title}</h3>
          <ul class="tutorial-meta">
            <li class="pill">${t.time} min</li>
            <li class="pill">${t.occasion.join(", ")}</li>
          </ul>
          <a class="btn ghost" href="tutorial.html?id=${t.id}">View steps</a>
        </article>
      `
        )
        .join("");
    })
    .catch(() => {
      featuredContainer.innerHTML = "<p class='muted-text'>Could not load tutorials right now.</p>";
    });
}

