var express = require('express');
var router = express.Router();
let user = require('../modules/user');
let errLib = require('../lib/errLib');


function failure(err) {
  let result = {
      resCode: err.code ,
      msg: err.message
  };
  return result;
}

function success(obj) {
    let result = {
        resCode: errLib.getErr(errLib.SUCCESS_CODE),
        obj: obj,
        msg: '操作成功'
    };
    return result ;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// URL - http://host:port/path?query
// http://localhost:3000/user/10001?name=aaa
// 其中 http - schema、localhost - host、3000 - port、user/10001 - path、?xx=xx&xxx=xxx query参数


// POST - 创建操作
// POST - http://host:port/users/user - 参数在body里
router.post('/user', function (req, res, next) {
  let name = req.body.name?req.params.name.toString():null ;
  let age = req.body.age?req.body.age:null ;
  let mobile = req.body.mobile?req.body.mobile:null ;

  return user.insertUser(name,age,mobile).then(function (doc) {
    return res.send(success(doc));
  }).catch(function (err) {
    return res.send(failure(err));
  });

});

// PUT - 更新操作
router.put('/user/:userId', function (req, res, next) {

  let userId = req.params.userId?req.params.userId.toString():null;
  let name = req.body.name?req.params.name.toString():null ;
  let age = req.body.age?req.body.age:null ;
  let mobile = req.body.mobile?req.body.mobile:null ;

  return user.updateUser(userId,name,age,mobile).then(function (doc) {
      return res.send(success(doc));
  }).catch(function (err) {
      return res.send(failure(err));
  });

});

// GET - 查询 - 单个
router.get('/user/:userId', function (req, res, next) {

  let userId = req.params.userId ;

  return user.queryUser(userId).then(function (doc) {
    return res.send(success(doc));
  }).catch(function (err) {
    return res.send(failure(err));
  });

});

// GET - 查询多个
router.get('/users',function (req, res, next) {

  let pageNo = req.query.pageNo;
  let pageSize = req.query.pageSize;

  return user.queryUsers(pageNo,pageSize).then(function (doc) {
    return res.send(success(doc));
  }).catch(function (err) {
    return res.send(failure(err));
  });

});

module.exports = router;
