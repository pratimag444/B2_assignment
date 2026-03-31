const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/studentController');
const { validateStudent } = require('../middleware/validate');

/**
 * @api {get} /api/students Get all students
 * @apiName GetStudents
 * @apiGroup Students
 * @apiSuccess {Object[]} students List of students
 */
router.get('/', ctrl.getAll);

/**
 * @api {get} /api/students/:id Get student by ID
 * @apiName GetStudent
 * @apiGroup Students
 */
router.get('/:id', ctrl.getById);

/**
 * @api {post} /api/students Add new student
 * @apiName CreateStudent
 * @apiGroup Students
 * @apiBody {String} name Student name
 * @apiBody {String} email Student email
 * @apiBody {String} course Course name
 */
router.post('/', validateStudent, ctrl.create);

/**
 * @api {put} /api/students/:id Update student
 * @apiName UpdateStudent
 * @apiGroup Students
 */
router.put('/:id', validateStudent, ctrl.update);

/**
 * @api {delete} /api/students/:id Delete student
 * @apiName DeleteStudent
 * @apiGroup Students
 */
router.delete('/:id', ctrl.remove);

module.exports = router;