let worksData: any[] = [];

type ModalOptions = {
  works: any[];
  containerSelector: string;
  itemSelector: string;
};

export function initModal(options: ModalOptions) {
  worksData = options.works;

  const container = document.querySelector(options.containerSelector);

  const modal = document.getElementById("modal")!;
  const overlay = document.getElementById("modal-overlay")!;
  const closeBtn = document.getElementById("modal-close")!;
  const body = document.getElementById("modal-body")!;

  // 一覧クリック
  container?.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    const item = target.closest(options.itemSelector) as HTMLElement;

    if (!item) return;

    e.preventDefault();

    const id = item.dataset.id!;

    const work = worksData.find(w => w.id === id);

    if (!work) return;

    renderModal(work, body);

    openModal(modal);
  });

  // 閉じる
  overlay.addEventListener("click", () => closeModal(modal));

  closeBtn.addEventListener("click", () => closeModal(modal));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(modal);
    }
  });
}

function renderModal(work: any, container: HTMLElement) {
  container.innerHTML = `
    <h2 class="modal-title">${work.title}</h2>
    <p class="modal-meta">${work.author.grade} / ${work.author.name}</p>

    <div class="modal-columns">
        <div class="modal-main">
            <img src="${work.thumbnail}" alt="${work.title}">
        </div>

        <div class="modal-side">
            <p class="modal-description">${work.description}</p>
            <div class="rating-section">
                <div class="rating">
                    ${renderRating(work.ratings)}
                </div>
            </div>
        </div>
    </div>

    <button class="detail-button" onclick="location.href='./detail.html?id=${work.id}'">
      詳細を見る →
    </button>
  `;
}

function openModal(modal: HTMLElement) {
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(modal: HTMLElement) {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// レーティング生成
export function renderRating(ratings: any): string {
  const labels: Record<string, string> = {
    idea: "アイデア",
    completeness: "完成度",
    programming: "プログラミング",
    fun: "楽しさ",
    design: "デザイン",
    worksheet: "ワークシート"
  };

  return Object.entries(ratings)
    .map(([key, value]) => {
      const stars = createStars(value as number);
      return `
        <div class="rating-row">
          <span class="rating-label">${labels[key]}</span>
          <div class="rating-stars">${stars}</div>
        </div>
      `;
    })
    .join("");
}

function createStars(count: number): string {
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    stars += i <= count? `<span class="star filled">⭐</span>`: `<span class="star empty"></span>`;
  }

  return stars;
}