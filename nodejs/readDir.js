let testFolder = './data/';
let fs = require('fs');

fs.readdir(testFolder, (err, filelist) => {
    console.log(filelist);
});