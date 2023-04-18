const BACKEND_URL = "https://jsonplaceholder.typicode.com";
const $postDetail = document.getElementById("post-detail");

const detailInfo = ({ userId, id, title, body }) => `
  <div>
    <div class="title pb-5 font-sans text-xl font-extralight border-b border-solid border-zinc-200">#${id}. ${title}</div>
    <div class="content py-10 font-sans text-gray-700 font-thin">${body}</div>
  </div>
`;

export const loadContent = async (postId) => {
  try {
    const result = await axios.get(`${BACKEND_URL}/posts/${postId}`);

    $postDetail.innerHTML = detailInfo(result.data);
    $postDetail.style.animation = `fadein 1s`;
  } catch (err) {
    console.error(err);
    alert("현재 게시글을 불러올 수 없습니다.");
    location.href = './list.html';
  }
}