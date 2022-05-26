var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AbilitySchema = new Schema({
	name: { type: String, required: true },
	start_mana: { type: Number, required: true },
	max_mana: { type: Number, required: true },
	description: { typr: String },
});

// Virtual for ability URL
AbilitySchema.virtual("url").get(function () {
	return "/catalog/ability/" + this._id;
});

// Virtual for formatted mana example: 80|120
AbilitySchema.virtual("mana_formatted").get(function () {
	return this.start_mana + "|" + this.max_mana;
});

AbilitySchema.virtual("isCaster").get(function() {
	return max_mana === 0;
});

//Export model
module.exports = mongoose.model("Ability", AbilitySchema);
