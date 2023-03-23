const router = require("express").Router();
const auth = require("./auth");
const student = require('./student');
const lecture = require("./lecture");
const location = require("./location");

router.use("/auth",auth);
router.use("/student",student);
router.use("/lecture",lecture);
router.use("/map",location);

module.exports = router;