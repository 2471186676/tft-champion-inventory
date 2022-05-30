var Trait = require("../models/trait");
var async = require("async");
const { body, validationResult } = require("express-validator");

exports.trait_list = function (req, res, next) {
	Trait.find().exec(function (err, listOfTrait) {
		if (err) {
			return next(err);
		}
        // fetch success, send array of object
		res.send(listOfTrait);
	});
};
