
---

# ⭐ **GlowUpTips – Beauty & Makeup Tips Website**

A beginner-friendly beauty and skincare guidance website offering makeup tutorials, skincare routines, and simple product suggestions.
This is an educational demo project built with **HTML, CSS, and JavaScript**.

---

## 🌸 **Live Demo**

*(Add your Netlify / GitHub Pages link here)*

---

## 📌 **Features**

### 🏠 **Home Page**

* Clean hero section introducing the project with quick CTAs
* Weekly highlight card featuring a selected tutorial
* Category cards: Skincare, Everyday, Party/Wedding, Office looks (from `index.html`)


---

### 💄 **Makeup Tutorials**

* Large tutorial library with filters:

  * Occasion (Everyday, Party, Office, College, etc.)
  * Skill level (Beginner, Intermediate, Pro)
  * Time required (under 10, 10–20, 20+ minutes)
* Dynamic content loaded via JavaScript
* Each tutorial links to a **detailed tutorial page**
  (From `tutorials.html`)


---

### 📘 **Tutorial Details Page**

* Loads content dynamically using query parameters (e.g., `?id=soft-pink-everyday`)
* Displays:

  * Title
  * Steps
  * Image (when added)
  * Metadata like time + difficulty
    (From `tutorial.html`)


---

### 🧴 **Skincare Tips**

* Cards generated via JavaScript
* Routines organized by:

  * Skin type (Oily, Dry, Combination)
  * Concern (Acne, Dark Spots, Dullness, etc.)
* Each card expands/collapses to reveal:

  * Morning routine
  * Night routine
  * Do’s & Don’ts
    (From `tips.html`)


---

### 🛍️ **Product Suggestions**

* Not a shop — only beginner-friendly recommendations
* Filters:

  * Skin type
  * Budget
* Cards rendered with JS
  (From `products.html`)


---

## 🧱 **Tech Stack**

### **Frontend**

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla JS)**

  * Dynamic card rendering
  * Filtering systems
  * Query-based tutorial loading

### **No frameworks used** — lightweight & easy to understand.

---

## 📂 **Project Structure**

```
📁 GlowUpTips/
│── index.html
│── tutorials.html
│── tutorial.html
│── tips.html
│── products.html
│── about.html (if created)
│
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │    ├── main.js
│   │    ├── tutorials.js
│   │    ├── products.js
│   │    └── (other JS files)
│   └── images/
│
└── README.md  ← (this file)
```

---

## 🚀 **How to Run the Project**

### **Option 1 — Open locally**

1. Download the folder
2. Open `index.html` in any web browser
3. You're done!

### **Option 2 — Deploy to Netlify**

1. Go to **Netlify → Add new site → Deploy manually**
2. Upload your entire project folder
3. Site will go live instantly

### **Option 3 — Deploy to GitHub Pages**

1. Create a GitHub repo
2. Upload all files
3. Go to **Settings → Pages**
4. Choose branch → `main`
5. Save → Your site becomes public

---

## ✨ **Future Enhancements**

* Add real images for tutorials
* Add user favorites (using localStorage)
* Add dark mode toggle
* Add a simple backend for newsletter signup
* Add search bar for tutorials

---

## 🙌 **Credits**

Designed & developed as a learning project by **Ravikiran C**.
Assets, colors, and layout customized for a beauty-themed portfolio project.

---



Just tell me!
