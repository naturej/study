const BACKEND_URL = "https://jsonplaceholder.typicode.com";
const $commentWrap = document.getElementById("comment-wrap");
const $commentCnt = document.getElementById("comment-cnt");

const commentInfo = ({ id, name, email, body }) => `
<li class="py-3 border-b border-solid border-zinc-200">
  <div class="comment flex p-4">
    <div class="profile pr-4">
        <div class="w-12 h-12 bg-gray-100 rounded-full"></div>
    </div>
    <div class="comment-info">
        <div class="user-name font-sans text-gray-700 font-thin text-sm">
            <a href="mailto:${email}">${name}</a>  
        </div>  
        <div class="font-sans text-gray-700 font-thin">${body}</div>
    </div>
  </div>
</li>
`;

export const loadComment = async (postId) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/comments?postId=${postId}`);
    const length = result.data.length;
    if (length <= 0) return;
    // 댓글 개수
    $commentCnt.innerHTML = `
      <div class="pb-2 font-sans font-extralight border-b border-solid border-zinc-200">
          comment <span class="text-gray-700">${length}</span>
      </div>
    `;
    const $ul = document.createElement("ul"); // <ul></ul>
    $ul.innerHTML = result.data.map((comment) => commentInfo(comment)).join("");
    $commentWrap.append($ul);
    $commentWrap.style.animation = `fadein 1s`;
  } catch (err) {
    console.error(err);
    alert("현재 댓글 목록을 불러올 수 없습니다.");
    // location.href = './list.html';
  }
}