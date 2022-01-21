const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');
const N = parseInt(input.shift());

// const answer = input.map((v, idx) => {
// 	return `${v} ${idx}`;
// });

const xy = input.map((v) => v.split(' '));

// xy.sort((a, b) => {
// 	if (+b[0] < +a[0]) {
// 		return 1;
// 	}
// 	if (+b[0] === +a[0]) {
// 		if (+b[2] < +a[2]) {
// 			return 1;
// 		}
// 	}
// });

// for (let i = 0; i < N; i++) {
// 	console.log(`${xy[i][0]} ${xy[i][1]}`);
// }

for (let i = 0; i < input.length; i++) {
	console.log(xy[i].join(' '));
}

/*
조건에 눈이 멀어서 먼저 가입한 순서대로 입력 받으면 순서대로란걸 모르고  map을
사용해 시간 초과를 만들었다.
다음 부터는 조건이 1이면 2도 생각할 수 있게 더 노력하자!

그리고 console.log대신 join을 이용해 더 빨리 출력하는 방법도 있을것 같다.
*/