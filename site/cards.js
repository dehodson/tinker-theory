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

function getTypesFromDeck(deck){
    var cardTypes = [];
    for(var i = 0; i < deck.length; i++){
        var types = deck[i].types || [];
        for(var j = 0; j < types.length; j++){
            if(cardTypes.indexOf(types[j]) === -1){
                cardTypes.push(types[j]);
            }
        }
    }
    return cardTypes.sort();
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

cards = {
    "dingle": {
        title: "Dingle, the Sticky",
        image: "dingle.png",
        text: "<i>{dingle.flavortext}</i>",
        attack: 4,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Dingle"],
    },
    "mantis": {
        title: "Mantis Man",
        image: "manti.png",
        text: "<i>Buzzzzz</i>",
        attack: 7,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "core",
    },
    "sweater": {
        title: "Comfy Sweater",
        image: "sweater.png",
        text: "<i>{sweater.flavortext}</i>",
        attack: 0,
        defense: 7,
        buffa: 0,
        buffd: 0,
        expansion: "core",
    },
    "corn": {
        title: "Sweet Corn",
        image: "corn.png",
        text: "{corn.text}",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Corn"],
        globalEffect: function(obj, p1, p2){
            var cornCount = p1.typeCounter['Corn'] || 0;
            obj.text = "{corn.text} (+"+cornCount+"/+"+cornCount+")";
            obj.attack = 2 + cornCount;
            obj.defense = 2 + cornCount;
        },
    },
    "shower": {
        title: "Power Shower",
        image: "shower.png",
        text: "<span class=\"silenceable\">{shower.text}</span>",
        attack: 1,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        battleEffect: function(obj, p1, p2){for(var i = 0; i < p1.hand.length; i++){p1.hand[i].buffa += 3; p1.hand[i].buffd += 3;}}
    },
    "smug": {
        title: "Smug Fucker",
        image: "smug.png",
        text: "<span class=\"silenceable\">{smug.text}</span><br /><br /><i>{smug.flavortext}</i>",
        attack: 0,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Human"],
        battleEffect: function(obj, p1, p2){p1.drawCard(p1, p2);}
    },
    "fist": {
        title: "Flaming Fist",
        image: "fist.png",
        text: "<i>{fist.flavortext}</i>",
        attack: 5,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "core",
    },
    "wall": {
        title: "Ice Wall",
        image: "wall.png",
        text: "<i>{wall.flavortext}</i>",
        attack: 2,
        defense: 5,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Wall"],
    },
    "timmy": {
        title: "Little Timmy",
        image: "timmy.png",
        text: "<span class=\"silenceable\">{timmy.text}</span>",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Human"],
        successfulAttackEffect: function(obj, p1, p2){p1.score += 1;}
    },
    "timer": {
        title: "Dr. Time",
        image: "timer.png",
        text: "{timer.text}",
        attack: 3,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Human"],
        globalEffect: function(obj, p1, p2){obj.defense = p2.score * 2;}
    },
    "smuggy": {
        title: "Great Thinker",
        image: "smuggy.png",
        text: "<span class=\"silenceable\">{smuggy.text}</span>",
        attack: 0,
        defense: 5,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Human"],
        successfulDefenseEffect: function(obj, p1, p2){p1.drawCard(p1, p2);}
    },
    "cornwall": {
        title: "Wall of Corn",
        image: "cornwall.png",
        text: "<i>{cornwall.flavortext}</i>",
        attack: 1,
        defense: 6,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Corn", "Wall"],
    },
    "gatekeeper": {
        title: "Gatekeeper",
        image: "gatekeeper.png",
        text: "<span class=\"silenceable\">{gatekeeper.text}</span>",
        attack: 1,
        defense: 4,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Human"],
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
        text: "<span class=\"silenceable\">{shrinky.text}</span>",
        attack: 3,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Human"],
        battleEffect: function(obj, p1, p2){for(var i = 0; i < p2.hand.length; i++){p2.hand[i].buffa -= 1; p2.hand[i].buffd -= 3;}}
    },
    "normalizer": {
        title: "Normalizer Wizard",
        image: "normalizer.png",
        text: "<span class=\"silenceable\">{normalizer.text}</span>",
        attack: 5,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Mage"],
        battleEffect: function(obj, p1, p2){
            for(var i = 0; i < p2.hand.length; i++){p2.hand[i].buffa = 0; p2.hand[i].buffd = 0;}
            for(var i = 0; i < p1.hand.length; i++){p1.hand[i].buffa = 0; p1.hand[i].buffd = 0;}
        }
    },
    "mercenary": {
        title: "Medusa Mercenary",
        image: "mercenary.png",
        text: "{mercenary.text}<br /><br /><i>{mercenary.flavortext}</i>",
        attack: 1,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        globalEffect: function(obj, p1, p2){if(p2.score > p1.score){obj.attack = 10; obj.defense = 10;}else{obj.attack = 1; obj.defense = 1;}}
    },
    "electro": {
        title: "Electro-Mage",
        image: "electro.png",
        text: "<span class=\"silenceable\">{electro.text}</span>",
        attack: 7,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Human", "Mage"],
        failedAttackEffect: function(obj, p1, p2){if(p1.score > 0){p1.score -= 1;}}
    },
    "clone": {
        title: "Cosmic Clone",
        image: "clone.png",
        text: "<span class=\"silenceable\">{clone.text}</span>",
        attack: 0,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        battleEffect: function(obj, p1, p2){
            if(p1.lastCard != null){obj.attack = p1.lastCard.attack; obj.defense = p1.lastCard.defense; obj.buffa = p1.lastCard.buffa; obj.buffd = p1.lastCard.buffd;
        }}
    },
    "warrior": {
        title: "Copy-Mage",
        image: "warrior.png",
        text: "<span class=\"silenceable\">{warrior.text}</span>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Human", "Mage"],
        requiresChoice: true,
        choiceEffect: function(obj, p1, p2){
            if(p1.lastCard != null){
                if(p1.lastCard.hasOwnProperty("choiceEffect")){
                    if(p1.lastCard.hasOwnProperty("onChoice")){
                        obj.onChoice = p1.lastCard.onChoice;
                    }
                    obj.battleEffect = function(obj, p1, p2){};
                    if(p1.lastCard.choiceEffect.toString() != obj.choiceEffect.toString()){
                        obj.choiceEffect = p1.lastCard.choiceEffect;
                        return obj.choiceEffect(obj, p1, p2);
                    }
                }
            }
            return 0;
        },
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
        text: "<span class=\"silenceable\">{barrier.text}</span>",
        attack: 0,
        defense: 6,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Wall"],
        successfulDefenseEffect: function(obj, p1, p2){
            p1.score += 1;
        },
    },
    "diggy": {
        title: "Archmage Diggy",
        image: "diggy.png",
        text: "<span class=\"silenceable\">{diggy.text}</span>",
        attack: 2,
        defense: 4,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Mage", "Diggy"],
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
        text: "<span class=\"silenceable\">{farmer.text}</span>",
        attack: 4,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        battleEffect: function(obj, p1, p2){
            if(p1.lastCard != null){
                var types = p1.lastCard.types || [];
                if(types.indexOf("Corn") != -1){
                    p1.drawCard(p1, p2);
                }
            }
        }
    },
    "necro": {
        title: "Necrosplicer",
        image: "necro.png",
        text: "<span class=\"silenceable\">{necro.text}</span>",
        attack: 5,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "core",
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
        text: "<span class=\"silenceable\">{silencer.text}</span>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        battleEffect: function(obj, p1, p2){
            for(var i = 0; i < p2.hand.length; i++){
                p2.hand[i].silenced = true;
            }
        }
    },
    "duo": {
        title: "Magical Duo",
        image: "duo.png",
        text: "<span class=\"silenceable\">{duo.text}</span>",
        attack: 3,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Mage"],
        battleEffect: function(obj, p1, p2){
            if(p1.deck.length > 0){
                if(p1.nextCard != null){
                    p1.deck[nextCard].silenced = true;
                }else{
                    p1.deck[p1.deck.length - 1].silenced = true;
                }
                p1.drawCard(p1, p2);
            }
        }
    },
    "hexmage": {
        title: "Wizened Hexmage",
        image: "hexmage.png",
        text: "<span class=\"silenceable\">{hexmage.text}</span>",
        attack: 0,
        defense: 4,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Mage"],
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
        text: "{bound.status} <span class=\"silenceable\">{bound.text}</span>",
        attack: 4,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Behemoth"],
        silenced: true,
        battleEffect: function(obj, p1, p2){obj.buffa += 7; obj.buffd += 7;}
    },
    "flocking": {
        title: "Flocking Wraiths",
        image: "flocking.png",
        text: "<span class=\"silenceable\">{flocking.text}</span>",
        attack: 1,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        battleEffect: function(obj, p1, p2){
            for(var card in p1.deck){
                if(p1.deck[card].title == obj.title){p1.deck[card].buffa += 3; p1.deck[card].buffd += 3;}
            }
        }
    },
    "eternal": {
        title: "Eternal Protector",
        image: "eternal.png",
        text: "{eternal.text}<br /><br /><i>{eternal.flavortext}</i>",
        attack: 2,
        defense: 6,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        globalEffect: function(obj, p1, p2){obj.buffa = 0; obj.buffd = 0;}
    },
    "goddess": {
        title: "Renewal Goddess",
        image: "goddess.png",
        text: "<span class=\"silenceable\">{goddess.text}</span>",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "core",
        types: ["Goddess"],
        battleEffect: function(obj, p1, p2){
            var size = p1.hand.length;
            for(var i = 0; i < size; i++){p1.deck.push(p1.hand.pop());}
            shuffle(p1.deck);
            for(var i = 0; i < size; i++){p1.drawCard(p1, p2);}
        }
    },
    "cursy": {
        title: "Spiteful One",
        image: "cursy.png",
        text: "<span class=\"silenceable\">{cursy.text}</span>",
        attack: 1,
        defense: 5,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Human"],
        battleEffect: function(obj, p1, p2){
            var max = p2.deck.length < 2 ? p2.deck.length : 2;
            for(var i = 0; i < max; i++){p2.deck[(p2.deck.length - 1) - i].cursed = true;}
        }
    },
    "maniac": {
        title: "Hex Maniac",
        image: "maniac.png",
        text: "<span class=\"silenceable\">{maniac.text}</span>",
        attack: 2,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Human"],
        battleEffect: function(obj, p1, p2){
            var found = false;
            for(var i = 0; i < p2.deck.length; i++){if(p2.deck[i].cursed){found = true;}}
            if(found){obj.buffa += 3; obj.buffd += 3;}
        }
    },
    "idol":  {
        title: "Cursed Idol",
        image: "idol.png",
        text: "{idol.text}<br /><br /><i>{idol.flavortext}</i>",
        attack: 6,
        defense: 6,
        buffa: 0,
        buffd: 0,
        cursed: true,
        expansion: "cogs",
    },
    "unsweet": {
        title: "Unsweet Corn",
        image: "unsweet.png",
        text: "<span class=\"silenceable\">{unsweet.text}</span>",
        attack: 5,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Corn"],
        battleEffect: function(obj, p1, p2){
            var cornCount = p1.typeCounter['Corn'] || 0;
            if(cornCount > 2){
                for(var i = 0; i < p2.hand.length; i++){
                    p2.hand[i].buffa -= 2; p2.hand[i].buffd -= 2;
                }
            }
        }
    },
    "demoness": {
        title: "Chaos Goddess",
        image: "demoness.png",
        text: "<span class=\"silenceable\">{demoness.text}</span>",
        attack: 3,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Goddess"],
        battleEffect: function(obj, p1, p2){
            var size = p2.hand.length;
            for(var i = 0; i < size; i++){p2.deck.push(p2.hand.pop());}
            shuffle(p2.deck);
            for(var i = 0; i < 2; i++){p2.drawCard(p1, p2);}
        }
    },
    "liquid": {
        title: "Caustic Liquid",
        image: "liquid.png",
        text: "<span class=\"silenceable\">{liquid.text}</span>",
        attack: 3,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        battleEffect: function(obj, p1, p2){for(var i = 0; i < p1.hand.length; i++){p1.hand[i].buffa += 5; p1.hand[i].buffd += 5;  p1.hand[i].cursed = true;}}
    },
    "bastard": {
        title: "Battery Bastard",
        image: "bastard.png",
        text: "<span class=\"silenceable\">{bastard.text}</span><br /><br /><i>{bastard.flavortext}</i>",
        attack: 6,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        successfulAttackEffect: function(obj, p1, p2){
            p1.charge += 4;
        }
    },
    "matrix": {
        title: "Defense Matrix",
        image: "matrix.png",
        text: "<span class=\"silenceable\">{matrix.text}</span>",
        attack: 1,
        defense: 5,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        battleEffect: function(obj, p1, p2){for(var i = 0; i < p1.hand.length; i++){p1.hand[i].buffd += p1.charge}}
    },
    "electrotimmy": {
        title: "Electro-Timmy",
        image: "electrotimmy.png",
        text: "<span class=\"silenceable\">{electrotimmy.text}</span>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        battleEffect: function(obj, p1, p2){
            if(p1.charge >= 3){
                p1.score += 1;
                p1.charge -= 3;
            }
        }
    },
    "coffee": {
        title: "Wizard Coffee",
        image: "coffee.png",
        text: "<span class=\"silenceable\">{coffee.text}</span><br /><br /><i>{coffee.flavortext}</i>",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        battleEffect: function(obj, p1, p2){
            for(var card in p1.deck){
                var types = p1.deck[card].types || [];
                if(types.indexOf("Mage") !== -1){
                    p1.deck[card].buffa += 2;
                }
            }
        }
    },
    "hexbot": {
        title: "Hexbot",
        image: "hexbot.png",
        text: "<span class=\"silenceable\">{hexbot.text}</span>",
        attack: 2,
        defense: 4,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        battleEffect: function(obj, p1, p2){
            if(p1.charge >= 3){
                p1.charge -= 3;
                for(var i = 0; i < p2.hand.length; i++){
                    p2.hand[i].cursed = true;
                }
            }
        }
    },
    "ai": {
        title: "AI Researcher",
        image: "ai.png",
        text: "<span class=\"silenceable\">{ai.text}</span>",
        attack: 5,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Human"],
        battleEffect: function(obj, p1, p2){
            if(p1.charge >= 1 && p1.deck.length > 0){
                p1.drawCard(p1, p2);
                p1.charge -= 1;
            }
        }
    },
    "lil": {
        title: "Lil' Battery Bug",
        image: "lil.png",
        text: "<span class=\"silenceable\">{lil.text}</span><br /><br /><i>{lil.flavortext}</i>",
        attack: 1,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        battleEffect: function(obj, p1, p2){
            p1.charge += 5;
        }
    },
    "stone": {
        title: "Heaven Stone",
        image: "stone.png",
        text: "<span class=\"silenceable\">{stone.text}</span>",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        battleEffect: function(obj, p1, p2){
            for(var card in p1.deck){
                var types = p1.deck[card].types || [];
                if(types.indexOf("Goddess") !== -1){
                    p1.nextCard = card;
                    p1.deck[card].buffa += 3;
                    p1.drawCard(p1, p2);
                    break;
                }
            }
        }
    },
    "electricsilencer": {
        title: "Electric Silencer",
        image: "electricsilencer.png",
        text: "<span class=\"silenceable\">{electricsilencer.text}</span>",
        attack: 1,
        defense: 6,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
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
        image: "hulk.png",
        text: "<span class=\"silenceable\">{hulk.text}</span>",
        attack: 9,
        defense: 9,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Behemoth"],
        battleEffect: function(obj, p1, p2){
            for(var i in p1.hand){
                p1.hand[i].buffa -= 3; p1.hand[i].buffd -= 3;
            }
        }
    },
    "knowledge": {
        title: "Knowledge Feaster",
        image: "knowledge.png",
        text: "{knowledge.text}",
        attack: 0,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        globalEffect: function(obj, p1, p2){obj.attack = p1.hand.length; obj.defense = p1.hand.length;},
    },
    "proof": {
        title: "Hexproof Barrier",
        image: "proof.png",
        text: "{proof.text}<br /><br /><i>{proof.flavortext}</i>",
        attack: 0,
        defense: 6,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Wall"],
        globalEffect: function(obj, p1, p2){
            obj.cursed = false;
        },
    },
    "drainer": {
        title: "Curse Drainer",
        image: "drainer.png",
        text: "<span class=\"silenceable\">{drainer.text}</span>",
        attack: 0,
        defense: 5,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Human"],
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
        image: "mech.png",
        text: "<span class=\"silenceable\">{mech.text}</span>",
        attack: 4,
        defense: 4,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Human"],
        battleEffect: function(obj, p1, p2){if(p1.charge >= 4){p1.charge -= 4; obj.buffa += 4; obj.buffd += 4;}}
    },
    "apprentice": {
        title: "Diggy's Apprentice",
        image: "apprentice.png",
        text: "<span class=\"silenceable\">{apprentice.text}</span>",
        attack: 4,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Diggy"],
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
        image: "potion.png",
        text: "<span class=\"silenceable\">{potion.text}</span>",
        attack: 4,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
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
        image: "totem.png",
        text: "<span class=\"silenceable\">{revenge.text}</span>",
        attack: 2,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        battleEffect: function(obj, p1, p2){
            if(p1.lastCard){
                for(var card in p2.hand){
                    if(p1.lastCard.silenced){p2.hand[card].silenced = true;}if(p1.lastCard.cursed){p2.hand[card].cursed = true;}
                }
            }
        }
    },
    "socket": {
        title: "Socket Wall",
        image: "socket.png",
        text: "<span class=\"silenceable\">{socket.text}</span><br /><br /><i>{socket.flavortext}</i>",
        attack: 1,
        defense: 6,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Wall"],
        battleEffect: function(obj, p1, p2){
            p1.charge += 2;
        },
    },
    "artifact": {
        title: "Curious Artifact",
        image: "artifact.png",
        text: "{artifact.text}<br /><span class=\"silenceable\">{artifact.text2}</span>",
        attack: 0,
        defense: 0,
        buffa: 0,
        buffd: 0,
        cursed: true,
        expansion: "cogs",
        battleEffect: function(obj, p1, p2){
            if(obj.buffa + obj.attack < -9 && obj.buffd + obj.defense < -9){
                p1.score += 2;
            }
        }
    },
    "mason": {
        title: "Mad Mason",
        image: "mason.png",
        text: "<span class=\"silenceable\">{mason.text}</span>",
        attack: 6,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        battleEffect: function(obj, p1, p2){
            for(var card in p1.deck){
                var types = p1.deck[card].types || [];
                if(types.indexOf("Wall") !== -1){
                    p1.nextCard = card;
                    break;
                }
            }
        }
    },
    "thief": {
        title: "Juice Thief",
        image: "thief.png",
        text: "<span class=\"silenceable\">{thief.text}</span>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Human"],
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
        image: "conjurer.png",
        text: "<span class=\"silenceable\">{conjurer.text}</span>",
        attack: 2,
        defense: 4,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Elf", "Mage"],
        battleEffect: function(obj, p1, p2){
            if(p2.hand.length == 0){
                return;
            }

            var best = 0;
            var index = 0;
            for(var card in p2.hand){
                if(p2.hand[card].attack + p2.hand[card].buffa > best){index = card; best = p2.hand[card].attack + p2.hand[card].buffa}
            }
            p2.hand[index] = clone(tokens['pig']);
        }
    },
    "peeper": {
        title: "Peeper",
        image: "peeper.png",
        text: "<span class=\"silenceable\">{peeper.text}</span><br /><br /><i>{peeper.flavortext}</i>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Human"],
        battleEffect: function(obj, p1, p2){
            p1.connection.emit("enemy hand", {hand: p2.hand, what: "Their hand:"});
        }
    },
    "crier": {
        title: "Rallying Crier",
        image: "crier.png",
        text: "{crier.text}",
        attack: 3,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Human"],
        drawEffect: function(obj, p1, p2){
            if(p1){
                for(var i in p1.hand){
                    p1.hand[i].buffa += 1; p1.hand[i].buffd += 1;
                }
            }
        }
    },
    "twins": {
        title: "The Three Twins",
        image: "twins.png",
        text: "{twins.text}",
        attack: 2,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Human"],
        startTurnInHandEffect: function(obj, p1, p2){
            var count = 0;
            for(var i in p1.hand){
                if(p1.hand[i].title == obj.title){
                    count += 1;
                }
            }
            if(count >= 3){
                obj.attack = 9; obj.defense = 9;
            }
        }
    },
    "tricks": {
        title: "Bag of Tricks",
        image: "tricks.png",
        text: "<span class=\"silenceable\">{tricks.text}</span>",
        attack: 0,
        defense: 4,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        battleEffect: function(obj, p1, p2){
            var random = Math.random();
            if(random <= .333){
                if(p2.nextCard){
                    p2.deck[nextCard].buffa -= 3;
                    p2.deck[nextCard].buffd -= 3;
                }else{
                    if(p2.deck.length > 0){
                        p2.deck[p2.deck.length - 1].buffa -= 3;
                        p2.deck[p2.deck.length - 1].buffd -= 3;
                        obj.text = "Randomly chosen trick: Give -3/-3 to your opponent's next card.";
                    }
                }
            }else if(random <= .666){
                if(p2.nextCard){
                    p2.deck[nextCard].cursed = true;
                }else{
                    if(p2.deck.length > 0){
                        p2.deck[p2.deck.length - 1].cursed = true;
                        obj.text = "Randomly chosen trick: Curse your opponent's next card.";
                    }
                }
            }else{
                if(p2.nextCard){
                    p2.deck[nextCard].silenced = true;
                }else{
                    if(p2.deck.length > 0){
                        p2.deck[p2.deck.length - 1].silenced = true;
                        obj.text = "Randomly chosen trick: Silence your opponent's next card.";
                    }
                }
            }
        }
    },
    "spackler": {
        title: "Supreme Spackler",
        image: "spackler.png",
        text: "<span class=\"silenceable\">{spackler.text}</span>",
        attack: 5,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Human"],
        battleEffect: function(obj, p1, p2){
            for(var card in p1.deck){
                var types = p1.deck[card].types || [];
                if(types.indexOf("Wall") !== -1){
                    p1.deck[card].buffd += 1;
                }
            }
        }
    },
    "staff": {
        title: "Diggy's Staff",
        image: "staff.png",
        text: "<span class=\"silenceable\">{staff.text}</span>",
        attack: 1,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Diggy"],
        battleEffect: function(obj, p1, p2){
            for(var card in p1.hand){
                var types = p1.deck[card].types || [];
                if(types.indexOf("Diggy") !== -1){
                    p1.hand[card].buffa += 3; p1.hand[card].buffd += 3;
                }
                p1.hand[card].buffa += 1; p1.hand[card].buffd += 1;
            }
        }
    },
    "pummeler": {
        title: "Power-Pummeler",
        image: "pummeler.png",
        text: "{pummeler.text}",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        startTurnInHandEffect: function(obj, p1, p2){
            if(p1.charge >= 1){
                obj.buffa += 2; obj.buffd += 2; p1.charge -= 1;
            }
        }
    },
    "lightning": {
        title: "Lightning Dingle",
        image: "lightning.png",
        text: "<span class=\"silenceable\">{lightning.text}</span><br /><br /><i>{lightning.flavortext}</i>",
        attack: 3,
        defense: 4,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Dingle"],
        battleEffect: function(obj, p1, p2){p1.charge += 2;}
    },
    "spirit": {
        title: "Trickster Spirit",
        image: "spirit.png",
        text: "{spirit.text}",
        attack: 8,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        startTurnInHandEffect: function(obj, p1, p2){
            if(p1.score >= 5){
                obj = clone(tokens['pig']);
            }
        }
    },
    "washer": {
        title: "Steam Cleaner",
        image: "washer.png",
        text: "<span class=\"silenceable\">{washer.text}</span>",
        attack: 2,
        defense: 5,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        battleEffect: function(obj, p1, p2){
            if(p1.charge >= 5){
                for(var card in p1.hand){
                    if(p1.hand[card].buffa < 0){p1.hand[card].buffa = 0}
                    if(p1.hand[card].buffd < 0){p1.hand[card].buffd = 0}
                }
                p1.charge -= 5;
            }
        }
    },
    "statue": {
        title: "Awakening Statue",
        image: "statue.png",
        text: "<span class=\"silenceable\">{statue.text}</span>",
        attack: 6,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        successfulAttackEffect: function(obj, p1, p2){
            for(var i = 0; i < p1.hand.length; i++){
                p1.hand[i].silenced = false;
            }
        }
    },
    "harbinger": {
        title: "Harbinger of Doom",
        image: "harbinger.png",
        text: "<span class=\"silenceable\">{harbinger.text}</span>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Human"],
        battleEffect: function(obj, p1, p2){
            var found = false;
            for(var i = 0; i < p1.hand.length; i++){
                var types = p1.hand[i].types || [];
                if(types.indexOf("Behemoth") !== -1){
                    found = true;
                }
            }
            if(found){
                obj.buffa += 3;
                obj.buffd += 3;
            }
        }
    },
    "future": {
        title: "Fortune Teller",
        image: "future.png",
        text: "<span class=\"silenceable\">{future.text}</span>",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
        types: ["Human"],
        battleEffect: function(obj, p1, p2){
            if(p1.deck.length > 1){
                var top = [];
                var num = 5;
                if(p1.deck.length < 5){
                    num = p1.deck.length;
                }
                for(var i = 2; i < num; i++){
                    top.push(p1.deck[p1.deck.length - i]);
                }
                p1.connection.emit("enemy hand", {hand: top, what: "Top three cards of your deck:"});
            }
        }
    },
    "pearly-gates": {
        title: "Pearly Gates",
        image: "pearly-gates.png",
        text: "<span class=\"silenceable\">When you play it, bless all cards in your hand.</span>",
        attack: 0,
        defense: 6,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Wall"],
        battleEffect: function(obj, p1, p2){
            for(var i = 0; i < p1.hand.length; i++){
                p1.hand[i].blessed = true;
            }
        }
    },
    "flocking-seraphs": {
        title: "Flocking Seraphs",
        image: "flocking-seraphim.png",
        text: "<span class=\"silenceable\">When you play them, other copies of them in your deck get +3/-3.</span>",
        attack: 1,
        defense: 7,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        battleEffect: function(obj, p1, p2){
            for(var card in p1.deck){
                if(p1.deck[card].title == obj.title){p1.deck[card].buffa += 3; p1.deck[card].buffd -= 3;}
            }
        }
    },
    "pope-uniqueness": {
        title: "Pope Uniqueness X",
        image: "pope-uniqueness.png",
        text: "<span class=\"silenceable\">When you play him, if your starting deck had no duplicates, you get 2 points.</span>",
        attack: 0,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Human"],
        battleEffect: function(obj, p1, p2){
            var seen = {};
            for(var card in p1.originalDeck){
                if(seen.hasOwnProperty(p1.originalDeck[card].title)){
                    return;
                }
                seen[p1.originalDeck[card].title] = true;
            }
            p1.score += 2;
        }
    },
    "blessed-idol": {
        title: "Blessed Idol",
        image: "blessed-idol.png",
        text: "Starts blessed.<br /><br /><i>This is one idol you should definitely worship.</i>",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        blessed: true,
        expansion: "blessed",
    },
    "wholly-water": {
        title: "Wholly Water",
        image: "wholly-water.png",
        text: "<span class=\"silenceable\">When you play it, bless the next card you draw.</span>",
        attack: 2,
        defense: 5,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        battleEffect: function(obj, p1, p2){
            if(p1.deck.length > 0){
                if(p1.nextCard != null){
                    p1.deck[nextCard].blessed = true;
                }else{
                    p1.deck[p1.deck.length - 1].blessed = true;
                }
            }
        },
    },
    "archfiend-diggy": {
        title: "Archfiend Diggy",
        image: "archfiend-diggy.png",
        text: "<span class=\"silenceable\">When you play him, curse all other copies of the last card your opponent played.</span>",
        attack: 5,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Diggy"],
        battleEffect: function(obj, p1, p2){
            if(p2.lastCard != null){
                for(var card in p2.deck){
                    if(p2.deck[card].title == p2.lastCard.title){p2.deck[card].cursed = true;}
                }
                for(var card in p2.hand){
                    if(p2.hand[card].title == p2.lastCard.title){p2.hand[card].cursed = true;}
                }
            }
        },
    },
    "radiant-goddess": {
        title: "Radiant Goddess",
        image: "radiant-goddess.png",
        text: "<span class=\"silenceable\">Shuffle your hand into your deck when you play her. Draw two cards and bless them.</span>",
        attack: 0,
        defense: 4,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Goddess"],
        battleEffect: function(obj, p1, p2){
            var size = p1.hand.length;
            for(var i = 0; i < size; i++){
                p1.deck.push(p1.hand.pop());
            }
            shuffle(p1.deck);
            for(var i = 0; i < 2; i++){
                if(p1.deck.length > 0){
                    if(p1.nextCard != null){
                        p1.deck[nextCard].blessed = true;
                    }else{
                        p1.deck[p1.deck.length - 1].blessed = true;
                    }
                }
                p1.drawCard(p1, p2);
            }
        }
    },
    "even-stephen": {
        title: "Even Stephen",
        image: "even-stephen.png",
        text: "<span class=\"silenceable\">When you play him, if your starting deck had all even stats, double your hand's stats.</span>",
        attack: 4,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Human"],
        battleEffect: function(obj, p1, p2){
            for(var card in p1.originalDeck){
                if(p1.originalDeck[card].attack % 2 == 1 ||
                   p1.originalDeck[card].defense % 2 == 1) {
                    return;
                }
            }
            for(var i = 0; i < p1.hand.length; i++){
                p1.hand[i].buffa += p1.hand[i].buffa + p1.hand[i].attack;
                p1.hand[i].buffd += p1.hand[i].buffd + p1.hand[i].defense;
            }
        }
    },
    "smug-saint": {
        title: "Smug Saint",
        image: "smug-saint.png",
        text: "<span class=\"silenceable\">Choose one: Give Smug Saint +3/+3, or draw a card.</span>",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Human"],
        requiresChoice: true,
        choiceEffect: function(obj, p1, p2){
            p1.connection.emit("choose", {
                what: obj.title,
                choices: [
                    obj.title+" gets +3/+3.",
                    "Draw a card.",
                ],
            });
        },
        onChoice: function(obj, p1, p2, choice){
            if(choice === 0){
                obj.text = "<span class=\"silenceable\">Chosen: Give "+obj.title+" +3/+3.</span>"
                obj.buffa += 3;
                obj.buffd += 3;
            }else{
                obj.text = "<span class=\"silenceable\">Chosen: Draw a card.</span>"
                obj.battleEffect = function(obj, p1, p2){
                    p1.drawCard(p1, p2);
                }
            }
        },
    },
    "searching-scribe": {
        title: "Searching Scribe",
        image: "searching-scribe.png",
        text: "<span class=\"silenceable\">When you play her, search your deck for a card and draw it.</span>",
        attack: 1,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Human"],
        requiresChoice: true,
        choiceEffect: function(obj, p1, p2){
            if(p1.deck.length === 0){
                return 0;
            }

            p1.connection.emit("choose", {
                what: obj.title,
                choices: p1.deck,
                type: 'card',
            });
        },
        onChoice: function(obj, p1, p2, choice){
            var reference = p1.deck[choice];
            obj.battleEffect = function(obj, p1, p2){
                for(var i = 0; i < p1.deck.length; i++){
                    if(p1.deck[i] === reference){
                        p1.nextCard = i;
                        p1.drawCard(p1, p2);
                        break;
                    }
                }
            }
        },
    },
    "inspiring-leader": {
        title: "Inspiring Leader",
        image: "inspiring-leader.png",
        text: "<span class=\"silenceable\">When you play them, pick a card type. All cards of that type in your deck get +1/+1.</span>",
        attack: 5,
        defense: 5,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Human"],
        requiresChoice: true,
        choiceEffect: function(obj, p1, p2){
            var allTypes = getTypesFromDeck(p1.deck);
            if(allTypes.length === 0){
                return 0;
            }

            p1.connection.emit("choose", {
                what: obj.title,
                choices: allTypes,
            });
        },
        onChoice: function(obj, p1, p2, choice){
            var chosenType = getTypesFromDeck(p1.deck)[choice];
            obj.text = "<span class=\"silenceable\">When you play them, pick a card type. All cards of that type in your deck get +1/+1.<br>Chosen type: <b>"+chosenType+"</b></span>",
            obj.battleEffect = function(obj, p1, p2){
                for(var i = 0; i < p1.deck.length; i++){
                    var types = p1.deck[i].types || [];
                    if(types.indexOf(chosenType) !== -1){
                        p1.deck[i].buffa += 1;
                        p1.deck[i].buffd += 1;
                    }
                }
            }
        },
    },
    "dingles-disciple": {
        title: "Dingle's Disciple",
        image: "dingles-disciple.png",
        text: "Its stats grow with every dingle you play.<br><br><i>The \"holy shit\" they're talking about.</i>",
        attack: 4,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Dingle"],
        globalEffect: function(obj, p1, p2){
            var dingleCount = p1.typeCounter['Dingle'] || 0;
            obj.text = "Its stats grow with every dingle you play. (+"+dingleCount+"/+"+dingleCount+")<br><br><i>The \"holy shit\" they're talking about.</i>";
            obj.attack = 4 + dingleCount;
            obj.defense = 2 + dingleCount;
        },
    },
    "damned-collective": {
        title: "Damned Collective",
        image: "damned-collective.png",
        text: "<span class=\"silenceable\">If you've played at least 5 Human cards when you play it, curse your opponent's hand.</span>",
        attack: 0,
        defense: 4,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        battleEffect: function(obj, p1, p2){
            var humanCount = p1.typeCounter['Human'] || 0;
            if(humanCount >= 5){
                for(var i = 0; i < p2.hand.length; i++){
                    p2.hand[i].cursed = true;
                }
            }
        }
    },
    "blessing-borrower": {
        title: "Blessing Borrower",
        image: "160x100.png",
        text: "If she's in your hand, she becomes blessed when you play a card that's blessed.",
        attack: 6,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        onCardPlayedEffect: function(obj, p1, p2){
            if(p1.card.blessed === true){
                for(var i = 0; i < p1.hand.length; i++){
                    if(p1.hand[i] === obj){
                        obj.blessed = true;
                        break;
                    }
                }
            }
        },
    },
    "amish-cheerleader": {
        title: "Amish Cheerleader",
        image: "160x100.png",
        text: "If he's in your hand, cards you play get +1/+1.",
        attack: 3,
        defense: 3,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Human"],
        onCardPlayedEffect: function(obj, p1, p2){
            for(var i = 0; i < p1.hand.length; i++){
                if(p1.hand[i] === obj){
                    p1.card.buffa += 1;
                    p1.card.buffd += 1;
                    break;
                }
            }
        },
    },
    "fallen-behemoth": {
        title: "Fallen Behemoth",
        image: "160x100.png",
        text: "<span class=\"silenceable\">When you play it, curse the top five cards of your deck.</span>",
        attack: 8,
        defense: 8,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Behemoth"],
        battleEffect: function(obj, p1, p2){
            var max = p1.deck.length < 5 ? p2.deck.length : 5;
            for(var i = 0; i < max; i++){
                p1.deck[(p1.deck.length - 1) - i].cursed = true;
            }
        }
    },
    "predict-a-bill": {
        title: "Predict-a-Bill",
        image: "160x100.png",
        text: "<span class=\"silenceable\">When you play him, guess what card your opponent will play next. If you're right, he gets +4/+4.</span>",
        attack: 4,
        defense: 4,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Human"],
        requiresChoice: true,
        choiceEffect: function(obj, p1, p2){
            if(p2.hand.length === 0){
                return 0;
            }

            p1.connection.emit("choose", {
                what: obj.title,
                choices: p2.hand,
                type: 'card',
            });
        },
        onChoice: function(obj, p1, p2, choice){
            var reference = p2.hand[choice].title;
            obj.battleEffect = function(obj, p1, p2){
                if(p2.card.title === reference){
                    obj.buffa += 4;
                    obj.buffd += 4;
                }
            }
        },
    },
    "battering-ram": {
        title: "Battering Ram",
        image: "160x100.png",
        text: "When you play a wall, you'll draw a copy of it next.<br><br><i>Bringing the bleatdown.</i>",
        attack: 6,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        onCardPlayedEffect: function(obj, p1, p2){
            var types = p1.card.types || [];
            if(types.indexOf("Wall") !== -1){
                for(var card in p1.deck){
                    if(p1.deck[card] === obj){
                        p1.nextCard = card;
                        break;
                    }
                }
            }
        }
    },
    "electric-wafer": {
        title: "Electric Wafer",
        image: "160x100.png",
        text: "<span class=\"silenceable\">Choose one: Gain 3 charge, or spend 3 charge and bless all cards in your hand.</span>",
        attack: 6,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: [],
        requiresChoice: true,
        choiceEffect: function(obj, p1, p2){
            p1.connection.emit("choose", {
                what: obj.title,
                choices: [
                    "Gain 3 charge.",
                    "Spend 3 charge and bless all cards in your hand.",
                ],
            });
        },
        onChoice: function(obj, p1, p2, choice){
            if(choice === 0){
                obj.text = "<span class=\"silenceable\">Chosen: Gain 3 charge.</span>";
                obj.battleEffect = function(obj, p1, p2){
                    p1.charge += 3;
                };
            }else{
                obj.text = "<span class=\"silenceable\">Chosen: Spend 3 charge and bless all cards in your hand.</span>"
                obj.battleEffect = function(obj, p1, p2){
                    if(p1.charge >= 3){
                        for(var i = 0; i < p1.hand.length; i++){
                            p1.hand[i].blessed = true;
                        }
                        p1.charge -= 3;
                    }
                };
            }
        },
    },
    "heretical-scholar": {
        title: "Heretical Scholar",
        image: "160x100.png",
        text: "<span class=\"silenceable\">When you play her, draw two cards.</span>",
        attack: 0,
        defense: 0,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: [],
        battleEffect: function(obj, p1, p2){
            p1.drawCard(p1, p2);
            p1.drawCard(p1, p2);
        },
    },
    "elven-convoy": {
        title: "Elven Convoy",
        image: "160x100.png",
        text: "<span class=\"silenceable\">When you play it, add a 2/2 Elf to your hand.</span>",
        attack: 6,
        defense: 2,
        buffa: 0,
        buffd: 0,
        expansion: "blessed",
        types: ["Elf"],
        battleEffect: function(obj, p1, p2){
            p1.hand.push(clone(tokens['elf']));
        },
    },
};

tokens = {
    "pig": {
        id: "pig",
        title: "Pig",
        image: "pig.png",
        text: "<i>Oink.</i>",
        attack: 1,
        defense: 1,
        buffa: 0,
        buffd: 0,
        expansion: "cogs",
    },
    "elf": {
        id: "elf",
        title: "Elf",
        image: "pig.png",
        text: "<i>Elf.</i>",
        attack: 2,
        defense: 2,
        buffa: 0,
        buffd: 0,
        types: ["Elf"],
        expansion: "blessed",
    },
}
