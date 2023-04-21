import { MockPosts } from './faker.js';

const searchParams = new URLSearchParams(location.search);
const pageParam = searchParams.get("page");
const pagination = document.getElementById("pagination");
const beginLabel = document.querySelector('.beginLabel');
const prevLabel = document.querySelector('.prevLabel');
const nextLabel = document.querySelector('.nextLabel');
const endLabel = document.querySelector('.endLabel');
const postList = document.getElementById("post-list");
const pageList = document.getElementById("page-list");

let totalItemCount = MockPosts(200).length;
let pageGroupSize = 10;
let totalPage = Math.ceil(totalItemCount / pageGroupSize);
let currentPage = pageParam ? Number(pageParam) : 1;

let pageGroupStart =  Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
let pageGroupEnd = pageGroupStart + pageGroupSize;

/* 
-----------------------------------------------------------------------------------------

백엔드 없이 게시판 만들기

-----------------------------------------------------------------------------------------

문제1. 페이지네이션 만들기
    총 아이템의 갯수는 totalItemCount개 입니다.
    해당 갯수를 토대로 한 페이지당 10개의 Post가 보이는 페이지네이션을 구현해주세요

    단, 현재 총 아이템의 갯수는 200개이며 10개씩 보여준다면 총 20개의 페이지가 나와야합니다.
    그러나 이 개수는 언제든 변화될 수 있으며 만약 해당 갯수가 변화된다면 페이지네이션도 변경되어야합니다.

요구사항
    1.
        1~20의 페이지를 한번에 보여주는 것이 아닌 10페이지 단위로 페이지를 보여주어야하며
        10페이지에서 마지막 페이지를 클릭한다면 11~20페이지가 보여야합니다

        ex)
        1~10 > 다음버튼 > 11~20

        각 버튼의 좌우의 끝에는 맨처음 페이지로 이동할 수 있는 버튼과
        맨끝으로 이동할 수 있는 버튼이 있어야합니다.

    2. 
        페이지를 누르면 페이지에 맞는 번호가 하이라이트 되어야합니다.
        또한, 새로고침 시에도 이 focus효과는 유지되어야합니다.

        ex) 현재 페이지5
        <<(맨처음) <(이전) 1 2 3 4 [5] 6 7 8 9 10 (다음)> (마지막)>>
        
        5에 focus효과 새로고침 이후에도 5에는 focus효과가 유지되어야합니다.
        

    3.  
        페이지를 눌러 이동 되었을 때 동일한 데이터를 불러올 수 있는 backend가 없으므로
        MockPosts를 함수를 활용하여 새로운 10개의 랜덤한 게시물을 보여주셔야 합니다.

-----------------------------------------------------------------------------------------
*/
const renderPost = (post) =>  `
  <li class="border-b border-solid border-zinc-200">
    <div class="p-4">
      ${ post.myPost ? 
        `<div>
      <button>수정</button>
      <button>삭제</button>
    </div>`
     : `` }
      <div class="post-card">
        <h4 class="post-title font-bold b-2">${post.title}</h4>
        <div class="post-content font-thin font-gray-700">${post.content}</div>
      </div>
      <button class="mt-2 tracking-tight">댓글 보기</button>
      <ul class="replies-list hidden">
        <button>닫기</button>
        ${renderComments(post.Comments)}
      </ul>
    </div>
  </li>
`;

const renderComments = (comments) => {
  return comments.map((comment) => `
    <li class="reply-item pb-3 flex align-top">
      <div class="reply-user-info pr-4">
        <img class="w-12 h-12 bg-gray-100 rounded-full" src="${comment.User.profileImg}" />
      </div>
      <div class="comment-info">
        <p class="font-bold text-sm">${comment.User.nickName}</p>
        <div class="reply-content">${comment.content}</div>
        <div class="reply-date text-sm font-gray-700">${comment.createdAt}</div>
      </div>
      ${comment.myComment ? `
      <div>
        <button>수정</button>
        <button>삭제</button>
      </div>
      ` : ``}
    </li>
  `).join("");
};

const mockListStr = MockPosts(10).map((post) => renderPost(post)).join("");
postList.innerHTML = mockListStr;


/**
 * 이동할 페이지를 입력받아 해당 페이지로 문서를 이동하는 함수
 * @param {number} page - 이동할 페이지 숫자
 */
function movePage(page) {
    if(page <= 0 || page > totalPage) return;
    if(page === currentPage) return;
    currentPage = page;

    // 페이지 이동
    location.href = `./index.html?page=${page}`;
}

let pageStr = "";
for(let pageIndex = pageGroupStart; pageIndex < pageGroupEnd; pageIndex++) {
  if (pageIndex > totalPage) break;
  pageStr += `<span class="pageLabel${pageIndex === currentPage ? ' active' : ''}" data-page="${pageIndex}">${pageIndex}</span>`;
}
pageList.innerHTML = pageStr;

const labels = document.querySelectorAll(".pageLabel");
for(let label of labels) {
  let page = Number(label.dataset.page);
  label.addEventListener("click", () => movePage(page));
}


beginLabel.addEventListener("click", () => movePage(1));
prevLabel.addEventListener("click", () => movePage(currentPage - 1));
nextLabel.addEventListener("click", () => movePage(currentPage + 1));
endLabel.addEventListener("click", () => movePage(totalPage));

/*

문제2. 게시글 CRUD 구현하기
    게시글 구성에 필요한 가상 데이터를 생성하는 함수 MockPosts는 안에 넣은 인자의 갯수만큼 가상의 포스트 데이터를 생성하는 함수입니다.
    해당 함수의 상세 데이터는 제가 상단에 console.log를 통해 출력해두었으니 개발자 도구로 확인해보세요 :)

요구사항
    1.
        게시글은 페이스북 혹은 인스타그램의 형태로 한 페이지에 10개씩 보이게 됩니다.
        댓글은 토글 형태로 "댓글 보기"를 클릭해야만 해당 댓글을 확인할 수 있습니다.
        
    2. 
        각 게시물과 댓글에는 내가 작성한 글인지 알 수 있는 flag가 들어있으며
        현재 기존에 작성된 모든 가상 데이터의 해당 flag는 false입니다.
        그러나 만약 본인이 새로운 게시글과 댓글을 작성한다면 해당 flag는 true의 형태가 되어야합니다.

    3.
        페이지네이션과 함께 게시글의 CRUD 구현하기
        게시글을 작성할 수 있습니다. 댓글을 작성할 수 있습니다. 새로운 게시글은 내가 작성한 것이기에 flag는 true입니다.
    
        * 주의)
            백엔드가 존재하지 않기 때문에 파일 업로드 기능을 구현할 수 없기에 사진을 업로드 할 수 없습니다.
            따라서 게시글 추가 시 올라가는 이미지의 속성인 Post_img의 경우 빈배열로 두거나 빈 값으로 두시면 됩니다 :)

            게시글 작성과 댓글 작성 시 작성자의 프로필 이미지는 본인이 원하는 대체 이미지로 고정하여 대체 하시면 됩니다.
            
        본인이 작성한 게시글과 댓글에만 수정과 삭제 버튼이 보여야합니다.
        삭제, 수정 버튼의 기능은 모두 적상적으로 기능이 작동 되어야합니다.

-----------------------------------------------------------------------------------------
*/
