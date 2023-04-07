import data from "./db.js";

const siteUrl = "https://ridibooks.com";

let pages = [];
let currentPage = 1;
let limit = 5;

for (let i = 0; i < limit; i++) {
  pages.push(data[i]);
}

let bookListHTML = pages.map((book) => bookInfo(book)).join("");

function authorInfo(authors) {
  const etc = authors.length - 2;
  const str = authors
    .filter((author, index) => {
      return index < 2;
    })
    .map((author) => {
      return `<a href="${siteUrl}${
        author.id ? `/author/${author.id}` : `/search?q=${author.username}`
      }">${author.username}</a>`;
    })
    .join(", ");
  return `<span class="">${str} ${etc > 0 ? `외 ${etc}명` : ``}</span>`;
}

function priceComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function bookInfo(book) {
  return `
  <li>
      <div class="book" data-id="${book.id}">
        <div class="thumbnail-wrap">
          <div class="thumbnail relative">
            <a href="${siteUrl}/books/${book.id}">
              ${
                book.setBook
                  ? `<div class="absolute bottom-12 left-0 right-0 shadow-sm shadow-gray-500 flex justify-center bg-white set-book">${book.setBook}권 세트</div>`
                  : ``
              }
              <img class="shadow-sm shadow-gray-400" src="${
                book.thumbnail.imgUrl
              }" alt="${book.name} 표지 이미지" />
              </a>
              <div class="absolute p-1 left-0 top-0 w-8 h-8">
                <input type="checkbox" data-id="${
                  book.id
                }" class="checkbox shadow-sm bg-gray-100 shadow-gray-500 w-4 h-4" />
              </div>
              <div data-id="${
                book.id
              }" class="btn-wish absolute p-1 items-center right-1 top-1 w-8 h-8 bg-white rounded-full cursor-pointer">
              <svg class="absolute" fill="${
                book.isUserWish === "Y" ? `tomato` : `none`
              }" stroke="${
    book.isUserWish === "Y" ? `tomato` : `#bebebe`
  }" stroke-width="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
              </svg>
              </div>
            </div>
          </div>
          <div class="info">
              <div class="title mt-2 text-sm tracking-tight line-clamp-2"><a class="hover:underline underline-offset-1" href="${siteUrl}/books/${
    book.id
  }">${book.title}</a></div>
              <div class="author text-slate-500 text-xs mt-1">${authorInfo(
                book.author
              )}</div>
              <div class="starRate">
                <span class="StarRate_IconBox">
                  <span class="StarRate_IconFill" style="width:${
                    book.starRate.score
                  }%"></span>
                </span>
                ${
                  book.starRate.participantCount > 0
                    ? `<span class="participant_count text-xs font-light text-slate-400">${book.starRate.participantCount}명</span>`
                    : ``
                }
              </div>
              <div class="publisher hidden"><a class="text-slate-500 text-xs" href="${siteUrl}/search?q=${
    book.publisher
  }">${book.publisher}</a></div>
              <div class="genre text-slate-500 text-xs hidden">${
                book.genre
              }</div>
              <div class="price">
                  ${
                    book.price.rentalPrice
                      ? `<div class="rental_price text-slate-500 text-xs">대여 <span class="text-sky-600 font-medium">${priceComma(
                          book.price.rentalPrice
                        )}원</span></div>`
                      : ``
                  }
                  <div class="buy_price text-slate-500 text-xs">소장 <span class="text-sky-600 font-medium">${priceComma(
                    book.price.buyPrice
                  )}원</span>${
    book.price.discountPercent
      ? `<span class="discount text-red-500">&nbsp;(${book.price.discountPercent}%↓)</span>`
      : ``
  }</div>
              </div>
          </div>
      </div>
    </li>
  `;
}

const $bookList = document.getElementById("book-list");
$bookList.innerHTML = bookListHTML;

// 더보기 버튼
document.getElementById("btn-more").addEventListener("click", function (event) {
  for (let i = 0; i < limit; i++) {
    let j = i + currentPage * limit;
    // data 마지막에 오면
    if (j > data.length - 1) {
      event.target.style.display = "none"; // 더보기 버튼 가리기
    } else {
      pages.push(data[j]); // 현재 배열에 붙이기
    }
  }
  bookListHTML = pages.map((book) => bookInfo(book)).join("");
  $bookList.innerHTML = bookListHTML;
  currentPage++;
});

// 위시리스트 추가
// TODO: 한 번 리스트 업데이트하고 난 뒤에는 이벤트 핸들러가 동작하지 않는 이슈 수정
document.querySelectorAll(".btn-wish").forEach((btnWish) => {
  btnWish.addEventListener("click", function (event) {
    console.log("클릭");
    event.stopPropagation();
    const targetId = this.dataset["id"];
    const targetBook = pages.find((book) => book.id.toString() === targetId);
    const index = pages.findIndex((book) => book.id.toString() === targetId);

    pages.splice(index, 1, { ...targetBook, isUserWish: "Y" });
    console.log(pages);
    bookListHTML = pages.map((book) => bookInfo(book)).join("");
    $bookList.innerHTML = bookListHTML;
  });
});

// 삭제 버튼 클릭 시 리스트에서 제거
document.getElementById("btn-delete").addEventListener("click", function () {
  let ids = [];
  const checkedList = document.querySelectorAll(".checkbox:checked");

  if (checkedList.length === 0) {
    alert("체크박스를 선택해주세요.");
    return;
  }
  checkedList.forEach((el) => {
    ids.push(el.dataset["id"]);
  });

  // ...
  // 백엔드 통신
  // ...
  // 성공 하면
  // ...

  pages = pages.filter((book) => {
    return ids.indexOf(book.id.toString()) < 0;
  });

  bookListHTML = pages.map((book) => bookInfo(book)).join("");
  $bookList.innerHTML = bookListHTML;
});
