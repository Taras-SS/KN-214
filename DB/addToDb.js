const MongoClient = require(`mongodb`).MongoClient;
const config = require(`../config/db`).database;

module.exports = (collectionName, data) => {
    MongoClient.connect(config.connection, (err, db) => {
        if(err) throw err;
        let dbo = db.db(config.name);
        dbo.collection(collectionName).insertOne(data,(err, res) => {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}