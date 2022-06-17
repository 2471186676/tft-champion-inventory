var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	_id: { type: Number, required: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
	type: {
		isUnique: { type: Boolean, required: false},
		isElusive: { type: Boolean, required: false },
		isArtifact: { type: Boolean, required: false },
	},
});

// Virtual for traits's URL
ItemSchema.virtual("url").get(function () {
	return "/catalog/trait/" + this._id;
});

//Export model
module.exports = mongoose.model("Item", ItemSchema);
