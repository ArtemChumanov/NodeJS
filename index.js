const fs=require('fs');
let text=process.argv[2].split("=").slice(1);
console.log(text);
fs.appendFileSync("newFile.txt",`${text}\n`)



