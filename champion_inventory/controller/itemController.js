let async = require("async");
let Item = require("../models/item");

exports.item_viewer = function (req, res, next) {
	async.series(
		{
			item: function (callback) {
				Item.find().exec(callback);
			},
		},
		function (err, result) {
			if (err) return next(err);
			else {
				res.render("items", {
					title: "Items",
					item: result.item 
				});
			}
		}
	);
};
