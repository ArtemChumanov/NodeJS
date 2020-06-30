const fs = require("fs");
const Transform=require("./transformFile")

fs.createReadStream('./text.txt','utf-8')
    .pipe(new Transform.TransformFile())
    .pipe(fs.createWriteStream('./text1.txt'))



/*const ReadStream=fs.createReadStream(__dirname+'/text.txt','utf-8');
 const WriteStream=fs.createWriteStream(__dirname+'/text1.txt');
 ReadStream.on('data',function (chunk) {

     let mass=chunk.split('\n')
        console.log(chunk.split('\n'));
        for(let i=0;i<chunk.split('\n').length-1;i++){
            mass[i]=`${i+1} ${mass[i]}`;
        }
     WriteStream.write(mass.join('\n'))
 })
*/
