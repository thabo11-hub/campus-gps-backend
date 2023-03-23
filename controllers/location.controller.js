const {getLocationByNameDb} = require("../db/location.db");

const getLocationByName = async (req, res, next) =>{
    try {
        console.log(req.body);
        const name = req.body.name;
        if(!name){throw new Error("Location not specified");}

        const location = await getLocationByNameDb(name);
        return res.status(200).send(location);
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getLocationByName
}