$(document).ready(function() {
  
  $("button").click(function() {
    var letter = $(this).text();
    playSound(letter);

    })

$(document).keypress(function(e) {
  let letter = e.key;
  playSound(letter);
});









function animateButton(letter) {
  // const button = document.querySelector('.'+letter);
  $('.'+letter).addClass('pressed');
  //button.classList.add('pressed');
  setTimeout(function() {
      // button.classList.remove('pressed');
      $('.'+letter).removeClass('pressed');
  }, 200);
}



});