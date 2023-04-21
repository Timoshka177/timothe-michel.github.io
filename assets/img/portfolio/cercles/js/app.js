$(document).ready(function() {
    
    $(document).mousemove(function(event) {
      // Générer la taille et la couleur aléatoires du cercle
      var size = Math.floor(Math.random() * 50) + 100; // Taille entre 50 et 149 pixels
      var color = '#' + Math.floor(Math.random() * 16777216).toString(16);// Couleur aléatoire en hexadécimal
  
      // Créer le cercle et le positionner sur la souris
      var circle = $('<div/>').css({
        'width': size + 'px',
        'height': size + 'px',
        'background-color': color,
        'border-radius': '50%',
        'position': 'absolute',
        'top': (event.pageY - (size / 2)) + 'px',
        'left': (event.pageX - (size / 2)) + 'px'
      }).appendTo('body');
  
      // Animer la descente du cercle et l'effet fondu
      circle.animate({
        top: $(window).height() + 'px',
        opacity: 0
      }, 1500, function() {
        $(this).fadeOut();
      });
    });
  });
  
  

