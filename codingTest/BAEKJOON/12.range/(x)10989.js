const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

let num = parseInt(input.shift());

input.sort((a,b) => {
	return a-b;
})

console.log(input.join("\n"));

//console.log가 느려서 정렬된 값 하나씩 호출하면 최대 100만번 호출.
//정렬 후 결과값 출력시 배열 join을 써서 하나의 문자열로 출력. 