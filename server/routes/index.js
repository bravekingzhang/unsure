var express = require('express');
var router = express.Router();
var db = require('../mongo/db')

/* GET home page. */
router.get('/', function (request, response, next) {
    db.listFeeds(function (res) {
        console.log(res);
        response.json(res)
    });
    // db.insertFeeds(function (res) {
    //     console.log(res);
    //     response.json(res)
    // });
});

module.exports = router;
