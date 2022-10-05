const mongoose = require("mongoose");

const BattleSchema = new mongoose.Schema({
    opponents: [
        { name: String, wins: Number }
    ]
}, { timestamps: true });

const Battle = mongoose.model("Battle", BattleSchema);

module.exports = Battle;