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
    .join();
  return `<span>${str} ${etc > 0 ? `외 ${etc}명` : ``}</span>`;
}

function bookInfo(book) {
  return `
  <li>
      <div class="book" data-id="${book.id}">
          <div class="thumbnail">
            <a href="${siteUrl}/books/${book.id}">
                ${
                  book.price.rentalPrice
                    ? `<div class="badge rental">대여</div>`
                    : `${
                        book.price.discountPercent
                          ? `<div class="badge discount">${book.price.discountPercent}%</div>`
                          : ``
                      }`
                }
                ${
                  book.setBook
                    ? `<div class="set_book">${book.setBook}권 세트</div>`
                    : ``
                }
                <img src="${book.thumbnail.imgUrl}" width="110" alt="${
    book.name
  } 표지 이미지" />
            </a>
          </div>
          <div class="info">
              <div class="title"><a href="${siteUrl}/books/${book.id}">${
    book.title
  }</a></div>
              <div class="starRate">
                  <div style="width:${book.starRate.score}%"></div>
                  <div class="participant_count">${
                    book.starRate.participantCount
                  }명</div>
              </div>
              <div class="author">${authorInfo(book.author)}</div>
              <div class="publisher"><a href="${siteUrl}/search?q=${
    book.publisher
  }">${book.publisher}</a></div>
              <div class="genre">${book.genre}</div>
              <div class="price">
                  ${
                    book.price.rentalPrice
                      ? `<div class="rental_price">대여 : ${book.price.rentalPrice}원</div>`
                      : ``
                  }
                  <div class="buy_price">소장 : ${book.price.buyPrice}원${
    book.price.discountPercent
      ? `<span class="discount">(${book.price.discountPercent}%↓)</span>`
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
