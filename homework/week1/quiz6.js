/*
  문제 만들기
  위와 같은 문제를 예시로 이제는 직접 문제를 만들어보는 것입니다.
  동료들과 이야기하여 문제를 만들어보세요 :)

  최종 목표

  1. 만들고 싶은 기능 정하기
  2. 필요한 인풋(입력값)과 아웃풋(출력값) 정하기
  3. 인풋과 아웃풋을 토대로 기능 구현하기
  4. 문제 형태로 만들어 제출해주세요.
  ----------------------------------------------------------
  1. 기능: 주어진 배열에서 최대값과 최소값의 차이를 구하는 함수 만들기
  2. 인풋: 숫자형 배열
     아웃풋: 주어진 배열의 최대값과 최소값의 차이(숫자형)
  3. 기능 구현
  4. 문제 형태로 만들어 제출해주세요.
*/
// 기능 구현
const getDiff = (arr) => {
  let [min, max, diff] = [arr[0], arr[0], 0];
  for(let i = 1; i < arr.length; i++) {
    if(min > arr[i]) min = arr[i];
    if(max < arr[i]) max = arr[i];
  }
  diff = max - min;
  return diff;
}
// 문제 형태로 만들어 제출해주세요.
// 문제) 다음과 같이 주어진 배열에서 최대값과 최소값의 차이를 구하는 함수를 구현해보세요.
const arr = [12, 3, 7, 10, 15, 4];
const diff = getDiff(arr);
console.log(diff);