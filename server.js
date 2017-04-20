
var port    = 80;

var io      = require('socket.io');
var express = require('express');
var UUID    = require('node-uuid');
var http    = require('http');

require("./site/cards.js");

var verbose = false;
var epr     = express();

var app = http.createServer(epr);

app.listen( port );

console.log('\t :: Express :: Listening on port ' + port );


epr.get( '/', function( req, res ){ 
    res.sendfile( __dirname + '/site/index.html' );
});


epr.get( '/*' , function( req, res, next ) {
    var file = req.params[0]; 
    res.sendfile( __dirname + '/site/' + file );
});


var sio = io.listen(app);

sio.configure(function (){

    sio.set('log level', 0);

    sio.set('authorization', function (handshakeData, callback) {
      callback(null, true);
    });

});

function shuffle(array) {
    //Fisher-Yates Shuffle, gratz to stack overflow 🙏
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

var whoseTurn = 0;

var Player = function(id, conn, deck, name){
    this.deck = deck;
    this.hand = [];
    this.score = 0;
    this.cornCounter = 0;
    this.charge = 0;
    this.card = null;
    this.nextCard = null;
    this.lastCard = null;
    this.uuid = id;
    this.hasPlayed = false;
    this.connection = conn;
    this.name = name;
};

Player.prototype.drawCard = function(p1, p2){
    if(this.deck.length > 0){
        if(this.nextCard == null){
            if(this.deck.length > 0){
                var _card = this.deck.pop();
            }
        } else {
            var _card = this.deck.splice(this.nextCard, 1)[0];
            this.nextCard = null;
        }

        if(_card.hasOwnProperty("drawEffect")){
            _card.drawEffect(_card, p1, p2);
        }
        if(_card.hasOwnProperty("globalEffect")){
            _card.globalEffect(_card, p1, p2);
        }
        this.hand.push(_card);
    }
};

Player.prototype.playCard = function(id, p1, p2){
    this.lastCard = clone(this.card);
    this.card = this.hand.splice(id, 1)[0];
};

Player.prototype.updateHand = function(p1, p2, delay){
    for(var i = 0; i < this.hand.length; i++){
        if(this.hand[i].hasOwnProperty("globalEffect")){
            this.hand[i].globalEffect(this.hand[i], p1, p2);
        }
    }

    this.connection.emit("hand", {hand: this.hand, delay: delay, charge: [p1.charge, p2.charge], handsize: [p1.hand.length, p2.hand.length]});
};


Player.prototype.updateAllCards = function(p1, p2){
    for(var i = 0; i < this.hand.length; i++){
        if(this.hand[i].hasOwnProperty("globalEffect")){
            this.hand[i].globalEffect(this.hand[i], p1, p2);
        }
    }
    for(var i = 0; i < this.deck.length; i++){
        if(this.deck[i].hasOwnProperty("globalEffect")){
            this.deck[i].globalEffect(this.deck[i], p1, p2);
        }
    }
    if(this.card.hasOwnProperty("globalEffect")){
        this.card.globalEffect(this.card, p1, p2);
    }
}

function deckIsValid(deck){
    var num = {};
    var total = 0;

    for(var item in deck){
        if(cards.hasOwnProperty(deck[item])){
            if(num.hasOwnProperty(deck[item])){
                num[deck[item]] += 1;
            }else{
                num[deck[item]] = 1;
            }
            total += 1;
        }
    }

    if(total != 20 || deck.length != 20){
        return false;
    }

    for(var item in num){
        if(num[item] > 3){
            return false;
        }
    }

    return true;
}

var Game = function(publicity, gameId){
    this.players = [];
    this.complete = 0;
    this.clients  = 0;
    this.whoseTurn = 0;
    this.public = publicity;
    this.id = gameId;
};

Game.prototype.startGame = function(){
    this.whoseTurn = Math.floor(Math.random() * 2);

    this.players[0].connection.emit("clear status");
    this.players[1].connection.emit("clear status");

    this.players[0].connection.emit("game start");
    this.players[1].connection.emit("game start");

    this.players[this.whoseTurn].connection.emit("turn", {bool: true});
    this.players[(this.whoseTurn + 1) % 2].connection.emit("turn", {bool: false});

    shuffle(this.players[0].deck);
    shuffle(this.players[1].deck);

    this.players[0].drawCard(this.players[0], this.players[1]);
    this.players[0].drawCard(this.players[0], this.players[1]);
    this.players[0].drawCard(this.players[0], this.players[1]);

    this.players[1].drawCard(this.players[1], this.players[0]);
    this.players[1].drawCard(this.players[1], this.players[0]);
    this.players[1].drawCard(this.players[1], this.players[0]);

    for(var i = 0; i < 2; i++){
        for(var j = 0; j < this.players[i].hand.length; j++){
            if(this.players[i].hand[j].hasOwnProperty("startTurnInHandEffect")){
                this.players[i].hand[j].startTurnInHandEffect(this.players[i].hand[j], this.players[i], this.players[(i + 1) % 2]);
            }
        }
    }

    this.players[0].updateHand(this.players[0], this.players[1], 0);
    this.players[1].updateHand(this.players[1], this.players[0], 0);

    this.players[0].connection.emit("chat", {message: "You're playing against "+this.players[1].name+".", name: "server"});
    this.players[1].connection.emit("chat", {message: "You're playing against "+this.players[0].name+".", name: "server"});
}

Game.prototype.takeTurn = function(){

    this.players[0].connection.emit("clear status");
    this.players[1].connection.emit("clear status");

    var attacker = this.players[this.whoseTurn];
    var defender = this.players[(this.whoseTurn + 1) % 2];

    attacker.updateAllCards(attacker, defender);
    defender.updateAllCards(defender, attacker);

    if(!attacker.card.silenced && attacker.card.hasOwnProperty("priorityEffect")){
        attacker.card.priorityEffect(attacker.card, attacker, defender);
    }
    if(!defender.card.silenced && defender.card.hasOwnProperty("priorityEffect")){
        defender.card.priorityEffect(defender.card, defender, attacker);
    }

    if(!attacker.card.silenced && attacker.card.hasOwnProperty("battleEffect")){
        attacker.card.battleEffect(attacker.card, attacker, defender);
    }
    if(!defender.card.silenced && defender.card.hasOwnProperty("battleEffect")){
        defender.card.battleEffect(defender.card, defender, attacker);
    }

    attacker.updateAllCards(attacker, defender);
    defender.updateAllCards(defender, attacker);

    if(attacker.card.attack + attacker.card.buffa > defender.card.defense + defender.card.buffd){
        attacker.score += 1;

        if(!attacker.card.silenced && attacker.card.hasOwnProperty("successfulAttackEffect")){
            attacker.card.successfulAttackEffect(attacker.card, attacker, defender);
        }
        if(!defender.card.silenced && defender.card.hasOwnProperty("failedDefenseEffect")){
            defender.card.failedDefenseEffect(defender.card, defender, attacker);
        }
    }else{
        this.whoseTurn = (this.whoseTurn + 1) % 2;

        if(!attacker.card.silenced && attacker.card.hasOwnProperty("failedAttackEffect")){
            attacker.card.failedAttackEffect(attacker.card, attacker, defender);
        }
        if(!defender.card.silenced && defender.card.hasOwnProperty("successfulDefenseEffect")){
            defender.card.successfulDefenseEffect(defender.card, defender, attacker);
        }
    }

    this.players[0].connection.emit("battle", {yours: this.players[0].card, theirs: this.players[1].card});
    this.players[1].connection.emit("battle", {yours: this.players[1].card, theirs: this.players[0].card});

    this.players[0].connection.emit("score", {you: this.players[0].score, them: this.players[1].score});
    this.players[1].connection.emit("score", {you: this.players[1].score, them: this.players[0].score});

    this.players[0].updateHand(this.players[0], this.players[1], 0);
    this.players[1].updateHand(this.players[1], this.players[0], 0);

    this.players[this.whoseTurn].connection.emit("turn", {bool: true});
    this.players[(this.whoseTurn + 1) % 2].connection.emit("turn", {bool: false});

    if(this.players[0].deck.length == 0 && this.players[0].hand.length == 0){

        if(this.players[0].score > this.players[1].score){
            this.players[0].connection.emit("game over", {message: "You won!"})
            this.players[1].connection.emit("game over", {message: "You lost."})
        }else if(this.players[1].score > this.players[0].score){
            this.players[0].connection.emit("game over", {message: "You lost."})
            this.players[1].connection.emit("game over", {message: "You won!"})
        }else{
            this.players[0].connection.emit("game over", {message: "Tie game."})
            this.players[1].connection.emit("game over", {message: "Tie game."})
        }
    }else{

        this.players[0].drawCard(this.players[0], this.players[1]);
        this.players[1].drawCard(this.players[1], this.players[0]);

        for(var i = 0; i < 2; i++){
            for(var j = 0; j < this.players[i].hand.length; j++){
                if(this.players[i].hand[j].hasOwnProperty("startTurnInHandEffect")){
                    this.players[i].hand[j].startTurnInHandEffect(this.players[i].hand[j], this.players[i], this.players[(i + 1) % 2]);
                }

                if(this.players[i].hand[j].cursed == true){
                    this.players[i].hand[j].buffa -= 1;
                    this.players[i].hand[j].buffd -= 1;
                }
            }
        }

        this.players[0].updateHand(this.players[0], this.players[1], 2500);
        this.players[1].updateHand(this.players[1], this.players[0], 2500);

        this.complete = 0;

        this.players[0].hasPlayed = false;
        this.players[1].hasPlayed = false;
    }

    this.players[0].connection.emit("can click");
    this.players[1].connection.emit("can click");
}

var games = [];

sio.sockets.on('connection', function (client) {

    client.userid = UUID();
    client.name   = "anonymous";

    console.log('\t socket.io:: player ' + client.userid + ' connected');
    
    client.on('disconnect', function () {
        console.log('\t socket.io:: client disconnected ' + client.userid );

        search:
        for(var i = 0; i < games.length; i++){
            for(var j = 0; j < games[i].players.length; j++){
                try{
                    if(games[i].players[j].uuid == client.userid){
                        if(games[i].clients == 2){
                            games[i].players[(j + 1) % 2].connection.emit("disconnected");
                            games[i].clients += 1;
                        }else{
                            games.splice(i,1);
                            break search;
                        }
                    }
                }catch(e){
                   console.log("Error accessing players list: ",e)
                }
            }
        }
    });

    client.on('quit', function(){
        search:
        for(var i = 0; i < games.length; i++){
            for(var j = 0; j < games[i].players.length; j++){
                try{
                    if(games[i].players[j].uuid == client.userid){
                        if(games[i].clients == 2){
                            games[i].players[(j + 1) % 2].connection.emit("disconnected");
                            games[i].clients += 1;
                        }else{
                            games.splice(i,1);
                            break search;
                        }
                    }
                }catch(e){
                    console.log("Error accessing players list: ",e)
                }
            }
        }
    });

    client.on('play', function(data){
        if(typeof(data) !== 'undefined' && data.hasOwnProperty("number")){
            search:
            for(var i = 0; i < games.length; i++){
                for(var j = 0; j < games[i].players.length; j++){
                    try{
                        if(games[i].players[j].uuid == client.userid && !games[i].players[j].hasPlayed){
                            if(data.number < games[i].players[j].hand.length){
                                games[i].players[j].playCard(data.number, games[i].players[j], games[i].players[(j + 1) % 2]);
                                games[i].players[j].hasPlayed = true;
                                games[i].complete += 1;
                                if(games[i].players[0].hasPlayed && games[i].players[1].hasPlayed){
                                    games[i].takeTurn();
                                }
                            }
                            break search;
                        }
                    }catch(e){
                        console.log("Error accessing players list: ",e)
                    }
                }
            }
        }
    });

    client.on('set name', function(data){
        if(typeof(data) !== 'undefined' && data.hasOwnProperty("name")){
            if(data.name.length > 0 && data.name.length < 13){
                client.name = data.name;
            }
        }
    });

    client.on('chat', function(data){
        if(typeof(data) !== 'undefined' && data.hasOwnProperty("message") && data.message.length < 101){
            search:
            for(var i = 0; i < games.length; i++){
                for(var j = 0; j < games[i].players.length; j++){
                    try{
                        if(games[i].players[j].uuid == client.userid){
                            games[i].players[(j + 1) % 2].connection.emit('chat', {message: data.message, name: games[i].players[j].name});
                            break search;
                        }
                    }catch(e){
                        console.log("Error accessing players list: ",e)
                    }
                }
            }
        }
    });

    client.on('quick match', function(data){
        if(typeof(data) !== 'undefined' && data.hasOwnProperty("deck")){
            if(deckIsValid(data.deck)){
                var matched = false;

                var deck = [];

                for(var card in data.deck){
                    var newCard = clone(cards[data.deck[card]]);
                    newCard.id = data.deck[card];
                    deck.push(newCard);
                }

                for(var i = 0; i < games.length; i++){
                    try{
                        if(games[i].public && games[i].clients == 1){
                            games[i].players.push(new Player(client.userid, client, deck, client.name));
                            games[i].clients += 1;
                            matched = true;
                            games[i].startGame();
                        }
                    }catch(e){
                        console.log("Error accessing games list: ",e)
                    }
                }

                if(!matched){
                    games.push(new Game(true, null));
                    games[games.length - 1].players.push(new Player(client.userid, client, deck, client.name));
                    games[games.length - 1].clients += 1;
                }
            } else {
                client.emit("join failed", {reason: "not a valid deck."});
            }
        }
    });

    client.on('friend game', function(data){
        if(typeof(data) !== 'undefined' && data.hasOwnProperty("deck")){
            if(deckIsValid(data.deck)){
                var matched = false;

                var deck = [];

                for(var card in data.deck){
                    var newCard = clone(cards[data.deck[card]]);
                    newCard.id = data.deck[card];
                    deck.push(newCard);
                }

                if(data.hasOwnProperty("id")){
                    for(var i = 0; i < games.length; i++){
                        try{
                            if(!games[i].public && games[i].id == data.id){
                                if(games[i].clients == 1){
                                    games[i].players.push(new Player(client.userid, client, deck, client.name));
                                    games[i].players[0].connection.emit("friend joined");
                                    games[i].clients += 1;
                                    games[i].startGame();
                                }else{
                                    client.emit("join failed", {reason: "too many players."});
                                }

                                matched = true;
                                break;
                            }
                        }catch(e){
                            console.log("Error accessing players list: ",e)
                        }
                    }
                }else{
                    try{
                        var gameId = Date.now().toString(36);
                        games.push(new Game(false, gameId));
                        games[games.length - 1].players.push(new Player(client.userid, client, deck, client.name));
                        games[games.length - 1].clients += 1;
                        client.emit("game id", {id: gameId});
                        matched = true;
                        console.log(gameId);
                    }catch(e){
                        console.log("Error accessing players list: ",e)
                    }
                }

                if(!matched){
                    client.emit("join failed", {reason: "no game with that id."});
                }
            } else {
                client.emit("join failed", {reason: "not a valid deck."});
            }
        }
    });
});