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
            params.time = new Date(params.time);
            mongodb.insert(dbBase, dbbillColl, params, function(result) {
                if (result) {
                    res.send({ code: 0, message: "插入成功" });
                } else {
                    res.send({ code: 1, message: "插入失败" });
                }
            });
        }


    }
    //查询账单

// 年 + 分类
// 月 + 分类
var getBill = function(req, res, next) {
    var params = req.query,
        uid = params.uid,

        time = params.time; //2019 2019-02
    if (time.indexOf('-') != -1) { //月  2019-12   2020-01
        var timeArr = time.split('-'); // [2019,02]
        if (timeArr[1] == '12') {
            maxTime = (timeArr[0] * 1 + 1) + '-01';
        } else {
            maxTime = timeArr[0] + '-' + (timeArr[1] * 1 + 1);
        }
    } else { //年
        maxTime = time * 1 + 1 + '';
    }
    console.log(maxTime);

    mongodb.find(dbBase, dbbillColl, { uid: uid, time: { $lt: new Date(maxTime), $gte: new Date(time) } }, function(result) {
        console.log(result);
        if (result.length > 0) {
            res.send({ code: 0, data: result });
        } else {
            res.send({ code: 1, message: "没有查询到账单" });
        }
    });
}

module.exports = {
    addBill: addBill,
    getBill: getBill
};