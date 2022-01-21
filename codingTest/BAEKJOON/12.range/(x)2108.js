const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');

const num = parseInt(input.shift());
const nums = input.map((v) => +v);


const sum = input.reduce((accumulator, a) => {
	return Number(accumulator) + Number(a);
}, 0);

const ascendingArr = input.sort((a, b) => {
	return a - b;
});

const mid = parseInt(num / 2);

//산술평균
console.log((sum / num).toFixed(0));
//중앙값
console.log(ascendingArr[mid]);
//최반값
const numCounts = {};
nums.forEach((v) => {
	if (numCounts[v]) {
		numCounts[v]++;
	} else {
		numCounts[v] = 1;
	}
});

const maxCount = Math.max(...Object.values(numCounts));
const maxCountNums = [];

for (const key in numCounts) {
	if (numCounts[key] === maxCount) {
		maxCountNums.push(key);
	}
}

if (maxCountNums.length > 1) {
	maxCountNums.sort((a, b) => a - b);
	console.log(maxCountNums[1]);
} else {
	console.log(maxCountNums[0]);
}

//범위
console.log(ascendingArr[ascendingArr.length - 1] - ascendingArr[0]);


//소수점 이하 반올림 => toFixed
//객체에 value중 가장 큰 값을 찾아내는 방법 => 
// Math.max(...Object.values(numCounts));