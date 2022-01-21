const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('\n');
const N = parseInt(input.shift());

for (let i = 0; i < N; i++) {
	const a = input.shift();
	const b = input.shift();
	const apartment = [];

	for (let i = 0; i <= a; i++) {
		apartment.push([1]);
		for (let j = 1; j < b; j++) {
			//0충
			if (i === 0) {
				apartment[i].push(j + 1);
			//1층 이상	
			} else {
				apartment[i].push(apartment[i][j-1] + apartment[i-1][j])
				// apartment[i][j-1] - 옆에 값
				// apartment[i-1][j] - 밑에 값
			}
		}
	}

	console.log(apartment[a][b-1]);
}

/*
1. 
일렬로 나열된 input 받는 방법
for(let i=0 i<N; i++){
	const k = input.shift();
	const n = input.shift();
}
2.
맨 처음 값이 다 1인것을 알고 apartment.push([1])
만으로 아파트의 기초를 완성했다.
항상 눈에 보이는 것만 해결 하려 하지말고 유추하며 공부하자
*/