const {updateLectureDb, getAllLecturesDb, deleteLectureByIdDb} = require("../db/lecture.db");

const updateLecture = async(req, res, next) => {
    try {
        const data = req.body;

        if(data.email){
            if(!data.email.includes("@tut4life.ac.za")) {throw Error("Not a tut email")}
        }

        const student = await updateLectureDb(data);

        return res.status(200).send(student);
    } catch (error) {
        next(error);
    }
}

const getAllLectures = async(req, res, next) => {
    try {
        const lectures = await getAllLecturesDb();
        return res.status(200).send(lectures);
    } catch (error) {
        next(error)
    }
}

const deleteLectureById = async(req, res, next) => {
    try {
        const id = req.params.id;

        console.log(id);
        const lecture = await deleteLectureByIdDb(id);

        if(!lecture){throw new Error("Something went wrong")};
        return res.status(200).send({msg: 'Lecture deleted'});
    } catch (error) {
        next(error);
    }
}

module.exports ={
    updateLecture,
    getAllLectures,
    deleteLectureById
}