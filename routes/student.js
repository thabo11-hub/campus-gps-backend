const router = require("express").Router();
const student_controller = require("../controllers/student.controller");

router.put('/update',student_controller.updateStudent);
router.get('/all',student_controller.getAllStudents);
router.delete('/delete/:id',student_controller.deleteStudentById);
router.get('/get/:id',student_controller.getStudent);
router.get('/total',student_controller.getTotalStudents);

module.exports = router;