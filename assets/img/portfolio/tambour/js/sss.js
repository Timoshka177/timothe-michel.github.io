const listButtons = document.querySelectorAll("button"); // récupérer tous les bouttons

for(let i = 0; i < listButtons.length; i++) {
    listButtons[i].addEventListener('click', function() { // capter l'événement click pour chaque boutton
        let letter = listButtons[i].innerHTML; // je récupère la lettre cliquée
        playSound(letter);
    })
}

// je capte le moment ou je tape une touche de mon clavier
document.addEventListener('keypress', function(e) {
    let letter = e.key;
    playSound(letter);
});

// capter le fait que le user tape sur une touche du clavier
// appeler la fonction playSound() en récupérant la touche tapée

function playSound(letter) {

    // let sound;

    // switch case

    const letters = ['w', 'a','s','d','j','k','l'];

    if(letter.match(/[a-z]/i) != null && letters.includes(letter)) {

        // si letter n'est pas une lettre alphabétique de a à z j'affiche une erreur

        let sound = new Audio('./sounds/' + letter.toLowerCase() + '.mp3');
        sound.play();

        // switch (letter) {

        //     case "w":
        //         // je joue le son w
        //         sound = new Audio('./sounds/w.mp3');
        //         sound.play();
        //         break;

        //     case "a":
        //         // je joue le son a
        //         sound = new Audio('./sounds/a.mp3');
        //         sound.play();
        //         break;

        //     case "s":
        //         // je joue le son s
        //         sound = new Audio('./sounds/s.mp3');
        //         sound.play();
        //         break;

        //     case "d":
        //         // je joue le son d
        //         sound = new Audio('./sounds/d.mp3');
        //         sound.play();
        //         break;
            
        //     case "j":
        //         // je joue le son j
        //         sound = new Audio('./sounds/j.mp3');
        //         sound.play();
        //         break;
            
        //     case "k":
        //         // je joue le son k
        //         sound = new Audio('./sounds/k.mp3');
        //         sound.play();
        //         break;
            
        //     case "l":
        //         // je joue le son l
        //         sound = new Audio('./sounds/l.mp3');
        //         sound.play();
        //         break;
        
        //     default:
        //         console.log('lettre inconnue');
        //         break;
        // }

        animateButton(letter);

    } else {
        alert('Please enter an alphabetic value (w, a, s, d, j, k, l) !');
    }

  
}


function animateButton(letter) {
    // récupérer le boutton qui a une classe qui vaut letter
    const button = document.querySelector('.'+letter);
    // ajouter à ce bouton une nouvelle class css 'pressed'
    button.classList.add('pressed');

    // dans 200 milli secondes enlève la classe pressed pour créer un effet/animation
    setTimeout(function() {
        button.classList.remove('pressed');
    }, 200);
}