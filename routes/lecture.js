const router = require("express").Router();
const lecture_controller = require("../controllers/lecture.controller");

router.put('/update',lecture_controller.updateLecture);
router.get('/all',lecture_controller.getAllLectures);
router.delete('/delete/:id', lecture_controller.deleteLectureById)

module.exports = router;