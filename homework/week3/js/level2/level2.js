import { RESERVATION_LIST } from './reservation .js';
console.log(RESERVATION_LIST);

/* 
예약 고객확인하기


*/

const userName = document.getElementsByName("user-name")[0].value;
const userPhone = document.getElementsByName("user-phone")[0].value;
const $btnSubmit = document.getElementById("btn-submit");
const $reservation = document.getElementById("reservation-number");

$btnSubmit.addEventListener("click",(event)=>{
    event.preventDefault();

    const customer = RESERVATION_LIST.find((el, index)=>{
        return el.name === userName && el.phone === userPhone;
    });
    console.log(customer);

    if(!customer) {
        alert("일치하는 내역이 없습니다.");
    } else {
        $reservation.innerText = customer.number;
    }

});