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
  const str = $inputAccount.value;

  if (str.length < 12) return alert("12자리를 입력해주세요");

  const bankNumStr = formatBankNumber(str);

  const $li = document.createElement("li");
  $li.innerText = `${
    $bankSelector[$bankSelector.selectedIndex].innerText
  } : ${bankNumStr}`;

  $accountList.appendChild($li);
});

/**
 * 문자열을 입력받아 앞, 뒤 2자리 뺀 나머지 자리 마스킹 처리(*) 하고
 * 선택된 은행의 계좌 번호 형식으로 파싱하여 반환하는 함수
 * @param {string} str
 * @returns {string} bankNumStr
 */
function formatBankNumber(str) {
  const format = $bankSelector[$bankSelector.selectedIndex].dataset.format;
  const formatArr = format.split("-");
  let curIndex = 0;

  // str : 123412341234 형식
  // maskStr : 12********34 형식으로 변경
  const maskStr = str.substring(0, 2) + "*".repeat(8) + str.substring(10);

  // bankNumStr : 12-********-34 형식으로 변경
  const bankNumStr = formatArr
    .map((el) => {
      const result = maskStr.substring(curIndex, curIndex + el.length);
      curIndex += el.length;
      return result;
    })
    .join("-");

  return bankNumStr;
}
