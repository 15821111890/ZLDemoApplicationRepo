let userManager = require('./userManager');
let errLib = require('../lib/errLib');

module.exports = {

    queryUser: function (userId) {
        if(!userId){
            return Promise.reject(errLib.getErr(errLib.ERR_INVALID_PARAMS));
        }
        return userManager.queryUser(userId);
    },
    
    queryUsers: function (pageNo, pageSize) {
        if(!pageNo || !pageSize){
            return Promise.reject(errLib.getErr(errLib.ERR_INVALID_PARAMS));
        }
        let resultCount = 0 ;
        return userManager.queryUser(function (count) {
            resultCount = count ;
            return userManager.queryUserList(pageNo,pageSize);
        }).then(function (docs) {
            return {
                pageNo: pageNo,
                pageSize: pageSize,
                totalPage:  Math.ceil(resultCount / pageSize),
                count: resultCount,
                users: docs
            };
        })
    },
    
    insertUser: function (name, age, mobile) {
        if(!name || !age || !mobile){
            return Promise.reject(errLib.getErr(errLib.ERR_INVALID_PARAMS));
        }
        return userManager.insertUser(name,age,mobile).then(function (doc) {
            return {} ;
        });
    },
    
    updateUser: function (userId, name, age, mobile) {
        if(!userId || !name || !age || !mobile){
            return Promise.reject(errLib.getErr(errLib.ERR_INVALID_PARAMS));
        }
        return userManager.updateUser(userId, name,age,mobile).then(function (doc) {
            return {} ;
        });
    }
    

}