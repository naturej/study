/*
  1. 
  당신은 3가지 비동기 요청에 대하여 이 3가지 요청이 모두 실행되고 나서
  console.log로 (정상적으로 실행되었습니다)라는 콘솔로그를 보여주려고 한다.

  각각의 비동기 요청은
  console.log("비동기 요청 1")
  console.log("비동기 요청 2")
  console.log("비동기 요청 3")
  를 결과값으로 출력한다
*/

/**
 * 프로미스를 생성하는 함수
 * @param {number} num - 비동기 요청 번호
 * @param {boolean} condition - 요청 성공 여부 boolean값
 * @returns {Promise<String>}
 */
function makePromise(num, condition) {
  return new Promise((resolve, reject) => {
    if (condition) {
      resolve(`비동기 요청 ${num}`);
    } else {
      reject(`비동기 요청 ${num} 호출 실패`);
    }
  });
}

const pr1 = makePromise(1, false);
const pr2 = makePromise(2, true);
const pr3 = makePromise(3, false);

/*
  기초.
  - 반복문 (for)을 사용하지 말 것, resolve, reject의 반환 값으로 전달하는 데이터의 제한은 없다.
  - 모든 요청 중 단 하나의 요청이라도 실패하면 "결과값을 가지고 오는데 실패하였습니다"를 출력 할 것
*/

Promise.all([pr1, pr2, pr3])
  .then(([result1, result2, result3]) => {
    console.log(result1);
    console.log(result2);
    console.log(result3);
    console.log("정상적으로 실행되었습니다");
  })
  .catch((err) => {
    console.log("결과값을 가지고 오는데 실패하였습니다");
  });

/*
    심화. 
    - 모든 요청 중 일부가 실패했다면 나머지 비동기 요청에 대해서는 정상적으로 console.log를 실행할 것
    - 만약 실패하였다면 어느 요청이 실패하였는지 console.log로 출력할 것 (ex. "비동기 요청 2 호출 실패")
    - 모든 요청에 대하여 일부요청이 실패하고 나머지는 정상적으로 작동되었기 때문에 결과 값으로는 반드시 "정상적으로 실행되었습니다"가 출력되어야한다
    - 그러나, 3가지 요청이 모두 실패했을 때는 "결과값을 가지고 오는데 실패하였습니다"가 출력되어야한다.
  */

Promise.allSettled([pr1, pr2, pr3]).then((results) => {
  const rejectedPr = results.filter((result) => result.status === "rejected");
  if (rejectedPr.length === results.length)
    return console.log("결과값을 가지고 오는데 실패했습니다.");
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log(result.value);
    } else {
      console.log(result.reason);
    }
  });
  console.log("정상적으로 실행되었습니다");
});
