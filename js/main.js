// 대표 프로젝트 (큰 카드)
// link가 빈 문자열이면 클릭되지 않는 카드로 표시됨 (회사 업무처럼 공개 링크가 없는 경우)
const projects = [
  {
    title: "재난 장비 관리자 시스템",
    meta: "㈜우보재난시스템 · 실무 · 2023.10 — 2026.07",
    desc: "관공서 재난·방재 장비의 상태를 모니터링하고 점검 이력을 관리하는 관리자 웹",
    tags: ["Vue 3", "Node.js", "MySQL", "JWT", "Kakao Map API"],
    img: "",
    link: "",
    // 내가 직접 개선한 것 (diff 박스로 표시됨)
    added: ["장비 점검 시간 30분 → 10분 (약 67% 단축)", "JWT 인증 + 카카오맵 장비 위치 기능", "점검 이력 관리 기능 개선"],
  },
  {
    title: "Gotcha-Fish",
    meta: "팀 프로젝트 · 2026.08.27 — 2026.09.15",
    // TODO: 프로젝트 한 줄 설명, 사용 기술(tags), 맡은 역할(added) 채우기
    desc: "프로젝트 한 줄 설명",
    tags: ["Java"],
    img: "",
    link: "https://github.com/Gotcha-Fish/Gotcha-Fish",
    added: [],
  },
  {
    title: "PawMart",
    meta: "팀 프로젝트",
    // TODO: 설명, 기간, 사용 기술 채우기 / link에 발표자료(pptx) 또는 GitHub 주소 넣기
    desc: "프로젝트 한 줄 설명",
    tags: [],
    img: "",
    link: "",
    added: [],
  },
];

// 수업 실습 (작은 카드)
const practices = [
  {
    title: "Todo List",
    desc: "추가·체크·삭제·검색, 공백 입력 방지",
    link: "todo_list/App.html",
  },
  {
    title: "Fruits Shop",
    desc: "상품 검색, 가격순 정렬, 더보기",
    link: "fruits_shop_temp/index.html",
  },
  {
    title: "GSITM Movie",
    desc: "영화 소개와 장바구니 화면",
    link: "movie/index.html",
  },
  {
    title: "KOSTA Bank",
    desc: "뱅킹, 로그인, 회원가입 화면",
    link: "kosta_bank/index.html",
  },
];

const projectList = document.getElementById("projectList");
const practiceList = document.getElementById("practiceList");
const copyMail = document.getElementById("copyMail");

// 대표 프로젝트 카드 렌더링
function renderProjects(data) {
  let html = "";

  data.forEach((project) => {
    const { title, meta, desc, tags, img, link, added } = project;
    const thumb = img ? `<img src="${img}" alt="${title} 실행 화면" />` : "Screenshot 16:10";
    const chips = tags.map((tag) => `<li>${tag}</li>`).join("");
    const diff = added.length > 0 ? `<ul class="diff">${added.map((item) => `<li>+ ${item}</li>`).join("")}</ul>` : "";

    // 링크가 있으면 <a>, 없으면 <div>로 감싸기
    const tag = link ? "a" : "div";
    const attrs = link ? `href="${link}" target="_blank" rel="noopener" class="cell project"` : `class="cell project project--static"`;

    html += `
      <${tag} ${attrs}>
        <div class="project__thumb">${thumb}</div>
        <div class="project__body">
          <h3 class="project__title">${title} <span class="project__arrow">↗</span></h3>
          <p class="project__meta label">${meta}</p>
          <p class="project__desc">${desc}</p>
          ${diff}
          <ul class="tags">${chips}</ul>
        </div>
      </${tag}>`;
  });

  projectList.innerHTML = html;
}

// 수업 실습 카드 렌더링
function renderPractices(data) {
  practiceList.innerHTML = data
    .map(
      ({ title, desc, link }) => `
        <a href="${link}" class="cell">
          <h4>${title} <span class="project__arrow">↗</span></h4>
          <p>${desc}</p>
        </a>`,
    )
    .join("");
}

// 카드 위 마우스 위치를 CSS 변수(--x, --y)로 넘겨서 빛이 따라오게 함
function addSpotlight() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("pointermove", (e) => {
      const rect = cell.getBoundingClientRect();
      cell.style.setProperty("--x", `${e.clientX - rect.left}px`);
      cell.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  });
}

// 이메일 복사
copyMail.addEventListener("click", () => {
  const email = document.getElementById("mail").textContent;
  navigator.clipboard
    .writeText(email)
    .then(() => {
      copyMail.textContent = "복사됨 ✓";
    })
    .catch(() => {
      copyMail.textContent = email;
    });
});

// 초기 실행 (카드가 다 만들어진 뒤에 빛 효과를 붙여야 함)
renderProjects(projects);
renderPractices(practices);
addSpotlight();
