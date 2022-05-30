let async = require("async");
let Champion = require("../models/champion");
let Trait = require("../models/trait");
const { body, validationResult } = require("express-validator");
const champion = require("../models/champion");

exports.champion_list = function (req, res, next) {
	Champion.find()
		.exec(function (err, result) {
			if (err) {
				return next(err);
			}
			// Successful, so render
			res.render("index", {
				title: "Genre List",
				data: result
			});
		});
};
