var mongodb = require('mongodb-curd');
var dbBase = 'lemon';
var dbuserColl = 'user';
var dbClass = 'classify';
var dbbillColl = 'billlist';

//添加账单
var addBill = function(req, res, next) {
    var params = req.body,
        type = params.type,
        money = params.money,
        iname = params.iname,
        cname = params.cname,
        uid = params.uid,
        time = params.time,
        cid = params.cid;
    if (!type || !money || !iname) {
        res.send({ code: 2, message: "请完善信息" });
    } else {
        getIsUser();
    }

    function getIsUser() {
        mongodb.find(dbBase, dbuserColl, { _id: uid }, function(result) {
            if (result.length > 0) {
                getIsClass();
            } else {
                res.send({ code: 3, message: "请先注册登录账户" });
            }
        });
    }

    function getIsClass() {
        mongodb.find(dbBase, dbClass, { _id: cid }, function(result) {
            if (result.length > 0) {
                addbill();
            } else {
                res.send({ code: 3, message: "没有该分类" });
            }
        });
    }

    function addbill() {
        mongodb.insert(dbBase, dbbillColl, params, function(result) {
            if (result) {
                res.send({ code: 0, message: "插入成功" });
            } else {
                res.send({ code: 1, message: "插入失败" });
            }
        });
    }


}

module.exports = {
    addBill: addBill
};