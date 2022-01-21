const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split(' ');

let A = BigInt(input[0])
let B = BigInt(input[1])
console.log((A + B).toString());

/*
1.기본 자료형에서 처리할 수 있는 수엔 한계가 있음
2.BigInt는 임의의 정밀도로 정수를 나타내는 숫제 데이터형
3.BigInt를 출력할 땐 toString()으로 출력. 아니면 끝에 n이 붙어 나옴.
*/

