var express = require('express');
var router = express.Router();
var ClassifyApi = require('./classifyApi/index.js');
console.log(ClassifyApi);
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//查询图标
router.get('/iconlist', ClassifyApi.iconlist);


//添加分类
router.post('/addClassify', ClassifyApi.addClassify);
//获取分类
router.get('/getClassify', ClassifyApi.getClassify);
module.exports = router;