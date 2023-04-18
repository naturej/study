const BACKEND_URL = "https://jsonplaceholder.typicode.com";

const $postList = document.getElementById("post-list");

const postInfo = ({ userId, id, title, body }) => `
  <li class="pt-6 pb-7 border-b border-solid border-zinc-200">
    <a class="post-link" href="./detail.html?postId=${id}">
      <div class="title pb-2 font-sans text-xl font-extralight line-clamp-1">#${id}. ${title}</div>
      <div class="font-sans text-gray-700 font-thin line-clamp-2">${body}</div>
    </a>
  </li>
`;

export const loadPosts = async () => {
  try {
    const result = await axios.get(`${BACKEND_URL}/posts`);
    $postList.innerHTML = result.data.map((post) => postInfo(post)).join("");
    $postList.style.animation = `fadein 1s`;
  } catch (err) {
    console.error(err);
    alert("현재 게시글 리스트를 불러올 수 없습니다.");
    history.back();
  }
};