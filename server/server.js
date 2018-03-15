let express = require('express');
let app = express();
const PORT = 4001;
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
    gameCollection.push(gameToAdd);
    console.log(gameCollection);
    res.sendStatus(200);
})

//spin up the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});