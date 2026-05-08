(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[];function t(t){e=t.works;let a=document.querySelector(t.containerSelector),o=document.getElementById(`modal`),s=document.getElementById(`modal-overlay`),c=document.getElementById(`modal-close`),l=document.getElementById(`modal-body`);a?.addEventListener(`click`,i=>{let a=i.target.closest(t.itemSelector);if(!a)return;i.preventDefault();let s=a.dataset.id,c=e.find(e=>e.id===s);c&&(n(c,l),r(o))}),s.addEventListener(`click`,()=>i(o)),c.addEventListener(`click`,()=>i(o)),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&i(o)})}function n(e,t){t.innerHTML=`
    <h2 class="modal-title">${e.title}</h2>
    <p class="modal-meta">${e.author.grade} / ${e.author.name}</p>

    <div class="modal-columns">
        <div class="modal-main">
            <img src="${e.thumbnail}" alt="${e.title}">
        </div>

        <div class="modal-side">
            <p class="modal-description">${e.description}</p>
            <div class="rating-section">
                <div class="rating">
                    ${a(e.ratings)}
                </div>
            </div>
        </div>
    </div>

    <button class="detail-button" onclick="location.href='./detail.html?id=${e.id}'">
      詳細を見る →
    </button>
  `}function r(e){e.classList.add(`open`),document.body.style.overflow=`hidden`}function i(e){e.classList.remove(`open`),document.body.style.overflow=``}function a(e){let t={idea:`アイデア`,completeness:`完成度`,programming:`プログラミング`,fun:`楽しさ`,design:`デザイン`,worksheet:`ワークシート`};return Object.entries(e).map(([e,n])=>{let r=o(n);return`
        <div class="rating-row">
          <span class="rating-label">${t[e]}</span>
          <div class="rating-stars">${r}</div>
        </div>
      `}).join(``)}function o(e){let t=``;for(let n=1;n<=5;n++)t+=n<=e?`<span class="star filled">⭐</span>`:`<span class="star empty"></span>`;return t}async function s(){let e=document.getElementById(`work-grid`);if(!e)return;let n=await(await fetch(`data/works.json`)).json();t({works:n,containerSelector:`#work-grid`,itemSelector:`.work-card`}),(n.length>6?l(n,6):n).forEach(t=>{let n=c(t);e.appendChild(n)})}function c(e){let t=document.createElement(`a`);return t.dataset.id=e.id,t.href=`#`,t.className=`work-card`,t.innerHTML=`
    <div class="thumbnail">
      <img src="${e.thumbnail}",alt="${e.title}のサムネイル", alt="${e.title}">
    </div>

    <div class="work-info">
      <h3 class="work-title">${e.title}</h3>
      <p class="work-meta">${e.author.grade} / ${e.author.name}</p>
    </div>

    <span class="work-link">See More ›</span>
  `,t}function l(e,t){let n=[...e];for(let e=n.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[n[e],n[t]]=[n[t],n[e]]}return n.slice(0,t)}var u=[],d=[];async function f(){document.getElementById(`works-list`)&&(u=await(await fetch(`data/works.json`)).json(),d=[...u],_(d.length),h(d),p(),t({works:u,containerSelector:`#works-list`,itemSelector:`.work-item`}))}function p(){let e=document.getElementById(`search-input`),t=document.getElementById(`category-filter`),n=document.getElementById(`award-filter`),r=document.getElementById(`sort-select`);e?.addEventListener(`input`,m),t?.addEventListener(`change`,m),n?.addEventListener(`change`,m),r?.addEventListener(`change`,m)}function m(){let e=document.getElementById(`search-input`).value.toLowerCase(),t=document.getElementById(`category-filter`).value,n=document.getElementById(`award-filter`).value,r=document.getElementById(`sort-select`).value,i=[...u];switch(e&&(i=i.filter(t=>t.title.toLowerCase().includes(e)||t.author.name.toLowerCase().includes(e))),t!==`all`&&(i=i.filter(e=>e.category===t)),n!==`all`&&(i=i.filter(e=>e.award===n)),r){case`title`:i.sort((e,t)=>e.title.localeCompare(t.title,`ja`));break;case`grade`:i.sort((e,t)=>e.author.grade.localeCompare(t.author.grade,`ja`));break;case`award`:let e={gold:0,silver:1,bronze:2,none:3};i.sort((t,n)=>e[t.award]-e[n.award]);break}d=i,_(d.length),h(d)}function h(e){let t=document.getElementById(`works-list`);t&&(t.innerHTML=``,e.forEach(e=>{let n=g(e);t.appendChild(n)}))}function g(e){let t=document.createElement(`button`);return t.className=`works-list work-item award-${e.award}`,t.dataset.id=e.id,t.innerHTML=`

    <div class="work-item-title">
      ${e.title}
    </div>

    <div class="work-item-meta">
      ${e.author.grade}
      /
      ${e.author.name}
    </div>

    <div class="work-item-side">

      <span class="work-category category-${e.category}">
        ${v(e.category)}
      </span>

      ${y(e.award)}

      <span class="work-arrow">
        ▶
      </span>

    </div>

  `,t}function _(e){let t=document.getElementById(`works-count`);t&&(t.textContent=`${e}件の作品`)}function v(e){switch(e){case`game`:return`ゲーム`;case`world`:return`ワールド`;default:return`その他`}}function y(e){let t={gold:`🥇`,silver:`🥈`,bronze:`🥉`}[e]??``;return`
    <span class="work-award ${e===`none`?`empty`:``}">
      ${t}
    </span>
  `}async function b(){let e=document.getElementById(`detail-container`);if(!e)return;let t=new URLSearchParams(location.search).get(`id`),n=(await(await fetch(`data/works.json`)).json()).find(e=>e.id===t);n&&(e.innerHTML=x(n),S(),E())}function x(e){return`
    <section class="detail-header-nav">
      <button class="back-button" id="back-button">
        ← 戻る
      </button>
    </section>
    <section class="detail-top">

      <!-- 左：画像 -->
      <div class="detail-media">
        <img src="${e.thumbnail}" alt="${e.title}">
      </div>

      <!-- 右：情報 -->
      <div class="detail-info">
        <h1 class="detail-title">${e.title}</h1>
        <p class="detail-meta">
          ${e.author.grade} / ${e.author.name}
        </p>

        <p class="detail-description">
          ${e.description}
        </p>

        <div class="rating">
          ${a(e.ratings)}
        </div>
      </div>

    </section>

    <!-- 講評 -->
    <div class="detail-comment">
        <h2>審査員からのコメント</h2>
        <p>${e.comment}</p>
    </div>

    <!-- 画像 -->
    ${C(e.images)}

    <!-- プログラム -->
    ${w(e.program)}

    <!-- 共有 -->
    ${T(e)}

    <!-- ダウンロード -->
    ${O(e.downloads)}
  `}function S(){document.getElementById(`back-button`)?.addEventListener(`click`,()=>{history.back()})}function C(e){return e.length===0?``:`
      <section class="detail-image">
        <h2>ゲーム中の画像</h2>

        <div class="images">
            ${e.map(e=>`
                <img src="${e}">
            `).join(``)}
        </div>
      </section>
    `}function w(e){return window.innerWidth<=756||e.type!==`makecode`?``:`
    <section class="detail-program">
      <h2>プログラム</h2>

      <div class="program-frame">
        <iframe 
          src="https://minecraft.makecode.com/---codeembed#pub:${e.id}"
          allowfullscreen
          frameborder="0">
        </iframe>
      </div>
    </section>
  `}function T(e){let t=encodeURIComponent(location.href);return`
    <section class="detail-share">
      <h2>この作品をシェア</h2>

      <div class="share-buttons">

        <!-- X -->
        <a
          class="share-button x"
          href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`「${e.title}」をチェック！ | V-code Creative Awards`)}&url=${t}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-brands fa-x-twitter"></i>
        </a>

        <!-- LINE -->
        <a
          class="share-button line"
          href="https://social-plugins.line.me/lineit/share?url=${t}"
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
  `}function E(){let e=document.getElementById(`copy-button`);e&&e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-url`);if(t)try{await navigator.clipboard.writeText(t),e.classList.add(`copied`),D(`URLをコピーしました！`),setTimeout(()=>{e.classList.remove(`copied`)},1200)}catch{D(`コピーに失敗しました`)}})}function D(e){let t=document.getElementById(`copy-button`);if(!t)return;let n=t.querySelector(`.copy-toast`);n&&(n.textContent=e,n.classList.add(`show`),setTimeout(()=>{n.classList.remove(`show`)},2e3))}function O(e){return e?`
    <section class="detail-downloads">
      <h2>ダウンロード</h2>

      <div class="download-buttons">
        ${e.map(e=>`
          <a href="${e.src}" download class="download-btn">
            ${e.type===`world`?`ワールド`:`コード`}
          </a>
        `).join(``)}
      </div>
    </section>
  `:``}var k=`select`,A=[],j=``;async function M(){A=await(await fetch(`data/works.json`)).json(),N(),L(`select`)}function N(){document.querySelectorAll(`.category-button`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-category`);t&&(j=t,F(t),I())})})}var P={game:`GAME CREATION`,world:`WORLD DESIGN`};function F(e){let t=document.getElementById(`intro-category`);t&&(t.textContent=P[e])}async function I(){L(`intro`),document.body.style.overflow=`hidden`,await V(2500),R(),L(`gold`),await V(2e3),z(),L(`all`),document.body.style.overflow=``}function L(e){k=e;let t=document.getElementById(`results-select`),n=document.getElementById(`results-intro`),r=document.getElementById(`results-stage`);if(!(!t||!n||!r))switch(t.classList.remove(`active`),n.classList.remove(`active`),r.classList.remove(`active`),k){case`select`:t.classList.add(`active`);break;case`intro`:n.classList.add(`active`);break;case`gold`:case`all`:r.classList.add(`active`);break}}function R(){let e=document.getElementById(`gold-stage`);if(!e)return;let t=A.find(e=>e.category===j&&e.award===`gold`);t&&(e.innerHTML=`

    <div class="gold-card">

      <div class="gold-badge">
        🥇 GOLD AWARD
      </div>

      <img
        src="${t.thumbnail}"
        alt="${t.title}"
      >

      <h2 class="gold-title">
        ${t.title}
      </h2>

      <p class="gold-author">
        ${t.author.grade}
        /
        ${t.author.name}
      </p>

      <button
        class="gold-detail-button"
        onclick="
          location.href=
          './detail.html?id=${t.id}'
        "
      >
        詳細を見る
      </button>

    </div>

  `)}function z(){let e=document.getElementById(`other-awards`);e&&(e.innerHTML=A.filter(e=>e.category===j&&e.award!==`gold`&&e.award!==`none`).map(e=>`

    <div class="award-card award-${e.award}">

      <div class="award-badge">
        ${B(e.award)}
      </div>

      <img
        src="${e.thumbnail}"
        alt="${e.title}"
      >

      <h3 class="award-title">
        ${e.title}
      </h3>

      <p class="award-author">
        ${e.author.grade}
        /
        ${e.author.name}
      </p>

      <button
        class="award-detail-button"
        onclick="
          location.href=
          './detail.html?id=${e.id}'
        "
      >
        詳細を見る
      </button>

    </div>

  `).join(``))}function B(e){switch(e){case`silver`:return`🥈 SILVER AWARD`;case`bronze`:return`🥉 BRONZE AWARD`;default:return`🏅 AWARD`}}function V(e){return new Promise(t=>{setTimeout(t,e)})}var H=document.getElementById(`hamburger`),U=document.getElementById(`nav`);H&&U&&(H.addEventListener(`click`,()=>{H.classList.toggle(`open`),U.classList.toggle(`open`)}),document.querySelectorAll(`.nav a`).forEach(e=>{e.addEventListener(`click`,()=>{H.classList.remove(`open`),U.classList.remove(`open`)})}),document.addEventListener(`click`,e=>{!U.contains(e.target)&&!H.contains(e.target)&&(H.classList.remove(`open`),U.classList.remove(`open`))})),s(),f(),await M(),location.pathname.includes(`detail.html`)&&b();