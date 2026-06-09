const express = require("express");
const app = express();

// Use static files inside the public folder.
// This lets the browser load CSS and image files.
app.use(express.static("public"));

// This allows Express to read data sent from an HTML form.
app.use(express.urlencoded({ extended: true }));

// Convert internal form values into readable text.
const moodNames = {
  sleepy: "Sleepy",
  stressed: "Stressed",
  hungry: "Hungry",
  assignment: "Assignment Hell"
};

const drinkNames = {
  strawberry: "Strawberry Milk Latte",
  melon: "Melon Soda Float",
  coffee: "Maid Coffee",
  energy: "Emergency Energy Drink"
};

const serviceNames = {
  encouragement: "Encouragement",
  praise: "Praise",
  study: "Study Support",
  reality: "Reality Check"
};

// Homepage route.
// This page shows the VN-style interface and the form.
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Bunny Recovery Concafe</title>
      <link rel="stylesheet" href="/style.css">
    </head>

    <body>
      <div class="page">

        <div class="title-area">
          <h1>♡ Bunny Recovery Concafe ♡</h1>
          <p class="subtitle">A tiny maid café recovery planner for tired students</p>
        </div>

        <img
          src="/images/welcome.png"
          class="sprite"
          alt="Minitoma maid"
        >

        <div class="right-panel">
          <form method="POST" action="/result" class="menu-form">

            <h2>Recovery Menu</h2>

            <label>Mood</label>
            <select name="mood">
              <option value="sleepy">Sleepy</option>
              <option value="stressed">Stressed</option>
              <option value="hungry">Hungry</option>
              <option value="assignment">Assignment Hell</option>
            </select>

            <label>Drink</label>
            <select name="drink">
              <option value="strawberry">Strawberry Milk Latte</option>
              <option value="melon">Melon Soda Float</option>
              <option value="coffee">Maid Coffee</option>
              <option value="energy">Emergency Energy Drink</option>
            </select>

            <label>Service</label>
            <select name="service">
              <option value="encouragement">Encouragement</option>
              <option value="praise">Praise</option>
              <option value="study">Study Support</option>
              <option value="reality">Reality Check</option>
            </select>

            <label class="checkbox">
              <input type="checkbox" name="cheki" value="yes">
              Add Cheki (+500 yen)
            </label>

            <button type="submit">
              Begin Recovery ♡
            </button>

          </form>
        </div>

        <div class="dialogue-box">
          <p><strong>Minitoma:</strong> Welcome home, Master ♡</p>
          <p>Judging by your expression... it's been that kind of week, hasn't it?</p>
          <p>Let's prepare a recovery plan together.</p>
        </div>

      </div>
    </body>
    </html>
  `);
});

// Result route.
// The server receives form data, calculates the result,
// chooses a sprite, and sends a new HTML page back to the client.
app.post("/result", (req, res) => {
  const mood = req.body.mood;
  const drink = req.body.drink;
  const service = req.body.service;
  const cheki = req.body.cheki;

  let score = 0;
  let totalPrice = 1500;

  // Mood score calculation
  if (mood === "sleepy") score += 40;
  if (mood === "stressed") score += 30;
  if (mood === "hungry") score += 20;
  if (mood === "assignment") score += 5;

  // Drink score and price calculation
  if (drink === "strawberry") {
    score += 20;
    totalPrice += 700;
  }

  if (drink === "melon") {
    score += 15;
    totalPrice += 650;
  }

  if (drink === "coffee") {
    score += 10;
    totalPrice += 500;
  }

  if (drink === "energy") {
    score += 5;
    totalPrice += 800;
  }

  // Service score and price calculation
  if (service === "encouragement") {
    score += 30;
    totalPrice += 1000;
  }

  if (service === "praise") {
    score += 25;
    totalPrice += 1200;
  }

  if (service === "study") {
    score += 20;
    totalPrice += 1500;
  }

  if (service === "reality") {
    score -= 10;
    totalPrice += 800;
  }

  // Optional cheki
  if (cheki) {
    score += 10;
    totalPrice += 500;
  }

  let image;
  let resultTitle;
  let dialogue;
  let advice;
  let themeClass;

  // The server chooses a different result depending on the score.
  if (score >= 80) {
    image = "happy.png";
    resultTitle = "Full Recovery Ending";
    themeClass = "happy-theme";
    dialogue = "Master! Your recovery plan is perfect ♡ You look much better already!";
    advice = "Please continue with gentle pacing, enough sleep, and one small task at a time.";
  }
  else if (score >= 50) {
    image = "worried.png";
    resultTitle = "Careful Recovery Ending";
    themeClass = "worried-theme";
    dialogue = "Master... this plan will help, but Minitoma is still a little worried.";
    advice = "Take a real break, drink water, and do not try to finish everything at once.";
  }
  else {
    image = "panic.png";
    resultTitle = "Emergency Recovery Ending";
    themeClass = "panic-theme";
    dialogue = "MASTER NOOOO! Emergency student recovery protocol has been activated!";
    advice = "Please step away from the assignment for a moment. Eat something, breathe, and restart slowly.";
  }

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Recovery Result</title>
      <link rel="stylesheet" href="/style.css">
    </head>

    <body class="${themeClass}">
      <div class="page">

        <div class="title-area">
          <h1>${resultTitle}</h1>
          <p class="subtitle">Your custom recovery plan is ready ♡</p>
        </div>

        <img
          src="/images/${image}"
          class="sprite"
          alt="Minitoma result"
        >

        <div class="right-panel">
          <div class="result-card">

            <h2>Recovery Summary</h2>

            <div class="result-row">
              <span>Mood</span>
              <strong>${moodNames[mood]}</strong>
            </div>

            <div class="result-row">
              <span>Drink</span>
              <strong>${drinkNames[drink]}</strong>
            </div>

            <div class="result-row">
              <span>Service</span>
              <strong>${serviceNames[service]}</strong>
            </div>

            <div class="result-row">
              <span>Cheki</span>
              <strong>${cheki ? "Yes" : "No"}</strong>
            </div>

            <hr>

            <div class="result-row big">
              <span>Recovery Score</span>
              <strong>${score}</strong>
            </div>

            <div class="result-row big">
              <span>Total Price</span>
              <strong>¥${totalPrice}</strong>
            </div>

            <a class="back-link" href="/">← Return to Concafe</a>

          </div>
        </div>

        <div class="dialogue-box">
          <p><strong>Minitoma:</strong> ${dialogue}</p>
          <p>${advice}</p>
        </div>

      </div>
    </body>
    </html>
  `);
});

// Start the server on port 3000.
app.listen(3000, () => {
  console.log("Bunny Recovery Concafe is running at http://localhost:3000");
});