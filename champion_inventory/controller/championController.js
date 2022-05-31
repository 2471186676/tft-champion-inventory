let async = require("async");
let Champion = require("../models/champion");
let Trait = require("../models/trait");
const { body, validationResult } = require("express-validator");
const champion = require("../models/champion");

exports.champion_viewer = function (req, res, next) {
	Champion.find()
		.sort([["name", "ascending"]])
		.exec(function (err, result) {
			if (err) {
				return next(err);
			}
			// Successful, so render
			res.render("champion_select", {
				title: "LolChess.gg",
				data: result
			});
		});
};

exports.champion_list = function (req, res, next) {
	Champion.find()
		.exec(function (err, result) {
			if (err) {
				return next(err);
			}
			// Successful, so render
			res.render("index", {
				title: "LolChess.gg",
				data: result
			});
		});
};
