// 영상 재생 video 태그 찾아서 변수 담기
const video = document.querySelector("#video");

// 미리보기 클릭 시 #video에 각각의 영상 넣기
document.querySelectorAll("[name=vplay]").forEach((btn) => {
  // 미리보기 버튼 클릭시 event
  btn.addEventListener("click", function () {
    // console.log(this.dataset.mediaSrc);
    const playList = this.dataset.mediaSrc;

    video.src = playList;
    video.play();
  });
});

// localStroage에 저장하기
document.querySelectorAll("[name=cartinsert]").forEach((btn) => {
  // console.log(btn.value);

  btn.addEventListener("click", function () {
    const cartId = this.id;
    const cartInfo = this.dataset.info;

    localStorage.setItem(cartId, cartInfo);

    // alert("data save ok");
  });
});
