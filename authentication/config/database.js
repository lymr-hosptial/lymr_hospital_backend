const { response } = require("express");
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://makram:makram@cluster0.uhuavyj.mongodb.net/";
const dbInstance = async(operations, response)=>{
    try{
        const db_client = await MongoClient.connect(uri);
        // console.log(uri);
        const db = db_client.db('hospitaldb');
        // console.log(db);
        await operations(db);
        db_client.close();
    }catch(error){
        response.status(500).json({message:'Error in connecting to lymr DB.Try Again', error});
    }
}

module.exports = { dbInstance };



 

