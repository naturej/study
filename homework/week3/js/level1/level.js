import { BANK_LIST, ACCOUNT_FORM } from './account.js';

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

// selectbox 세팅
bankList.forEach((el, index)=>{
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
    if($inputAccount.value.length < 12) return alert("12자리를 입력해주세요");

    let str = $inputAccount.value;
    str = str.substring(0, 2) + '*'.repeat(8) + str.substring(10);

    const maskStr = formatBankNumber(str);
    
    const $li = document.createElement("li");
    $li.innerText = `${$bankSelector[$bankSelector.selectedIndex].innerText} : ${maskStr}`;

    $accountList.appendChild($li);
});

/**
 * 문자열을 입력받아 선택된 셀렉트박스의 은행 계좌 형식의 문자열로 변환하고
 * 맨 앞, 뒤에서 2자리씩을 제외한 나머지 자리를 마스킹 처리하여 반환하는 함수
 * @param {string} str 
 * @returns {string} maskStr
 */
function formatBankNumber(str) {
    const format = $bankSelector[$bankSelector.selectedIndex].dataset.format;
    const formatArr = format.split('-');
    let curIndex = 0;

    const maskStr = formatArr.map((el, index) => {
        const newStr = str.substring(curIndex, curIndex + el.length);
        curIndex += el.length;
        return newStr;
    }).join("-");

    return maskStr;
}