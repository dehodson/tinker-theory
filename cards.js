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
        text: "<i>No, I don't know how a wall attacks either. Why don't you make your own card game?</i>",
        attack: 2,
        defense: 5
    }
};