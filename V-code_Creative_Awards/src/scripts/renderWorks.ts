// サムネイル情報
type Work = {
  id: string;
  title: string;
  grade: string;
  author: string;
  thumbnail: string;
};

// カードのレンダー
export async function renderWorks() {
  const grid = document.querySelector(".work-grid");
  if (!grid) return;

  const res = await fetch("/data/works.json");
  const works: Work[] = await res.json();

  works.forEach(work => {
    const card = createWorkCard(work);
    grid.appendChild(card);
  });
}

// カードのレイアウト作成
function createWorkCard(work: Work): HTMLElement {
  const a = document.createElement("a");
  a.href = `/works/${work.id}`;
  a.className = "work-card";

  a.innerHTML = `
    <div class="thumbnail">
      <img src="${work.thumbnail}" alt="${work.title}">
    </div>

    <div class="work-info">
      <h3 class="work-title">${work.title}</h3>
      <p class="work-meta">${work.grade} / ${work.author}</p>
    </div>

    <span class="work-link">See More ›</span>
  `;

  return a;
}