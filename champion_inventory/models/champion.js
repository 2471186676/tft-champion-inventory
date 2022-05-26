var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ChampionSchema = new Schema({
	name: { type: String, required: true },
	cost: { required: true },
	health: [{ type: Array, required: true }],
	armor: { required: true },
	magic_resistence: { required: true },
	attack: [{ type: Array, required: true }],
	range: { type: Number, required: true },
	ability: [{ type: Schema.type.ObjectId, ref: "Ability" }],
	trait: [{ type: Schema.type.ObjectId, ref: "Trait" }],
});

// Virtual for champion's URL
ChampionSchema.virtual("url").get(function () {
	return "/catalog/champion/" + this._id;
});

//Export model
module.exports = mongoose.model("Champion", ChampionSchema);
