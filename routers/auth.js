const express = require("express");
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const User=require("../models/users")
let userData = JSON.parse(fs.readFileSync("users.json", "utf8"));
// function isAuth(email, password) {
//   return (
//     userData.findIndex(
//       (user) => user.email === email && user.password === password
//     ) !== -1
//   );
// }
router.post("/login", jsonParser,async function (req, res) {
  const candidate= await User.findOne({email:req.body.email,password:req.body.password})
  if(!candidate){
    res.status(401).json({
           message: "Error Authorization!!!"
    })
  }
  else{
    const token = jwt.sign(
        {
          email: req.body.email,
          password: req.body.password,
        },
        "1234",
        { expiresIn: 60 * 60 }
      );
      res.status(200).json({
        token: token,
      });
  }
  // const user=new User({
  //   email:req.body.email,
  //   password:req.body.password
  // })
  // user.save().then(()=>console.log("User create"))
  // console.log(req);
  // if (isAuth(req.body.email, req.body.password)) {
  //   const token = jwt.sign(
  //     {
  //       email: req.body.email,
  //       password: req.body.password,
  //     },
  //     "1234",
  //     { expiresIn: 60 * 60 }
  //   );
  //   res.status(200).json({
  //     token: token,
  //   });
  // } else {
  //   res.status(401).json({
  //     message: "Error Authorization!!!",
  //   });
  // }
});
module.exports = router;
