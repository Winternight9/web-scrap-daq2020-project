var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('compare_rate', { title: 'Express' });
});

module.exports = router;
