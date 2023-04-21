//#############################//
//                             //
//       LISTE DE JOUEURS      //
//                             //
//#############################//
const listPlayers = [
    ["hero1", "hero2", "hero3"],
    [
        {
            name:"Seong Gi-hun",
            marbles:10,
            loss: 3,
            gain: 1
        },
        {
            name:"Kang Sae-byeok",
            marbles:15,
            loss: 2,
            gain: 2
        },
        {
            name:"Cho Sang-woo",
            marbles:20,
            loss: 1,
            gain: 3
        }
    ]
];

//#############################//
//                             //
//      LISTE DE NIVEAUX       //
//                             //
//#############################//
const listLevels = [['level1', 'level2', 'level3'], [2, 4, 6]];

//#############################//
//                             //
//      LISTE D'ENNEMIES       //
//                             //
//#############################//
const listEnemies = [
    { name: "Tao Huang", marbles: 5 , age: 20 }
    ,{ name: "Su He", marbles: 15 , age: 40 }
    ,{ name: "Tan Ju", marbles: 10 , age: 80 }
    ,{ name: "Shao Lin", marbles: 4 , age: 60 }
    ,{ name: "Xing Kang", marbles: 3 , age: 20 }
    ,{ name: "Jacky Chan", marbles: 12 , age: 50 }
];

//#############################//
//                             //
//         CONSTANTES          //
//                             //
//#############################//
const GAME_DETAILS = document.getElementById("game-details");
const ENEMIES = document.getElementById("enemies");
const WIN = document.getElementById("win");
const ACTION = document.getElementById("action");
const LOOSE = document.getElementById("loose");
const REPLAY = document.getElementById("replay");
const HERO_NAME = document.querySelector(".hero-name");
const REMAINING_MARBLES = document.querySelector(".remaining-marbles");
const HEROES = document.getElementById("heroes");
const LEVELS = document.getElementById("levels");
const REMAINING_ENCOUNTERS = document.querySelector(".remaining-encounters");
const HISTORY = document.getElementById("history");
const CHOICES = document.getElementById("choices");
const LIST_BUTTONS_ODD_OR_EVEN = document.querySelectorAll("#choices button");
const LIST_BLOCK_HTML = document.querySelectorAll(".block");
const ENEMIES_CHILDREN = document.querySelectorAll("#enemies .block");

let hero;
let nbrEncounters;
let enemy;
let enemyIndex;

//#########################################################//
//                                                         //
//FONCTION PERMETTANT DE METTRE À JOUR LE HTML D'UN ÉLÉMENT//
//                                                         //
//#########################################################//
function updateInnerHTML(elemHTML, txt) {
    elemHTML.innerHTML = txt;
}

//############################################################//
//                                                            //
//FONCTION PERMETTANT DE METTRE À JOUR LE DISPLAY D'UN ÉLÉMENT//
//                                                            //
//############################################################//
function handleDisplay(elemHTML, display) {
    elemHTML.style.display = display;
}

//###############################################//
//                                               //
//FONCTION PERMETTANT DE METTRE METTRE FIN AU JEU//
//                                               //
//###############################################//
function endGame(win) {

    setTimeout(function() {
        // je veux faire disparaitre le score
        // faire disparaitre l'historique
        // faire disparaitre l'ennemy
        handleDisplay(GAME_DETAILS, "none");
        handleDisplay(ENEMIES, "none");

        // faire apparaitre une image de hero mort
        // un bouton rejouer

        if(win) {
            handleDisplay(WIN, "block");
            updateInnerHTML(ACTION, "Félicitations ! Vous pouvez récupérer votre prix");
        } else {
            handleDisplay(LOOSE, "block");
            updateInnerHTML(ACTION, "Bienvenue en enfer !");
        }

        handleDisplay(REPLAY, "block");

    }, 5000);

}

//########################################//
//                                        //
//PERMET DE SELECTIONNER UN HERO À L'ÉCRAN//
//                                        //
//########################################//
function selectHero(selectedClass) {

    // permet de sélectionner mon héros
    // en récupérant la position de la classe dans le premier sous tableau de listPlayers
    let classIndex = listPlayers[0].indexOf(selectedClass);
    hero = listPlayers[1][classIndex];// je récupère le héro qui le même index dans le deuxième sous tableau
    // mettre la partie score
    updateInnerHTML(HERO_NAME, hero.name);
    updateInnerHTML(REMAINING_MARBLES, hero.marbles);
    console.log("hero", hero);

    // je fais disparaître mes héros et affiche mes niveaux
    handleDisplay(HEROES, "none");
    handleDisplay(LEVELS, "flex");
    updateInnerHTML(ACTION, "Choisissez un niveau !");

}

//##########################################//
//                                          //
//PERMET DE SELECTIONNER UN NIVEAU À L'ÉCRAN//
//                                          //
//##########################################//
function selectLevels(selectedClass) {

    let classIndex = listLevels[0].indexOf(selectedClass);
    nbrEncounters = listLevels[1][classIndex];// je récupère la difficulté
    updateInnerHTML(REMAINING_ENCOUNTERS, nbrEncounters);
    console.log("nbr rencontres : " + nbrEncounters);

    // je fais disparaître mes niveaux
    handleDisplay(ENEMIES, "flex");
    handleDisplay(LEVELS, "none");
    updateInnerHTML(ACTION, "Choisissez un ennemie à combattre !");
    
}

//################################################//
//                                                //
//PERMET DE METTRE À JOUR L'HISTORIQUE DES COMBATS//
//                                                //
//################################################//
function updateHistory(msg) {

    // créer un paragraphe et l'ajouter à l'historique
    const PGH = document.createElement('p');
    PGH.innerHTML = msg; // ajouter du texte à mon paragraphe
    HISTORY.appendChild(PGH);// Ajouter le descriptif de la rencontre à l'historique des combats

}

//#################################################//
//                                                 //
//PERMET DE MARQUE D'UNE CROIX ROUGE UN ENEMIE MORT//
//                                                 //
//#################################################//
function toggleRedCross(enemyIndex, opacity) {

    // si mon ennemie meurt
    // je le barre avec une croix rouge
    let crossElements = ENEMIES.children[enemyIndex].getElementsByClassName('cross');
    // je réduis l'opacité de l'ennemie tué
    if(opacity >= 1) {
        ENEMIES.children[enemyIndex].querySelector("img").style.opacity = 0.5;
    } else {
        ENEMIES.children[enemyIndex].querySelector("img").style.opacity = 1;
    }
    for(let i = 0; i < crossElements.length; i++) {
        crossElements[i].style.opacity = opacity;
    }

}

//#########################################################//
//                                                         //
//PERMET DE REVENIR À L'ÉCRAN PRINCIPAL APRÈS UNE RENCONTRE//
//                                                         //
//#########################################################//
function goBackToMainScreen() {

    // après avoir afficher l'historique du jeu
    // revenir à l'écran principale

    setTimeout(function() {
        // je laisse 5s à l'internaute pour lire ce qu'il s'est passé et je vais réafficher tous les ennemies
        // je réaffiche tous les ennemies

        let enemies = document.querySelectorAll("#enemies .block");
        for(let i = 0; i < enemies.length; i++) {
            handleDisplay(enemies[i], "block");
        }

        // je remets le titre de base
        updateInnerHTML(ACTION, "Choisissez un ennemie à combattre !");

    }, 5000);

}

//################################################################//
//                                                                //
//PERMET DE COMPARER LES VALEURS ET METTRE À JOUR L'AVANCÉE DU JEU//
//                                                                //
//################################################################//
function compareValues(userAnswer) {

    console.log("userAnswer : " + userAnswer +" enemy : "+ enemy.name + " enemyIndex : " + enemyIndex);
    
    // display none sur les bouttons pair ou impair
    // ca evite de donner plusieurs fois une réponse lors d'une rencontre
    handleDisplay(CHOICES, "none");
    updateHistory('Votre enemie a dans ses mains ' + enemy.marbles + " billes !");

    if((userAnswer % 2 == 0 && enemy.marbles % 2 == 0) 
        || userAnswer % 2 != 0 && enemy.marbles % 2 != 0) { // si j'ai trouvé la bonne réponse
        
        console.log("je gagne la manche");
        updateHistory('Bravo, c\'est gagné, vous remportez ' + enemy.marbles + " billes + votre bonus de " + hero.gain + " billes !" );
        hero.marbles += (enemy.marbles + hero.gain); // j'ajoute des billes à mon héros
        toggleRedCross(enemyIndex, 1);

    } else {
        console.log("je perds la manche");
        hero.marbles -= (enemy.marbles + hero.loss);
        updateHistory('HAHAHA, c\'est perdu, vous perdez ' + enemy.marbles + " billes - de votre malus de " + hero.loss + " billes !" );
        updateHistory('Grâce à vous, votre enemie a maintenant dans ses mains ' + listEnemies[enemyIndex].marbles + " billes !");
        listEnemies[enemyIndex].marbles += enemy.marbles;
    }

    if(hero.marbles > 0) {
        updateHistory("Après ce combat il vous reste " + hero.marbles + " billes !");
        updateInnerHTML(REMAINING_MARBLES, hero.marbles);// je dois mettre à jour le score du joueur
    } else {
        updateHistory('HAHAHAHHA, you looose !');
    }

    // et le nombre de rencontres restantes
    if(nbrEncounters > 0) {
        updateInnerHTML(REMAINING_ENCOUNTERS, --nbrEncounters);
    }

    // gérer la fin du jeu si j'ai gaigné ou perdu le jeu
    if(hero.marbles <= 0 || nbrEncounters <=0) {

        endGame(hero.marbles > 0 ? true : false); // condition ternaire

    } else {

        goBackToMainScreen();

    }

}

//################################################################//
//                                                                //
//PERMET DE COMPARER LES VALEURS ET METTRE À JOUR L'AVANCÉE DU JEU//
//                                                                //
//################################################################//


// je capte l'événement click sur les boutons pair ou impair
for (let i = 0; i < LIST_BUTTONS_ODD_OR_EVEN.length; i++) {
    LIST_BUTTONS_ODD_OR_EVEN[i].addEventListener('click', function() {
        // récupérer la valeur du bouton
        // j'ai récupérer la position de chaque boutton au click
        // si je click sur pair la position c'est 0 donc la réponse sera 0 pour pair
        // si je click sur impair la position c'est 1 donc la réponse sera 1 pour impair
        let parent = this.parentNode;
        let oddOrEven = Array.prototype.indexOf.call(parent.children, this);
        console.log("pair ou impair :" + oddOrEven);
        compareValues(oddOrEven, enemy, enemyIndex);
    });
}


//###############################//
//                               //
//PERMET D'AFFICHER UNE RENCONTRE//
//                               //
//###############################//
function handleEncounter(child) {

    // je récupère la position de mon enemie dans l'ensemble des blocks enemy
    // ainsi que les caractéristiques de mon ennemie
    let parent = child.parentNode;
    enemyIndex = Array.prototype.indexOf.call(parent.children, child);
    enemy = listEnemies[enemyIndex];
    console.log("enemy", enemy);

    // moi je veux mettre en display none tous les autres index sauf ma variable index
    // comment récupérer un élément enfant dans un élément parent en js
    // je veux parcourir tous les élements enfants et tous les mettre en display none
    // sauf 1

    for(let i = 0; i < parent.children.length; i++) {
        if(i != enemyIndex) {
            handleDisplay(parent.children[i], "none");
        }
    }

    // faire apparaitre les bouttons pour décider de pair ou impair
    handleDisplay(CHOICES, "block");
    updateInnerHTML(ACTION, "Votre ennemie a des billes dans sa main. Est-ce un nombre pair ou impair ? 😈");
    
}

//##############################################################//
//                                                              //
//PERMET DE GÉRER LES ÉVENEMENTS CLICK SUR L'ENSEMBLE DES BLOCKS//
//                                                              //
//##############################################################//
for(let i=0; i < LIST_BLOCK_HTML.length; i++) {
    
    // je capte l'événement click sur l'ensemble des blocks
    LIST_BLOCK_HTML[i].addEventListener('click', function( ) {
        // je veux récupérer la deuxième classe du block 
        let selectedClass = this.classList[1]; // je récupère la deuxième classe du block cliqué
        console.log("selectedClass :" + selectedClass);
        if(selectedClass.startsWith('h')) {
            selectHero(selectedClass); // si j'ai clické sur un block héro
        } else if(selectedClass.startsWith('l')) {
            selectLevels(selectedClass); // si j'ai clické sur un block levels
         } else if(selectedClass.startsWith('e')) {
            handleEncounter(this); // si j'ai clické sur un block enemie
         }

    });

}


// capter l'événement click sur replay
//faire tout disparaitre
// faire réaparaitre les héros

REPLAY.addEventListener("click", function() {


    handleDisplay(WIN, "none");
    handleDisplay(LOOSE, "none");
    for(let i =0; i < ENEMIES_CHILDREN.length; i++) {
        ENEMIES_CHILDREN[i].style.display = "block";
    }
    handleDisplay(HEROES, "flex");
    HISTORY.innerHTML = "<p> Historique : </p>";
    handleDisplay(GAME_DETAILS, "flex");
    handleDisplay(REPLAY, "none");

    // mettre en opacity 0 les croix rouge
    toggleRedCross(enemyIndex, 0);
});

// PLAN
// click sur les blocks hero
// selectHero
// selectLevels
// click sur les blocks enemies
// handleEncounter
// click sur les boutons pair ou impair
// compareValues
    // endGame
    // goBackToMainScreen
// click sur le bouton replay