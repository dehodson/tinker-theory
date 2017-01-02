cards = {
    "dingle": {
        title: "Dingle, the Sticky",
        image: "dingle.png",
        text: "<i>Something smells!</i>",
        attack: 4,
        defense: 3,
        buffa: 0,
        buffd: 0,
    },
    "mantis": {
        title: "Mantis Man",
        image: "manti.png",
        text: "<i>Buzzzzz</i>",
        attack: 7,
        defense: 0,
        buffa: 0,
        buffd: 0,
    },
    "sweater": {
        title: "Comfy Sweater",
        image: "sweater.png",
        text: "<i>It's almost too warm.</i>",
        attack: 0,
        defense: 7,
        buffa: 0,
        buffd: 0,
    },
    "corn": {
        title: "Sweet Corn",
        image: "corn.png",
        text: "Its stats grow with every corn you play.",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        globalEffect: function(obj, p1, p2){obj.text = "Its stats grow with every corn you play. (+"+p1.cornCounter+"/+"+p1.cornCounter+")"; obj.attack = 2 + p1.cornCounter; obj.defense = 2 + p1.cornCounter;},
        battleEffect: function(obj, p1, p2){p1.cornCounter += 1;}
    },
    "shower": {
        title: "Power Shower",
        image: "shower.png",
        text: "Gives all cards in your hand +5/+5 when you play it.",
        attack: 1,
        defense: 1,
        buffa: 0,
        buffd: 0,
        battleEffect: function(obj, p1, p2){for(var i = 0; i < p1.hand.length; i++){p1.hand[i].buffa += 5; p1.hand[i].buffd += 5;}}
    },
    "smug": {
        title: "Smug Fucker",
        image: "smug.png",
        text: "When you play him, draw a card.<br /><br /><i>Nobody likes a know it all.</i>",
        attack: 0,
        defense: 3,
        buffa: 0,
        buffd: 0,
        battleEffect: function(obj, p1, p2){p1.drawCard();}
    },
    "fist": {
        title: "Flaming Fist",
        image: "fist.png",
        text: "<i>Sock it to me.</i>",
        attack: 5,
        defense: 2,
        buffa: 0,
        buffd: 0,
    },
    "wall": {
        title: "Ice Wall",
        image: "wall.png",
        text: "<i>No, I don't know how a wall attacks either. Make your own card game.</i>",
        attack: 2,
        defense: 5,
        buffa: 0,
        buffd: 0,
    },
    "timmy": {
        title: "Little Timmy",
        image: "timmy.png",
        text: "If you win an attack with him, you get an extra point.",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        successfulAttackEffect: function(obj, p1, p2){p1.score += 1;}
    },
    "timer": {
        title: "Dr. Time",
        image: "timer.png",
        text: "His defense is equal to twice your opponent's score.",
        attack: 3,
        defense: 0,
        buffa: 0,
        buffd: 0,
        globalEffect: function(obj, p1, p2){obj.defense = p2.score * 2;}
    },
    "smuggy": {
        title: "Great Thinker",
        image: "smuggy.png",
        text: "If you successfully defend with him, draw a card.",
        attack: 0,
        defense: 5,
        buffa: 0,
        buffd: 0,
        successfulDefenseEffect: function(obj, p1, p2){p1.drawCard();}
    },
    "cornwall": {
        title: "Wall of Corn",
        image: "cornwall.png",
        text: "<i>The best defense is a good corn fence.</i>",
        attack: 1,
        defense: 6,
        buffa: 0,
        buffd: 0,
        battleEffect: function(obj, p1, p2){p1.cornCounter += 1;}
    },
    "gatekeeper": {
        title: "Gatekeeper",
        image: "gatekeeper.png",
        text: "When you play him, you'll draw your best attacker next.",
        attack: 1,
        defense: 4,
        buffa: 0,
        buffd: 0,
        battleEffect: function(obj, p1, p2){
            var best = 0;
            var index = 0;
            for(var card in p1.deck){
                if(p1.deck[card].attack + p1.deck[card].buffa > best){index = card; best = p1.deck[card].attack + p1.deck[card].buffa}
            }
            p1.nextCard = index;
        }
    },
    "shrinky": {
        title: "Shrink Technician",
        image: "shrinky.png",
        text: "Gives all cards in your opponent's hand -1/-1 when you play it.",
        attack: 3,
        defense: 1,
        buffa: 0,
        buffd: 0,
        battleEffect: function(obj, p1, p2){for(var i = 0; i < p2.hand.length; i++){p2.hand[i].buffa -= 1; p2.hand[i].buffd -= 1;}}
    },
    "normalizer": {
        title: "Normalizer Wizard",
        image: "normalizer.png",
        text: "Removes all buffs from cards in each player's hand when you play it.",
        attack: 5,
        defense: 0,
        buffa: 0,
        buffd: 0,
        battleEffect: function(obj, p1, p2){
            for(var i = 0; i < p2.hand.length; i++){p2.hand[i].buffa = 0; p2.hand[i].buffd = 0;}
            for(var i = 0; i < p1.hand.length; i++){p1.hand[i].buffa = 0; p1.hand[i].buffd = 0;}
        }
    },
    "mercenary": {
        title: "Medusa Mercenary",
        image: "mercenary.png",
        text: "If you're losing, she's a 10/10.<br /><br /><i>Lazy until it's go time.</i>",
        attack: 1,
        defense: 1,
        buffa: 0,
        buffd: 0,
        globalEffect: function(obj, p1, p2){if(p2.score > p1.score){obj.attack = 10; obj.defense = 10;}else{obj.attack = 1; obj.defense = 1;}}
    },
    "electro": {
        title: "Electro-Mage",
        image: "electro.png",
        text: "When you play her, your opponent draws a card.",
        attack: 9,
        defense: 1,
        buffa: 0,
        buffd: 0,
        battleEffect: function(obj, p1, p2){p2.drawCard();}
    },
    "clone": {
        title: "Cosmic Clone",
        image: "clone.png",
        text: "Its stats in battle are always equal to your opponent's card.",
        attack: 0,
        defense: 0,
        buffa: 0,
        buffd: 0,
        battleEffect: function(obj, p1, p2){obj.attack = p2.card.attack; obj.defense = p2.card.defense; obj.buffa = p2.card.buffa; obj.buffd = p2.card.buffd;}
    }
};