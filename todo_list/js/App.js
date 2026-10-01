// 1. 전체출력 기능
// 초기 데이터
let mockData = [
  { id: 0, isDone: false, content: "React study", date: new Date().getTime() },
  { id: 1, isDone: true, content: "친구만나기", date: new Date().getTime() },
  { id: 2, isDone: false, content: "낮잠자기", date: new Date().getTime() },
];

// 요일 출력 배열
let day = ["일", "월", "화", "수", "목", "금", "토"];

onload = () => {
  // initData(mockData) 함수 호출
  initData(mockData);

  // 현재 날짜를 년 월 일 요일로 출력
  const today = new Date();

  document.querySelector("h1").innerText =
    `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${day[today.getDay()]}요일`;
};

const initData = (printData) => {
  // mockData 배열을 forEach를 이용해서 화면 출력
  let todoList = "";
  const wrapper = document.querySelector(".todos_wrapper");

  printData.forEach((todo) => {
    const { id, isDone, content, date } = todo;

    // checkbox 이벤트
    todoList += `
      <div class="TodoItem">
        <input type="checkbox" onchange="onUpdate(${id})" ${isDone ? "checked" : ""} />
        <div class="content">${content}</div>
        <div class="date">${new Date(date).toLocaleDateString()}</div>
        <button type="sumbit" name="${id}" onclick="todoDel(this)">삭제</button>
      </div>`;
  });
  wrapper.innerHTML = todoList;
};

// 추가기능
let idIndex = 3;
document
  .querySelector(".Editor > button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // 전송 기능 막기

    const inputEdit = document.querySelector(".Editor > input");
    // console.log(inputEdit.value);

    if (inputEdit.value.trim() === "") {
      return alert("할 일을 작성해주세요.");
    }
    const newTodo = {
      id: idIndex,
      isDone: false,
      content: inputEdit.value,
      date: new Date().getTime(),
    };

    mockData.push(newTodo);
    idIndex++;

    initData(mockData);
  });

// 체크박스 추가
const onUpdate = (targetId) => {
  // TodoItem에서 호출할 때 전달한 id
  mockData.forEach((todo) => {
    if (todo.id === targetId) {
      todo.isDone = !todo.isDone;
    }
  });
  // console.log(mockData);

  initData(mockData);
};

// 삭제기능
const todoDel = (th) => {
  // filter 삭제하려는 대상 이외 todo 만 추출해서 mockData 담기
  const del = Number(th.name);

  mockData = mockData.filter((todo) => todo.id !== del);

  initData(mockData);
};

// 검색기능
document.querySelector("#keyword").addEventListener("keyup", (event) => {
  let searchedTodos = getFilterData(event.target.value);
  initData(searchedTodos);
});

const getFilterData = (search) => {
  //검색어가 없으면 mockData를 리턴한다.
  if (search === "") {
    return mockData;
  }
  //filter함수를 이용해서 search(검색어)를 포함하고 있는 todo들를 받는다
  //filter의 결과를 리턴 한다.
  return mockData.filter((todo) => todo.content.includes(search));
};
