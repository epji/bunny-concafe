const express = require("express");
const app = express();

// Static files (CSS, images)
app.use(express.static("public"));

// Form handling
app.use(express.urlencoded({ extended: true }));

// Homepage
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

        <h1>Bunny Recovery Concafe</h1>

        <img
          src="/images/welcome.png"
          class="sprite"
          alt="Minitoma maid"
        >

        <div class="right-panel">

          <form method="POST" action="/result" class="menu-form">

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
            <p>Judging by your expression...</p>
            <p>It's been that kind of week, hasn't it?</p>
            <p>Let's prepare a recovery plan together.</p>
          </div>

      </div>
    </body>
    </html>
  `);
});

// Result page
app.post("/result", (req, res) => {
    const mood = req.body.mood;
    const drink = req.body.drink;
    const service = req.body.service;
    const cheki = req.body.cheki;
  
    let score = 0;
    let totalPrice = 1500;
  
    // Mood score
    if (mood === "sleepy") score += 40;
    if (mood === "stressed") score += 30;
    if (mood === "hungry") score += 20;
    if (mood === "assignment") score += 5;
  
    // Drink score
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
  
    // Service score
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
  
    // Cheki
    if (cheki) {
      score += 10;
      totalPrice += 500;
    }
  
    let image;
    let ending;
  
    if (score >= 80) {
      image = "happy.png";
      ending =
        "Excellent recovery! Minitoma believes you can survive another week!";
    }
    else if (score >= 50) {
      image = "worried.png";
      ending =
        "Recovery is progressing, but please remember to rest and drink water.";
    }
    else {
      image = "panic.png";
      ending =
        "EMERGENCY! Minitoma has activated the Student Recovery Protocol!";
    }
  
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Recovery Result</title>
        <link rel="stylesheet" href="/style.css">
      </head>
  
      <body>
        <div class="page">
  
          <h1>Recovery Result</h1>
  
          <img src="/images/${image}" class="sprite">
  
          <div class="right-panel">
            <div class="menu-form">
  
              <h2>Recovery Summary</h2>
  
              <p><strong>Recovery Score:</strong> ${score}</p>
              <p><strong>Total Price:</strong> ¥${totalPrice}</p>
  
              <p>${ending}</p>
  
              <br>
  
              <a href="/">← Return to Concafe</a>
  
            </div>
          </div>
  
        </div>
      </body>
      </html>
    `);
  });
  
// Start server
app.listen(3000, () => {
  console.log(
    "Bunny Recovery Concafe is running at http://localhost:3000"
  );
});