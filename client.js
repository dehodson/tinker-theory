var yourTurn = true;
var canClick = true;
var gameBegun = false;
var gameOver = false;
var mode = 0;
var socket = io.connect('/');

var old = document.getElementById("game-container").innerHTML;

var hand = [];

var $_GET = {};
if(document.location.toString().indexOf('?') !== -1) { //from stackoverflow import *
    var query = document.location
                   .toString()
                   // get the query string
                   .replace(/^.*?\?/, '')
                   // and remove any existing hash string (thanks, @vrijdenker)
                   .replace(/#.*$/, '')
                   .split('&');

    for(var i=0, l=query.length; i<l; i++) {
       var aux = decodeURIComponent(query[i]).split('=');
       $_GET[aux[0]] = aux[1];
    }
}

function showAlert(){
	document.getElementById("no-click").style.visibility = "visible";
	document.getElementById("alert-box").style.visibility = "visible";
}

function closeAlert(){
	document.getElementById("no-click").style.visibility = "hidden";
	document.getElementById("alert-box").style.visibility = "hidden";
}

function showError(){
	document.getElementById("no-click").style.visibility = "visible";
	document.getElementById("error-box").style.visibility = "visible";
}

function closeError(){
	document.getElementById("no-click").style.visibility = "hidden";
	document.getElementById("error-box").style.visibility = "hidden";
}

function makeCard(dict, id, onclick){
	if(typeof onclick === "undefined"){
		onclick = "playCard(this)";
	}

	var string = "<div class=\"card\" id=\""+id+"\" onclick=\""+onclick+"\">";
	   string += "<div class=\"title\" id=\""+id+"-title\">"+dict.title+"</div>";
	   string += "<div class=\"image\" id=\""+id+"-image\" style=\"background-image:url('images/"+dict.image+"')\"></div>";
	   string += "<div class=\"text\"  id=\""+id+"-text\" >"+dict.text+"</div>";
	   string += "<div class=\"attack\"  id=\""+id+"-attack\">"+dict.attack+"<div class=\"sword\"></div></div>";
	   string += "<div class=\"defense\"  id=\""+id+"-defense\"><div class=\"shield\"></div>"+dict.defense+"</div></div>";
	return string;
}

function updateHand(){
	document.getElementById("hand").innerHTML = "";

	if(hand.length > 3){
		var offset = 0;
		var diff = 60 / (hand.length - 1);
	}else{
		var offset = (80 - (hand.length * 20)) / 2;
		var diff = 20;
	}

	for(var i = 0; i < hand.length; i++){
		document.getElementById("hand").innerHTML += makeCard(hand[i], "card-"+i);
		document.getElementById("card-"+i).style.left = (offset + (diff * i)) + "vmin";
	}
}

function updateScore(){
	document.getElementById("score-points").innerText = player.score + " - " + enemy.score;
}

function playCard(element){
	if(canClick && !gameOver){
		var cardId = parseInt(element.id.substring(5));

		if(!isNaN(cardId)){
			canClick = false;

			element.style.backgroundColor = "#DDD";
			
			document.getElementById("status").innerHTML = "Waiting on your opponent to play a card... <div class=\"loader\"></div>";

			window.socket.emit("play", {number: cardId});
		}
	}
}

function quickMatch(){
	yourTurn = true;
	canClick = true;
	gameBegun = false;
	gameOver = false;
	mode = 1;
	document.getElementById("splash").style.visibility = "hidden";
	socket.emit("quick match");
}

function friendGame(){
	yourTurn = true;
	canClick = true;
	gameBegun = false;
	gameOver = false;
	mode = 1;
	document.getElementById("splash").style.visibility = "hidden";

	if($_GET["gameid"]){
		socket.emit("friend game", {id: $_GET["gameid"]});
	}else{
		socket.emit("friend game");
	}
}

function deckBuilder(){
	var element = document.getElementById("deck-builder-cards");
	element.innerHTML = "";
	var i = 0;

	for(var card in cards){
		element.innerHTML += makeCard(cards[card], "deckbuilder-"+i, "addToDeck('"+card+"')");
		var display = document.getElementById("deckbuilder-"+i);
		display.style.left = ((i % 3) * 20)+"vmin";
		display.style.top  = (Math.floor(i / 3) * 30)+"vmin";
		i += 1;
	}

	element.style.height = ((Math.floor((i - 1) / 3) + 1) * 30) + "vmin";
	document.getElementById("deck-builder").style.visibility = "visible";
	document.getElementById("splash").style.visibility = "hidden";
}

function addToDeck(name){
	var list = document.getElementById("deck-builder-list");
	list.innerHTML += "<div class=\"list\">"+cards[name].title+"</div>";
}

function mainMenu(){
	document.getElementById("splash").style.visibility = "visible";
	document.getElementById("deck-builder").style.visibility = "hidden";
	document.getElementById("game-container").innerHTML = old;
	closeAlert();
	closeError();
	if(mode != 0){
		socket.emit("quit");
		mode = 0;
	}
	if($_GET["gameid"]){
		window.location.href = location.protocol + '//' + location.host + location.pathname;
	}
}

socket.on('turn', function( data ) {
	var timeout = 2500;

	if(!gameBegun){
		timeout = 0;
		gameBegun = true;
		document.getElementById("status").innerText = "Pick a card.";
	}

	window.setTimeout(function(){
        if(data.bool){
			document.getElementById("turn").innerText = "You're on the attack!";
		}else{
			document.getElementById("turn").innerText = "You're on the defense!";
		}
		yourTurn = data.bool;
	}, timeout);
});

socket.on('hand', function( data ) {
	window.setTimeout(function(){hand = data.hand; updateHand();}, data.delay);
});

socket.on('can click', function() {
	window.setTimeout(function(){canClick = true;}, 2500);
});

socket.on('score', function( data ) {
	window.setTimeout(function(){document.getElementById("score-points").innerText = data.you + " - " + data.them;}, 2500);
});

socket.on('battle', function( data ) {
	var yours  = document.getElementById("your-card");
	var theirs = document.getElementById("enemy-card");

	yours.outerHTML  = makeCard(data.yours, "your-card");
	theirs.outerHTML = makeCard(data.theirs, "enemy-card");

	document.getElementById("status").innerText = "Battle! 3...";
	window.setTimeout(function(){document.getElementById("status").innerText = "Battle! 2...";}, 666);
	window.setTimeout(function(){document.getElementById("status").innerText = "Battle! 1...";}, 1334);
	window.setTimeout(function(){document.getElementById("status").innerText = "Go!";}, 2000);
	window.setTimeout(function(){document.getElementById("status").innerText = "Pick a card.";}, 3000);

	if(yourTurn && data.yours.attack > data.theirs.defense){
		window.setTimeout(function(){document.getElementById("your-card").className = "card attacker-winner";}, 2000);
		window.setTimeout(function(){document.getElementById("enemy-card").className = "card defender-loser";}, 2300);
		window.setTimeout(function(){document.getElementById("your-card").className = "card attacker-exit";}, 2600);
	}else if(yourTurn && data.yours.attack <= data.theirs.defense){
		window.setTimeout(function(){document.getElementById("your-card").className = "card attacker-winner";}, 2000);
		window.setTimeout(function(){document.getElementById("enemy-card").className = "card defender-winner";}, 2300);
		window.setTimeout(function(){document.getElementById("your-card").className = "card attacker-losing-exit";}, 2600);
		window.setTimeout(function(){document.getElementById("enemy-card").className = "card defender-winning-exit";}, 3000);
	}else if(!yourTurn && data.yours.defense >= data.theirs.attack){
		window.setTimeout(function(){document.getElementById("enemy-card").className = "card attacker-winner";}, 2000);
		window.setTimeout(function(){document.getElementById("your-card").className = "card defender-winner";}, 2300);
		window.setTimeout(function(){document.getElementById("enemy-card").className = "card attacker-losing-exit";}, 2600);
		window.setTimeout(function(){document.getElementById("your-card").className = "card defender-winning-exit";}, 3000);
	}else{
		window.setTimeout(function(){document.getElementById("enemy-card").className = "card attacker-winner";}, 2000);
		window.setTimeout(function(){document.getElementById("your-card").className = "card defender-loser";}, 2300);
		window.setTimeout(function(){document.getElementById("enemy-card").className = "card attacker-exit";}, 2600);
	}
});

socket.on('game id', function(data){
	document.getElementById("alert-box-link").innerText = window.location.href + "?gameid=" + data.id;
	showAlert();
});

socket.on('friend joined', function(){
	closeAlert();
});

socket.on('join failed', function(data){
	document.getElementById("error-box").innerText = "Could not join game: "+data.reason;
	showError();
});

socket.on('clear status', function (){
	document.getElementById("status").innerText = "";
});

socket.on('disconnected', function(){
	document.getElementById("status").innerText = "Your opponent disconnected.";
	gameOver = true;
});

if($_GET["gameid"]){
	friendGame();
}