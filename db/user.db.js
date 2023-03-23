const {pool} = require("../config/dbconfig");


const createUserDb = async ({name,password, email, lastname, campus, role}) =>{
    try {
        const user = await pool.query(
            `INSERT INTO users(name, password, email,lastname, campus, role)
             VALUES($1, $2, $3, $4, $5, $6)
             RETURNING ID, name, lastname, email, campus, role, created_at`,
             [name, password, email, lastname, campus, role]
        );
        const myuser = user.rows[0];
        console.log('user db',myuser);
        return myuser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const getUserByEmailDb = async (email) => {
    const {rows: exists} = await pool.query(
        "select * from users where lower(email) = lower($1)",
        [email]
    );
    return exists? exists[0]: false;
}

const changeUserPasswordDb = async (hashedPassword, email) =>{
    return await pool.query(
        "update users set password = $1 where email = $2",
        [hashedPassword, email]
    );
};


// name varchar(100),
// 	lastname varchar(100),
// 	email varchar(100) unique,
// 	password varchar(100) not null,

module.exports = {
    createUserDb,
    getUserByEmailDb,
    changeUserPasswordDb
}