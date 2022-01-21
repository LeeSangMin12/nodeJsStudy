const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const N = parseInt(input.shift());
const xy = input.map((v) => v.split(' '));

let answer = '';
xy.sort((a,b) => {
	if(a[0] === b[0]){
		return a[1] - b[1];
	} else {
		return a[0] - b[0];
	}
}). map((arr) => {
	answer += `${arr[0]} ${arr[1]}\n`
})

console.log(answer);

//배열안에 나눠져 있는 값을 또 나누는 방법 = input.map((v) => v.split(' '));