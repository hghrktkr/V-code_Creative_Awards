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

/* --------------------------
   初期化
--------------------------- */

export async function renderWorksPage() {

  const list = document.getElementById("works-list");

  if (!list) return;

  // JSON取得
  const res = await fetch("/src/data/works.json");

  works = await res.json();

  // 件数表示
  renderCount(works.length);

  // 一覧描画
  renderList(works);

  // モーダル
  initModal({
    works,
    containerSelector: "#works-list",
    itemSelector: ".work-item"
  });
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

  // modal.ts 用に work-item を付与
  button.className = `works-list work-item award-${work.award}`;

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

  const countEl = document.getElementById("works-count");

  if (!countEl) return;

  countEl.textContent = `${count}件の作品`;
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