const express = require('express');
const app = express();
//if on heroku, use the provided port else || use 4001
const PORT = process.env.PORT || 4001;
const bodyParser = require('body-parser');
const gameRouter = require('./routes/games.router');
const mongoose = require('mongoose');
const databaseUrl = 'mongodb://localhost:27017/hadar'
// const gameCollection = [];//Contains objects {name: 'game name', cost: 0.99}
//configuires bodyParser for jQuery
app.use(bodyParser.urlencoded({extended:true})); 
// MUST BE DONE BEFORE OUR app.post
//Serve static files
app.use(express.static('server/public'));
// send back all the games.
// app.get('/game', (req, res) => {
//     res.send(gameCollection);
// });
// when we want to add a new game.
// app.post('/game', (req, res) => {
//     //console.log(req.body);
//     let gameToAdd = req.body;
//     let gameName = gameToAdd.name;
//     let gameCost = parseFloat(gameToAdd.cost);
//     gameToAdd.name += '!!!';
//     gameToAdd.tax = gameCost * 0.07;
//     gameToAdd.isClearance = isClearance(gameCost);
//     gameCollection.push(gameToAdd);
//     console.log(gameCollection);
//     res.sendStatus(200);
// })
// function isClearance(gameCost) {

//     if (gameCost - Math.floor(gameCost) === 0) {
//         return true;
//     } else {
//         return false;
//     }
// }
app.use('/game', gameRouter);
mongoose.connect(databaseUrl)

mongoose.connection.on('connected', () => {
    console.log('connected to monogo db!!');
    mongoose.connection.on('error', (err) => {
        console.log('error connecting to monodb');

    })
})


//spin up the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
