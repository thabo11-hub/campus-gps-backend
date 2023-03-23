const {pool} = require("../config/dbconfig");

const createAdminDb = async ({userID}) =>{

    try {
        const admin = await pool.query(
            `INSERT INTO admin(userID)
             VALUES($1)
             RETURNING userID`,
             [userID]
        );
        const myAdmin = admin.rows[0];
        console.log(myAdmin);
        return myAdmin;
    } catch (error) {
        throw error;
    }
};

const getAllAdminsDb = async () =>{
    try {
        const admins = await pool.query(
            "select * from users, admin where users.ID = admin.userID ORDER BY users.name"  
        );
        const allAdmins = admins.rows[0];
        console.log(allAdmins);

        return allAdmins;
    } catch (error) {
        throw error;
    }
};

const getAdminById = async (id) => {
    const {rows: admin} = await pool.query(`select * from users, tenant 
    where users.ID = tenant.userID
    AND tenant.ID = $1`,[id]);

    console.log(admin[0]);
    return admin[0]
};

module.exports = {
    createAdminDb,
    getAllAdminsDb,
    getAdminById
}