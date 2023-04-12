// shade banner
const $shadebanner = document.querySelectorAll("#shade-banner > ul > li");
const $shadebannerPrevBtn = document.querySelector(".shade-prev-btn");
const $shadebannerNextBtn = document.querySelector(".shade-next-btn");

let shadePage = 0;

// 설계
/*
  (1) prevBtn
    내가 보여줘야 하는 li(현재 li의 이전)를 제외하고 나머지 li는 투명화
    내가 보여줘야 하는 li는 실체화
  (2) nextBtn
    내가 보여줘야 하는 li(현재 li의 다음)를 제외하고 나머지 li는 투명화
    내가 보여줘야 하는 li는 실체화
  (3) 내가 보여줘야 하는 li
    유사 배열 객체 >> 특정 li를 뽑을 수 있는 방법 -> 인덱스로 접근

    =>
    prevBtn index - 1
    nextBtn index + 1

  (4) 예외상황
    0 -> -1 -> 마지막
    3 -> 4 -> 0
*/
let shadeBannerIndex = 0;

function prevShadeBanner() {
  if (shadeBannerIndex <= 0) {
    shadeBannerIndex = $shadebanner.length - 1;
  } else {
    shadeBannerIndex--;
  }
  paintShadeBanner();
}

function nextShadeBanner() {
  if (shadeBannerIndex >= $shadebanner.length - 1) {
    shadeBannerIndex = 0;
  } else {
    shadeBannerIndex++;
  }
  paintShadeBanner();
}

function paintShadeBanner() {
  $shadebanner.forEach((banner, index) => {
    if (index === shadeBannerIndex) {
      banner.style.opacity = 1;
    } else {
      banner.style.opacity = 0;
    }
  });
}

$shadebannerPrevBtn.addEventListener("click", prevShadeBanner);
$shadebannerNextBtn.addEventListener("click", nextShadeBanner);
