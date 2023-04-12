import { BANK_LIST, ACCOUNT_FORM } from "./account.js";

// console.log(BANK_LIST);
// console.log(ACCOUNT_FORM);

/*
    계좌 번호 파싱 하기
*/

const $bankSelector = document.getElementById("bank-selector");
const $inputAccount = document.getElementById("account-input");
const $accountList = document.getElementById("account-list");
const $btnSubmit = document.getElementById("btn-submit");

const bankList = Object.values(BANK_LIST);
const accountForm = Object.values(ACCOUNT_FORM);

// select box 세팅
bankList.forEach((el, index) => {
  let option = document.createElement("option");
  option.value = index;
  option.text = el;
  option.dataset["format"] = accountForm[index];

  $bankSelector.appendChild(option);
});
$bankSelector.options[0].selected = true;

// 제출 버튼 클릭 시
$btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  if ($inputAccount.value.length < 12) return alert("12자리를 입력해주세요");

  let str = $inputAccount.value; // str : 123412341234 형식
  str = str.substring(0, 2) + "*".repeat(8) + str.substring(10); // 12********34 형식으로 변경

  const maskStr = formatBankNumber(str); // 파싱

  const $li = document.createElement("li");
  $li.innerText = `${
    $bankSelector[$bankSelector.selectedIndex].innerText
  } : ${maskStr}`;

  $accountList.appendChild($li);
});

/**
 * 문자열을 입력받아 선택된 은행의 계좌 번호 형식으로 파싱하여 반환하는 함수
 * @param {string} str
 * @returns {string} maskStr
 */
function formatBankNumber(str) {
  const format = $bankSelector[$bankSelector.selectedIndex].dataset.format;
  const formatArr = format.split("-");
  let curIndex = 0;

  const maskStr = formatArr
    .map((el) => {
      const newStr = str.substring(curIndex, curIndex + el.length);
      curIndex += el.length;
      return newStr;
    })
    .join("-");

  return maskStr;
}
