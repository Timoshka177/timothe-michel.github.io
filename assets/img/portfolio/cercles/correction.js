$(document).ready(function() { // la page soit entièrrement chargée

    // généré un rgb aléatoire
    function generateRandomColor() {

        let colorR = Math.floor(Math.random() * 256);
        let colorG = Math.floor(Math.random() * 256);
        let colorB = Math.floor(Math.random() * 256);

        return `rgb(${colorR}, ${colorG}, ${colorB})`;

    }

    $(this).click(function(e) { // un click sur le dom

        // générer un rond d'une couleur et taille
        // aléatoire
        // width random
        let randomWidth = Math.floor(Math.random() * 100) + 50;
        let randomColor = generateRandomColor();

        // la position du click
        let x = e.pageX - (randomWidth / 2); // abscisse du click
        let y = e.pageY - (randomWidth / 2); // ordonée du click

        // génerate circle
        let circle = `<div style='width:${randomWidth}px; height:${randomWidth}px; 
        background:${randomColor};
         border-radius:50%;position:absolute;top:${y}px;left:${x}px'>  </div>`;

        // j'ajoute le cercle au body
        $('body').append(circle);

        // récupère moi la dernière div créée
        // fait une animation pour l'envoyer vers le bas
            // animate()
            // windowHeight
            // modifier top : windowHeight - randomWidth
        // une fois en bas (une fois l'animation terminée)
        // fadeOut()
        let windowHeight = $(window).height();
        $("div").last().animate({
            top : windowHeight - randomWidth
        }, 2000, function() {
            $(this).fadeOut();
        });

    });

});