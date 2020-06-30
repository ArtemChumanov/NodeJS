const stream=require('stream');
const StringDecoder = require('string_decoder').StringDecoder;
const convert = new StringDecoder('utf8');

class TransformFile extends stream.Transform{
    constructor(options={}){
        options=Object.assign({},options,{
            decodingStrings:false
        })
        super(options)
    }
    _transform(chunk,encoding,callback){
        const buffToString=convert.write(chunk);
        if(encoding=='utf8'){
            console.log("chunk")
            this.emit('error',new Error("only Utf8"))
            return callback();
        }
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
