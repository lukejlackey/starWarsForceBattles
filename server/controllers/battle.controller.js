const Battle = require('../models/battle.model')

module.exports.findOneBattle = (req, res) => {
    Battle.findOne({ name: req.body.battle })
        .then(oneBattle => res.json({ battle: oneBattle }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.recordBattle = (req, res) => {
    const winner = req.body.winner;
    const loser = req.body.loser
    const opponentsArray = [{ name: winner }, { name: loser }]
    Battle.exists({ "opponents.name": { $all: [winner, loser] } })
        .then(battleExists => {
            if (!battleExists) return Battle.create({ opponents: opponentsArray });
            return battleExists;
        })
        .then(() => {
            Battle.findOneAndUpdate({ "opponents.name": { $all: [winner, loser] } }, { $inc: { "opponents.$[w].wins": 1 } }, { arrayFilters: [{ "w.name": winner }] })
                .then(updatedBattle => res.json({ result: updatedBattle }))
                .catch(err => res.json({ message: "Something went wrong", error: err }));
        })
        .catch(err => res.json(err));
};