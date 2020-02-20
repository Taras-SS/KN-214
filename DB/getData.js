const MongoClient = require(`mongodb`).MongoClient;
const config = require(`../config/db`).database;

module.exports = (collectionName, data, sort, callBack) => {
    MongoClient.connect(config.connection, (err, db) => {
        if(err) throw err;
        let dbo = db.db(config.name);
        dbo.collection(collectionName).find(data).sort(sort).toArray((err, result) => {
            if(err || result.length == 0){
                return callBack(0);
            }else {
                db.close();
                return callBack(result);
            }
        });
    });
};