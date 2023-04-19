/*
    핸드폰 앱에 접속했을 때 슬라이드 패널은 미니멈 사이즈에서 사용자가 인식할 수 있도록 정확히 0.7초 후 맥시멈 사이즈로 바뀐다.  
    또한, 맥시멈 사이즈로 변했을 때만 "이번 주 목표 달성까지 oo% 남았습니다"라는 텍스트가 눈에 보여야 한다.
    화면 검증에 들어가기전에 비동기 처리가 잘 이루어지는지 검증하기 위해 console.log를 활용하여 문제를 완성하여라

    결과
    [콘솔창]    
    min size    
    ... 0.7초 후    
    max size    
    이번주 목표까지 15% 남았습니다
*/
const delayTime = 700;
const condition = true;

console.log("min size");

const printMessage = async () => {
  try {
    const percent = await new Promise((resolve, reject) => {
      if (condition) {
        setTimeout(() => {
          console.log("max size");
          resolve(15);
        }, delayTime);
      } else {
        reject("error");
      }
    });
    console.log(`이번주 목표까지 ${percent}% 남았습니다`);
  } catch (error) {
    console.error(error);
  }
};

printMessage();
