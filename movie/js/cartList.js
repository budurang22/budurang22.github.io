// localStorage 저장된 값 가져오기
let total = 0;

const content = document.querySelector("#content");
const totalPrice = document.querySelector(".totalprice");

for (let i = 0; i < localStorage.length; i++) {
  const localKey = localStorage.key(i);
  const localItem = localStorage.getItem(localKey);
  // console.log(localItem);

  const [cartId, img, price] = localItem.split(",");
  // console.log(cartId, img, price);

  content.innerHTML += `<tr>
    <td><img class="poster" src="${img}" /></td>
    <td>${localKey}</td>
    <td>${cartId}</td>
    <td>${parseInt(price).toLocaleString()}원</td>
    <td><button type="button" value="remove" data-id=${localKey}>삭제</button></td>
  </tr>`;

  total += parseInt(price);
}
totalPrice.innerHTML = `<span>${parseInt(total).toLocaleString()}원</span>`;

// 삭제 하면서 localStorage에도 삭제
document.body.addEventListener("click", (event) => {
  // 버튼 클릭 시 삭제
  if (event.target.matches("[value=remove]")) {
    let tr = event.target.parentElement.parentElement;
    tr.parentElement.removeChild(tr);

    // 이벤트 발생하는 버튼 태그의 id 값 가져와서 삭제
    let localKey = event.target.dataset.id;
    localStorage.removeItem(localKey);
  }
});
