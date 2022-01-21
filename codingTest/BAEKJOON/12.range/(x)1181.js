const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');
const N = parseInt(input.shift());

//중복제거
const set = new Set(input);
const uniqueArr = [...set];


const answer = uniqueArr.sort((a,b) => {
	if(a.length > b.length) return 1;
	if(a.length < b.length) return -1;
	if(a > b) return 1;
	if(a < b) return -1
})

console.log(answer.join('\n'));

//뒤로 갈수록 큰 값이 나와야 하니깐 sort method 에서 
//a는 b보다 큰게 참이여야 한다.
