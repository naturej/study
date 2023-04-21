import { MockPosts } from "./faker.js";

const searchParams = new URLSearchParams(location.search);
const pageParam = searchParams.get("page");
const $postList = document.getElementById("post-list");
const $pageList = document.getElementById("page-list");

let totalItemCount = MockPosts(200).length;
let pageGroupSize = 10;
let totalPage = Math.ceil(totalItemCount / pageGroupSize);
let currentPage = pageParam ? Number(pageParam) : 1;
let pageStr = "";

let pageGroupStart =
  Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
let pageGroupEnd = pageGroupStart + pageGroupSize;

let postListHTML = "";
const posts = MockPosts(10);

/** ==================================================
 *  포스팅 랜더링
 *  ==================================================
 */

/**
 *
 * @param {post[]} post
 * @returns {String}
 */
const postInfo = (post) => `
  <li class="border-b border-solid border-zinc-200">
    <div class="">
      ${
        post.myPost
          ? `<div>
      <button>수정</button>
      <button>삭제</button>
    </div>`
          : ``
      }
      <div class="post-card p-6">
        <div class="pb-3 flex align-">
          <div class="post-user-profile mr-4">
            <img class="w-12 h-12 bg-gray-100 rounded-full" src="${
              post.User.profileImg
            }" />
          </div>
          <div class="post-user-info">
            <p class="text-base">${post.User.nickName}</p>
            <p class="mt-1 text-xs text-zinc-400">${convertDate(
              post.createdAt
            )}</p>
          </div>
        </div>
        <h4 class="post-title font-semibold pb-2">${post.title}</h4>
        <div class="post-content font-thin">${post.content}</div>
        <button class="btn-toggle-comment mt-2 text-zinc-700 tracking-tight">댓글 보기</button>
      </div>
      <div class="comment-wrap">
        <ul class="replies-list p-6 bg-zinc-100">
          ${commentInfo(post.Comments)}
        </ul>
      </div>
    </div>
  </li>
`;

/**
 *
 * @param {Date} date - ISO8601 형식의 날짜 객체
 * @returns {String} formatDate - "YYYY-MM-DD HH:mm:ss" 형식의 문자열
 */
function convertDate(date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

/**
 *
 * @param {comment[]} comments
 * @returns
 */
const commentInfo = (comments) => {
  return comments
    .map(
      (comment) => `
    <li class="reply-item pb-3 flex align-top">
      <div class="reply-user-info mr-4">
        <img class="w-12 h-12 bg-gray-100 rounded-full" src="${
          comment.User.profileImg
        }" />
      </div>
      <div class="comment-info">
        <p class="text-zinc-500 leading-none text-sm">${
          comment.User.nickName
        }</p>
        <div class="reply-content pt-1 pb-2 text-zinc-800 leading-tight font-normal">${
          comment.content
        }</div>
        <div class="reply-date text-xs text-zinc-400">${convertDate(
          comment.createdAt
        )}</div>
      </div>
      ${
        comment.myComment
          ? `
      <div>
        <button>수정</button>
        <button>삭제</button>
      </div>
      `
          : ``
      }
    </li>
  `
    )
    .join("");
};

function renderPost(posts) {
  postListHTML = posts.map((post) => postInfo(post)).join("");
  $postList.innerHTML = postListHTML;
}
renderPost(posts);

const $btnToggleComments = document.querySelectorAll(".btn-toggle-comment");

for (let btn of $btnToggleComments) {
  btn.addEventListener("click", (event) => {
    const $commentWrap = event.target.parentNode.nextElementSibling;
    const commentListHeight = $commentWrap.firstElementChild.clientHeight;
    if (event.target.classList.contains("opened")) {
      event.target.classList.remove("opened");
      event.target.innerHTML = "댓글 보기";
      $commentWrap.style.height = `0px`;
    } else {
      event.target.classList.add("opened");
      event.target.innerHTML = "닫기";
      $commentWrap.style.height = `${commentListHeight}px`;
    }
  });
}

/** ==================================================
 *  페이징
 *  ==================================================
 */
document
  .querySelector(".beginLabel")
  .addEventListener("click", () => movePage(1));
document
  .querySelector(".prevLabel")
  .addEventListener("click", () => movePage(currentPage - 1));
document
  .querySelector(".nextLabel")
  .addEventListener("click", () => movePage(currentPage + 1));
document
  .querySelector(".endLabel")
  .addEventListener("click", () => movePage(totalPage));

/**
 * 이동할 페이지를 입력받아 해당 페이지로 문서를 이동하는 함수
 * @param {number} page - 이동할 페이지 숫자
 */
function movePage(page) {
  if (page <= 0 || page > totalPage) return;
  if (page === currentPage) return;
  currentPage = page;
  location.href = `./index.html?page=${page}`;
}

// 페이지 번호 추가
for (let pageIndex = pageGroupStart; pageIndex < pageGroupEnd; pageIndex++) {
  if (pageIndex > totalPage) break;
  pageStr += `<span class="pageLabel hover:text-red-600 p-1 gap-1 rounded-md ${
    pageIndex === currentPage
      ? " text-red-600"
      : " text-gray-500 cursor-pointer"
  }" data-page="${pageIndex}">${pageIndex}</span>`;
}
$pageList.innerHTML = pageStr;

const $labels = document.querySelectorAll(".pageLabel");
for (let label of $labels) {
  let page = Number(label.dataset.page);
  label.addEventListener("click", () => movePage(page));
}
