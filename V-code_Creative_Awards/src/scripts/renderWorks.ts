import { initModal } from "./modal";

// サムネイル情報
type Work = {
  id: string;
  title: string;
  author: {
    name: string,
    grade: string,
  };
  thumbnail: string;
};

// カードのレンダー
export async function renderWorks() {
  const grid = document.getElementById("work-grid");
  if (!grid) return;

  const res = await fetch("/src/data/works.json");
  const works: Work[] = await res.json();

  // モーダル
  initModal(works);

  // 投稿作品数が6件以上ある場合はランダムに6件抽出
  const displayWorks = works.length > 6 ? pickRandomWorks(works, 6) : works;

  displayWorks.forEach(work => {
    const card = createWorkCard(work);
    grid.appendChild(card);
  });
}

// カードのレイアウト作成
function createWorkCard(work: Work): HTMLElement {
  const a = document.createElement("a");
  a.dataset.id = work.id;
  a.href = "#";
  a.className = "work-card";

  a.innerHTML = `
    <div class="thumbnail">
      <img src="${work.thumbnail}",alt="${work.title}のサムネイル", alt="${work.title}">
    </div>

    <div class="work-info">
      <h3 class="work-title">${work.title}</h3>
      <p class="work-meta">${work.author.grade} / ${work.author.name}</p>
    </div>

    <span class="work-link">See More ›</span>
  `;

  return a;
}

// 配列からランダムな要素を取得
function pickRandomWorks<T>(array: T[], count: number): T[] {
  const shuffled = [...array]; // 元配列を壊さない

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}