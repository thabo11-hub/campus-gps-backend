const {roles} = require('../helpers/constant');
const {hashPassword, comparePassword} = require('../helpers/password');
const {createStudentDb} = require('../db/student.db');
const {createAdminDb} = require('../db/admin.db');
const {createLecturetDb} = require('../db/lecture.db');

const {
    getUserByEmailDb, 
    createUserDb} = require('../db/user.db');

    const {generateToken} = require('../middlewares/jwt');

class USerService {
    
    createUser = async (my_user) => {
        try {
            
            //check if user exists
            const existing_user = await getUserByEmailDb(my_user.email);

            //if exist 
            if(existing_user) {throw Error("Email taken");}

            //checks if email is from tut
            if(!my_user.email.includes("@tut4life.ac.za")) {throw Error("Not a tut email")}

            //encrypt/ hash password
            const hashedPassword = await hashPassword(my_user.password);

            const user = {
                ...my_user,
                password: hashedPassword
            };

            const email = {
                name: my_user.lastname,
                
            }

  
            //create user
            
            const newuser = await createUserDb(user);
            console.log('user service',newuser);
            //check user role and create TENANT OR ADMIN
            if(newuser.role && newuser.role.toUpperCase() == roles.STUDENT){
                const student = await createStudentDb({userID: newuser.id, id_no: user.id_no, student_no: user.student_no});
                return student;
            }
            else
            if(newuser.role && newuser.role.toUpperCase() == roles.ADMIN){
                const admin = await createAdminDb({userID: newuser.id});
                return admin;
            }
            else
            if(newuser.role && newuser.role.toUpperCase() == roles.LECTURE){
                const lecture = await createLecturetDb({userID: newuser.id, stuff_no: user.stuff_no});
                return lecture;
            }
            else{
                throw Error("Role is Empty or Not Defined");
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    login = async ({email, password}) =>{
        //find user if exists
        const user = await getUserByEmailDb(email);

        //if user not fount 
        if(!user) {throw new Error("User not found check email and password");}

        //call function to compare hash with plain user input(password);
        const result = await comparePassword(password, user.password);

        if(result){
            //create token
            const token = await generateToken({userId: user.id, userRole: user.role});
            return {user: user,token};
        }
        else{
            throw new Error("Password do not match");
        }
    };
}

module.exports = new USerService();