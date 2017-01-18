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

cards = {
    "dingle": {
        title: "Dingle, the Sticky",
        image: "dingle.png",
        text: "<i>Something smells!</i>",
        attack: 4,
        defense: 3,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false
    },
    "mantis": {
        title: "Mantis Man",
        image: "manti.png",
        text: "<i>Buzzzzz</i>",
        attack: 7,
        defense: 0,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false
    },
    "sweater": {
        title: "Comfy Sweater",
        image: "sweater.png",
        text: "<i>It's almost too warm.</i>",
        attack: 0,
        defense: 7,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false
    },
    "corn": {
        title: "Sweet Corn",
        image: "corn.png",
        text: "Its stats grow with every corn you play.",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        globalEffect: function(obj, p1, p2){obj.text = "Its stats grow with every corn you play. (+"+p1.cornCounter+"/+"+p1.cornCounter+")"; obj.attack = 2 + p1.cornCounter; obj.defense = 2 + p1.cornCounter;},
        battleEffect: function(obj, p1, p2){p1.cornCounter += 1;}
    },
    "shower": {
        title: "Power Shower",
        image: "shower.png",
        text: "<span class=\"silenceable\">Gives all cards in your hand +3/+3 when you play it.</span>",
        attack: 1,
        defense: 1,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){for(var i = 0; i < p1.hand.length; i++){p1.hand[i].buffa += 3; p1.hand[i].buffd += 3;}}
    },
    "smug": {
        title: "Smug Fucker",
        image: "smug.png",
        text: "<span class=\"silenceable\">When you play him, draw a card.</span><br /><br /><i>Nobody likes a know it all.</i>",
        attack: 0,
        defense: 3,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
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
        cursed: false,
        expansion: "core",
        silenced: false
    },
    "wall": {
        title: "Ice Wall",
        image: "wall.png",
        text: "<i>No, I don't know how a wall attacks either. Make your own card game.</i>",
        attack: 2,
        defense: 5,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false
    },
    "timmy": {
        title: "Little Timmy",
        image: "timmy.png",
        text: "<span class=\"silenceable\">If you win an attack with him, you get an extra point.</span>",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
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
        cursed: false,
        expansion: "core",
        silenced: false,
        globalEffect: function(obj, p1, p2){obj.defense = p2.score * 2;}
    },
    "smuggy": {
        title: "Great Thinker",
        image: "smuggy.png",
        text: "<span class=\"silenceable\">If you successfully defend with him, draw a card.</span>",
        attack: 0,
        defense: 5,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
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
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){p1.cornCounter += 1;}
    },
    "gatekeeper": {
        title: "Gatekeeper",
        image: "gatekeeper.png",
        text: "<span class=\"silenceable\">When you play him, you'll draw your best attacker next.</span>",
        attack: 1,
        defense: 4,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
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
        text: "<span class=\"silenceable\">Gives all cards in your opponent's hand -1/-3 when you play it.</span>",
        attack: 3,
        defense: 1,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){for(var i = 0; i < p2.hand.length; i++){p2.hand[i].buffa -= 1; p2.hand[i].buffd -= 3;}}
    },
    "normalizer": {
        title: "Normalizer Wizard",
        image: "normalizer.png",
        text: "<span class=\"silenceable\">Removes all buffs and debuffs from cards in each player's hand when you play it.</span>",
        attack: 5,
        defense: 0,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
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
        cursed: false,
        expansion: "core",
        silenced: false,
        globalEffect: function(obj, p1, p2){if(p2.score > p1.score){obj.attack = 10; obj.defense = 10;}else{obj.attack = 1; obj.defense = 1;}}
    },
    "electro": {
        title: "Electro-Mage",
        image: "electro.png",
        text: "<span class=\"silenceable\">If you lose an attack with her, you lose a point.</span>",
        attack: 7,
        defense: 3,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        failedAttackEffect: function(obj, p1, p2){if(p1.score > 0){p1.score -= 1;}}
    },
    "clone": {
        title: "Cosmic Clone",
        image: "clone.png",
        text: "<span class=\"silenceable\">It copies the stats of the last card you played.</span>",
        attack: 0,
        defense: 0,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            if(p1.lastCard != null){obj.attack = p1.lastCard.attack; obj.defense = p1.lastCard.defense; obj.buffa = p1.lastCard.buffa; obj.buffd = p1.lastCard.buffd;
        }}
    },
    "warrior": {
        title: "Copy-Mage",
        image: "warrior.png",
        text: "<span class=\"silenceable\">It copies the battle effects of the last card you played.</span>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            if(p1.lastCard != null){
                if(p1.lastCard.hasOwnProperty("battleEffect") && p1.lastCard.battleEffect.toString() != obj.battleEffect.toString()){
                    obj.battleEffect = p1.lastCard.battleEffect; obj.battleEffect(obj, p1, p2);
                }
                if(p1.lastCard.hasOwnProperty("successfulAttackEffect")){
                    obj.successfulAttackEffect = p1.lastCard.successfulAttackEffect;
                }
                if(p1.lastCard.hasOwnProperty("failedAttackEffect")){
                    obj.failedAttackEffect = p1.lastCard.failedAttackEffect;
                }
                if(p1.lastCard.hasOwnProperty("successfulDefenseEffect")){
                    obj.successfulDefenseEffect = p1.lastCard.successfulDefenseEffect;
                }
                if(p1.lastCard.hasOwnProperty("failedDefenseEffect")){
                    obj.failedDefenseEffect = p1.lastCard.failedDefenseEffect;
                }
            }
        }
    },
    "barrier": {
        title: "Mystical Barrier",
        image: "barrier.png",
        text: "<span class=\"silenceable\">If you successfully defend with it, you get a point.</span>",
        attack: 0,
        defense: 6,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        successfulDefenseEffect: function(obj, p1, p2){p1.score += 1;}
    },
    "diggy": {
        title: "Archmage Diggy",
        image: "diggy.png",
        text: "<span class=\"silenceable\">When you play him, give all other copies of the last card your opponent played -2/-2.</span>",
        attack: 2,
        defense: 4,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            if(p2.lastCard != null){
                for(var card in p2.deck){
                    if(p2.deck[card].title == p2.lastCard.title){p2.deck[card].buffa -= 2; p2.deck[card].buffd -= 2;}
                }
                for(var card in p2.hand){
                    if(p2.hand[card].title == p2.lastCard.title){p2.hand[card].buffa -= 2; p2.hand[card].buffd -= 2;}
                }
            }
        }
    },
    "farmer": {
        title: "Farmer Jeb",
        image: "farmer.png",
        text: "<span class=\"silenceable\">If the last card you played was a corn card, draw a card.</span>",
        attack: 4,
        defense: 2,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            if(p1.lastCard != null){if(p1.lastCard.title.indexOf("Corn") != -1){p1.drawCard();}}
        }
    },
    "necro": {
        title: "Necrosplicer",
        image: "necro.png",
        text: "<span class=\"silenceable\">When you play him, your opponent's hand's stats are averaged together.</span>",
        attack: 5,
        defense: 1,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            var total = 0;
            for(var i = 0; i < p2.hand.length; i++){total += p2.hand[i].attack + p2.hand[i].defense + p2.hand[i].buffa + p2.hand[i].buffd; p2.hand[i].buffa = 0; p2.hand[i].buffd = 0;}
            var amount = Math.floor(total / (p2.hand.length * 2));
            for(var i = 0; i < p2.hand.length; i++){p2.hand[i].buffa = amount - p2.hand[i].attack; p2.hand[i].buffd = amount - p2.hand[i].defense};
        }
    },
    "silencer": {
        title: "Mystic Silencer",
        image: "silencer.png",
        text: "<span class=\"silenceable\">When you play him, silence all cards in your opponent's hand.</span>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            for(var i = 0; i < p2.hand.length; i++){
                p2.hand[i].silenced = true;
            }
        }
    },
    "duo": {
        title: "Magical Duo",
        image: "duo.png",
        text: "<span class=\"silenceable\">When you play them, draw a card, but silence it.</span>",
        attack: 3,
        defense: 2,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            if(p1.deck.length > 0){
                if(p1.nextCard != null){
                    p1.nextCard.silenced = true;
                }else{
                    p1.deck[p1.deck.length - 1].silenced = true;
                }
                p1.drawCard();
            }
        }
    },
    "hexmage": {
        title: "Wizened Hexmage",
        image: "hexmage.png",
        text: "<span class=\"silenceable\">When you play him, unsilence all cards in your hand. He gets +1/+0 for each.</span>",
        attack: 0,
        defense: 4,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            var number = 0;
            for(var i = 0; i < p1.hand.length; i++){
                if(p1.hand[i].silenced){
                    number += 1;
                    p1.hand[i].silenced = false;
                }
            }
            obj.buffa += number;
        }
    },
    "bound": {
        title: "Bound Behemoth",
        image: "bound.png",
        text: "Starts silenced. <span class=\"silenceable\">When you play it, it gets +7/+7.</span>",
        attack: 4,
        defense: 2,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: true,
        battleEffect: function(obj, p1, p2){obj.buffa += 7; obj.buffd += 7;}
    },
    "flocking": {
        title: "Flocking Wraiths",
        image: "flocking.png",
        text: "<span class=\"silenceable\">When you play them, other copies of them in your deck get +3/+3.</span>",
        attack: 1,
        defense: 1,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            for(var card in p1.deck){
                if(p1.deck[card].title == obj.title){p1.deck[card].buffa += 3; p1.deck[card].buffd += 3;}
            }
        }
    },
    "eternal": {
        title: "Eternal Protector",
        image: "eternal.png",
        text: "It can't be buffed or debuffed.<br /><br /><i>Ever standing, ever watchful.</i>",
        attack: 2,
        defense: 6,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        globalEffect: function(obj, p1, p2){obj.buffa = 0; obj.buffd = 0;}
    },
    "goddess": {
        title: "Renewal Goddess",
        image: "goddess.png",
        text: "<span class=\"silenceable\">Shuffle your hand into your deck when you play her. Draw that many cards.</span>",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "core",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            var size = p1.hand.length;
            for(var i = 0; i < size; i++){p1.deck.push(p1.hand.pop());}
            shuffle(p1.deck);
            for(var i = 0; i < size; i++){p1.drawCard();}
        }
    },
    "cursy": {
        title: "Spiteful One",
        image: "cursy.png",
        text: "<span class=\"silenceable\">When you play her, curse the top two cards of your opponent's deck.</span>",
        attack: 1,
        defense: 5,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            var max = p2.deck.length < 2 ? p2.deck.length : 2;
            for(var i = 0; i < max; i++){p2.deck[(p2.deck.length - 1) - i].cursed = true;}
        }
    },
    "maniac": {
        title: "Hex Maniac",
        image: "maniac.png",
        text: "<span class=\"silenceable\">When you play him, if your opponent's deck contains a cursed card, he gets +3/+3.</span>",
        attack: 2,
        defense: 3,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            var found = false;
            for(var i = 0; i < p2.deck.length; i++){if(p2.deck[i].cursed){found = true;}}
            if(found){obj.buffa += 3; obj.buffd += 3;}
        }
    },
    "idol":  {
        title: "Cursed Idol",
        image: "idol.png",
        text: "Starts cursed.<br /><br /><i>Known to the state of California to cause curses.</i>",
        attack: 6,
        defense: 6,
        buffa: 0,
        buffd: 0,
        cursed: true,
        expansion: "cogs",
        silenced: false
    },
    "unsweet": {
        title: "Unsweet Corn",
        image: "unsweet.png",
        text: "<span class=\"silenceable\">If you've played at least 3 corn cards when you play it, cards in your opponent's hand get -2/-2.</span>",
        attack: 5,
        defense: 0,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){p1.cornCounter += 1; if(p1.cornCounter > 2){for(var i = 0; i < p2.hand.length; i++){p2.hand[i].buffa -= 2; p2.hand[i].buffd -= 2;}}}
    },
    "demoness": {
        title: "Chaos Goddess",
        image: "demoness.png",
        text: "<span class=\"silenceable\">Shuffle your opponent's hand into their deck when you play her. They draw two cards.</span>",
        attack: 3,
        defense: 0,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            var size = p2.hand.length;
            for(var i = 0; i < size; i++){p2.deck.push(p2.hand.pop());}
            shuffle(p2.deck);
            for(var i = 0; i < 2; i++){p2.drawCard();}
        }
    },
    "liquid": {
        title: "Caustic Liquid",
        image: "liquid.png",
        text: "<span class=\"silenceable\">Gives all cards in your hand +5/+5 when you play it, but curses them.</span>",
        attack: 3,
        defense: 1,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){for(var i = 0; i < p1.hand.length; i++){p1.hand[i].buffa += 5; p1.hand[i].buffd += 5;  p1.hand[i].cursed = true;}}
    },
    "bastard": {
        title: "Battery Bastard",
        image: "bastard.png",
        text: "<span class=\"silenceable\">If you successfully attack with him, gain 3 charge.</span><br /><br /><i>His cup size is AAA.</i>",
        attack: 6,
        defense: 1,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        successfulAttackEffect: function(obj, p1, p2){p1.charge += 3}
    },
    "matrix": {
        title: "Defense Matrix",
        image: "matrix.png",
        text: "<span class=\"silenceable\">When you play it, cards in your hand get +1 defense for every charge you have.</span>",
        attack: 1,
        defense: 5,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){for(var i = 0; i < p1.hand.length; i++){p1.hand[i].buffd += p1.charge}}
    },
    "electrotimmy": {
        title: "Electro-Timmy",
        image: "electrotimmy.png",
        text: "<span class=\"silenceable\">When you play him, spend 6 charge and gain a point.</span>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){if(p1.charge >= 6){p1.score += 1; p1.charge -= 6;}}
    },
    "coffee": {
        title: "Wizard Coffee",
        image: "coffee.png",
        text: "<span class=\"silenceable\">When you play it, all mages in your deck get +2 attack.<br /><br /><i>\"Order for Saruman!\"</i></span>",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            for(var card in p1.deck){
                if(p1.deck[card].title.match(/mage/i)){p1.deck[card].buffa += 2;}
            }
        }
    },
    "hexbot": {
        title: "Hexbot",
        image: "hexbot.png",
        text: "<span class=\"silenceable\">When you play it, spend 3 charge and curse all cards in your opponent's hand.</span>",
        attack: 2,
        defense: 4,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){if(p1.charge >= 3){p1.charge -= 3; for(var i = 0; i < p2.hand.length; i++){p2.hand[i].cursed = true;}}}
    },
    "ai": {
        title: "AI Researcher",
        image: "electrotimmy.png",
        text: "<span class=\"silenceable\">When you play her, spend 2 charge and draw a card.</span>",
        attack: 4,
        defense: 2,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){if(p1.charge >= 2 && p1.deck.length > 0){p1.drawCard(); p1.charge -= 2;}}
    },
    "lil": {
        title: "Lil' Battery Bug",
        image: "lil.png",
        text: "<span class=\"silenceable\">When you play it, gain 5 charge.</span><br /><br /><i>Zap!</i>",
        attack: 1,
        defense: 1,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){p1.charge += 5;}
    },
    "stone": {
        title: "Heaven Stone",
        image: "stone.png",
        text: "<span class=\"silenceable\">When you play it, draw a goddess. That goddess gets +3/+0.</span>",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            for(var card in p1.deck){
                if(p1.deck[card].title.match(/goddess/i)){p1.nextCard = card; p1.deck[card].buffa += 3; p1.drawCard(); break;}
            }
        }
    },
    "electricsilencer": {
        title: "Electric Silencer",
        image: "electricsilencer.png",
        text: "<span class=\"silenceable\">When you play him, spend 3 charge and silence all cards in your opponent's hand.</span>",
        attack: 1,
        defense: 6,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            if(p1.charge >= 3){
                for(var i = 0; i < p2.hand.length; i++){
                    p2.hand[i].silenced = true;
                }
                p1.charge -= 3;
            }
        }
    },
    "hulk": {
        title: "Behemoth Hulk",
        image: "liquid.png",
        text: "<span class=\"silenceable\">When you play it, cards in your hand get -3/-3.</span>",
        attack: 9,
        defense: 9,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            for(var i in p1.hand){
                p1.hand[i].buffa -= 3; p1.hand[i].buffd -= 3;
            }
        }
    },
    "knowledge": {
        title: "Knowledge Feaster",
        image: "knowledge.png",
        text: "Its stats are equal to the number of cards in your hand.",
        attack: 0,
        defense: 0,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        globalEffect: function(obj, p1, p2){obj.attack = p1.hand.length; obj.defense = p1.hand.length;},
    },
    "proof": {
        title: "Hexproof Barrier",
        image: "corn.png",
        text: "It can't be cursed.",
        attack: 0,
        defense: 6,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        globalEffect: function(obj, p1, p2){obj.cursed = false;},
    },
    "drainer": {
        title: "Curse Drainer",
        image: "silencer.png",
        text: "<span class=\"silenceable\">If you successfully defend with him, uncurse your hand. Gain 1 charge for each.</span>",
        attack: 0,
        defense: 5,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        successfulDefenseEffect: function(obj, p1, p2){
            var num = 0;
            for(var i in p1.hand){
                if(p1.hand[i].cursed){
                    num += 1;
                    p1.hand[i].cursed = false;
                }
            }
            p1.charge += num;
        }
    },
    "mech": {
        title: "Circuit Smasher",
        image: "electrotimmy.png",
        text: "<span class=\"silenceable\">When you play it, spend 4 charge and it gets +4/+4.</span>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){if(p1.charge >= 4){p1.charge -= 4; obj.buffa += 4; obj.buffd += 4;}}
    },
    "apprentice": {
        title: "Diggy's Apprentice",
        image: "diggy.png",
        text: "<span class=\"silenceable\">When you play him, silence all other copies of the last card your opponent played.</span>",
        attack: 4,
        defense: 1,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            if(p2.lastCard != null){
                for(var card in p2.deck){
                    if(p2.deck[card].title == p2.lastCard.title){p2.deck[card].silenced = true;}
                }
                for(var card in p2.hand){
                    if(p2.hand[card].title == p2.lastCard.title){p2.hand[card].silenced = true;}
                }
            }
        }
    },
    "potion": {
        title: "Proton Potion",
        image: "liquid.png",
        text: "<span class=\"silenceable\">Spend all your charge when you play it. Cards in your hand get +1/+0 for each.</span>",
        attack: 4,
        defense: 0,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            num = p1.charge;
            for(var i in p1.hand){
                p1.hand[i].buffa += num;
            }
            p1.charge = 0;
        }
    },
    "revenge": {
        title: "Revenge Totem",
        image: "stone.png",
        text: "<span class=\"silenceable\">If the last card you played was cursed or silenced, curse or silence your opponent's hand.</span>",
        attack: 2,
        defense: 3,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            for(var card in p2.hand){
                if(p1.lastCard.silenced){p2.hand[card].silenced = true;}if(p1.lastCard.cursed){p2.hand[card].cursed = true;}
            }
        }
    },
    "socket": {
        title: "Socket Wall",
        image: "socket.png",
        text: "<span class=\"silenceable\">When you play it, gain 2 charge.</span>",
        attack: 1,
        defense: 6,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){p1.charge += 2;}
    },
    "artifact": {
        title: "Curious Artifact",
        image: "artifact.png",
        text: "Starts cursed.<br /><span class=\"silenceable\">When you play it, if both of its stats are below -9, you gain two points.</span>",
        attack: 0,
        defense: 0,
        buffa: 0,
        buffd: 0,
        cursed: true,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            if(obj.buffa + obj.attack < -9 && obj.buffd + obj.defense < -9){
                p1.score += 2;
            }
        }
    },
    "mason": {
        title: "Mad Mason",
        image: "gatekeeper.png",
        text: "<span class=\"silenceable\">If you fail to attack with him, you'll draw a wall next.</span>",
        attack: 6,
        defense: 0,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            for(var card in p1.deck){
                if(p1.deck[card].title.match(/wall/i)){p1.nextCard = card; break;}
            }
        }
    },
    "thief": {
        title: "Juice Thief",
        image: "liquid.png",
        text: "<span class=\"silenceable\">When you play her, steal up to 2 charge from your opponent.</span>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            if(p2.charge < 2){
                p1.charge += p2.charge;
                p2.charge = 0;
            }else{
                p2.charge -= 2;
                p1.charge += 2;
            }
        }
    },
    "conjurer": {
        title: "Porcine Conjurer",
        image: "liquid.png",
        text: "<span class=\"silenceable\">When you play him, turn the best attacker in your opponent's hand into a 1/1 pig.</span>",
        attack: 2,
        defense: 4,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            var best = 0;
            var index = 0;
            for(var card in p2.hand){
                if(p2.hand[card].attack + p2.hand[card].buffa > best){index = card; best = p2.hand[card].attack + p2.hand[card].buffa}
            }
            p2.hand[index] = {
                title: "Pig",
                image: "liquid.png",
                text: "<i>Oink.</i>",
                attack: 1,
                defense: 1,
                buffa: 0,
                buffd: 0,
                cursed: false,
                expansion: "cogs",
                silenced: false
            }
        }
    },
    "peeper": {
        title: "Peeper",
        image: "liquid.png",
        text: "<span class=\"silenceable\">When you play her, look at your opponent's hand.</span><br /><br /><i>Dirty screen looker.</i>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        battleEffect: function(obj, p1, p2){
            p1.connection.emit("enemy hand", {hand: p2.hand});
        }
    },
    "crier": {
        title: "Rallying Crier",
        image: "liquid.png",
        text: "When you draw him, other cards in your hand get +1/+1.",
        attack: 3,
        defense: 2,
        buffa: 0,
        buffd: 0,
        cursed: false,
        expansion: "cogs",
        silenced: false,
        drawEffect: function(obj, p1, p2){
            if(p1){
                for(var i in p1.hand){
                    p1.hand[i].buffa += 1; p1.hand[i].buffd += 1;
                }
            }
        }
    }
};