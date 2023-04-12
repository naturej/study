import { RESERVATION_LIST } from "./reservation .js";
// console.log(RESERVATION_LIST);

/* 
    예약 고객확인하기
*/

const $btnSubmit = document.getElementById("btn-submit");
const $reservationNumber = document.getElementById("reservation-number");

$btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const userName = document.getElementsByName("user-name")[0].value;
  const userPhone = document.getElementsByName("user-phone")[0].value;

  const customer = RESERVATION_LIST.find((el, index) => {
    return el.name === userName && el.phone === userPhone;
  });

  if (customer === undefined) {
    alert("일치하는 내역이 없습니다.");
    $reservationNumber.innerText = "일치하는 내역이 없습니다.";
  } else {
    $reservationNumber.innerText = customer.number;
  }
});
