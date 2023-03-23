const bcrypt = require("bcrypt");

//hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  
  return hashedPassword;
};
//compare hash with plain password
const comparePassword = async (password,passwordHash) => {
  return await bcrypt.compare(password, passwordHash)
};

module.exports = { hashPassword, comparePassword };
