var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TraitSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	description: { type: Number, required: true },
	sets: [{ type: Number }],
});

// Virtual for traits's URL
TraitSchema.virtual("url").get(function () {
	return "/catalog/trait/" + this._id;
});

TraitSchema.virtual("type_options").get(function () {
	return ["class", "origin"];
});

//Export model
module.exports = mongoose.model("Trait", TraitSchema);
