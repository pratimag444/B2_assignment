const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/studentController');
const { validateStudent } = require('../middleware/validate');

/**
 * @api {get} /api/students Get all students
 * @apiName GetStudents
 * @apiGroup Students
 * @apiDescription Returns a list of all students in the system
 * @apiSuccess {Object[]} students List of students
 * @apiSuccess {Number} students.id Student ID
 * @apiSuccess {String} students.name Student full name
 * @apiSuccess {String} students.email Student email address
 * @apiSuccess {String} students.course Course name
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{ "id": 1, "name": "Alice Smith", "email": "alice@example.com", "course": "Computing" }]
 */
router.get('/', ctrl.getAll);

/**
 * @api {get} /api/students/search Search students
 * @apiName SearchStudents
 * @apiGroup Students
 * @apiDescription Search students by name or course
 * @apiQuery {String} q Search term
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{ "id": 1, "name": "Alice Smith", "email": "alice@example.com", "course": "Computing" }]
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     { "error": "Search query required" }
 */
router.get('/search', ctrl.search);

/**
 * @api {get} /api/students/:id Get student by ID
 * @apiName GetStudent
 * @apiGroup Students
 * @apiDescription Returns a single student by ID
 * @apiParam {Number} id Student unique ID
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     { "id": 1, "name": "Alice Smith", "email": "alice@example.com", "course": "Computing" }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     { "error": "Student not found" }
 */
router.get('/:id', ctrl.getById);

/**
 * @api {post} /api/students Add new student
 * @apiName CreateStudent
 * @apiGroup Students
 * @apiDescription Creates a new student record
 * @apiBody {String} name Student full name (required)
 * @apiBody {String} email Student email address (required)
 * @apiBody {String} course Course name (required)
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     { "id": 2, "name": "Bob Jones", "email": "bob@example.com", "course": "Software Engineering" }
 * @apiErrorExample {json} Validation-Error:
 *     HTTP/1.1 400 Bad Request
 *     { "error": "name, email and course are required" }
 */
router.post('/', validateStudent, ctrl.create);

/**
 * @api {put} /api/students/:id Update student
 * @apiName UpdateStudent
 * @apiGroup Students
 * @apiDescription Updates an existing student record
 * @apiParam {Number} id Student unique ID
 * @apiBody {String} name Updated full name (required)
 * @apiBody {String} email Updated email address (required)
 * @apiBody {String} course Updated course name (required)
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     { "id": 1, "name": "Alice Updated", "email": "alice@example.com", "course": "Computing" }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     { "error": "Student not found" }
 */
router.put('/:id', validateStudent, ctrl.update);

/**
 * @api {delete} /api/students/:id Delete student
 * @apiName DeleteStudent
 * @apiGroup Students
 * @apiDescription Deletes a student record by ID
 * @apiParam {Number} id Student unique ID
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     { "message": "Student deleted" }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     { "error": "Student not found" }
 */
router.delete('/:id', ctrl.remove);

module.exports = router;