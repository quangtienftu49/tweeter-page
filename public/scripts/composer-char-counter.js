$(document).ready(function() {
  // --- our code goes here ---
  $(function() {
    wordCounter();
  });
  
  const wordCounter = function() {
    const $inputfield = $('#tweet-text');
    $inputfield.on('input', function() {
      const $counter = 140 - $('textarea', this).val().length;
    
      if ($counter < 0) {
        $('.counter', this).css('color', 'red');
      } else {
        $('.counter', this).css('color', '');
      }
      $('.counter', this).text($counter);
    });
  };
});