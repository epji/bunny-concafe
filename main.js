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

        <div class="dialogue-box">
          <p><strong>Mood:</strong> ${mood}</p>
          <p><strong>Drink:</strong> ${drink}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Cheki:</strong> ${cheki ? "Yes" : "No"}</p>

          <br>

          <a href="/">← Return to Concafe</a>
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