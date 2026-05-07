import { renderRating } from "./modal";

type Work = any;

export async function renderDetail() {
  const container = document.getElementById("detail-container");
  if (!container) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const res = await fetch("/src/data/works.json");
  const works: Work[] = await res.json();

  const work = works.find(w => w.id === id);
  if (!work) return;

  container.innerHTML = createDetailHTML(work);

  initBackButton();
  initCopyButton();
}

function createDetailHTML(work: any): string {
  return `
    <section class="detail-header-nav">
      <button class="back-button" id="back-button">
        ← 戻る
      </button>
    </section>
    <section class="detail-top">

      <!-- 左：画像 -->
      <div class="detail-media">
        <img src="${work.thumbnail}" alt="${work.title}">
      </div>

      <!-- 右：情報 -->
      <div class="detail-info">
        <h1 class="detail-title">${work.title}</h1>
        <p class="detail-meta">
          ${work.author.grade} / ${work.author.name}
        </p>

        <p class="detail-description">
          ${work.description}
        </p>

        <div class="rating">
          ${renderRating(work.ratings)}
        </div>
      </div>

    </section>

    <!-- 講評 -->
    <div class="detail-comment">
        <h2>審査員からのコメント</h2>
        <p>${work.comment}</p>
    </div>

    <!-- 画像 -->
    ${renderImage(work.images)}

    <!-- プログラム -->
    ${renderProgram(work.program)}

    <!-- 共有 -->
    ${renderShareButtons(work)}

    <!-- ダウンロード -->
    ${renderDownloads(work.downloads)}
  `;
}

function initBackButton() {
  const backButton = document.getElementById("back-button");

  backButton?.addEventListener("click", () => {
    history.back();
  });
}

function renderImage(images: string[]): string {
    if (images.length === 0) return "";

    return `
      <section class="detail-image">
        <h2>ゲーム中の画像</h2>

        <div class="images">
            ${images.map(image => `
                <img src="${image}">
            `).join("")}
        </div>
      </section>
    `;
}

function renderProgram(program: any): string {
  if (window.innerWidth <= 756) return "";
  if (program.type !== "makecode") return "";

  return `
    <section class="detail-program">
      <h2>プログラム</h2>

      <div class="program-frame">
        <iframe 
          src="https://minecraft.makecode.com/---codeembed#pub:${program.id}"
          allowfullscreen
          frameborder="0">
        </iframe>
      </div>
    </section>
  `;
}

function renderShareButtons(work: any): string {
  const shareUrl = encodeURIComponent(location.href);
  const shareText = encodeURIComponent(
    `「${work.title}」をチェック！ | V-code Creative Awards`
  );

  return `
    <section class="detail-share">
      <h2>この作品をシェア</h2>

      <div class="share-buttons">

        <!-- X -->
        <a
          class="share-button x"
          href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-brands fa-x-twitter"></i>
        </a>

        <!-- LINE -->
        <a
          class="share-button line"
          href="https://social-plugins.line.me/lineit/share?url=${shareUrl}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-brands fa-line"></i>
        </a>

        <!-- Copy -->
        <button
          class="share-button copy"
          id="copy-button"
          data-url="${location.href}"
        >
          <i class="fa-solid fa-link"></i>

          <!-- トースト -->
          <span class="copy-toast">
            コピーしました！
          </span>
        </button>

      </div>
    </section>
  `;
}

function initCopyButton() {
  const button = document.getElementById("copy-button");
  if (!button) return;

  button.addEventListener("click", async () => {
    const url = button.getAttribute("data-url");
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);

      button.classList.add("copied");

      showToast("URLをコピーしました！");

      setTimeout(() => {
        button.classList.remove("copied");
      }, 1200);

    } catch {
      showToast("コピーに失敗しました");
    }
  });
}

function showToast(message: string) {
  const button = document.getElementById("copy-button");
  if (!button) return;

  const toast = button.querySelector(".copy-toast");
  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function renderDownloads(downloads: any[]): string {
  if (!downloads) return "";

  return `
    <section class="detail-downloads">
      <h2>ダウンロード</h2>

      <div class="download-buttons">
        ${downloads.map(d => `
          <a href="${d.src}" download class="download-btn">
            ${d.type === "world" ? "ワールド" : "コード"}
          </a>
        `).join("")}
      </div>
    </section>
  `;
}

