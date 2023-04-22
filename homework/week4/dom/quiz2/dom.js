import mockPost from "./mock.js";
console.log(mockPost.post);
const { title, content, User, Replies } = mockPost.post;

const $postDetail = document.querySelector("#post-detail");
const $repliesList = document.querySelector("#replies-list");

/* 
    import(참조)한 json data를
    게시글 상세와 댓글창에 나타내고 게시글 객체의 상세 내용은 console.log로 출력해두었습니다

    댓글 추가 버튼을 누르면 댓글이 추가되도록 해보세요 :)

    삭제 및 수정기능은 본인의 자유로 구현하시면 됩니다 :)
*/
const $btnReplySubmit = document.getElementById("btn-reply-submit");
const $repliesContent = document.getElementById("replies-content");

$postDetail.innerHTML = `
  <div>
    <h4>제목 : ${title}</h4>
    <div>작성자 : ${User.nickName}</div>
    <div>내용 : ${content}</div>
  </div>
`;

for (let reply of Replies) {
  $repliesList.innerHTML += `<li>${reply.User.nickName} : ${reply.content}</li>`;
}

$btnReplySubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const text = $repliesContent.value;
  const $li = document.createElement("li"); // <li></li>

  let $btnDelete = document.createElement("button");
  $btnDelete.classList.add("btn-modify");
  $btnDelete.innerText = "삭제";
  $btnDelete.addEventListener("click", deleteList);

  $li.innerHTML = `네이쳐 : ${text}`;
  $li.appendChild($btnDelete);
  $repliesList.insertAdjacentElement("beforeend", $li);
});

// 삭제
function deleteList(event) {
  event.preventDefault();
  const $target = event.target.parentElement;
  $target.remove();
}
