var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ChampionSchema = new Schema({
  	_id: {type:String, required: true},
	name: { type: String, required: true },
	cost: { type: Number, required: true },
	trait: [{ type: String, ref: "Trait" }]
});

// Virtual for champion's URL
ChampionSchema.virtual("imgURL").get(function () {
	return "/images/champions/" + this._id + ".png";
});

ChampionSchema.virtual("url").get(function () {
	return "/page/champion/" + this._id;
});

//Export model
module.exports = mongoose.model("Champion", ChampionSchema);
