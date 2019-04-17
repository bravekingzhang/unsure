var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let book = {
    'bookid':243243242,
    'bookName':'just in java'
  }
  res.json(book);
});

module.exports = router;
