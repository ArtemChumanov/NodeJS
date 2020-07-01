const stream=require('stream');
const StringDecoder = require('string_decoder').StringDecoder;
const convert = new StringDecoder('utf8');

class TransformFile extends stream.Transform{
    constructor(options={}){
        options=Object.assign({},options,{
            decodingString:false
        })
        super(options)
    }
    _transform(chunk,encoding=null,callback){
        const buffToString=convert.write(chunk);
        console.log(encoding);
        let arr=buffToString.split('\n')
        console.log(buffToString.split('\n'));
        for(let i=0;i<buffToString.split('\n').length-1;i++){
            arr[i]=`${i+1} ${arr[i]}`;
        }
        this.push(arr.join('\n'));
        callback()
    }
}
module.exports = {
    TransformFile : TransformFile
}
