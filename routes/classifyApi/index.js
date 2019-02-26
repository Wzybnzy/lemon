var mongodb = require('mongodb-curd');
var dbBase = 'lemon';
var dbColl = 'iconlist';
var dbClassify = 'classify';

var iconlist = function(req, res, next) {
    mongodb.find(dbBase, dbColl, {}, function(result) {
        if (result.length > 0) {
            res.send({ code: 0, data: result });
        } else {
            res.send({ code: 1, message: "查找图标失败" });
        }
    });
}

//添加分类
var addClassify = function(req, res, next) {
    var params = req.body,
        iname = params.iname, //图标名称
        cname = params.cname, //分类的名称
        type = params.type, //分类的类型
        uid = params.uid; //用户的id

    if (!iname && !cname && !type && !uid) {
        res.send({ code: 2, message: "缺少参数" });
    } else { //当前分类是都存在
        getIsHas();
    }

    function getIsHas() {
        mongodb.find(dbBase, dbClassify, { cname: cname, type: type, uid: { $in: ["*", uid] } }, function(result) {
            if (result.length > 0) {
                res.send({ code: 3, message: "该分类已经存在" });
            } else {
                addClass();
            }
        });
    }

    function addClass() {
        mongodb.insert(dbBase, dbClassify, params, function(result) {
            if (result) {
                res.send({ code: 0, message: "插入分类成功" });
            } else {
                res.send({ code: 1, message: "插入分类失败" });
            }
        });
    }


}

//获取分类
var getClassify = function(req, res, next) {
    var params = req.query,
        type = params.type ? [params.type] : ["1", "2"],
        uid = params.id;
    console.log(uid);
    mongodb.find(dbBase, dbClassify, { type: { $in: type }, uid: { $in: ["*", uid] } }, function(result) {
        if (result.length > 0) {
            res.send({ code: 0, data: result });
        } else {
            res.send({ code: 1, message: "查找分类失败" });
        }

    });
}
module.exports = {
    iconlist: iconlist,
    addClassify: addClassify,
    getClassify: getClassify
}