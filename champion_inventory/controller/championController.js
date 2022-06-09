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
			}
			else if (result.selectedChampion[0] == null) {
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
				title:"Add New Champion",
				data: results.champions,
				trait_options: results.traits,
			});
		}
	);
};
