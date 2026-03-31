// Simple in-memory store (no MongoDB needed!)
let students = [];
let nextId = 1;

const getAll = () => students;

const getById = (id) => students.find(s => s.id === parseInt(id));

const create = (data) => {
  const student = { id: nextId++, ...data };
  students.push(student);
  return student;
};

const update = (id, data) => {
  const index = students.findIndex(s => s.id === parseInt(id));
  if (index === -1) return null;
  students[index] = { ...students[index], ...data };
  return students[index];
};

const remove = (id) => {
  const index = students.findIndex(s => s.id === parseInt(id));
  if (index === -1) return false;
  students.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, remove };