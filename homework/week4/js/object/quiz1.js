const user = {
  name: "김성용",
  age: 20,
  height: 190,
};

// 문제1. 위의 객체를 아래의 메소드를 이용하여 반환 값을 출력 하고 각 메소드의 기능을 정의할 것

// (1) user[”key”], user.key
console.log(user["name"], user.name);
// 결과 : 김성용, 김성용
// 기능 : 객체의 key의 이름으로 key값에 접근

// (2) Object.keys()
console.log(Object.keys(user));
// 결과 : [ 'name', 'age', 'height' ]
// 기능 : 객체의 key의 목록을 배열로 리턴

// (3) Object.values()
console.log(Object.values(user));
// 결과 : [ '김성용', 20, 190 ]
// 기능 : 객체의 value의 목록을 배열로 리턴

// (4) Object.entries()
console.log(Object.entries(user));
// 결과 : [ [ 'name', '김성용' ], [ 'age', 20 ], [ 'height', 190 ] ]
// 기능 : 객체의 key와 value를 [key, value] 쌍의 배열로 리턴(배열의 배열)

// (5) for in
for (let key in user) {
  console.log(key);
}
// 결과 :
// name
// age
// height
// 기능 : 이터러블하지 않은 객체를 돌면서 객체의 요소에 접근

// 문제2. 값이 “김성용”인 속성의 key 찾기
let keyName;
for (let key in user) {
  if (user[key] === "김성용") keyName = key;
}
console.log(keyName);

// 문제3. 깊은 복사를 통해 user 객체의 복사본을 만든 후 name을 본인의 이름으로 수정
const naturej = { ...user };
naturej.name = "정자연";
console.log(naturej);
