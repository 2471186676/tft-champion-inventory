var express = require("express");
var router = express.Router();
var async = require("async");
var championController = require("../controller/championController");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.redirect('/page/champion');
});

module.exports = router;
