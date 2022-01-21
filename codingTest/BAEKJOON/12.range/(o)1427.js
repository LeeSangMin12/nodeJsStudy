const fs = require('fs');
const input = fs.readFileSync('dev/stdin').toString().trim().split('');


input.sort((a,b) => b-a);

const answer = input.join('');

console.log(answer);


