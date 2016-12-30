
var port    = 80;

var io      = require('socket.io');
var express = require('express');
var UUID    = require('node-uuid');
var http    = require('http');

var verbose = false;
var epr     = express();

var app = http.createServer(epr);

app.listen( port );

console.log('\t :: Express :: Listening on port ' + port );


epr.get( '/', function( req, res ){ 
    res.sendfile( __dirname + '/index.html' );
});


epr.get( '/*' , function( req, res, next ) {
    var file = req.params[0]; 
    res.sendfile( __dirname + '/' + file );
});


var sio = io.listen(app);

sio.configure(function (){

    sio.set('log level', 0);

    sio.set('authorization', function (handshakeData, callback) {
      callback(null, true);
    });

});

var whoseTurn = 0;

var Player = function(id, conn){
    this.deck = [];
    this.hand = [];
    this.score = 0;
    this.cornCounter = 0;
    this.card = null;
    this.uuid = id;
    this.hasPlayed = false;
    this.connection = conn;
};

Player.prototype.drawCard = function(p1, p2){
    if(this.deck.length > 0){
        var _card = this.deck.pop();
        if(_card.hasOwnProperty("drawEffect")){
            _card.drawEffect(_card, p1, p2);
        }
        this.hand.push(_card);
    }
};

Player.prototype.playCard = function(id, p1, p2){
    this.card = this.hand.splice(id, 1)[0];
};

Player.prototype.updateHand = function(p1, p2){
    for(var i = 0; i < this.hand.length; i++){
        if(this.hand[i].hasOwnProperty("globalEffect")){
            this.hand[i].globalEffect(this.hand[i], p1, p2);
        }
    }

    this.connection.emit("hand", {hand: this.hand});
};

var Game = function(){
    this.players = [];
    this.complete = 0;
    this.clients  = 0;
    this.whoseTurn = 0;
};

Game.prototype.startGame = function(){
    this.whoseTurn = Math.floor(Math.random() * 2);

    this.players[0].connection.emit("clear status");
    this.players[1].connection.emit("clear status");

    this.players[this.whoseTurn].connection.emit("turn", {bool: true});
    this.players[(this.whoseTurn + 1) % 2].connection.emit("turn", {bool: false});

    var library = [];

    library.push(cards["dingle"]);
    library.push(cards["mantis"]);
    library.push(cards["sweater"]);
    library.push(cards["corn"]);
    library.push(cards["shower"]);
    library.push(cards["smug"]);

    for(var i = 0; i < 20; i++){
        this.players[0].deck.push(clone(library[i % library.length]));
    }
    for(var i = 0; i < 20; i++){
        this.players[1].deck.push(clone(library[i % library.length]));
    }

    shuffle(this.players[0].deck);
    shuffle(this.players[1].deck);

    this.players[0].drawCard(this.players[0], this.players[1]);
    this.players[0].drawCard(this.players[0], this.players[1]);
    this.players[0].drawCard(this.players[0], this.players[1]);

    this.players[1].drawCard(this.players[1], this.players[0]);
    this.players[1].drawCard(this.players[1], this.players[0]);
    this.players[1].drawCard(this.players[1], this.players[0]);

    this.players[0].updateHand(this.players[0], this.players[1]);
    this.players[1].updateHand(this.players[1], this.players[0]);
}

Game.prototype.takeTurn = function(){

    this.players[0].connection.emit("clear status");
    this.players[1].connection.emit("clear status");

    var attacker = this.players[this.whoseTurn];
    var defender = this.players[(this.whoseTurn + 1) % 2];

    if(attacker.card.hasOwnProperty("globalEffect")){
        attacker.card.globalEffect(attacker.card, attacker, defender);
    }
    if(defender.card.hasOwnProperty("globalEffect")){
        defender.card.globalEffect(defender.card, defender, attacker);
    }
    if(attacker.card.hasOwnProperty("battleEffect")){
        attacker.card.battleEffect(attacker.card, attacker, defender);
    }
    if(defender.card.hasOwnProperty("battleEffect")){
        defender.card.battleEffect(defender.card, defender, attacker);
    }
    if(attacker.card.hasOwnProperty("globalEffect")){
        attacker.card.globalEffect(attacker.card, attacker, defender);
    }
    if(defender.card.hasOwnProperty("globalEffect")){
        defender.card.globalEffect(defender.card, defender, attacker);
    }

    if(attacker.card.attack > defender.card.defense){
        attacker.score += 1;
    }else{
        this.whoseTurn = (this.whoseTurn + 1) % 2;
    }

    this.players[0].connection.emit("battle", {yours: this.players[0].card, theirs: this.players[1].card});
    this.players[1].connection.emit("battle", {yours: this.players[1].card, theirs: this.players[0].card});

    this.players[0].connection.emit("score", {you: this.players[0].score, them: this.players[1].score});
    this.players[1].connection.emit("score", {you: this.players[1].score, them: this.players[0].score});

    this.players[0].updateHand(this.players[0], this.players[1]);
    this.players[1].updateHand(this.players[1], this.players[0]);

    this.players[this.whoseTurn].connection.emit("turn", {bool: true});
    this.players[(this.whoseTurn + 1) % 2].connection.emit("turn", {bool: false});

    this.players[0].drawCard(this.players[0], this.players[1]);
    this.players[1].drawCard(this.players[1], this.players[0]);

    this.players[0].updateHand(this.players[0], this.players[1]);
    this.players[1].updateHand(this.players[1], this.players[0]);

    this.complete = 0;

    this.players[0].hasPlayed = false;
    this.players[1].hasPlayed = false;

    this.players[0].connection.emit("can click");
    this.players[1].connection.emit("can click");
}

var games = [];

cards = {
    "dingle": {
        title: "Dingle, the Sticky",
        image: "dingle.png",
        text: "<i>Something smells!</i>",
        attack: 4,
        defense: 3,
    },
    "mantis": {
        title: "Mantis Man",
        image: "manti.png",
        text: "<i>Buzzzzz</i>",
        attack: 7,
        defense: 0,
    },
    "sweater": {
        title: "Comfy Sweater",
        image: "sweater.png",
        text: "<i>It's almost too warm.</i>",
        attack: 0,
        defense: 7,
    },
    "corn": {
        title: "Sweet Corn",
        image: "corn.png",
        text: "When you play it, it gets +1/+1 for every corn you've played so far.",
        attack: 2,
        defense: 2,
        globalEffect: function(obj, p1, p2){obj.text = "When you play it, it gets +1/+1 for every corn you've played so far. ("+p1.cornCounter+")";},
        battleEffect: function(obj, p1, p2){p1.cornCounter += 1; obj.attack += p1.cornCounter; obj.defense += p1.cornCounter;}
    },
    "shower": {
        title: "Power Shower",
        image: "shower.png",
        text: "Gives all cards in your hand +5/+5 when you play it.",
        attack: 1,
        defense: 1,
        battleEffect: function(obj, p1, p2){for(var i = 0; i < p1.hand.length; i++){p1.hand[i].attack += 5; p1.hand[i].defense += 5;}}
    },
    "smug": {
        title: "Smug Fucker",
        image: "smug.png",
        text: "When you play him, draw a card.<br /><i>Nobody likes a know it all.</i>",
        attack: 0,
        defense: 3,
        battleEffect: function(obj, p1, p2){p1.drawCard();}
    }
};

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

sio.sockets.on('connection', function (client) {
    var matched = false;

    client.userid = UUID();

    //client.emit('onconnected', { id: client.userid } );

    console.log('\t socket.io:: player ' + client.userid + ' connected');
    
    client.on('disconnect', function () {
        console.log('\t socket.io:: client disconnected ' + client.userid );

        search:
        for(var i = 0; i < games.length; i++){
            for(var j = 0; j < 2; j++){
                if(games[i].players[j].uuid == client.userid){
                    if(games[i].clients == 2){
                        games[i].players[(j + 1) % 2].connection.emit("disconnected");
                        games[i].clients += 1;
                    }else{
                        games.splice(i,1);
                        break search;
                    }
                }
            }
        }
    });

    client.on('play', function(data){
        search:
        for(var i = 0; i < games.length; i++){
            for(var j = 0; j < 2; j++){
                if(games[i].players[j].uuid == client.userid && !games[i].players[j].hasPlayed){
                    games[i].players[j].playCard(data.number, games[i].players[j], games[i].players[(j + 1) % 2]);
                    games[i].players[j].hasPlayed = true;
                    games[i].complete += 1;
                    if(games[i].complete == 2){
                        games[i].takeTurn();
                    }
                    break search;
                }
            }
        }
    });

    for(var i = 0; i < games.length; i++){
        if(games[i].clients == 1){
            games[i].players.push(new Player(client.userid, client));
            games[i].clients += 1;
            matched = true;
            games[i].startGame();
        }
    }

    if(!matched){
        games.push(new Game());
        games[games.length - 1].players.push(new Player(client.userid, client));
        games[games.length - 1].clients += 1;
    }
});