require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

            req.user = {
                id: decodeToken.userId,
                role: decodeToken.userRole
            };
            console.log(req.user);
            next();
        } catch (error) {
            res.status(401).json({
                message: error || 'Invalid token',
            })
        }
    }
    else{
        res.status(401).json({
            message: 'Authorization header missing',
        })
    }
}

const generateToken = async (data) =>{
    console.log(process.env.SECRET_KEY);
    return jwt.sign({userId:data.userId, userRole: data.userRole}, process.env.SECRET_KEY, {expiresIn: '24h'});
}

module.exports = {verifyJWT, generateToken};