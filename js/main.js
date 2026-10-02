// 대표 프로젝트 (큰 카드)
// link가 빈 문자열이면 클릭되지 않는 카드로 표시됨 (회사 업무처럼 공개 링크가 없는 경우)
const projects = [
  {
    title: "운영지원시스템",
    meta: "㈜우보재난시스템 · 실무 · 2023.10 — 2026.07",
    desc: "재난 장비 상태 모니터링 · 점검 이력 관리 웹",
    tags: ["Vue 3", "Node.js", "Nestjs", "MariaDB", "JWT", "Kakao Map API"],
    // NOTE: 보안을 위해 실제 화면이 아닌 가짜 데이터로 재구성한 대체 이미지
    img: "img/ops-dashboard-sample.png",
    // 이미지 아래에 표시할 안내 문구 (없으면 생략)
    imgNote: "보안을 위해 실제 화면 대신 재구성한 대체 이미지입니다.",
    link: "",
    // 내가 직접 개선한 것 (diff 박스로 표시됨)
    added: ["JWT 인증 + 카카오맵 장비 위치", "점검 이력 관리 기능 개선"],
    // 트러블슈팅 (접었다 펼치는 박스로 표시됨, 없으면 null)
    trouble: {
      problem: "현장 점검마다 노트북을 장비에 연결해야 했음",
      solution: "점검·테스트 화면을 모바일 WebView로 구현",
      result: "점검 시간 30분 → 10분 (약 67% 단축)",
    },
  },
  {
    title: "Gotcha-Fish",
    meta: "2인 팀 프로젝트 · 2026.08.27 — 2026.09.15",
    desc: "낚시 · 판매 · 낚싯대 구매로 도감을 채우는 Java 콘솔 게임",
    tags: ["Java", "JDBC", "MySQL", "Git"],
    img: "img/gotcha-fish.png",
    link: "https://github.com/Gotcha-Fish/Gotcha-Fish",
    added: [
      "낚시터 · 물고기 · 도감 · 낚시하기 도메인 담당",
      "희귀도 확률 기반 물고기 생성 로직",
    ],
    trouble: {
      problem:
        '골드가 부족해도 낚시터 잠금 해제를 시도 → DB CHECK 제약 위반, "오류가 발생했습니다"만 출력',
      solution:
        "Service 레이어에서 보유 골드를 먼저 검증하고 명확한 예외 메시지 반환",
      result: "DB 오류에 기대지 않고 원인이 드러나는 메시지 제공",
    },
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
    trouble: null,
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
    title: "Movie",
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
    const { title, meta, desc, tags, img, imgNote, link, added, trouble } =
      project;
    const thumb = img
      ? `<img src="${img}" alt="${title} 실행 화면" />`
      : "Screenshot 16:10";
    const chips = tags.map((tag) => `<li>${tag}</li>`).join("");
    const diff =
      added.length > 0
        ? `<ul class="diff">${added.map((item) => `<li>+ ${item}</li>`).join("")}</ul>`
        : "";

    // 링크가 있으면 제목에만 링크 (카드 전체를 <a>로 감싸면 안의 펼치기 버튼을 눌러도 이동해버림)
    const heading = link
      ? `<a href="${link}" target="_blank" rel="noopener">${title} <span class="project__arrow">↗</span></a>`
      : title;

    // 트러블슈팅: <details>는 클릭하면 펼쳐지는 기본 HTML 태그 (JS 없이 동작)
    const troubleBox = trouble
      ? `
        <details class="trouble">
          <summary>Troubleshooting</summary>
          <dl>
            <dt>문제</dt><dd>${trouble.problem}</dd>
            <dt>해결</dt><dd>${trouble.solution}</dd>
            <dt>결과</dt><dd>${trouble.result}</dd>
          </dl>
        </details>`
      : "";

    html += `
      <article class="cell project">
        <figure class="project__media">
          <div class="project__thumb">${thumb}</div>
          ${imgNote ? `<figcaption class="project__caption">※ ${imgNote}</figcaption>` : ""}
        </figure>
        <div class="project__body">
          <h3 class="project__title">${heading}</h3>
          <p class="project__meta label">${meta}</p>
          <p class="project__desc">${desc}</p>
          ${diff}
          ${troubleBox}
          <ul class="tags">${chips}</ul>
        </div>
      </article>`;
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

// 숫자 카운트업: 0부터 data-count 값까지 점점 올라가게 표시
function countUp(el) {
  const target = Number(el.dataset.count);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const duration = 1500;
  const startTime = performance.now();

  // 움직임 줄이기 설정을 켠 사용자에게는 최종 숫자만 보여줌
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    // easeOutCubic: 처음엔 빠르게, 끝에 갈수록 천천히 멈춤
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

// 스크롤 등장 효과: nav 메뉴(About, Experience ...)와 연락하기 버튼이 가리키는 섹션 단위로
// 처음엔 아래에 숨어 있다가 화면에 들어오면 올라오며 나타남
function observeReveal() {
  const links = document.querySelectorAll(
    '.nav a[href^="#"], .header .btn[href^="#"]',
  );

  // href="#about" → id가 about인 섹션 찾기 (메뉴를 추가/삭제해도 자동으로 따라감)
  const targets = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter((section) => section !== null);

  // NOTE: 숨기는 클래스는 JS에서 붙임 → JS가 꺼져 있어도 내용은 그대로 보임
  targets.forEach((section) => section.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    // 섹션 윗부분이 화면 아래쪽 15% 선을 넘으면 등장 (긴 섹션도 늦지 않게 나오도록 threshold 0)
    { threshold: 0, rootMargin: "0px 0px -15% 0px" },
  );

  targets.forEach((el) => observer.observe(el));
}

// 카운트업 숫자는 섹션이 아니라 "숫자 자체"가 화면에 다 보일 때 시작
// NOTE: 섹션 기준으로 시작하면 숫자가 아직 화면 밖일 때 끝나버려서 효과가 안 보임
function observeCountUp() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        // 섹션이 올라오는 애니메이션(0.8초)이 어느 정도 진행된 뒤 시작
        setTimeout(() => countUp(entry.target), 300);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 1 },
  );

  document.querySelectorAll("[data-count]").forEach((el) => {
    // 처음엔 0으로 표시해 두고, 보이면 올라가게 (JS가 꺼져 있으면 HTML의 최종 숫자가 그대로 보임)
    el.textContent = `${el.dataset.prefix || ""}0${el.dataset.suffix || ""}`;
    observer.observe(el);
  });
}

// 스플래시: 3초 뒤 사라지고, 클릭하면 바로 건너뜀. 같은 탭에서는 한 번만 보여줌
// onDone: 스플래시가 끝난 뒤 실행할 함수 (터미널 타이핑 시작 등)
function initSplash(onDone) {
  const splash = document.getElementById("splash");
  const root = document.documentElement;

  if (!splash) {
    onDone();
    return;
  }

  // sessionStorage: 탭을 닫기 전까지만 유지되는 저장소 (새로고침해도 다시 안 뜸)
  let isSeen = false;
  try {
    isSeen = sessionStorage.getItem("splashSeen") === "true";
    sessionStorage.setItem("splashSeen", "true");
  } catch (e) {
    // NOTE: 시크릿 모드 등에서 막혀도 스플래시는 정상 동작
  }

  if (isSeen) {
    splash.remove();
    onDone();
    return;
  }

  // 스플래시가 떠 있는 동안 스크롤 막고 첫 화면 애니메이션 대기 (CSS의 .is-splash)
  root.classList.add("is-splash");

  let isClosed = false;

  function hideSplash() {
    // 클릭과 타이머가 겹쳐도 한 번만 실행
    if (isClosed) {
      return;
    }
    isClosed = true;

    splash.classList.add("is-hidden");
    root.classList.remove("is-splash");
    splash.addEventListener("transitionend", () => splash.remove(), {
      once: true,
    });
    onDone();
  }

  const timer = setTimeout(hideSplash, 3000);

  splash.addEventListener("click", () => {
    clearTimeout(timer);
    hideSplash();
  });
}

// 터미널 자기소개: cmd는 한 글자씩 타이핑, out은 한 번에 출력
// NOTE: out에는 색을 입히려고 <span> 태그를 넣음 (클래스는 style.css의 .t-*)
const terminalScript = [
  {
    cmd: "whoami",
    out: '서인석 (또비) <span class="t-key">— Backend · DevOps Developer</span>',
  },
  {
    cmd: "cat career.txt",
    out: [
      '<span class="t-key">company</span>  ㈜우보재난시스템',
      '<span class="t-key">period </span>  2023.10 — 2026.07 (2y 10m)',
      '<span class="t-key">impact </span>  <span class="t-ok">점검 시간 30분 → 10분 (-67%)</span>',
    ].join("\n"),
  },
  {
    cmd: "ls stack/",
    out: '<span class="t-hl">Vue3/  Node.js/  MySQL/  Java/  Spring-Boot/  Docker/  AWS/</span>',
  },
  {
    cmd: "echo $NOW",
    out: "DevOps 과정 수강 중 (2026.07 — 12)",
  },
];

const terminal = document.getElementById("terminal");
const PROMPT = '<span class="t-arrow">➜</span>  <span class="t-dir">~</span> ';
const CARET = '<span class="t-caret"></span>';

// 지정한 시간(ms)만큼 기다리는 함수 (await와 함께 사용)
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 내용이 넘치면 항상 맨 아래(최신 줄)가 보이도록
function showTerminal(html) {
  terminal.innerHTML = html;
  terminal.scrollTop = terminal.scrollHeight;
}

async function runTerminal() {
  if (!terminal) {
    return;
  }

  // 움직임 줄이기 설정이면 타이핑 없이 결과만 한 번에 표시
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const all = terminalScript
      .map(({ cmd, out }) => `${PROMPT}${cmd}\n${out}`)
      .join("\n");
    showTerminal(`${all}\n${PROMPT}`);
    return;
  }

  let history = "";
  showTerminal(PROMPT + CARET);
  await wait(600);

  for (const { cmd, out } of terminalScript) {
    // 명령어를 한 글자씩 타이핑
    for (let i = 1; i <= cmd.length; i++) {
      showTerminal(`${history}${PROMPT}${cmd.slice(0, i)}${CARET}`);
      await wait(70);
    }
    await wait(300);

    // 엔터 → 결과 출력 → 다음 프롬프트
    history += `${PROMPT}${cmd}\n${out}\n`;
    showTerminal(history + PROMPT + CARET);
    await wait(700);
  }
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

// 초기 실행 (카드가 다 만들어진 뒤에 빛 효과, 등장 효과를 붙여야 함)
initSplash(runTerminal);
renderProjects(projects);
renderPractices(practices);
addSpotlight();
observeReveal();
observeCountUp();
