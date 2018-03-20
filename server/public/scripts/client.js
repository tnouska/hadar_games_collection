$(document).ready(readyNow);

function readyNow() {
    console.log('document ready');
    $('#submitButton').on('click', submitGame); 
    getAllGames();

}
function getAllGames() {
    $.ajax({
        type: 'GET',
        url: '/game'
    }).done(function(response){
        appendToDom(response); // The response is our gameCollection array
    });
}
function appendToDom(gameCollection) {  
    $('#gameContent').empty();
    for (let game of gameCollection) {
        console.log('GAME:', game);
        let tr = $('<tr></tr>');
        if(game.isClearance) {
            tr.append('<td class="clearance">' + game.name + '</td>');
            tr.append('<td class="clearance">' + game.cost + '</td>');
            tr.append('<td class="clearance">' + game.tax + '</td>');
        } else {
            tr.append('<td>' + game.name + '</td>');
            tr.append('<td>' + game.cost + '</td>');
            tr.append('<td>' + game.tax + '</td>');
        }
        $('#gameContent').append(tr);
        
    }
}


function submitGame() {
    let gameName = $('#gameName').val();
    let cost = $('#cost').val();
    let gameToSend = {name: gameName, cost: cost};
    $.ajax({
        type: 'POST',
        data: gameToSend,
        url: '/game'
    }).done(function(response) {
        //our response from a POST will just be '200' success
        console.log('SUCCESS!'); 
        getAllGames();

    }).fail(function(response) {
        alert('Something went wrong...');
    });
}