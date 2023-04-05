import data from "./db.js";

const siteUrl = "https://ridibooks.com";

const bookListHTML = data.map((book) => bookInfo(book)).join("");

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
                    book.price.rentalPrice
                      ? `<div class="absolute shadow-sm shadow-gray-500 -left-3 -top-3 w-11 h-11 flex justify-center items-center rounded-full text-white bg-emerald-600 badge">대여</div>`
                      : `${
                          book.price.discountPercent
                            ? `<div class="absolute shadow-sm shadow-gray-500 -left-3 -top-3 w-11 h-11 flex justify-center items-center rounded-full text-white bg-slate-600 badge">${book.price.discountPercent}<span class="text-xs">%<span></div>`
                            : ``
                        }`
                  }
                  ${
                    book.setBook
                      ? `<div class="absolute bottom-12 left-0 right-0 shadow-sm shadow-gray-500 flex justify-center bg-white set-book">${book.setBook}권 세트</div>`
                      : ``
                  }
                  <img class="shadow-sm shadow-gray-400" src="${
                    book.thumbnail.imgUrl
                  }" alt="${book.name} 표지 이미지" />
              </a>
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
