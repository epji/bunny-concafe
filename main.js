const express = require("express");
const app = express();

// publicフォルダ内の静的ファイルを使用する。
// これにより、ブラウザがCSSファイルや画像ファイルを読み込める。
app.use(express.static("public"));

// HTMLフォームから送信されたデータをExpressで読み取れるようにする。
app.use(express.urlencoded({ extended: true }));

// フォーム内部の値を、画面に表示しやすい日本語に変換する。
const moodNames = {
  sleepy: "眠い",
  stressed: "ストレスがたまっている",
  hungry: "お腹が空いた",
  assignment: "課題地獄"
};

const drinkNames = {
  strawberry: "いちごミルクラテ",
  melon: "メロンソーダフロート",
  coffee: "メイドコーヒー",
  energy: "緊急エナジードリンク"
};

const serviceNames = {
  encouragement: "応援",
  praise: "ほめてもらう",
  study: "勉強サポート",
  reality: "現実チェック"
};

// トップページのルート。
// VN風の画面とフォームを表示する。
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>バニー回復コンカフェ</title>
      <link rel="stylesheet" href="/style.css">
    </head>

    <body>
      <div class="page">

        <div class="title-area">
          <h1>♡ バニー回復コンカフェ ♡</h1>
          <p class="subtitle">お疲れの学生さん向け回復プランナー</p>
        </div>

        <img
          src="/images/welcome.png"
          class="sprite"
          alt="ミニトマ メイド"
        >

        <div class="right-panel">
          <form method="POST" action="/result" class="menu-form">

            <h2>回復プラン</h2>

            <label>現在の状態</label>
            <select name="mood">
              <option value="sleepy">眠い</option>
              <option value="stressed">ストレスがたまっている</option>
              <option value="hungry">お腹が空いた</option>
              <option value="assignment">課題地獄</option>
            </select>

            <label>ドリンク</label>
            <select name="drink">
              <option value="strawberry">いちごミルクラテ</option>
              <option value="melon">メロンソーダフロート</option>
              <option value="coffee">メイドコーヒー</option>
              <option value="energy">緊急エナジードリンク</option>
            </select>

            <label>サービス</label>
            <select name="service">
              <option value="encouragement">応援</option>
              <option value="praise">ほめてもらう</option>
              <option value="study">勉強サポート</option>
              <option value="reality">現実チェック</option>
            </select>

            <label class="checkbox">
              <input type="checkbox" name="cheki" value="yes">
              チェキ追加（+500円）
            </label>

            <button type="submit">
              回復スタート ♡
            </button>

          </form>
        </div>

        <div class="dialogue-box">
          <p><strong>ミニトマ:</strong> お帰りなさいませ、ご主人様♡</p>
          <p>その表情を見ると…大変な一週間だったみたいですね。</p>
          <p>一緒に回復プランを考えましょう♪</p>
        </div>

      </div>
    </body>
    </html>
  `);
});

// 結果ページのルート。
// サーバはフォームデータを受け取り、回復度と料金を計算し、
// 結果に応じて画像とメッセージを変えて表示する。
app.post("/result", (req, res) => {
  const mood = req.body.mood;
  const drink = req.body.drink;
  const service = req.body.service;
  const cheki = req.body.cheki;

  let score = 0;
  let totalPrice = 1500;

  // 現在の状態による回復度の計算
  if (mood === "sleepy") score += 40;
  if (mood === "stressed") score += 30;
  if (mood === "hungry") score += 20;
  if (mood === "assignment") score += 5;

  // ドリンクによる回復度と料金の計算
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

  // サービスによる回復度と料金の計算
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

  // チェキを追加した場合
  if (cheki) {
    score += 10;
    totalPrice += 500;
  }

  let image;
  let resultTitle;
  let dialogue;
  let advice;
  let themeClass;

  // 回復度によって、表示する結果を変更する。
  if (score >= 80) {
    image = "happy.png";
    resultTitle = "完全回復エンド";
    themeClass = "happy-theme";
    dialogue = "ご主人様！今回の回復プランは完璧です♡ もう元気になってきましたね！";
    advice = "無理をしすぎず、睡眠を取りながら、一つずつ課題を進めていきましょう。";
  }
  else if (score >= 50) {
    image = "worried.png";
    resultTitle = "回復中エンド";
    themeClass = "worried-theme";
    dialogue = "ご主人様…少し回復できそうですが、ミニトマはまだ心配です。";
    advice = "一度ちゃんと休憩して、水を飲んで、全部を一気に終わらせようとしないでくださいね。";
  }
  else {
    image = "panic.png";
    resultTitle = "緊急回復エンド";
    themeClass = "panic-theme";
    dialogue = "ご主人様ーーー！？緊急学生回復プロトコルを発動します！";
    advice = "今は少し課題から離れましょう。何か食べて、深呼吸して、ゆっくり再開してください。";
  }

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>回復結果</title>
      <link rel="stylesheet" href="/style.css">
    </head>

    <body class="${themeClass}">
      <div class="page">

        <div class="title-area">
          <h1>${resultTitle}</h1>
          <p class="subtitle">あなた専用の回復プランが完成しました♡</p>
        </div>

        <img
          src="/images/${image}"
          class="sprite"
          alt="ミニトマ 結果"
        >

        <div class="right-panel">
          <div class="result-card">

            <h2>回復結果</h2>

            <div class="result-row">
              <span>現在の状態</span>
              <strong>${moodNames[mood]}</strong>
            </div>

            <div class="result-row">
              <span>ドリンク</span>
              <strong>${drinkNames[drink]}</strong>
            </div>

            <div class="result-row">
              <span>サービス</span>
              <strong>${serviceNames[service]}</strong>
            </div>

            <div class="result-row">
              <span>チェキ</span>
              <strong>${cheki ? "あり" : "なし"}</strong>
            </div>

            <hr>

            <div class="result-row big">
              <span>回復度</span>
              <strong>${score}</strong>
            </div>

            <div class="result-row big">
              <span>合計金額</span>
              <strong>¥${totalPrice}</strong>
            </div>

            <a class="back-link" href="/">← トップへ戻る</a>

          </div>
        </div>

        <div class="dialogue-box">
          <p><strong>ミニトマ:</strong> ${dialogue}</p>
          <p>${advice}</p>
        </div>

      </div>
    </body>
    </html>
  `);
});

// ポート3000でサーバを起動する。
app.listen(3000, () => {
  console.log("バニー回復コンカフェは http://localhost:3000 で起動中です");
});