const {pool} = require("../config/dbconfig");


const createStudentDb = async ({userID, id_no, student_no }) =>{

    try {
        const student = await pool.query(
            `INSERT INTO student(userID, id_no, student_no)
             VALUES($1, $2, $3)
             RETURNING userID, id_no, student_no`,
             [userID, id_no, student_no]
        );
        const mytenant = student.rows[0];
        console.log(mytenant);
        return mytenant;
    } catch (error) {
        throw error;
    }
};

const getAllStudentsDb = async () =>{
    try {
        const student = await pool.query(
            "select * from users, student where users.ID = student.userID ORDER BY users.name"  
        );
        const allTenants = student.rows;
        console.log(allTenants);

        return allTenants;
    } catch (error) {
        throw error;
    }
};

const getTotalStudentsDb = async () =>{
    try {
        const student = await pool.query(
            "select * from users, student where users.ID = student.userID ORDER BY users.name"  
        );
        const allTenants = student.rowCount;
        console.log("number", allTenants);

        return allTenants;
    } catch (error) {
        throw error;
    }
};

const getStudentById = async (id) => {
    try {
        const student = await pool.query(`select * from users, student 
        where users.ID = student.userID
        AND student.ID = $1`,[id]);

        console.log(student.rows[0]);
        return student.rows[0];
    } catch (error) {
        throw error;
    }
    
};

const updateStudentDb = async ({name,lastname, email, id, id_no, campus}) => {
    try {
     
     console.log(name);
     const { rows: user } = await pool.query(
       `UPDATE users set name = $1, lastname = $2, email = $3, campus = $4
         where ID = $5 returning name, email, lastname, ID, campus`,
       [name, lastname, email, campus, id]
     );
     const myuser=user[0];
   console.log(myuser);
     const {rows:student} = await pool.query(
         `UPDATE student set  id_no=$1,student_no=$2 WHERE userID=$3  returning id_no, student_no`,
     [id_no, campus, myuser.id]);
 
     return {myuser,student:student[0]}
 
    } catch (error) {
    //   throw error;
    }
 
 };

 const deleteStudentByIdDb = async(id) => {
    try {
        const student = await pool.query(
            `DELETE FROM users 
             USING student
             WHERE users.id = $1
             AND student.userid = users.id
            `,[id]
        );

        return student.rows;
    } catch (error) {
        throw error;
    }
 }
module.exports = {
    createStudentDb,
    getAllStudentsDb,
    getTotalStudentsDb,
    getStudentById,
    updateStudentDb,
    deleteStudentByIdDb
}
