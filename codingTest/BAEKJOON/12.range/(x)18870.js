const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');
const N = parseInt(input.shift());

const solution = (input) => {
	const arr = input[0].split(' ').map((x) => Number(x));

	const answer = [];
	const object = {};

	const set = new Set(arr);
	const result = [...set];

	result.sort((a, b) => {
		return a - b;
	});

	result.forEach((item, idx) => (object[item] = idx));

	//객체에 추가하는 방식 = 빠르다.
	for (let i = 0; i < arr.length; i++) {
		answer.push(object[arr[i]]);
	}
	
	//일일이 도는 방식 -느리다.
	// for (let i = 0; i < arr.length; i++) {
	// 	for (let j = 0; j < answer.length; j++) {
	// 		if (arr[i] === answer[j]) {
	// 			result += `${j} `;
	// 		}
	// 	}
	// }

	return answer.join(' ');
};

console.log(solution(input));

/*
1.
console.log(input)을 출력하면 배열이 나오고
console.log(input[0]) 을 출력하면 문자열이 나온다.

2.
각 배열에 index를 추가하는 방법 (forEach)
result.forEach((item, idx) => object[item] = idx)

3.
객체에 담아서 배열을 비교해 담는 방식
for(let i=0; i<arr.length; i++){
		answer.push(object[arr[i]]);
}
*/