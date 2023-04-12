/* 
레시피 재료 추가하기
*/

const $addButton = document.getElementById("add_button");
const $submitButton = document.getElementById("submit_button");

const $inputIngredient = document.getElementsByName("ingredient")[0];
const $inputWeight = document.getElementsByName("weight")[0];

const $tbody = document.getElementsByTagName("tbody")[0];

const $ingredientList = document.getElementById("ingredient-list");

// 재료 저장 객체
const recipe = {};

// 추가 버튼 클릭 시
$addButton.addEventListener("click", (event) => {
  event.preventDefault();

  const ingredient = $inputIngredient.value;
  const weight = $inputWeight.value;

  if (recipe[ingredient]) return alert("이미 존재하는 재료입니다");

  const $tr = document.createElement("tr");

  const $tdCol1 = document.createElement("td");
  $tdCol1.innerText = ingredient;
  $tr.appendChild($tdCol1);

  const $tdCol2 = document.createElement("td");
  $tdCol2.innerText = weight;
  $tr.appendChild($tdCol2);

  const $tdCol3 = document.createElement("td");
  const $deleteButton = document.createElement("button");
  $deleteButton.dataset.ingredient = ingredient;
  $deleteButton.innerText = "삭제";
  $deleteButton.addEventListener("click", deleteIngredient);

  $tdCol3.appendChild($deleteButton);
  $tr.appendChild($tdCol3);

  $tbody.appendChild($tr);

  const obj = { [ingredient]: weight };
  Object.assign(recipe, obj);
});

// 제출 버튼 클릭 시
$submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  $ingredientList.innerHTML = ``;
  for (let ingredient in recipe) {
    const $li = document.createElement("li");
    $li.innerText = `${ingredient} : ${recipe[ingredient]}`;
    $ingredientList.appendChild($li);
  }
});

// 삭제 버튼 클릭 시
function deleteIngredient(event) {
  // tr > td > button 구조
  const $tr = event.target.parentElement.parentElement;
  const ingredient = event.target.dataset.ingredient;

  delete recipe[ingredient]; // 객체에서 삭제
  $tr.remove(); // 테이블에서 tr 삭제
}
