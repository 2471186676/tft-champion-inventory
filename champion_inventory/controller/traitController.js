var Trait = require("../models/trait");
var Champion = require("../models/champion");
var async = require("async");
const { body, validationResult, Result } = require("express-validator");
const trait = require("../models/trait");

exports.trait_list = function (req, res, next) {
	async.parallel(
		{
			origin: function (callback) {
				Trait.find({ type: "origin" })
					.populate("champion")
					.exec(callback);
			},
			class: function (callback) {
				Trait.find({ type: "class" })
					.populate("champion")
					.exec(callback);
			},
		},
		function (err, result) {
			if (err) return next(err);
			res.render("traits", {
				title: "Trait",
				origins: result.origin,
				classes: result.class,
				champion: result.champion,
			});
		}
	);
};

exports.add_trait = function (req, res, next) {
	async.parallel(
		{
			trait: function (callback) {
				Trait.find().exec(callback);
			},
			champion: function (callback) {
				Champion.find().exec(callback);
			},
		},
		function (err, result) {
			if (err) return next(err);
			res.render("trait_add", {
				title: "Trait",
				traits: result.trait,
				data: result.champion,
			});
		}
	);
};
