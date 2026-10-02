// 프로젝트 목록 데이터
// NOTE: 경로는 profile_template 폴더 기준이라 앞에 ../ 가 붙어 있음 (최상위 index.html로 옮기면 ../ 제거)
const projects = [
  {
    title: "Todo List",
    desc: "할 일 추가, 완료 체크, 삭제, 검색 기능을 가진 Todo 앱",
    tags: ["HTML", "CSS", "JavaScript"],
    img: "",
    emoji: "📝",
    link: "../todo_list/App.html",
  },
  {
    title: "Fruits Shop",
    desc: "상품 검색과 가격순 정렬, 더보기 기능을 가진 과일 쇼핑몰",
    tags: ["Bootstrap", "JavaScript"],
    img: "../fruits_shop_temp/fruits_shop_화면(index).png",
    emoji: "🍎",
    link: "../fruits_shop_temp/index.html",
  },
  {
    title: "GSITM Movie",
    desc: "영화 소개와 장바구니 화면을 구성한 영화 사이트",
    tags: ["HTML", "CSS", "JavaScript"],
    img: "",
    emoji: "🎬",
    link: "../movie/index.html",
  },
  {
    title: "KOSTA Bank",
    desc: "개인/기업 뱅킹, 로그인, 회원가입 화면을 구성한 은행 사이트",
    tags: ["HTML", "CSS"],
    img: "",
    emoji: "🏦",
    link: "../kosta_bank/index.html",
  },
];

const projectList = document.getElementById("projectList");
const themeToggle = document.getElementById("themeToggle");

// 프로젝트 카드 렌더링
function renderProjects(data) {
  let html = "";

  data.forEach((project) => {
    const { title, desc, tags, img, emoji, link } = project;
    const thumb = img ? `<img src="${img}" alt="${title} 화면" />` : emoji;
    const chips = tags.map((tag) => `<li>${tag}</li>`).join("");

    html += `
      <article class="project-card reveal">
        <a href="${link}" class="project-card__thumb">${thumb}</a>
        <div class="project-card__body">
          <h3 class="project-card__title">${title}</h3>
          <p class="project-card__desc">${desc}</p>
          <ul class="chips">${chips}</ul>
          <a href="${link}" class="project-card__link">사이트 보기 →</a>
        </div>
      </article>`;
  });

  projectList.innerHTML = html;
}

// 다크 모드
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

function loadTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (e) {
    // NOTE: 시크릿 모드 등에서 localStorage 접근이 막힐 수 있음
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
}

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    // 저장 실패해도 화면 전환은 그대로 동작
  }
});

// 스크롤 등장 애니메이션: 화면에 들어온 .reveal 요소에 is-visible 클래스 추가
function observeReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// 초기 실행
loadTheme();
renderProjects(projects);
observeReveal();
