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
}

function createDetailHTML(work: any): string {
  return `
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
        <h2>審査員からのコメント</h1>
        <p>${work.comment}</p>
    </div>

    <!-- 画像 -->
    ${renderImage(work.images)}

    <!-- プログラム -->
    ${renderProgram(work.program)}

    <!-- ダウンロード -->
    ${renderDownloads(work.downloads)}
  `;
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

