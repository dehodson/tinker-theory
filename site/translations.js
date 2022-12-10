const supportedLanguages = ['en', 'fr'];
let userLanguage = navigator.language || 'en';

for (let lang of navigator.languages) {
  let normalized = lang.split('-')[0];
  if (supportedLanguages.indexOf(normalized) >= 0) {
    userLanguage = normalized;
    break;
  }
}

i18next.init({
  lng: userLanguage,
  debug: true,
  resources: {
    en: {
      translation: {
        "ui": {
          "battlelog": "Battle Log",
          "quickmatch": "Quick Match",
          "challengefriend": "Challenge a Friend",
          "deckbuilder": "Build a Deck",
          "rulesbutton": "Rules",
          "rules": {
            "howtoplay": "How to Play",
            "objective": "The object of the game is to score as many points as possible. Each turn, you pick a card from your hand to play against your opponent. You score a point when you're attacking and your card's attack exceeds your opponent's card's defense. The game is over after twenty turns.",
            "attackanddefend": "Attacking and Defending",
            "statistics": "When the game starts, a coin will flip and the attacking player will be chosen. If you are on the <b>attack</b> and your card's attack (looks like this: <span style='background-color:#FAA;border-radius:1vmin;padding:.25vmin .5vmin;'>9<img style='height:1.5vmin;width:1.5vmin;' src='sword.svg' /></span>) exceeds their card's defense (looks like this: <span style='background-color:#AAF;border-radius:1vmin;padding:.25vmin .5vmin;'><img style='height:1.5vmin;width:1.5vmin;' src='shield.svg' />4</span>) you will gain a point, and you get to attack again! If you are on the <b>defense</b> and your card's defense exceeds their card's attack, then you will get a turn to attack!",
            "cardeffects": "Card Effects",
            "effects": "Certain cards have additional effects. If a card has an additional effect, it will be written on the card. Those effects may take action when played in battle, when you successfully attack with them, successfully defend with them, or in other situations. The card will tell you when the effect will occur.",
            "buffsanddebuffs": "Buffs and Debuffs",
            "buffs": "Certain cards improve the stats of cards. Other cards lower the stats of cards. A card is <b>buffed</b> if it has greater stats than its normal stats. A card is <b>debuffed</b> if it has lower stats than its normal stats.",
            "effectsilenced": "Silenced",
            "silenced": "If a card is <b>silenced</b>, it will say so on its card and its text will be struck out. Card effects that trigger in battle will not trigger if the card is silenced. Effects that trigger elsewhere, such as in hand, will not be stopped. Effects that determine a card's attack and defense, such as Medusa Mercenary's effect \"If you're losing, she's a 10/10.\" will also not be stopped.",
            "effectcursed": "Cursed",
            "cursed": "If a card is <b>cursed</b>, it will say so on its card. Whenever a turn starts, every cursed card in a player's hand loses one attack and one defense.",
            "effectcharge": "Charge",
            "charge": "Certain cards allow you to gain <b>charge</b>. Think of charge like a currency you can spend. If a card requires you to spend charge, its effect will not happen unless you have enough charge to spend on it.",
            "effectblessed": "Blessed",
            "blessed": "If a card is <b>blessed</b>, it will say so on its card. Whenever a turn starts, every blessed card in a player's hand gains an additional one attack and one defense.",
            "deckbuilding": "Deckbuilding",
            "howtobuild": "A deck must contain twenty cards, no more and no less. A maximum of three of each card is enforced.",
          },
        },
        "dingle": {
          "flavortext": "Something smells!"
        },
        "sweater": {
          "flavortext": "It's almost too warm."
        },
        "corn": {
          "text": "Its stats grow with every corn you play."
        },
        "shower": {
          "text": "Gives all cards in your hand +3/+3 when you play it."
        },
        "smug": {
          "text": "When you play him, draw a card.",
          "flavortext": "Nobody likes a know it all."
        },
        "fist": {
          "flavortext": "Sock it to me."
        },
        "wall": {
          "flavortext": "No, I don't know how a wall attacks either. Make your own card game."
        },
        "timmy": {
          "text": "If you win an attack with him, you get an extra point."
        },
        "timer": {
          "text": "His defense is equal to twice your opponent's score."
        },
        "smuggy": {
          "text": "If you successfully defend with him, draw a card."
        },
        "cornwall": {
          "flavortext": "The best defense is a good corn fence."
        },
        "gatekeeper": {
          "text": "When you play him, you'll draw your best attacker next."
        },
        "shrinky": {
          "text": "Gives all cards in your opponent's hand -1/-3 when you play it."
        },
        "normalizer": {
          "text": "Removes all buffs and debuffs from cards in each player's hand when you play it."
        },
        "mercenary": {
          "text": "If you're losing, she's a 10/10.",
          "flavortext": "Lazy until it's go time."
        },
        "electro": {
          "text": "If you lose an attack with her, you lose a point."
        },
        "clone": {
          "text": "It copies the stats of the last card you played."
        },
        "warrior": {
          "text": "He copies the battle effects of the last card you played."
        },
        "barrier": {
          "text": "If you successfully defend with it, you get a point."
        },
        "diggy": {
          "text": "When you play him, give all other copies of the last card your opponent played -2/-2."
        },
        "farmer": {
          "text": "If the last card you played was a corn card, draw a card."
        },
        "necro": {
          "text": "When you play him, your opponent's hand's stats are averaged together."
        },
        "silencer": {
          "text": "When you play him, silence all cards in your opponent's hand."
        },
        "duo": {
          "text": "When you play them, draw a card, but silence it."
        },
        "hexmage": {
          "text": "When you play him, unsilence all cards in your hand. He gets +1/+0 for each."
        },
        "bound": {
          "text": "When you play it, it gets +7/+7.",
          "status": "Starts silenced."
        },
        "flocking": {
          "text": "When you play them, other copies of them in your deck get +3/+3."
        },
        "eternal": {
          "text": "It can't be buffed or debuffed.",
          "flavortext": "Ever standing, ever watchful."
        },
        "goddess": {
          "text": "Shuffle your hand into your deck when you play her. Draw that many cards."
        },
        "cursy": {
          "text": "When you play her, curse the top two cards of your opponent's deck.",
        },
        "maniac": {
          "text": "When you play him, if your opponent's deck contains a cursed card, he gets +3/+3.",
        },
        "idol":  {
          "text": "Starts cursed.",
          "flavortext": "Known to the state of California to cause curses.",
        },
        "unsweet": {
          "text": "If you've played at least 3 corn cards when you play it, cards in your opponent's hand get -2/-2.",
        },
        "demoness": {
          "text": "Shuffle your opponent's hand into their deck when you play her. They draw two cards.",
        },
        "liquid": {
          "text": "Gives all cards in your hand +5/+5 when you play it, but curses them.",
        },
        "bastard": {
          "text": "If you successfully attack with him, gain 4 charge.",
          "flavortext": "His cup size is AAA."
        },
        "matrix": {
          "text": "When you play it, cards in your hand get +1 defense for every charge you have.",
        },
        "electrotimmy": {
          "text": "When you play him, spend 3 charge and gain a point.",
        },
        "coffee": {
          "text": "When you play it, all mages in your deck get +2 attack.",
          "flavortext": "\"Order for Saruman!\"",
        },
        "hexbot": {
          "text": "When you play it, spend 3 charge and curse all cards in your opponent's hand.",
        },
        "ai": {
          "text": "When you play her, spend 1 charge and draw a card.",
        },
        "lil": {
          "text": "When you play it, gain 5 charge.",
          "flavortext": "Zap!",
        },
        "stone": {
          "text": "When you play it, draw a goddess. That goddess gets +3/+0.",
        },
        "electricsilencer": {
          "text": "When you play him, spend 3 charge and silence all cards in your opponent's hand.",
        },
        "hulk": {
          "text": "When you play it, cards in your hand get -3/-3.",
        },
        "knowledge": {
          "text": "Its stats are equal to the number of cards in your hand.",
        },
        "proof": {
          "text": "It can't be cursed.",
          "flavortext": "One time a big horse shaped hex tricked it, though.",
        },
        "drainer": {
          "text": "If you successfully defend with him, uncurse your hand. Gain 1 charge for each.",
        },
        "mech": {
          "text": "When you play him, spend 4 charge and he gets +4/+4.",
        },
        "apprentice": {
          "text": "When you play him, silence all other copies of the last card your opponent played.",
        },
        "potion": {
          "text": "Spend all your charge when you play it. Cards in your hand get +1/+0 for each.",
        },
        "revenge": {
          "text": "If the last card you played was cursed or silenced, curse or silence your opponent's hand.",
        },
        "socket": {
          "text": "When you play it, gain 2 charge.",
          "flavortext": "Defeated by childproof safety plugs.",
        },
        "artifact": {
          "text": "Starts cursed.",
          "text2": "When you play it, if both of its stats are below -9, you gain two points.",
        },
        "mason": {
          "text": "If you fail to attack with him, you'll draw a wall next.",
        },
        "thief": {
          "text": "When you play her, steal up to 2 charge from your opponent.",
        },
        "conjurer": {
          "text": "When you play him, turn the best attacker in your opponent's hand into a 1/1 pig.",
        },
        "peeper": {
          "text": "When you play her, look at your opponent's hand.",
          "flavortext": "Dirty screen looker.",
        },
        "crier": {
          "text": "When you draw him, other cards in your hand get +1/+1.",
        },
        "twins": {
          "text": "If you start a turn with all three of them in hand, they become 9/9.",
        },
        "tricks": {
          "text": "When played, it will randomly curse, silence, or give -3/-3 to your opponent's next card.",
        },
        "spackler": {
          "text": "When you play him, all walls in your deck get +0/+1.",
        },
        "staff": {
          "text": "When you play it, Diggy cards in your hand get +4/+4. Others get +1/+1.",
        },
        "pummeler": {
          "text": "Every turn you start with it in hand, spend 1 charge and it gets +2/+2.",
        },
        "lightning": {
          "text": "When you play him, gain 2 charge.",
          "flavortext": "Smells like static.",
        },
        "spirit": {
          "text": "If you start a turn with it in hand, and you have 5 or more points, it becomes a 1/1 pig.",
        },
        "washer": {
          "text": "When you play it, spend 5 charge and remove all debuffs from cards in your hand.",
        },
        "statue": {
          "text": "If you successfully attack with him, unsilence all cards in your hand.",
        },
        "harbinger": {
          "text": "When you play him, if you have a Behemoth in hand, he gets +3/+3.",
        },
        "future": {
          "text": "When you play her, look at the top three cards of your deck.",
        },
      }
    },

    fr: {
      translation: {
        "ui": {
          "battlelog": "Journaux",
          "quickmatch": "Match rapide",
          "challengefriend": "Défiez un ami",
          "deckbuilder": "Construisez un deck",
          "rulesbutton": "Règles",
          "rules": {
            "howtoplay": "Comment jouer",
            "objective": "Le but du jeu est de marquer le plus de points possible. A chaque tour, vous piochez une carte dans votre main pour la jouer contre votre adversaire. Vous marquez un point lorsque vous attaquez et que l'attaque de votre carte dépasse la défense de la carte de votre adversaire. Le jeu est terminé après vingt tours.",
            "attackanddefend": "Attaquer et défendre",
            "statistics": "Au début du jeu, le joueur attaquant sera choisi au hasard. Si vous êtes à <b>l'attaque</b> et l'attaque de votre carte (ressemble à ça: <span style='background-color:#FAA;border-radius:1vmin;padding:.25vmin .5vmin;'>9<img style='height:1.5vmin;width:1.5vmin;' src='sword.svg' /></span>) est plus grand que la defense de la carte de l'adversaire (defense ressemble à ça: <span style='background-color:#AAF;border-radius:1vmin;padding:.25vmin .5vmin;'><img style='height:1.5vmin;width:1.5vmin;' src='shield.svg' />4</span>) vous gagnez un point et vous pouvez attaquer encore ! Si vous êtes à <b>la defense</b> et la defense de votre carte est plus grand que l'attaque de la carte de l'adversaire, ensuite ce sera à votre tour d'attaquer !",
            "cardeffects": "Effets de carte",
            "effects": "Certaines cartes ont des effets supplémentaires. Si une carte a un effet supplémentaire, cela sera écrit sur la carte. Ces effets peuvent agir lorsqu'ils sont joués au combat, lorsque vous réussissez à attaquer avec eux, à vous défendre avec succès ou dans d'autres situations. La carte vous dira quand l'effet se produira.",
            "buffsanddebuffs": "Buffs et debuffs",
            "buffs": "Certaines cartes améliorent les statistiques des cartes. D'autres cartes réduisent les statistiques des cartes. Une carte est <b>buffée</b> si elle a des statistiques supérieures à ses statistiques normales. Une carte est <b>debuffée</b> si elle a des statistiques inférieures à ses statistiques normales.",
            "effectsilenced": "Muselée",
            "silenced": "Si une carte est <b>muselée</b>, elle le dira sur sa carte et son texte sera barré. Les effets de carte qui se déclenchent au combat ne se déclencheront pas si la carte est réduite au silence. Les effets qui se déclenchent ailleurs, comme dans la main, ne seront pas arrêtés. Effets qui déterminent l'attaque et la défense d'une carte, comme l'effet de Medusa Mercenary \"Si vous perdez, elle devient un 10/10.\" ne sera pas arrêté non plus.",
            "effectcursed": "Maudit",
            "cursed": "Si une carte est <b>maudite</b>, elle le mentionnera sur sa carte. Chaque fois qu'un tour commence, chaque carte maudite dans la main d'un joueur perd une attaque et une défense.",
            "effectcharge": "Charges",
            "charge": "Certaines cartes permettent de gagner <b>charges</b>. Considérez les frais comme une monnaie que vous pouvez dépenser. Si une carte vous oblige à dépenser une charge, son effet ne se produira que si vous avez suffisamment de charge à dépenser.",
            "effectblessed": "Bénie",
            "blessed": "Si une carte est <b>bénie</b>, cela sera indiqué sur sa carte. Chaque fois qu'un tour commence, chaque carte bénie dans la main d'un joueur gagne une attaque et une défense supplémentaires.",
            "deckbuilding": "Construire un deck",
            "howtobuild": "Un deck doit contenir vingt cartes, ni plus ni moins. Un maximum de trois cartes de chaque carte est appliqué.",
          },
        },
        "dingle": {
          "flavortext": "Quelque chose pue!"
        },
        "sweater": {
          "flavortext": "C'est presque trop cosy."
        },
        "corn": {
          "text": "Il gagne +2/+2 chaque fois vous jouez un maïs."
        },
        "shower": {
          "text": "Quand vous le jouez, il donne chaque carte dans votre main +3/+3."
        },
        "smug": {
          "text": "Quand vous le jouez, piochez une carte.",
          "flavortext": "Personne n'aime un je-sais-tout."
        },
        "fist": {
          "flavortext": "Pas frappé du tout."
        },
        "wall": {
          "flavortext": "Pourquoi ce mur peut-il attaquer ? J'sais pas."
        },
        "timmy": {
          "text": "Si vous gagnez à l'attaque avec lui, vous gagnez un point supplémentaire."
        },
        "timer": {
          "text": "Sa défense est égale au double des points de l'adversaire."
        },
        "smuggy": {
          "text": "Si vous gagnez à la défense avec lui, piochez une carte."
        },
        "cornwall": {
          "flavortext": "Vous pouvez attaquer... maïs, ça vous arrêtera."
        },
        "gatekeeper": {
          "text": "Quand vous le jouez, vous piocherez ensuite votre meilleur attacqant."
        },
        "shrinky": {
          "text": "Quand vous le jouez, il donne chaque carte dans la main de l'adversaire -1/-3."
        },
        "normalizer": {
          "text": "Quand vous le jouez, il supprime tous les buffs et debuffs de chaque carte dans chaque main."
        },
        "mercenary": {
          "text": "Si vous perdez, elle devient un 10/10.",
          "flavortext": "Les coiffeurs la détestent !"
        },
        "electro": {
          "text": "Si vous perdez à l'attaque avec elle, vous perdez un point."
        },
        "clone": {
          "text": "Il copie l'attaque et la défense de votre dernière carte jouée."
        },
        "warrior": {
          "text": "Il copie les effets de bataille de votre dernière carte jouée."
        },
        "barrier": {
          "text": "Si vous gagnez à la défense avec lui, vous gagnez un point."
        },
        "diggy": {
          "text": "Quand vous le jouez, il donne chaque autre copie de le dernière carte de l'adversaire -2/-2."
        },
        "farmer": {
          "text": "Quand vous le jouez, si votre dernière carte etait une carte maïs, piochez une carte."
        },
        "necro": {
          "text": "Quand vous le jouez, tous les statistiques de la main de l'adversaire seront moyennés."
        },
        "silencer": {
          "text": "Quand vous le jouez, muselée tous les cartes de la main de l'adversaire."
        },
        "duo": {
          "text": "Quand vous les jouez, piochez une carte, mais elle sera muselée."
        },
        "hexmage": {
          "text": "Quand vous le jouez, il démusele tous les cartes de votre main. Il gagne +1/+0 pour chaque carte."
        },
        "bound": {
          "text": "Quand vous le jouez, il gagne +7/+7.",
          "status": "Commence muselé."
        },
        "flocking": {
          "text": "Quand vous les jouez, les autre copies de votre deck gagnent +3/+3."
        },
        "eternal": {
          "text": "Il ne peut pas avoir un buff ou un debuff.",
          "flavortext": "Il s'appelle Pierre."
        },
        "goddess": {
          "text": "Quand vous la jouez, mélangez votre main dans votre deck. Piochez ensuite autant de cartes."
        },
        "cursy": {
          "text": "Quand vous la jouez, maudissez les deux prochaines cartes du deck de l'adversaire.",
        },
        "maniac": {
          "text": "Quand vous le jouez, si le deck de l'adversaire contient une carte maudite, il gagne +3/+3.",
        },
        "idol":  {
          "text": "Commence maudit.",
          "flavortext": "Chaque matin, il se reveille avec un vraie gueule de bois.",
        },
        "unsweet": {
          "text": "Quand vous le jouez, si vous avez joué au moins 3 cartes maïs, il donne tous les cartes dans la main de l'adversaire -2/-2.",
        },
        "demoness": {
          "text": "Quand vous la jouez, mélangez la main de l'adversaire dans son deck. Ensuite, l'adversaire pioche deux cartes.",
        },
        "liquid": {
          "text": "Quand vous le jouez, il donne tous les cartes dans votre main +5/+5, mais il les maudit aussi.",
        },
        "bastard": {
          "text": "Si vous gagnez a l'attaque avec lui, gagnez 4 charges.",
          "flavortext": "Il vous donnera un \"pile\"driver."
        },
        "matrix": {
          "text": "Quand vous le jouez, les cartes dans votre main gagnez +1/+1 pour chaque charge que vous avez.",
        },
        "electrotimmy": {
          "text": "Quand vous le jouez, dépensez 3 charges puis vous gagnez un point.",
        },
        "coffee": {
          "text": "Quand vous le jouez, tous les mages de votre deck gagnent +2 attaque.",
          "flavortext": "Bon avec une baguette.",
        },
        "hexbot": {
          "text": "Quand vous le jouez, dépensez 3 charges et maudissez tous les cartes dans la main de l'adversaire.",
        },
        "ai": {
          "text": "Quand vous la jouez, dépensez 1 charge et piochez une carte.",
        },
        "lil": {
          "text": "Quand vous le jouez, gagnez 5 charges.",
          "flavortext": "Zap !",
        },
        "stone": {
          "text": "Quand vouz le jouez, piochez une carte déesse. Cette déesse gagnez +3/+0.",
        },
        "electricsilencer": {
          "text": "Quand vous le jouez, dépensez 3 charges et muselez toutes les cartes dans la main de l'adversaire.",
        },
        "hulk": {
          "text": "Quand vous le jouez, il donne -3/-3 à toutes les cartes dans votre main.",
        },
        "knowledge": {
          "text": "Ses statistiques sont égales au nombre de cartes dans votre main.",
        },
        "proof": {
          "text": "Il ne peut pas être maudit.",
          "flavortext": "Plus dur que les autres murs.",
        },
        "drainer": {
          "text": "Si vous gagnez à la défense avec lui, supprimer toute malédiction de chaque carte dans votre main et gagnez 1 charge pour chacun.",
        },
        "mech": {
          "text": "Quand vous le jouez, dépensez 4 charges et il gagne +4/+4.",
        },
        "apprentice": {
          "text": "Quand vous le jouez, il muselle chaque autre copie de le dernière carte de l'adversaire.",
        },
        "potion": {
          "text": "Quand vous le jouez, dépensez toutes vos charges. Chaque carte dans votre main gagne +1/+0 pour chaque charge.",
        },
        "revenge": {
          "text": "Si votre dernière carte a été maudite ou muselée, maudire ou museler chaque carte dans la main de l'adversaire.",
        },
        "socket": {
          "text": "Quand vous le jouez, gagnez 2 charges.",
          "flavortext": "Son plus grand ennemi ? Couvre-prises à l'épreuve des enfants.",
        },
        "artifact": {
          "text": "Commence maudit.",
          "text2": "Quand vous le jouez, si ses statistiques sont toutes le deux moins de -9, vous gagnez 2 points.",
        },
        "mason": {
          "text": "Si vous perdez à l'attaque avec lui, vous piocherez un mur lors de votre prochaine tour.",
        },
        "thief": {
          "text": "Quand vous la jouez, volez 2 chargez à l'adversaire.",
        },
        "conjurer": {
          "text": "Quand vous le jouez, le meilleur attaquant dans la main de l'adversaire devient un 1/1 cochon.",
        },
        "peeper": {
          "text": "Quand vous la jouez, vous voyez la main de l'adversaire.",
          "flavortext": "N'est-ce pas de la triche ?",
        },
        "crier": {
          "text": "Quand vous le piochez, les autres cartes dans votre main gagne +1/+1.",
        },
        "twins": {
          "text": "Si vous commencez votre tour avec 3 copies d'eux dans votre main, ils deviennent 9/9.",
        },
        "tricks": {
          "text": "Quand vous le jouez, il maudira, musellera, ou donnera -3/-3 au hasard à la prochaine carte de l'adversaire.",
        },
        "spackler": {
          "text": "Quand vous le jouez, tous les murs dans votre deck gagnent +0/+1.",
        },
        "staff": {
          "text": "Quand vous le jouez, cartes Diggy dans votre main gagnent +4/+4. Les autres gagnent +1/+1.",
        },
        "pummeler": {
          "text": "Chaque tour vous commencez avec lui dans votre main, dépensez 1 charge et il gagne +2/+2.",
        },
        "lightning": {
          "text": "Quand vous le jouez, gagnez 2 charges.",
          "flavortext": "Ça sent l'électricité statique.",
        },
        "spirit": {
          "text": "Si vous commencez un tour avec lui dans votre main et que vous avez plus de 5 points, il devient un 1/1 cochon.",
        },
        "washer": {
          "text": "Quand vous le jouez, dépensez 5 charges et il supprime tous les debuffs de cartes dans votre main.",
        },
        "statue": {
          "text": "Si vous gagnez à l'attaque avec lui, démuselez toutes les cartes dans votre main.",
        },
        "harbinger": {
          "text": "Quand vous le jouez, si vous avez un Behemoth dans votre main, il gagne +3/+3.",
        },
        "future": {
          "text": "Quand vous la jouez, voyez les trois cartes du dessous de votre deck.",
        },
      }
    }

  }
});
