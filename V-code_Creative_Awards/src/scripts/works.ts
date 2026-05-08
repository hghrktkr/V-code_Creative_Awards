import { initModal } from "./modal";

/* --------------------------
   型
--------------------------- */

export type Work = {
  id: string;

  title: string;

  author: {
    name: string;
    grade: string;
  };

  category: string;
  award: string;
};

/* --------------------------
   状態
--------------------------- */

let works: Work[] = [];
let filteredWorks: Work[] = [];

/* --------------------------
   初期化
--------------------------- */

export async function renderWorksPage() {

  const list = document.getElementById("works-list");

  if (!list) return;

  // JSON取得
  const res = await fetch("data/works.json");

  works = await res.json();

  // 初期表示
  filteredWorks = [...works];

  renderCount(filteredWorks.length);

  renderList(filteredWorks);

  // 検索・ソート初期化
  initToolbar();

  // モーダル
  initModal({
    works,
    containerSelector: "#works-list",
    itemSelector: ".work-item"
  });
}

/* --------------------------
   Toolbar
--------------------------- */

function initToolbar() {

  const searchInput =
    document.getElementById("search-input");

  const categoryFilter =
    document.getElementById("category-filter");

  const awardFilter =
    document.getElementById("award-filter");

  const sortSelect =
    document.getElementById("sort-select");

  searchInput?.addEventListener(
    "input",
    updateWorks
  );

  categoryFilter?.addEventListener(
    "change",
    updateWorks
  );

  awardFilter?.addEventListener(
    "change",
    updateWorks
  );

  sortSelect?.addEventListener(
    "change",
    updateWorks
  );
}

/* --------------------------
   検索・フィルター・ソート
--------------------------- */

function updateWorks() {

  const search =
    (
      document.getElementById(
        "search-input"
      ) as HTMLInputElement
    ).value.toLowerCase();

  const category =
    (
      document.getElementById(
        "category-filter"
      ) as HTMLSelectElement
    ).value;

  const award =
    (
      document.getElementById(
        "award-filter"
      ) as HTMLSelectElement
    ).value;

  const sort =
    (
      document.getElementById(
        "sort-select"
      ) as HTMLSelectElement
    ).value;

  let result = [...works];

  /* --------------------------
     検索
  --------------------------- */

  if (search) {

    result = result.filter(work => {

      return (
        work.title
          .toLowerCase()
          .includes(search)

        ||

        work.author.name
          .toLowerCase()
          .includes(search)
      );
    });
  }

  /* --------------------------
     カテゴリ
  --------------------------- */

  if (category !== "all") {

    result = result.filter(work =>
      work.category === category
    );
  }

  /* --------------------------
     受賞
  --------------------------- */

  if (award !== "all") {

    result = result.filter(work =>
      work.award === award
    );
  }

  /* --------------------------
     ソート
  --------------------------- */

  switch (sort) {

    case "title":

      result.sort((a, b) =>
        a.title.localeCompare(b.title, "ja")
      );

      break;

    case "grade":

      result.sort((a, b) =>
        a.author.grade.localeCompare(
          b.author.grade,
          "ja"
        )
      );

      break;

    case "award":

      const order: Record<string, number> = {
        gold: 0,
        silver: 1,
        bronze: 2,
        none: 3
      };

      result.sort((a, b) =>
        order[a.award] - order[b.award]
      );

      break;
  }

  filteredWorks = result;

  renderCount(filteredWorks.length);

  renderList(filteredWorks);
}

/* --------------------------
   一覧描画
--------------------------- */

function renderList(works: Work[]) {

  const list = document.getElementById("works-list");

  if (!list) return;

  list.innerHTML = "";

  works.forEach(work => {

    const row = createWorkRow(work);

    list.appendChild(row);

  });
}

/* --------------------------
   行生成
--------------------------- */

function createWorkRow(work: Work): HTMLElement {

  const button = document.createElement("button");

  button.className =
    `works-list work-item award-${work.award}`;

  button.dataset.id = work.id;

  button.innerHTML = `

    <div class="work-item-title">
      ${work.title}
    </div>

    <div class="work-item-meta">
      ${work.author.grade}
      /
      ${work.author.name}
    </div>

    <div class="work-item-side">

      <span class="work-category category-${work.category}">
        ${getCategoryLabel(work.category)}
      </span>

      ${renderAward(work.award)}

      <span class="work-arrow">
        ▶
      </span>

    </div>

  `;

  return button;
}

/* --------------------------
   件数
--------------------------- */

function renderCount(count: number) {

  const countEl =
    document.getElementById("works-count");

  if (!countEl) return;

  countEl.textContent =
    `${count}件の作品`;
}

/* --------------------------
   カテゴリ表示
--------------------------- */

function getCategoryLabel(category: string): string {

  switch (category) {

    case "game":
      return "ゲーム";

    case "world":
      return "ワールド";

    default:
      return "その他";
  }
}

/* --------------------------
   受賞表示
--------------------------- */

function renderAward(award: string): string {

  const labels: Record<string, string> = {
    gold: "🥇",
    silver: "🥈",
    bronze: "🥉"
  };

  const icon = labels[award] ?? "";

  return `
    <span class="work-award ${award === "none" ? "empty" : ""}">
      ${icon}
    </span>
  `;
}