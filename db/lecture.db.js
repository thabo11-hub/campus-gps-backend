const {pool} = require("../config/dbconfig");

const createLecturetDb = async ({userID,  stuff_no }) =>{

    try {
        const lecture = await pool.query(
            `INSERT INTO lecture(userID, stuff_no)
             VALUES($1, $2)
             RETURNING userID, stuff_no`,
             [userID, stuff_no]
        );
        const mytenant = lecture.rows[0];
        console.log(mytenant);
        return mytenant;
    } catch (error) {
        throw error;
    }
};

const getAllLecturesDb = async () =>{
    try {
        const lecture = await pool.query(
            "select * from users, lecture where users.ID = lecture.userID ORDER BY users.name"  
        );
        const allTenants = lecture.rows;
        console.log(allTenants);

        return allTenants;
    } catch (error) {
        throw error;
    }
};

const getTotalLecturesDb = async () =>{
    try {
        const lecture = await pool.query(
            "select * from users, lecture where users.ID = lecture.userID ORDER BY users.name"  
        );
        const allTenants = lecture.rowCount;
        console.log("number", allTenants);

        return allTenants;
    } catch (error) {
        throw error;
    }
};

const getLectureById = async (id) => {
    const {rows: lecture} = await pool.query(`select * from users, lecture 
    where users.ID = lecture.userID
    AND student.ID = $1`,[id]);

    console.log(lecture[0]);
    return lecture[0]
};

const updateLectureDb = async ({name,lastname, email, id, campus, stuff_no}) => {
    try {
     
     console.log(name);
     const { rows: user } = await pool.query(
       `UPDATE users set name = $1, lastname = $2, email = $3, campus = $4
         where ID = $5 returning name, email, lastname, campus, ID`,
       [name, lastname, email, campus, id]
     );
     const myuser=user[0];
     console.log(myuser);
     const {rows:lecture} = await pool.query(
         `UPDATE lecture set stuff_no=$1 WHERE userID=$2  returning stuff_no, userID`,
     [stuff_no, myuser.id]);
 
     return {myuser,lecture:lecture[0]}
 
    } catch (error) {
      throw error;
    }
 };

 const deleteLectureByIdDb = async(id) => {
    try {
        const lecture = await pool.query(
            `DELETE FROM users 
             USING lecture
             WHERE users.id = $1
             AND lecture.userid = users.id
            `,[id]
        );

        return lecture.rows;
    } catch (error) {
        throw error;
    }
 }

module.exports = {
    createLecturetDb,
    getAllLecturesDb,
    getTotalLecturesDb,
    getLectureById,
    updateLectureDb,
    deleteLectureByIdDb
}