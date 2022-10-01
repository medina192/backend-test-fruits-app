const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        // Dev
        //await mongoose.connect(process.env.CONNECTION_DB_STRING_LOCAL);

        // Production
        await mongoose.connect(process.env.CONNECTION_DB_STRING_ClOUD);

        console.log("Mongo DB online");

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - vea logs');
    }


}

module.exports = {
    dbConnection
}