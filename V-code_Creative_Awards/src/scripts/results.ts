type Work = any;

/* --------------------------
   状態
--------------------------- */

type ResultState =
  | "select"
  | "intro"
  | "gold"
  | "all";

let state: ResultState = "select";

let works: Work[] = [];

let currentCategory = "";

/* --------------------------
   初期化
--------------------------- */

export async function renderResultsPage() {

  const res = await fetch("/src/data/works.json");

  works = await res.json();

  initCategoryButtons();

  showState("select");
}

/* --------------------------
   部門ボタン
--------------------------- */

function initCategoryButtons() {

  const buttons =
    document.querySelectorAll(".category-button");

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      const category =
        button.getAttribute("data-category");

      if (!category) return;

      currentCategory = category;

      setCategory(category);

      startResultAnimation();

    });

  });

}

const categoryTexts = {
  game: "GAME CREATION",
  world: "WORLD DESIGN",
}

function setCategory(category: string) {
  const introCategory = 
    document.getElementById("intro-category");
  
  if (!introCategory) return;

  const categoryText = categoryTexts[category as keyof typeof categoryTexts];

  introCategory.textContent = categoryText;
}

/* --------------------------
   演出開始
--------------------------- */

async function startResultAnimation() {

  showState("intro");

  document.body.style.overflow = "hidden";

  // 演出待機
  await wait(2500);

  renderGold();

  showState("gold");

  // 金賞表示後
  await wait(2000);

  renderOtherAwards();

  showState("all");

  document.body.style.overflow = "";

}

/* --------------------------
   state切替
--------------------------- */

function showState(next: ResultState) {

  state = next;

  const select =
    document.getElementById("results-select");

  const intro =
    document.getElementById("results-intro");

  const stage =
    document.getElementById("results-stage");

  if (!select || !intro || !stage) return;

  select.classList.remove("active");
  intro.classList.remove("active");
  stage.classList.remove("active");

  switch (state) {

    case "select":
      select.classList.add("active");
      break;

    case "intro":
      intro.classList.add("active");
      break;

    case "gold":
    case "all":
      stage.classList.add("active");
      break;
  }

}

/* --------------------------
   金賞
--------------------------- */

function renderGold() {

  const container =
    document.getElementById("gold-stage");

  if (!container) return;

  const gold =
    works.find(work =>
      work.category === currentCategory &&
      work.award === "gold"
    );

  if (!gold) return;

  container.innerHTML = `

    <div class="gold-card">

      <div class="gold-badge">
        🥇 GOLD AWARD
      </div>

      <img
        src="${gold.thumbnail}"
        alt="${gold.title}"
      >

      <h2 class="gold-title">
        ${gold.title}
      </h2>

      <p class="gold-author">
        ${gold.author.grade}
        /
        ${gold.author.name}
      </p>

      <button
        class="gold-detail-button"
        onclick="
          location.href=
          '/detail.html?id=${gold.id}'
        "
      >
        詳細を見る
      </button>

    </div>

  `;

}

/* --------------------------
   その他賞
--------------------------- */

function renderOtherAwards() {

  const container =
    document.getElementById("other-awards");

  if (!container) return;

  const others =
    works.filter(work =>
      work.category === currentCategory &&
      work.award !== "gold" &&
      work.award !== "none"
    );

  container.innerHTML = others.map(work => `

    <div class="award-card award-${work.award}">

      <div class="award-badge">
        ${getAwardLabel(work.award)}
      </div>

      <img
        src="${work.thumbnail}"
        alt="${work.title}"
      >

      <h3 class="award-title">
        ${work.title}
      </h3>

      <p class="award-author">
        ${work.author.grade}
        /
        ${work.author.name}
      </p>

      <button
        class="award-detail-button"
        onclick="
          location.href=
          '/detail.html?id=${work.id}'
        "
      >
        詳細を見る
      </button>

    </div>

  `).join("");

}

function getAwardLabel(award: string) {

  switch (award) {

    case "silver":
      return "🥈 SILVER AWARD";

    case "bronze":
      return "🥉 BRONZE AWARD";

    default:
      return "🏅 AWARD";
  }

}

/* --------------------------
   Utility
--------------------------- */

function wait(ms: number) {

  return new Promise(resolve => {

    setTimeout(resolve, ms);

  });

}
