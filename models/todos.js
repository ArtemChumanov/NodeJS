const mongoose=require("mongoose");
const Schema=mongoose.Schema

const todoSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    important:{
        type:Boolean,
        required:true,
    },
    done:{
        type:Boolean,
        required:true,
    },
    id:{
        type:String,
        required:true,

    }
})
module.exports=mongoose.model("todos",todoSchema)
