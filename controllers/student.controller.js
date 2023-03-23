const {updateStudentDb, getAllStudentsDb, deleteStudentByIdDb, getStudentById, getTotalStudentsDb} = require("../db/student.db");

const updateStudent = async(req, res, next) => {
    try {
        const data = req.body;

        if(data.email){
            if(!data.email.includes("@tut4life.ac.za")) {throw Error("Not a tut email")}
        }

        const student = await updateStudentDb(data);

        return res.status(200).send(student);
    } catch (error) {
        next(error);
    }
}

const getAllStudents = async(req, res, next) =>{
    try {
        const students = await getAllStudentsDb();
        return res.status(200).send(students);
    } catch (error) {
        next(error);
    }
}

const deleteStudentById = async(req, res, next) => {
    try {
        const id = req.params.id;

        console.log(id);
        const student = await deleteStudentByIdDb(id);

        if(!student){throw new Error("Something went wrong")};
        return res.status(200).send({msg: 'Student deleted'});
    } catch (error) {
        next(error);
    }
}

const getStudent = async(req, res, next) =>{
    try {
        const id = req.params.id;
        console.log(id);
        const student = await getStudentById(id);
        res.status(200).send(student);
    } catch (error) {
        next(error);
    }
}

const getTotalStudents = async(req, res, next) =>{
    const students = await getTotalStudentsDb();
    return res.sendStatus(200).send(students);
}

module.exports = {
    updateStudent,
    getAllStudents,
    deleteStudentById,
    getStudent,
    getTotalStudents
}