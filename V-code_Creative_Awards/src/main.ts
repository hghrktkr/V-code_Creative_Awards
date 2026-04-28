import "./styles/style.scss";
import { renderWorks } from "./scripts/renderWorks";
import { renderDetail } from "./scripts/detail";

// ハンバーガーメニュー制御
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

if (hamburger && nav) {

  // ハンバーガークリック
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    nav.classList.toggle("open");
  });

  // メニュー内リンククリックで閉じる
  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      nav.classList.remove("open");
    });
  });

  // 外側クリックで閉じる
  document.addEventListener("click", (e) => {
    if (
      !nav.contains(e.target as Node) &&
      !hamburger.contains(e.target as Node)
    ) {
      hamburger.classList.remove("open");
      nav.classList.remove("open");
    }
  });
}

// カード描画
renderWorks();

// 詳細画面
if (location.pathname.includes("detail.html")) {
  renderDetail();
}