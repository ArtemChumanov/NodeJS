const fs = require("fs");
const bodyParser = require("body-parser");
const passport=require('passport')
const jsonParser = bodyParser.json();
const express = require("express");
const router = express.Router();
require('../middleware/passport')(passport)

router.get("/",passport.authenticate('jwt', { session: false }),function (req, res) {
    const getData = fs.readFileSync("text.json", "utf8");
    const parseData = JSON.parse(getData);
    console.log(parseData);
    res.send(parseData);
} );

router.post("", passport.authenticate('jwt', { session: false }),jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const title = req.body.title;
    const isImportant = req.body.important;
    const isDone = req.body.done;
    const todoItem = { title: title, important: isImportant ,done:isDone};
    let data = fs.readFileSync("text.json", "utf8");
    const todo = JSON.parse(data);
    const id = Math.max.apply(
        Math,
        todo.map(function (item) {
            return item.id;
        })
    );
    todoItem.id = id + 1;
    todo.push(todoItem);
    data = JSON.stringify(todo);
    fs.writeFileSync("text.json", data);
    res.send(todoItem);
});

router.delete("/:id",passport.authenticate('jwt', { session: false }), function (req, res) {
    const id = req.params.id;
    let getData = fs.readFileSync("text.json", "utf8");
    const parseData = JSON.parse(getData);
    let index = -1;
    for (let i = 0; i < parseData.length; i++) {
        if (parseData[i].id == id) {
            index = i;
            console.log(index);
            break;
        }
    }
    if (index > -1) {
        const tasks = parseData.splice(index, 1);
        getData = JSON.stringify(parseData);
        fs.writeFileSync("text.json", getData);
        res.send(tasks);
    } else {
        res.status(404).send();
    }
});

router.put("",passport.authenticate('jwt', { session: false }), jsonParser, function (req, res) {
    const todoId = req.body.id;
    const title = req.body.title;
    const isImportant = req.body.important;
    const isDone = req.body.done;
    let getData = fs.readFileSync("text.json", "utf8");
    const parseData = JSON.parse(getData);
    let todo;
    for (let i = 0; i < parseData.length; i++) {
        if (parseData[i].id == todoId) {
            todo = parseData[i];
            break;
        }
    }
    if (todo) {
        todo.title = title;
        todo.important = isImportant;
        todo.done=isDone
        getData = JSON.stringify(parseData);
        fs.writeFileSync("text.json", getData);
        res.send(todo);
    } else {
        res.status(404).send(todo);
    }
});
module.exports=router;
