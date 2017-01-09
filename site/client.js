var yourTurn = true;
var canClick = true;
var gameBegun = false;
var gameOver = false;
var mode = 0;
var socket = io.connect('/');
var messages = 0;

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

function moveCaretToStart(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = 0;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(true);
        range.select();
    }
}

var decklist = [];

decks = {};

if(localStorage.decks){
	decks = JSON.parse(localStorage.decks);
}else{
	decks = {
		"default": ["dingle","mantis","mantis","shower","shower","shower","shrinky","shrinky","shrinky","smug","smug","smuggy","sweater","sweater","timer","timer","timmy","timmy","wall","wall"]
	};

	localStorage.decks = JSON.stringify(decks);
}

function showAlert(){
	document.getElementById("no-click").style.visibility = "visible";
	document.getElementById("alert-box").style.visibility = "visible";
}

function closeAlert(){
	document.getElementById("no-click").style.visibility = "hidden";
	document.getElementById("alert-box").style.visibility = "hidden";
}

var executeOnClose = null;

function showError(){
	document.getElementById("no-click").style.visibility = "visible";
	document.getElementById("error-box").style.visibility = "visible";
}

function closeError(){
	document.getElementById("no-click").style.visibility = "hidden";
	document.getElementById("error-box").style.visibility = "hidden";

	if(executeOnClose != null){
		executeOnClose();
		executeOnClose = null;
	}
}

function showChat(){
	document.getElementById("chat-main").innerHTML = "";
	document.getElementById("chat").style.visibility = "visible";
}

function hideChat(){
	document.getElementById("chat").style.visibility = "hidden";
}

function showRules(){
	document.getElementById("rules").style.visibility = "visible";
}

function pickDeck(){
	var dropdown = document.getElementById("deck-picker-dropdown");
	var deckname = dropdown.options[dropdown.selectedIndex].text;

	if(mode == 1){
		socket.emit("quick match", {deck: decks[deckname]});
	}else if(mode == 3){
		if($_GET["gameid"]){
			socket.emit("friend game", {id: $_GET["gameid"], deck: decks[deckname]});
		}else{
			socket.emit("friend game", {deck: decks[deckname]});
		}
	}else{
		if(deckname != "New Deck..."){
			decklist = decks[deckname];

			document.getElementById("deck-builder-deckname").value = deckname;

			var list = document.getElementById("deck-builder-list");
			list.innerHTML = "";

			for(var item in decklist){
				list.innerHTML += "<div class=\"list\" onclick=\"removeFromDeck('"+decklist[item]+"')\">"+cards[decklist[item]].title+" <span class=\"stats\">"+cards[decklist[item]].attack+"/"+cards[decklist[item]].defense+"</span></div>";
			}
		}
	}

	closeDeckPicker();
}

function showDeckPicker(){
	var dropdown = document.getElementById("deck-picker-dropdown");
	dropdown.innerHTML = "";

	var i = 0;

	for(var deck in decks){
		dropdown.innerHTML += "<option value=\""+i+"\">"+deck+"</option>";
	}

	if(mode == 2){
		dropdown.innerHTML = "<option value=\"new\">New Deck...</option>" + dropdown.innerHTML;
	}

	document.getElementById("no-click").style.visibility = "visible";
	document.getElementById("deck-picker").style.visibility = "visible";
}

function closeDeckPicker(){
	document.getElementById("no-click").style.visibility = "hidden";
	document.getElementById("deck-picker").style.visibility = "hidden";
}

function makeCard(dict, id, onclick){
	if(typeof onclick === "undefined"){
		onclick = "playCard(this)";
	}

	var className  = "card";
	var buffString = "";
	var silenceString = "";

	if(dict.buffa > 0 || dict.buffd > 0){
		className = "card buffed";
		buffString = "<br /><span class=\"buff\">(buffed)</span>";
	}

	if(dict.buffa < 0 || dict.buffd < 0){
		className = "card debuffed";
		buffString = "<br /><span class=\"buff\">(debuffed)</span>";
	}

	if(dict.silenced){
		className += " silenced";
		buffString += "<br /><span class=\"buff\">(silenced)</span>";
	}

	var string = "<div class=\""+className+"\" id=\""+id+"\" onclick=\""+onclick+"\">";
	   string += "<div class=\"title\" id=\""+id+"-title\">"+dict.title+"</div>";
	   string += "<div class=\"image\" id=\""+id+"-image\" style=\"background-image:url('images/"+dict.image+"')\"></div>";
	   string += "<div class=\"text\"  id=\""+id+"-text\" >"+dict.text+buffString+"</div>";
	   string += "<div class=\"attack\"  id=\""+id+"-attack\">"+(dict.attack + dict.buffa)+"<div class=\"sword\"></div></div>";
	   string += "<div class=\"defense\"  id=\""+id+"-defense\"><div class=\"shield\"></div>"+(dict.defense + dict.buffd)+"</div></div>";
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

	showDeckPicker();
	showChat();
}

function friendGame(){
	yourTurn = true;
	canClick = true;
	gameBegun = false;
	gameOver = false;
	mode = 3;
	document.getElementById("splash").style.visibility = "hidden";

	showDeckPicker();
	showChat();
}

function deckBuilder(){
	mode = 2;

	decklist = [];
	var element = document.getElementById("deck-builder-cards");
	element.innerHTML = "";
	var i = 0;

	for(var card in cards){
		element.innerHTML += makeCard(cards[card], "deckbuilder-"+i, "addToDeck('"+card+"')");
		var display = document.getElementById("deckbuilder-"+i);
		display.style.left = ((i % 3) * 18)+"vmin";
		display.style.top  = (Math.floor(i / 3) * 28)+"vmin";
		i += 1;
	}

	showDeckPicker();

	//element.style.height = ((Math.floor((i - 1) / 3) + 1) * 28) + "vmin";
	document.getElementById("deck-builder").style.visibility = "visible";
	document.getElementById("splash").style.visibility = "hidden";
}

function addToDeck(name){
	var count = 0;

	for(var item in decklist){
		if(decklist[item] == name){
			count += 1;
		}
	}

	if(count < 3 && decklist.length < 20){
		decklist.push(name);
		decklist.sort();

		var list = document.getElementById("deck-builder-list");
		list.innerHTML = "";

		for(var item in decklist){
			list.innerHTML += "<div class=\"list\" onclick=\"removeFromDeck('"+decklist[item]+"')\">"+cards[decklist[item]].title+" <span class=\"stats\">"+cards[decklist[item]].attack+"/"+cards[decklist[item]].defense+"</span></div>";
		}
	}else if(decklist.length >= 20){
		document.getElementById("error-box").innerText = "Twenty is the maximum deck size.";
		showError();
	}
}

function removeFromDeck(name){
	var found = false;

	for(var item in decklist){
		if(decklist[item] == name){
			decklist.splice(item, 1);
			found = true;
			break;
		}
	}

	if(found){
		var list = document.getElementById("deck-builder-list");
		list.innerHTML = "";

		for(var item in decklist){
			list.innerHTML += "<div class=\"list\" onclick=\"removeFromDeck('"+decklist[item]+"')\">"+cards[decklist[item]].title+" <span class=\"stats\">"+cards[decklist[item]].attack+"/"+cards[decklist[item]].defense+"</span></div>";
		}
	}
}

function clearDeck(){
	decklist = [];
	document.getElementById("deck-builder-list").innerHTML = "";
}

function saveDeck(){
	var deckname = document.getElementById("deck-builder-deckname").value;

	if(deckname == ""){
		document.getElementById("error-box").innerText = "Your deck needs a name!";
		showError();
	}else if(decklist.length < 20){
		document.getElementById("error-box").innerText = "You need twenty cards in a deck!";
		showError();
	}else if(decklist.length > 20){
		document.getElementById("error-box").innerText = "You have too many cards in your deck!";
		showError();
	}else{
		decks[deckname] = decklist;
		localStorage.decks = JSON.stringify(decks);
		document.getElementById("error-box").innerText = "Deck saved successfully.";
		showError();
	}
}

function deleteDeck(){
	var deckname = document.getElementById("deck-builder-deckname").value;

	if(decks.hasOwnProperty(deckname)){
		delete decks[deckname];
		localStorage.decks = JSON.stringify(decks);
	}

	decklist = [];
	document.getElementById("deck-builder-list").innerHTML = "";
	document.getElementById("deck-builder-deckname").value = "";

	executeOnClose = function(){showDeckPicker();};
	document.getElementById("error-box").innerText = "Deck deleted.";
	showError();
}

function mainMenu(){
	document.getElementById("splash").style.visibility = "visible";
	document.getElementById("deck-builder").style.visibility = "hidden";
	document.getElementById("rules").style.visibility = "hidden";
	document.getElementById("game-container").innerHTML = old;
	closeAlert();
	closeError();
	closeDeckPicker();
	hideChat();

	if(mode == 1 || mode == 3){
		socket.emit("quit");
	}else if(mode == 2){
		document.getElementById("deck-builder-list").innerHTML  = "";
		document.getElementById("deck-builder-cards").innerHTML = "";
		document.getElementById("deck-builder-deckname").value  = "";
	}
	if($_GET["gameid"]){
		window.location.href = location.protocol + '//' + location.host + location.pathname;
	}

	mode = 0;
}

function createChatBubble(type, message){
	var chatbox = document.getElementById("chat-main");

	chatbox.innerHTML += "<div class=\"chat-bubble "+type+"\" id=\"chat-msg-"+messages+"\"></div>";

	document.getElementById("chat-msg-"+messages).innerText = type+": "+message;

	messages += 1;
}

function keyPressed(event){
	if(event.which == 13){
		var textarea = document.getElementById("chat-input");
		var text = textarea.value;
		textarea.value = "";

		window.setTimeout(function() {
	        moveCaretToStart(textarea);
	    }, 10);

	    createChatBubble("you", text);

		socket.emit("chat", {message: text});
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

	if(yourTurn && data.yours.attack + data.yours.buffa > data.theirs.defense + data.theirs.buffd){
		window.setTimeout(function(){document.getElementById("your-card").className = "card attacker-winner";}, 2000);
		window.setTimeout(function(){document.getElementById("enemy-card").className = "card defender-loser";}, 2300);
		window.setTimeout(function(){document.getElementById("your-card").className = "card attacker-exit";}, 2600);
	}else if(yourTurn && data.yours.attack + data.yours.buffa <= data.theirs.defense + data.theirs.buffd){
		window.setTimeout(function(){document.getElementById("your-card").className = "card attacker-winner";}, 2000);
		window.setTimeout(function(){document.getElementById("enemy-card").className = "card defender-winner";}, 2300);
		window.setTimeout(function(){document.getElementById("your-card").className = "card attacker-losing-exit";}, 2600);
		window.setTimeout(function(){document.getElementById("enemy-card").className = "card defender-winning-exit";}, 3000);
	}else if(!yourTurn && data.yours.defense + data.yours.buffd >= data.theirs.attack + data.theirs.buffa){
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

socket.on('chat', function(data){
	createChatBubble("them", data.message);
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