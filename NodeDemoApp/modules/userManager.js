let uuid = require('uuid');
let errLib = require('../lib/errLib');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {type: String, unique: true},
    name: String,
    age: Number,
    mobile: {type: Number, unique: true}
});
const user = mongoose.model('db_user_collection', userSchema);

module.exports = {

    // 查询单个用户
    queryUser: function (userId) {
        return user.findOne({userId: userId}).then(function (doc) {
            if(!doc){
                return Promise.reject(errLib.getErr(errLib.ERR_QUERY_ERR));
            }
            else {
                let result = {
                    userId: doc.userId,
                    name: doc.name,
                    age: doc.age,
                    mobile: doc.mobile
                };
                return result;
            }
        });
    },

    // 查询用户列表总数
    queryUserCount: function () {
        let query = {} ; // 过滤器
        return user.find(query).countDocuments().then(function (count) {
            return count;
        });
    },

    // 查询用户列表
    queryUserList: function (pageNo,pageSize) {
        let query = {} ; // 过滤器
        let sort = {} ;  // 排序

        pageNo = pageNo * 1;
        pageSize = pageSize * 1;
        let count = pageNo * pageSize;

        return user.find(query).sort(sort).skip(count).limit(pageSize).then(function (docs){
            let result = [];
            docs.forEach(function (item, index) {
                let curUser = {
                    userId: doc.userId,
                    name: doc.name,
                    age: doc.age,
                    mobile: doc.mobile
                };
                result.push(curUser);
            });
            return result ;
        });
    },

    // 插入单个用户
    insertUser: function (name, age, mobile) {
        return user.findOne({mobile: mobile}).then(function (doc) {
            if(doc){
                return Promise.reject(errLib.getErr(errLib.ERR_INSERT_FAILURE));
            }
            else {
                let uuid = uuid();
                let newUser = new user({
                    userId: uuid,
                    name: name.toString(),
                    mobile: Number(mobile),
                    age: Number(age)
                });
                return newUser.save();
            }
        });
    },

    // 更新单个用户
    updateUser: function (userId, name, age, mobile) {
        return user.findOne({userId: userId}).then(function (doc) {
            if(!doc){
                return Promise.reject(errLib.getErr(errLib.ERR_UPDATE_FAILURE));
            }
            else {
                return doc.updateOne({
                    name: name,
                    age: Number(age),
                    mobile: Number(mobile)
                });
            }
        });
    }

}