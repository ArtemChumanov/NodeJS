const fs = require("fs");
const bodyParser = require("body-parser");
const passport=require('passport')
const jsonParser = bodyParser.json();
const express = require("express");
const Todos=require("../models/todos");
const controller=require("../controllers/todos-controllers")
const router = express.Router();
require('../middleware/passport')(passport)

router.get("",passport.authenticate('jwt', { session: false }),controller.get );
router.post("", passport.authenticate('jwt', { session: false }),jsonParser, controller.post);
router.delete("/:id",passport.authenticate('jwt', { session: false }),controller.delete)
router.put("",passport.authenticate('jwt', { session: false }), jsonParser, controller.put)

module.exports=router;
