const Student = require('../models/studentModel');

exports.getAll = (req, res) => {
  res.json(Student.getAll());
};

exports.getById = (req, res) => {
  const student = Student.getById(req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
};

exports.create = (req, res) => {
  const student = Student.create(req.body);
  res.status(201).json(student);
};

exports.update = (req, res) => {
  const student = Student.update(req.params.id, req.body);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
};

exports.remove = (req, res) => {
  const deleted = Student.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Student not found" });
  res.json({ message: "Student deleted" });
};

exports.search = (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Search query required" });
  res.json(Student.search(q));
};