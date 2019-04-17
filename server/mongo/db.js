const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'unsure';

// Use connect method to connect to the server
let listFeeds = function (callback) {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection('feeds');
        collection.find({}).toArray(function (err, docs) {
            callback(docs);
            client.close();
        });
    });
};

let insertFeed = function (callback) {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection('feeds');
        collection.insertOne({
            'imageUrl': 'https:www.baidu.com',
            'userid': 234234,
            'fuck':112
        }, {}, function (err, result) {
            callback(result)
            client.close();
        });
    });
};

module.exports.listFeeds = listFeeds;
module.exports.insertFeeds = insertFeed;
