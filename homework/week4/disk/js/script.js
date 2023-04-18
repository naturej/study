const musicListData = [
  {
    src: "./assets/image/iu_0.jpg",
    color: ["#0272a4", "#f6a564"],
  },
  {
    src: "./assets/image/iu_1.jpg",
    color: ["#b6bfc8", "#36595b"],
  },
  {
    src: "./assets/image/iu_2.jpg",
    color: ["#e58e82", "#6f569f"],
  },
];

/*

문제1.
    디스크 문제 구현하기. 필요한 html, css, animation은 모두 구현하였으나
    혹 본인 재량하에 추가하고 싶은 css와 animation이 있으면 추가해두시면 됩니다.

    요구사항
    
        (1) 구현영상을 참고하여 구현영상과 같은 효과를 진행해보세요
        (2) play 버튼 클릭시에는 해당 이미지에 맞는 이미지가 배경화면으로 보이고 disk가 회전되어야합니다
        (3) stop 버튼을 누르면 배경화면이 사라지고 disk는 멈추어야합니다.
        (4) 앨범은 총 3개가 있으며 만약 진행 중 다른 앨범을 선택하고 play를 누르면 다른 앨범이 play 되어야합니다.
        (5) 앨범 리스트는 (next, prev) 버튼으로도 움직일 수 있으며 클릭으로도 원하는 앨범으로 이동할 수 있습니다.
        (6) 현재 선택된 앨범은 focus되어 크기가 커지는 효과를 추가해야합니다.
        (7) 저작권 상 음악은 넣지 못했지만 만약 넣고 싶다면 본인이 다운로드 하여 audio 태그를 활용하여 실행할 수 있습니다.
        (8) 이 외 다른 구현 사항은 영상을 참고하여 만들어보세요 :)

    주의사항

        단, 아래의 조건만 채운다면 반드시 똑같이 만들 필요는 없습니다.
        즉 애니메이션과 css를 구현 영상과 똑같이 하실 필요는 없으며, 이를 위해 html이나 css를 따로 건드셔도 괜찮습니다.
        해당 html과 css, animation은 제가 빠른 시일 내에 급히 작성한 것이기 때문에 이해가 조금 어려울 수 있습니다

        (1) 각 노래에 맞는 앨범 자켓 이미지로 배경이 바뀌어야함 
        (2) 각 노래에 맞는 색상으로 disk_inner와 stop 상태의 배경이 바뀌어야함
        (3) start 시에는 disk가 돌아가고 stop 시에는 disk가 멈춰야함
        (4) 선택된 앨범에는 하이라이트 호과가 있어야하며 클릭 및 버튼을 통해 선택이 가능함
*/

const $main = document.querySelector("main");
const $albumList = document.getElementById("album-list");
const $backElement = document.getElementById("album-bg");
const $disk = document.querySelector(".disk");
const $diskInner = document.querySelector(".disk_inner");

const $btnPlay = document.getElementById("btn-play");
const $btnStop = document.getElementById("btn-stop");
const $btnPrev = document.getElementById("btn-prev");
const $btnNext = document.getElementById("btn-next");

let page = 0;
let bgColor = "";
let bgImage = "";

// 앨범 리스트 세팅
musicListData.forEach(({ src, color }, index) => {
  const $li = document.createElement("li");
  const $img = document.createElement("img");
  $img.src = src;
  $img.classList.add("album");
  $img.dataset["color"] = color;
  $img.dataset["index"] = index;
  $img.addEventListener("click", clickAlbum);
  $li.appendChild($img);
  $albumList.appendChild($li);
  // 초기 상태 세팅
  if (index === 0) {
    $img.classList.add("play");
    bgColor = color;
    bgImage = src;
  }
});

/**
 * 입력한 페이지에 따라 앨범이미지, 배경색상, 디스크 색상을 변경하고
 * 해당 페이지의 앨범에 play 클래스를 추가하는 함수
 * @param {number} page
 */
function renderAlbum(page) {
  const $imgList = document.querySelectorAll(".album");
  $imgList.forEach((el, index) => {
    if (page === index) {
      el.classList.add("play");
      bgColor = el.dataset.color; // bgColor : "#0272a4", "#f6a564" 형식의 String
      bgImage = el.src; // bgImage: "./assets/image/iu_0.jpg" 형식의 String)
      $main.style.background = `linear-gradient(120deg, ${bgColor})`;
      $diskInner.style.background = bgColor.split(",")[0];
    } else {
      el.classList.remove("play");
    }
  });
}

// 앨범 클릭 시
function clickAlbum(event) {
  page = Number(event.target.dataset.index);
  renderAlbum(page);
}

// play 버튼 클릭 시
$btnPlay.addEventListener("click", () => {
  $disk.classList.add("active");
  $backElement.style.animation = `upToDown 1s`;
  $backElement.style.backgroundImage = `url(${bgImage})`;
  setTimeout(() => {
    $backElement.style.animation = `none`;
  }, 1000);
});

// stop 버튼 클릭 시
$btnStop.addEventListener("click", () => {
  $disk.classList.remove("active");
  $backElement.style.animation = `downToUp 1s forwards`;
});

// 이전 버튼 클릭 시
$btnPrev.addEventListener("click", () => {
  if (page <= 0) {
    page = musicListData.length - 1;
  } else {
    page--;
  }
  renderAlbum(page);
});

// 다음 버튼 클릭 시
$btnNext.addEventListener("click", () => {
  if (page >= musicListData.length - 1) {
    page = 0;
  } else {
    page++;
  }
  renderAlbum(page);
});
