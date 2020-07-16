const io = require('socket.io')(3000);

const mongoUtil = require('../util/helper');

// initialization connection for reuseable mongodb connection
mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    // membuat koneksi ke socket
    io.on('connection', socket => {
        // listen to chennel denscity
        socket.on('denscity', async loc => {
            // input data ke database
            await inputToDb(loc.ispu)
            // data yg sudah di dapat dari channel denscity kita broadcast ke channel livedencity
            console.log("Terima Data", JSON.stringify(loc))
            socket.broadcast.emit('livedenscity', loc)
        })
    });
});


// fungsi untuk menginfput data ke database
const inputToDb = (obj) => {
    var db = mongoUtil.getDb();
    return new Promise( async (resolve, reject) => {
        try {
            await db.collection('ispu').insertOne({ispu: obj, created_at: Math.floor(new Date() / 1000)})
            resolve('success') 
        } catch (error) {
            reject(error)
        }
    })
}