const {pool} = require("../config/dbconfig");

const getLocationByNameDb = async(name) =>{
    
    try {
       const location = await pool.query(
        `SELECT json_build_object(
            'location', json_agg(location.*),
            'waypoints', json_agg(waypoints.*)
                ) AS data
        FROM location
        LEFT JOIN waypoints ON location.id = waypoints.locationID
        WHERE location.name = $1;
        `,[name]
    );
    console.log(location.rows[0]);
    return location.rows[0]; 
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getLocationByNameDb
}