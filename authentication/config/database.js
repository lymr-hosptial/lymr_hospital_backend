const { response } = require("express");
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://makram:makram@cluster0.uhuavyj.mongodb.net/";
const dbInstance = async(operations, response)=>{
    try{
        const db_client = await MongoClient.connect(uri);
        const db = db_client.db('hospitaldb');
        await operations(db);
        db_client.close();
    }catch(error){
        response.send(500).json({message:'Error in connecting to lymr DB.Try Again', err});
    }
}

module.exports = { dbInstance };



 

