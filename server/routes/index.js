var express = require('express');
var router = express.Router();
var db = require('../mongo/db')

/* get方式拿数据 */
router.get('/', function (request, response, next) {
    db.listFeeds(function (res) {
        console.log(res);
        response.json(res)
    });

});
//put方式塞数据
router.put('/', function (request, response, next) {
    db.insertFeeds(function (res) {
        console.log(res);
        response.json(res)
    });
});

module.exports = router;
