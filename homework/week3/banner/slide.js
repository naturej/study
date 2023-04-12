// slide banner (과제)
const $slidebannerPrevBtn = document.querySelector(".slide-prev-btn");
const $slidebannerNextBtn = document.querySelector(".slide-next-btn");

const $slideBanner = document.querySelector("#slide-banner");
const $slideList = document.querySelector("#slide-banner > ul");
const $slideItems = document.querySelectorAll("#slide-banner > ul > li");

const $stopBtn = document.querySelector(".stop-btn");
const $playBtn = document.querySelector(".play-btn");

const slideSpeed = 1000;
let slideIndex = 1;

let autoPlay;

// 슬라이드 시작 전, 첫번째와 마지막 아이템 복사해서 반대쪽에 붙이기
const firstItem = $slideList.firstElementChild.cloneNode(true);
const lastItem = $slideList.lastElementChild.cloneNode(true);
$slideList.appendChild(firstItem);
$slideList.insertBefore(lastItem, $slideList.firstElementChild);

// 이전 슬라이드 배너
function slideNextBanner() {
  if ($slideList.classList.contains("isMoving")) return;
  slideIndex++;

  if (slideIndex <= $slideItems.length + 1) {
    $slideList.style.transition = `${slideSpeed}ms`;
    $slideList.style.transform = `translateX(-${100 * slideIndex}%)`;
    $slideList.classList.add("isMoving");
  }
  if (slideIndex === $slideItems.length + 1) {
    setTimeout(function () {
      $slideList.style.transition = `0ms`;
      $slideList.style.transform = `translateX(-100%)`;
      $slideList.classList.remove("isMoving");
    }, slideSpeed);
    slideIndex = 1;
  }
}

// 다음 슬라이드 배너
function slidePrevBanner() {
  if ($slideList.classList.contains("isMoving")) return;
  slideIndex--;

  if (slideIndex >= 0) {
    $slideList.style.transition = `${slideSpeed}ms`;
    $slideList.style.transform = `translateX(-${100 * slideIndex}%)`;
    $slideList.classList.add("isMoving");
  }
  if (slideIndex === 0) {
    setTimeout(function () {
      $slideList.style.transition = `0ms`;
      $slideList.style.transform = `translateX(-${100 * $slideItems.length}%)`;
      $slideList.classList.remove("isMoving");
    }, slideSpeed);
    slideIndex = $slideItems.length;
  }
}

$slidebannerNextBtn.addEventListener("click", slideNextBanner);
$slidebannerPrevBtn.addEventListener("click", slidePrevBanner);

// 슬라이드 이동 중 버튼 클릭 못하게 막기
$slideList.addEventListener("transitionend", () => {
  $slideList.classList.remove("isMoving");
});

// 자동 재생 켬
function autoPlayStart() {
  if (!autoPlay) {
    autoPlay = setInterval(slideNextBanner, 3000);
  }
  $slideBanner.dataset.autoPlay = "start";
}

// 자동 재생 끔
function autoPlayEnd() {
  clearInterval(autoPlay);
  autoPlay = null;

  $slideBanner.dataset.autoPlay = "end";
}

autoPlayStart();
$stopBtn.addEventListener("click", autoPlayEnd);
$playBtn.addEventListener("click", autoPlayStart);
