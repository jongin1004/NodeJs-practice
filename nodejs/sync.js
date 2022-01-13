let fs = require('fs');

// readfilesync

// console.log('A');
// let result = fs.readFileSync('./data/HTML', 'utf8');
// console.log(result);
// console.log('C');

console.log('A');
fs.readFile('./data/HTML', 'utf8', (err, result) => {
    console.log(result);
});

console.log('C');