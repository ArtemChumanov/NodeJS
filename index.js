const express = require("express");
const app = express();
const authRoutes=require("./routers/auth");
const registerRouter=require("./routers/registration");
const todo=require("./routers/todo");
const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://artem:987654321@cluster0.l19p3.mongodb.net/artem?retryWrites=true&w=majority")
    .then(()=>console.log("connecting MongoDB"))
app.use("/api/auth",authRoutes)
app.use("/api/auth",registerRouter)
app.use("/api/users",todo)

app.listen(3000, function () {
  console.log("The server are working...");
});
