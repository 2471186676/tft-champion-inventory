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

exports.add_get = function (req, res, next) {
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

exports.add_post = [
	(req, res, next) => {
		if (!(req.body.champion instanceof Array)) {
			req.body.champion = new Array(req.body.champion);
		}
		next();
	},
	body("set", "Set must not be empty.").trim().isLength({ min: 1 }).escape(),
	body("name", "name must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("type", "Type must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("description", "Description must not be empty.").trim().escape(),
	body("champion.*").escape(),

	// Process request after validation and sanitization.
	(req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		// Create a Book object with escaped/trimmed data and old id.
		var trait = new Champion({
			_id: "TFT" + req.body.set + "_" + req.body.name,
			name: req.body.name,
			cost: req.body.cost,
			trait: req.body.trait,
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.

			// Get all authors and genres for form.
			async.series(
				{
					champions: function (callback) {
						Champion.find()
							.sort([["name", "ascending"]])
							.exec(callback);
					},
					traits: function (callback) {
						Trait.find().exec(callback);
					},
				},
				function (err, results) {
					if (err) return next(err);

					res.render("champion_add", {
						title: "Add New Champion",
						data: results.champions,
						trait_options: results.traits,
					});
				}
			);
			return;
		} else {
			// Save Champion
			champion.save(function (err) {
				if (err) {
					return next(err);
				}
			});

			// for updating trait champion list
			const list = req.body.trait;
			const opts = { new: true, upsert: true };
			const id = "TFT" + req.body.set + "_" + req.body.name;

			Trait.findOne({ _id: list[0] }, function (err, result) {
				let array = [];
				for (let i = 0; i < result.champion.length; i++) {
					array.push(result.champion[i]);
				}
				array.push(id);

				let asyncArray = [];

				for (let i = 0; i < list.length; i++) {
					let func = function (callback) {
						Trait.findByIdAndUpdate(
							{ _id: list[i] },
							{ champion: array },
							opts,
							callback
						);
					};
					asyncArray.push(func);
				}

				async.series(asyncArray, function (err, result) {
					if (err) return next(err);
					res.redirect("/page/champions/");
				});
			});
		}
	},
];
