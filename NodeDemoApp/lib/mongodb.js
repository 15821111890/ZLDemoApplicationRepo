const config = require('config');

module.exports = function (options) {

    const mongoose = options.mongoose ? options.mongoose : require('mongoose')
    const db = mongoose.connection;
    mongoose.Promise = global.Promise;

    if (options && options.onError) {
        db.on('error', options.onError);
    } else {
        db.on('error', function (err) {
            console.log("mongodb connection error: " + err);
        });
    }

    if (options && options.onOpen) {
        db.once('open', options.onOpen);
    } else {
        db.once('open', function () {
            const s = config.db.host.indexOf("@") + 1
            const host = s > 0 ? config.db.host.slice(s) : config.db.host
            console.log(("mongodb connected: " + host);
        });
    }

    const opts = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
    mongoose.connect(config.db.host, opts);
};
