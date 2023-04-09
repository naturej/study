import data from "./db.js";

const siteUrl = "https://ridibooks.com";
const limit = 5;
const $bookList = document.getElementById("book-list");

let currentPage = 1;
let pages = data.slice(0, limit);
let bookListHTML = "";

renderBook(pages);

/**
 * 렌더링 함수
 * 도서 리스트에 변화가 있을 경우 도서 리스트를 재렌더링 해줍니다.
 * @param {book[]} pages
 */
function renderBook(pages) {
  //bookListHTML은 pages(book[])를 각각(map) 랜더링할 문자열로 변환(bookInfo) 후 합친(join) 결과
  bookListHTML = pages.map((book) => bookInfo(book)).join("");
  $bookList.innerHTML = bookListHTML;

  // 위시리스트 추가
  const btnWishes = document.querySelectorAll(".btn-wish");

  for (let btnWish of btnWishes) {
    btnWish.addEventListener("click", function (event) {
      event.stopPropagation();

      const isUserWish = this.dataset["isUserWish"];
      const targetId = this.dataset["id"];
      const targetBook = pages.find((book) => book.id.toString() === targetId);
      const index = pages.findIndex((book) => book.id.toString() === targetId);

      // ...
      // 백엔드 통신
      // ...
      // 성공 하면
      // ...

      isUserWish === "Y"
        ? pages.splice(index, 1, { ...targetBook, isUserWish: "N" })
        : pages.splice(index, 1, { ...targetBook, isUserWish: "Y" });
      renderBook(pages);
    });
  }
}

/**
 * 도서의 작가 리스트를 입력받아 a태그로 감싸고 합쳐서 문자열로 반환하는 함수.
 * 작가 ID가 있을 경우 작가 안내 페이지, 없으면 작가 검색 결과로 링크를 연결해주고,
 * 작가가 2명 이상일 경우 그 외 n명로 표시해줍니다.
 * @param {[{[id],username}]} author
 * @returns {string}
 */
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

/**
 * 숫자를 입력받아 숫자 3자리마다(천단위) 콤마(,)를 찍어서 문자열로 반환해주는 함수
 * @param {number} price
 * @returns {string}
 */
function priceComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * book 객체를 입력 받아 랜더링할 문자열로 반환해주는 함수
 * @param {{}} book
 * @returns {string}
 */
function bookInfo(book) {
  return `
  <li>
      <div class="book flex md:block" data-id="${book.id}">
        <div class="thumbnail-wrap h-auto md:h-48 flex items-end">
          <div class="thumbnail relative w-28 md:w-full">
            <a href="${siteUrl}/books/${book.id}">
              ${
                book.setBook
                  ? `<div class="set-book absolute bottom-12 left-0 right-0 h-5 shadow-sm shadow-gray-500 flex justify-center bg-white text-sm">${book.setBook}권 세트</div>`
                  : ``
              }
              <img class="shadow-sm shadow-gray-400" src="${
                book.thumbnail.imgUrl
              }" alt="${book.title} 표지 이미지" />
            </a>
            <div class="absolute p-1 left-0 top-0 w-8 h-8">
              <input type="checkbox" data-id="${
                book.id
              }" class="checkbox shadow-sm bg-gray-100 shadow-gray-500 w-4 h-4" />
            </div>
            <div data-id="${book.id}" data-is-user-wish="${
    book.isUserWish
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
          <div class="info w-full px-4 py-0 md:p-0">
              <div class="title md:mt-2 text-sm tracking-tight line-clamp-2"><a class="hover:underline underline-offset-1" href="${siteUrl}/books/${
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
              <div>
              <div class="publisher inline-block md:hidden"><a class="text-slate-500 text-xs" href="${siteUrl}/search?q=${
    book.publisher
  }">${book.publisher}</a></div>
              <div class="genre inline-block md:hidden"><span class="text-slate-500 text-xs">${
                book.genre
              }</span></div></div>
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

// 더보기 버튼 클릭 시 리스트 더불러오기
document.getElementById("btn-more").addEventListener("click", function (event) {
  for (let i = 0; i < limit; i++) {
    let currentIndex = i + currentPage * limit;
    pages.push(data[currentIndex]); // 현재 배열에 붙이기

    // data 마지막에 오면
    if (currentIndex >= data.length - 1) {
      event.target.style.display = "none"; // 더보기 버튼 가리기
      break; // 반복문 탈출
    }
  }
  renderBook(pages);
  currentPage++;
});

// 삭제 버튼 클릭 시 리스트에서 제거
document.getElementById("btn-delete").addEventListener("click", function () {
  let ids = [];
  const checkedList = document.querySelectorAll(".checkbox:checked");

  if (checkedList.length === 0) {
    alert("체크박스를 선택해주세요.");
    return;
  }

  for (let checkbox of checkedList) {
    ids.push(checkbox.dataset["id"]);
  }

  // ...
  // 백엔드 통신
  // ...
  // 성공 하면
  // ...

  pages = pages.filter((book) => {
    return ids.indexOf(book.id.toString()) < 0;
  });

  renderBook(pages);
});
