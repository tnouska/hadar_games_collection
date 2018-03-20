let express = require('express');
let app = express();
//if on heroku, use the provided port else || use 4001
const PORT = process.env.PORT || 4001;
let bodyParser = require('body-parser');
const gameCollection = [];//Contains objects {name: 'game name', cost: 0.99}
//configuires bodyParser for jQuery
app.use(bodyParser.urlencoded({extended:true})); 
// MUST BE DONE BEFORE OUR app.post
//Serve static files
app.use(express.static('server/public'));
// send back all the games.
app.get('/game', (req, res) => {
    res.send(gameCollection);
});
// when we want to add a new game.
app.post('/game', (req, res) => {
    //console.log(req.body);
    let gameToAdd = req.body;
    let gameName = gameToAdd.name;
    let gameCost = parseFloat(gameToAdd.cost);
    gameToAdd.name += '!!!';
    gameToAdd.tax = gameCost * 0.07;
    gameToAdd.isClearance = isClearance(gameCost);
    gameCollection.push(gameToAdd);
    console.log(gameCollection);
    res.sendStatus(200);
})
function isClearance(gameCost) {

    if (gameCost - Math.floor(gameCost) === 0) {
        return true;
    } else {
        return false;
    }
}

//spin up the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
