let async = require("async");
let Champion = require("../models/champion");
let Trait = require("../models/trait");
const { body, validationResult } = require("express-validator");
const champion = require("../models/champion");

exports.champion_viewer = function (req, res, next) {
	async.series(
		{
			allChampion: function (callback) {
				Champion.find()
					.sort([["name", "ascending"]])
					.exec(callback);
			},
			selectedChampion: function (callback) {
				champion.find({ _id: req.params.id }).exec(callback);
			},
			trait: function (callback) {
				Trait.find({ champion: req.params.id }).exec(callback);
			},
		},
		function (err, result) {
			if (err) {
				return next(err);
			} else if (result.selectedChampion[0] == null) {
				// cant find champion, redirect
				res.redirect(result.allChampion[0].url);
			} else {
				// Successful, so render
				res.render("champion_select", {
					title: "LoLChess",
					data: result.allChampion,
					champion: result.selectedChampion[0],
					traits: result.trait,
				});
			}
		}
	);
};

exports.add_get = function (req, res, next) {
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
};

exports.add_post = [
	// Convert traits to an array
	(req, res, next) => {
		if (!(req.body.trait instanceof Array)) {
			req.body.trait = new Array(req.body.trait);
		}
		next();
	},
	// Validate and sanitize fields.
	body("set", "Set must not be empty.").trim().isLength({ min: 1 }).escape(),
	body("name", "name must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("cost", "Cost must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("trait.*").escape(),

	// Process request after validation and sanitization.
	(req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		// Create a Book object with escaped/trimmed data and old id.
		var champion = new Champion({
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
					if(err) return next(err);
					res.redirect("/page/champions/");
				});
			});
		}
	},
];

// exports.add_post = function(req, res, next) {
// 	let array = req.body.trait;
// 	let list = [];

// 	Object.keys(array, key=>{
// 		list.push(array[key])
// 	})

// 	res.render("test",{
// 		trait: req.body.trait[1],
// 		name:req.body.name,
// 		cost: req.body.cost,
// 		set: req.body.set
// 	})
// }
