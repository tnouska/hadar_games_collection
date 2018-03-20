let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gameSchema = new Schema({
    name: {type: String},
    cost: {type: Number},
    tax: {type: Number},
    isClearance: {type: Boolean}
});

let Game = mongoose.model('Game', gameSchema)

router.post('/', (req, res) => {
    //console.log(req.body);    
    let gameToAdd = req.body;
    let gameName = gameToAdd.name;
    let gameCost = Number(gameToAdd.cost);
    gameToAdd.name += '!!!';
    gameToAdd.tax = gameCost * 0.07;
    gameToAdd.isClearance = isClearance(gameCost);
    gameObject = new Game(gameToAdd)
    gameObject.save((err, addedGame)=>{
        if (err) {
            console.log('mongodb error: ', err);
            res.sendStatus(500);
        } else {
            console.log('Saved game: ', addedGame);
            res.sendStatus(201);
        }
    })
    // gameCollection.push(gameToAdd);
    // console.log(gameCollection);
    // res.sendStatus(200);
})
router.get('/', (req, res) => {
    console.log('GET games.');
    Game.find({},(err, foundGames)=>{
        if (err) {
            console.log('mongodb error: ',err);
            res.sendStatus(500)
        }else{
            res.send(foundGames)
        }
    })
    // res.send();
});



function isClearance(gameCost) {

    if (gameCost - Math.floor(gameCost) === 0) {
        return true;
    } else {
        return false;
    }
}
module.exports = router;