const BattleController = require("../controllers/battle.controller");

module.exports = app => {
    app.get("/api/battle/:id", BattleController.findOneBattle);
    app.post("/api/battle/new", BattleController.recordBattle);
};