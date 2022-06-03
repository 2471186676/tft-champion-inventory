var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TraitSchema = new Schema({
	_id: { type: String, required: true},
	name: { type: String, required: true },
	type: { type: String, required: true, enum: ["class", "origin"] },
	description: { type: String, required: true },
	sets: [
		{
			style: { type: String, enum: ["bronze", "silver", "gold", "chromatic"]},
			min: { type: Number },
			max: { type: Number },
		},
	],
	champion: [{ type: String, ref: "Champion", unique:true }],
});

// Virtual for traits's URL
TraitSchema.virtual("url").get(function () {
	return "/catalog/trait/" + this._id;
});

TraitSchema.virtual("type_options").get(function () {
	return ["class", "origin"];
});

TraitSchema.virtual("svgURL").get(function () {
	return "/images/traits/"+this.name.toLowerCase()+".svg"
});

//Export model
module.exports = mongoose.model("Trait", TraitSchema);
