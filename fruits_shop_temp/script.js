// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {
  //data는 과일 또는 야채의 배열
  container.innerHTML = "";
  data.forEach((item) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}
////////아래 filterAndSortFruits() 와 loadVeggies() 완성하세요. /////////////////////////////////
/* 
  과일 출력
*/
function filterAndSortFruits() {
  // 검색 기능
  const keyword = searchBox.value;
  const filteredFruits = fruits.filter((fruit) => fruit.name.includes(keyword));

  // select 기능
  const sortType = sortSelect.value;

  if (sortType === "name") {
    filteredFruits.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortType === "low") {
    filteredFruits.sort((a, b) => a.price - b.price);
  } else if (sortType === "high") {
    filteredFruits.sort((a, b) => b.price - a.price);
  }

  //화면에 다시 출력
  renderProducts(filteredFruits, fruitList);
}

// 채소 출력 (3개씩 증가)
function loadVeggies() {
  veggiePage++;
  const visibleVeggies = veggies.slice(0, veggiePage * 3);

  //화면에 다시 출력
  renderProducts(visibleVeggies, veggieList);
}
////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener("input", filterAndSortFruits);
sortSelect.addEventListener("change", filterAndSortFruits);
loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();
