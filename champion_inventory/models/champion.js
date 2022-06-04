var mongoose = require("mongoose");
const trait = require("./trait");

var Schema = mongoose.Schema;

var ChampionSchema = new Schema({
  	_id: {type:String, required: true},
	name: { type: String, required: true },
	cost: { type: Number, required: true },
	trait: [{ type: String, ref: "Trait" }]
});

// Virtual for champion's URL
ChampionSchema.virtual("portraitURL").get(function () {
	return "/images/champions/" + this._id + ".png";
});

ChampionSchema.virtual("bannerURL").get(function() {
	return "/images/banner/" + this._id + ".jpg";
})

ChampionSchema.virtual("url").get(function () {
	return "/page/champion/" + this._id;
});

ChampionSchema.virtual("traitFormatted").get(function() {
	let formatted = [];
	for(let i = 0; i < this.trait.length; i++){
		formatted.push(this.trait[i].split("_")[1].toLowerCase());
	}
	return formatted;
})

//Export model
module.exports = mongoose.model("Champion", ChampionSchema);
