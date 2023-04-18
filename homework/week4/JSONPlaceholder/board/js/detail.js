import { loadContent } from "./boardDetail.js"
import { loadComment } from "./boardCommnet.js"

const searchParams = new URLSearchParams(location.search);
const postId = searchParams.get("postId");

if(!postId) {
    alert("존재하지 않는 게시글입니다.");
    location.href = './list.html';
}

loadContent(postId);
loadComment(postId);