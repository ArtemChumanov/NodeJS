const express = require("express");
const app = express();
const authRoutes=require("./routers/auth");
const registerRouter=require("./routers/registration");
const todo=require("./routers/todo")

app.use("/api/auth",authRoutes)
app.use("/api/auth",registerRouter)
app.use("/api/users",todo)

app.listen(3000, function () {
  console.log("The server are working...");
});
