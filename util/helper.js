const { DB_URL, DB_COLLECTION } = require('./config')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
var _db;

module.exports = {
    redis_get: function(result) {
        return result;
    },
    sleep: function (duration) {
        return new Promise(resolve => {
            setTimeout(resolve, duration * 1000)
        })
    },
    epochTimeNow: function() {
        return Math.floor(Date.now() / 1000)
    },
    connectToServer: function (callback) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
            _db = client.db('air_control');
            return callback(err);
        });
    },
    getDb: function() {
        return _db;
    },
    avarageData: function(data, lengthData) {
        let sumData = 0

        for(let d of data){
            sumData += d.ispu
        }

        return sumData / lengthData
    },
    zToText: function(number) {
        if(number <= 50) {
            return "Baik"
        } else if(number <= 100) {
            return "Sedang"
        } else if(number <= 199) {
            return "Tidak Sehat"
        } else if(number <= 299) {
            return "Sangat Tidak Sehat"
        } else {
            return "Berbahaya"
        }
    }
}