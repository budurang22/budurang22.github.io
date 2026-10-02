// 프로젝트 목록 데이터
// NOTE: 경로는 profile_template 폴더 기준이라 앞에 ../ 가 붙어 있음 (최상위 index.html로 옮기면 ../ 제거)
const projects = [
  {
    id: "todo",
    title: "Todo List",
    className: "TodoList",
    desc: "할 일 추가, 완료 체크, 삭제, 검색",
    tags: ["HTML", "CSS", "JavaScript"],
    img: "",
    link: "../todo_list/App.html",
    // 수업 기본 기능에서 내가 직접 더한 것
    features: [
      { name: "preventBlankInput", desc: "공백만 입력하면 추가되지 않게" },
      { name: "toggleWithMap", desc: "for문 → map으로 리팩토링" },
    ],
    commits: [
      { hash: "cca6761", type: "refactor", msg: "체크박스 토글 로직을 map으로 변경" },
      { hash: "6bce0b2", type: "feat", msg: "공백 입력 막기" },
      { hash: "84f2a38", type: "feat", msg: "출력/체크/삭제/검색/추가 구현" },
    ],
  },
  {
    id: "fruits",
    title: "Fruits Shop",
    className: "FruitsShop",
    desc: "과일 쇼핑몰 목록 + 상세 페이지",
    tags: ["Bootstrap", "JavaScript"],
    img: "../fruits_shop_temp/fruits_shop_화면(index).png",
    link: "../fruits_shop_temp/index.html",
    features: [
      { name: "search", desc: "상품명 검색" },
      { name: "sortByPrice", desc: "가격순 정렬" },
      { name: "loadMore", desc: "더보기" },
    ],
    commits: [],
  },
  {
    id: "movie",
    title: "GSITM Movie",
    className: "GsitmMovie",
    desc: "영화 소개와 장바구니 화면",
    tags: ["HTML", "CSS", "JavaScript"],
    img: "",
    link: "../movie/index.html",
    features: [],
    commits: [],
  },
  {
    id: "bank",
    title: "KOSTA Bank",
    className: "KostaBank",
    desc: "개인/기업 뱅킹, 로그인, 회원가입 화면",
    tags: ["HTML", "CSS"],
    img: "",
    link: "../kosta_bank/index.html",
    features: [],
    commits: [],
  },
];

// 메뉴를 눌렀을 때 터미널에 찍힐 문구
const terminalMessages = {
  about: "java AboutMe\n> 에러 메시지는 끝까지 읽는다",
  skills: "gradle dependencies\n> BUILD SUCCESSFUL · 9 dependencies",
  history: "tail history.log\n> 2026-10 [DEPLOY] 포트폴리오 사이트 공개",
  contact: "java Contact\n> 함께 이야기 나눠요\n> email  : your@email.com\n> github : github.com/budurang22",
};

const projectMenu = document.getElementById("projectMenu");
const projectFiles = document.getElementById("projectFiles");
const tabs = document.getElementById("tabs");
const terminal = document.getElementById("terminal");
const statusPath = document.getElementById("statusPath");
const editorScroll = document.getElementById("editorScroll");
const themeToggle = document.getElementById("themeToggle");
const copyMail = document.getElementById("copyMail");

// 열려 있는 탭 목록 (처음엔 소개만)
const openTabs = ["about"];

// 프로젝트 1개를 자바 클래스 모양의 코드 줄로 변환
function toCodeLines(project) {
  const { className, desc, tags, features } = project;
  const stack = tags.map((tag) => `<span class="st">"${tag}"</span>`).join(", ");

  const lines = [
    `<span class="an">@Project</span>`,
    `<span class="kw">public class</span> ${className} {`,
    `    String <span class="fd">desc</span>  = <span class="st">"${desc}"</span>;`,
    `    String[] <span class="fd">stack</span> = { ${stack} };`,
  ];

  if (features.length > 0) {
    lines.push("", `    <span class="cm">// 수업 기본 기능에서 내가 더한 것</span>`);
    features.forEach(({ name, desc }) => {
      lines.push(`    <span class="kw">void</span> <span class="fn">${name}</span>() { <span class="cm">/* ${desc} */</span> }`);
    });
  }

  lines.push("}");
  return lines.map((line) => `<div class="l">${line}</div>`).join("");
}

// 프로젝트 메뉴 + 파일 화면 렌더링
function renderProjects(data) {
  let menuHtml = "";
  let fileHtml = "";

  data.forEach((project) => {
    const { id, title, className, img, link, commits } = project;
    const shot = img
      ? `<img src="${img}" alt="${title} 실행 화면" />`
      : `<p><b>실행 화면 캡처</b>16:10 비율 권장</p>`;
    const commitList = commits
      .map(
        ({ hash, type, msg }) => `
          <li>
            <span class="commits__hash">${hash}</span>
            <span><span class="commits__type">${type}</span> ${msg}</span>
          </li>`,
      )
      .join("");

    menuHtml += `
      <li>
        <button type="button" class="menu__item" data-open="${id}">
          <span class="icon icon--project">P</span>
          <span class="menu__title">${title}</span>
          <span class="menu__file mono">.java</span>
        </button>
      </li>`;

    fileHtml += `
      <section class="file" id="${id}" data-name="${className}.java" data-path="src › projects › ${className}" hidden>
        <div class="code">${toCodeLines(project)}</div>
        <aside class="preview">
          <p class="preview__label">Preview · screenshot</p>
          <div class="slot slot--shot">${shot}</div>
          ${commitList ? `<ul class="commits">${commitList}</ul>` : ""}
          <a href="${link}" class="btn btn--primary">▶ Run (사이트 보기)</a>
        </aside>
      </section>`;

    terminalMessages[id] = `java ${className}\n> ${project.desc}`;
  });

  projectMenu.innerHTML = menuHtml;
  projectFiles.innerHTML = fileHtml;
}

// 위쪽 탭 렌더링
function renderTabs(activeId) {
  tabs.innerHTML = openTabs
    .map((id) => {
      const fileName = document.getElementById(id).dataset.name;
      const activeClass = id === activeId ? " is-active" : "";
      return `<button type="button" class="tab${activeClass}" role="tab" data-open="${id}">${fileName}</button>`;
    })
    .join("");
}

// 파일 열기: 해당 섹션만 보이고 메뉴/탭/터미널/상태바 갱신
function openFile(id) {
  if (!openTabs.includes(id)) {
    openTabs.push(id);
  }

  document.querySelectorAll(".file").forEach((file) => {
    file.hidden = file.id !== id;
  });

  document.querySelectorAll(".menu__item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.open === id);
  });

  renderTabs(id);
  statusPath.textContent = document.getElementById(id).dataset.path;
  terminal.innerHTML = `<span class="terminal__prompt">ooo@portfolio ~ %</span> ${terminalMessages[id]}`;
  editorScroll.scrollTop = 0;
}

// data-open 속성이 있는 버튼(메뉴, 탭, Run)은 모두 이 한 곳에서 처리 (이벤트 위임)
document.addEventListener("click", (e) => {
  const button = e.target.closest("[data-open]");
  if (button) {
    openFile(button.dataset.open);
  }
});

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

// 초기 실행: 주소 끝에 #todo 처럼 붙어 있으면 그 파일부터 열기
loadTheme();
renderProjects(projects);

const startId = location.hash.slice(1);
openFile(terminalMessages[startId] ? startId : "about");
