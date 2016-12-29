
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

    if(this.card.hasOwnProperty("battleEffect")){
        this.card.battleEffect(this.card, p1, p2);
    }

    if(this.card.hasOwnProperty("globalEffect")){
        this.card.globalEffect(this.card, p1, p2);
    }
};

Player.prototype.updateHand = function(p1, p2){
    for(var i = 0; i < this.hand.length; i++){
        if(this.hand[i].hasOwnProperty("globalEffect")){
            this.hand[i].globalEffect(this.hand[i], p1, p2);
        }
    }

    this.connection.emit("hand", {hand: this.hand});
};

var players = [];
var complete = 0;
var clients  = 0;

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
        defense: 10,
    },
    "corn": {
        title: "Sweet Corn",
        image: "corn.png",
        text: "When you play it, it gets +1/+1 for every corn you've played so far.",
        attack: 0,
        defense: 0,
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

function takeTurn(){

    players[0].connection.emit("clear status");
    players[1].connection.emit("clear status");

    var attacker = players[whoseTurn];
    var defender = players[(whoseTurn + 1) % 2];

    if(attacker.card.attack > defender.card.defense){
        attacker.score += 1;
    }else{
        whoseTurn = (whoseTurn + 1) % 2;
    }

    players[0].connection.emit("battle", {yours: players[0].card, theirs: players[1].card});
    players[1].connection.emit("battle", {yours: players[1].card, theirs: players[0].card});

    players[0].connection.emit("score", {you: players[0].score, them: players[1].score});
    players[1].connection.emit("score", {you: players[1].score, them: players[0].score});

    players[0].updateHand(players[0], players[1]);
    players[1].updateHand(players[1], players[0]);

    players[whoseTurn].connection.emit("turn", {bool: true});
    players[(whoseTurn + 1) % 2].connection.emit("turn", {bool: false});

    players[0].drawCard(players[0], players[1]);
    players[1].drawCard(players[1], players[0]);

    players[0].updateHand(players[0], players[1]);
    players[1].updateHand(players[1], players[0]);

    complete = 0;

    players[0].connection.emit("can click");
    players[1].connection.emit("can click");
}

function startGame(){
    whoseTurn = Math.floor(Math.random() * 2);

    players[whoseTurn].connection.emit("turn", {bool: true});
    players[(whoseTurn + 1) % 2].connection.emit("turn", {bool: false});

    players[0].connection.emit("clear status");
    players[1].connection.emit("clear status");

    var library = [];

    library.push(cards["dingle"]);
    library.push(cards["mantis"]);
    library.push(cards["sweater"]);
    library.push(cards["corn"]);
    library.push(cards["shower"]);

    for(var i = 0; i < 20; i++){
        players[0].deck.push(clone(library[Math.floor(Math.random()*library.length)]));
    }
    for(var i = 0; i < 20; i++){
        players[1].deck.push(clone(library[Math.floor(Math.random()*library.length)]));
    }

    shuffle(players[0].deck);
    shuffle(players[1].deck);

    players[0].drawCard(players[0], players[1]);
    players[0].drawCard(players[0], players[1]);
    players[0].drawCard(players[0], players[1]);

    players[1].drawCard(players[1], players[0]);
    players[1].drawCard(players[1], players[0]);
    players[1].drawCard(players[1], players[0]);

    players[0].updateHand(players[0], players[1]);
    players[1].updateHand(players[1], players[0]);
}


sio.sockets.on('connection', function (client) {
    
    client.userid = UUID();

    players.push(new Player(client.userid, client));

    //client.emit('onconnected', { id: client.userid } );

    console.log('\t socket.io:: player ' + client.userid + ' connected');
    
    client.on('disconnect', function () {
        console.log('\t socket.io:: client disconnected ' + client.userid );
    });

    client.on('test', function (){
        console.log('test');
    });

    client.on('play', function(data){
        for(var i = 0; i < players.length; i++){
            if(players[i].uuid == client.userid){
                players[i].playCard(data.number, players[i], players[(i + 1) % 2]);
                complete += 1;
                if(complete == 2){
                    takeTurn();
                }
            }
        }
    });

    clients += 1;

    if(clients == 2){
        startGame();
    }

});