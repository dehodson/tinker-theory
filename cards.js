cards = {
    "dingle": {
        title: "Dingle, the Sticky",
        image: "dingle.png",
        text: "<i>Something smells!</i>",
        attack: 4,
        defense: 3
    },
    "mantis": {
        title: "Mantis Man",
        image: "manti.png",
        text: "<i>Buzzzzz</i>",
        attack: 7,
        defense: 0
    },
    "sweater": {
        title: "Comfy Sweater",
        image: "sweater.png",
        text: "<i>It's almost too warm.</i>",
        attack: 0,
        defense: 7
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
        text: "When you play him, draw a card.<br /><br /><i>Nobody likes a know it all.</i>",
        attack: 0,
        defense: 3,
        battleEffect: function(obj, p1, p2){p1.drawCard();}
    },
    "fist": {
        title: "Flaming Fist",
        image: "fist.png",
        text: "<i>Sock it to me.</i>",
        attack: 5,
        defense: 2
    },
    "wall": {
        title: "Ice Wall",
        image: "wall.png",
        text: "<i>No, I don't know how a wall attacks either. Make your own card game.</i>",
        attack: 2,
        defense: 5
    },
    "timmy": {
        title: "Little Timmy",
        image: "timmy.png",
        text: "If you win an attack with him, you get an extra point.",
        attack: 2,
        defense: 2,
        successfulAttackEffect: function(obj, p1, p2){p1.score += 1;}
    },
    "timer": {
        title: "Dr. Time",
        image: "timer.png",
        text: "His defense is equal to twice your opponent's score.",
        attack: 3,
        defense: 0,
        globalEffect: function(obj, p1, p2){obj.defense = p2.score * 2;}
    },
    "smuggy": {
        title: "Great Thinker",
        image: "smuggy.png",
        text: "If you successfully defend with him, draw a card.",
        attack: 0,
        defense: 5,
        successfulDefenseEffect: function(obj, p1, p2){p1.drawCard();}
    },
    "cornwall": {
        title: "Wall of Corn",
        image: "cornwall.png",
        text: "<i>The best defense is a good corn fence.</i>",
        attack: 1,
        defense: 6,
        battleEffect: function(obj, p1, p2){p1.cornCounter += 1;}
    },
    "gatekeeper": {
        title: "Gatekeeper",
        image: "gatekeeper.png",
        text: "When you play him, you'll draw your best attacker next.",
        attack: 1,
        defense: 4,
        battleEffect: function(obj, p1, p2){
            var best = 0;
            var index = 0;
            for(var card in p1.deck){
                if(p1.deck[card].attack > best){index = card; best = p1.deck[card].attack}
            }
            p1.nextCard = index;
        }
    }
};