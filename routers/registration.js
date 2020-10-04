const express = require("express");
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const User=require("../models/users")
//let userData = JSON.parse(fs.readFileSync("users.json", "utf8"));
// function isAuth(email, password) {
//   return (
//       userData.findIndex(
//       (user) => user.email === email && user.password === password
//     ) !== -1
//   );
// }
router.post("/register", jsonParser,async function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const candidate= await User.findOne({email:req.body.email})
  console.log(candidate)
  if(candidate){
    res.status(409).json("This user already exists")
  }
  else{
    const user=User({
      email:req.body.email,
      password:req.body.password
    })
    try{
      await user.save();
      res.status(201).json(user)
    }catch (e) {

    }
  }
  // if (!isAuth(req.body.email, req.body.password)) {
  //   const password = req.body.password;
  //   const email = req.body.email;
  //   const user = { email: email, password: password };
  //   let data = fs.readFileSync("users.json", "utf8");
  //   const users = JSON.parse(data);
  //   const id = Math.max.apply(
  //     Math,
  //     users.map(function (item) {
  //       return item.id;
  //     })
  //   );
  //   user.id = id + 1;
  //   users.push(user);
  //   data = JSON.stringify(users);
  //   fs.writeFileSync("users.json", data);
  //   res.send(user);
  // } else {
  //   res.status(409).json({
  //     message: "This user already exists ",
  //   });
  // }
});
module.exports = router;
