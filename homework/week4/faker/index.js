import { randomId, MockPosts } from "./faker.js";

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
let posts = MockPosts(10);
posts.sort(({ createdAt: a }, { createdAt: b }) => {
  return b - a;
});

const tempPosts = [];

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
  <li class="border-b border-solid border-zinc-200${
    post.myPost ? " newPost" : ""
  }">
    <div class="">

      <div class="post-card p-6">
        <div class="pb-3 flex w-full justify-between">
          <div class="flex">
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
          ${
            post.myPost
              ? `<div class="flex items-center justify-end">
          <button data-post-id="${post.id}" class="btn-post-edit text-zinc-500 px-1">수정</button>
          <button data-post-id="${post.id}" class="btn-post-delete text-zinc-500 px-1">삭제</button>
        </div>`
              : ``
          }
        </div>
        <h4 class="post-title font-semibold pb-2">${post.title}</h4>
        <div class="post-content font-light">${post.content}</div>
        <button class="btn-toggle-comment mt-2 text-zinc-700 tracking-tight">댓글 보기</button>
      </div>
      <div class="comment-wrap bg-zinc-100">
        <div class="p-4">
          <form class="">
            <div class="py-2 px-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                <label for="comment" class="sr-only">Your comment</label>
                <textarea id="comment" rows="6"
                    class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                    placeholder="댓글을 남겨주세요." required></textarea>
            </div>
            <button 
              data-post-id="${post.id}" 
              type="button"
              class="btn-comment-submit inline-flex items-center mt-4 py-2.5 px-4 text-xs font-medium text-center text-white bg-red-500 rounded-lg">
                등록
            </button>
        </form>
        </div>
        <ul class="replies-list p-6 pt-2" data-post-id="${post.id}">
        ${post.Comments ? commentInfo(post.id, post.Comments) : ``}
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
const commentInfo = (postId, comments) => {
  comments.sort(({ createdAt: a }, { createdAt: b }) => {
    return b - a;
  });
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
        <div class="reply-content pt-1 pb-2 text-zinc-800 leading-tight font-light">${
          comment.content
        }</div>
        ${
          comment.myComment
            ? `
        <div class="leading-4">
          <button type="button" data-comment-id="${comment.id}" data-post-id="${postId}" class="btn-comment-update text-xs text-zinc-500">수정</button>
          <button type="button" data-comment-id="${comment.id}" data-post-id="${postId}" class="btn-comment-delete text-xs text-zinc-500">삭제</button>
        </div>
        `
            : ``
        }
        <div class="reply-date text-xs text-zinc-400">${convertDate(
          comment.createdAt
        )}</div>
      </div>

    </li>
  `
    )
    .join("");
};

function renderPost(posts) {
  postListHTML = posts.map((post) => postInfo(post)).join("");
  $postList.innerHTML = postListHTML;

  // 게시글 수정
  const $btnPostEdits = document.querySelectorAll(".btn-post-edit");
  for (let btn of $btnPostEdits) {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      openPost();
      const postId = Number(event.target.dataset.postId);
      const editPost = posts.find((post) => post.id === postId);
      const $title = document.getElementById("title");
      const $content = document.getElementById("content");
      const $btnSubmit = document.getElementById("btn-submit");
      const $btnUpdate = document.getElementById("btn-update");
      $btnSubmit.classList.add("hidden");
      $btnUpdate.classList.remove("hidden");
      $btnUpdate.dataset.postId = postId;
      $title.value = editPost.title;
      $content.value = editPost.content;
    });
  }

  // 게시판 삭제
  const $btnPostDeletes = document.querySelectorAll(".btn-post-delete");
  for (let btn of $btnPostDeletes) {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const postId = Number(event.target.dataset.postId);
      if (confirm("게시글을 삭제하시겠습니까?")) {
        deletePost(postId);
      }
    });
  }

  const $btnToggleComments = document.querySelectorAll(".btn-toggle-comment");
  for (let btn of $btnToggleComments) {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const $commentWrap = event.target.parentNode.nextElementSibling;
      const commentListHeight = $commentWrap.children[1]
        ? $commentWrap.children[0].clientHeight +
          $commentWrap.children[1].clientHeight
        : $commentWrap.children[0].clientHeight;
      console.log(event.target);
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

  // 댓글 입력
  const $btnCommentSubmits = document.querySelectorAll(".btn-comment-submit");
  for (let btn of $btnCommentSubmits) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      const textarea = event.target.parentNode.children[0].children[1];
      const commentContent = textarea.value;
      const comment = {};
      comment.id = randomId.generate();
      comment.content = commentContent;
      comment.User = newPost.User;
      comment.myComment = true;
      comment.createdAt = new Date();
      const postId = Number(event.target.dataset.postId);
      const post = posts.find((post) => post.id === postId);
      textarea.value = ``;
      post.Comments.unshift(comment);
      renderComment(post);
    });
  }
}
renderPost(posts);

function renderComment(post) {
  const $commentList = document.querySelector(
    `ul.replies-list[data-post-id='${post.id}']`
  );
  const $commentWrap = $commentList.parentNode;
  $commentWrap.style.height = `auto`;
  setTimeout(() => {
    const commentListHeight = $commentWrap.clientHeight;
    $commentWrap.style.height = `${commentListHeight}px`;
  }, 1);
  const str = commentInfo(post.id, post.Comments);
  $commentList.innerHTML = str;

  const $btnCommentDelete = document.querySelectorAll(".btn-comment-delete");
  for (let btn of $btnCommentDelete) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      if (confirm("댓글을 삭제하시겠습니까?")) {
        const commentId = Number(event.target.dataset.commentId);
        const postId = Number(event.target.dataset.postId);
        const post = posts.find((post) => post.id === postId);
        let comments = post.Comments;
        const filteredComments = comments.filter((comment) => {
          return comment.id !== commentId;
        });
        post.Comments = filteredComments;
        renderComment(post);
      }
    });
  }

  const $btnCommentUpdate = document.querySelectorAll(".btn-comment-update");
  for (let btn of $btnCommentUpdate) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      const replyContent =
        event.target.parentNode.previousElementSibling.innerText;
      console.log(replyContent);
    });
  }
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

/** ==================================================
 *  CRUD
 *  C - 게시글, 댓글 작성
 *  R - 게시글, 댓글 조회
 *  U - 게시글, 댓글 수정
 *  D - 게시글, 댓글 삭제
 *  ==================================================
 */
const $btnWrite = document.getElementById("btn-write");
const $btnCancel = document.getElementById("btn-cancel");
const $btnSubmit = document.getElementById("btn-submit");
const $btnUpdate = document.getElementById("btn-update");
const $writePage = document.getElementById("write-page");
const $dimmedLayer = document.getElementById("dimmed-layer");
const $title = document.getElementById("title");
const $content = document.getElementById("content");

const newPost = MockPosts(1)[0];

$btnWrite.addEventListener("click", function (event) {
  event.stopPropagation();
  openPost();
  $btnSubmit.classList.remove("hidden");
  $btnUpdate.classList.add("hidden");
  const $writeUserImage = document.getElementById("write-user-image");
  const $writeUserNick = document.getElementById("write-user-nick");
  $writeUserImage.src = newPost.User.profileImg;
  $writeUserNick.innerHTML = newPost.User.nickName;

  $title.value = ``;
  $content.value = ``;
  $content.innerHTML = ``;

  setTimeout(() => {
    if (confirm("작성중인 글을 불러오시겠습니까?")) {
      $title.value = newPost.title;
      $content.innerHTML = newPost.content;
      $content.value = newPost.content;
    }
  }, 600);
});

function openPost() {
  document.body.style.overflowY = "hidden";
  $dimmedLayer.classList.remove("hidden");
  $writePage.style.top = `0%`;
}

function closePost() {
  $title.value = "";
  $content.innerHTML = "";
  document.body.style.overflowY = "auto";
  $dimmedLayer.classList.add("hidden");
  $writePage.style.top = `100%`;
}

function addPost(post) {
  const tempPost = posts.pop();
  tempPosts.push(tempPost);
  renderPost(posts);
  setTimeout(() => {
    posts.unshift(post);
    renderPost(posts);
  }, 500);
}

function deletePost(postId) {
  const filteredPost = posts.filter((post) => {
    return post.id !== postId;
  });
  const tempPost = tempPosts.pop();
  filteredPost.push(tempPost);
  posts = filteredPost;
  renderPost(posts);
}

function updatePost(editPost) {
  const $title = document.getElementById("title");
  const $content = document.getElementById("content");
  editPost.title = $title.value;
  editPost.content = $content.value;
  closePost();
  renderPost(posts);
}

$btnCancel.addEventListener("click", (event) => {
  event.preventDefault();
  closePost();
});

$btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const post = {};
  post.id = randomId.generate();
  post.title = $title.value;
  post.content = $content.value;
  post.User = newPost.User;
  post.myPost = true;
  post.Comments = [];
  addPost(post);
  closePost();
});

$btnUpdate.addEventListener("click", (event) => {
  const postId = Number(event.target.dataset.postId);
  const post = posts.find((post) => {
    return post.id === postId;
  });
  updatePost(post);
});
