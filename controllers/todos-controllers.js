const Todos = require("../models/todos");

module.exports.get = async function (req, res) {
  const getData = await Todos.find();
  res.status(200).json(getData);
};
module.exports.post = async function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const candidate = await Todos.find();
  console.log(candidate);
  if (candidate) {
    let todo = Todos({
      title: req.body.title,
      important: req.body.important,
      done: req.body.done,
    });

    try {
      await todo.save();
      res.status(201).json(todo);
    } catch (e) {}
  } else {
    console.log("Error");
  }
};
module.exports.delete = async function (req, res) {
  try {
    await Todos.remove({ _id: req.params.id });
    res.status(200).json({
      message: "Deleted",
    });
  } catch (e) {
    res.status(401).json({
      message: "Error",
    });
  }
};

module.exports.put = async function (req, res) {
  try {
    await Todos.update({
      _id: req.body._id,
      title: req.body.title,
      important: req.body.important,
      done: req.body.done,
    });

    res.status(200).json({
      message: "Deleted",
    });
  } catch (e) {
    res.status(401).json({
      message: "Error",
    });
  }
};
