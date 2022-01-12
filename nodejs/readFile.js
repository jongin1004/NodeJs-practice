const fs = require('fs');

fs.readFile('sampleText.txt', 'utf8', (err, data) => {
    console.log(data);
});