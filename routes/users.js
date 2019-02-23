var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
var dbBase = 'lemon';
var dbColl = 'user';
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//添加用户
router.post('/adduser', function(req, res, next) {
    var name = req.body.name;
    mongodb.insert(dbBase, dbColl, { name: name }, function(result) {
        console.log(result);
        if (result) {
            res.send({ code: 0, message: "插入成功", uid: result.ops[0]._id });
        } else {
            res.send({ code: 1, message: "插入失败" });
        }
    });
});

module.exports = router;