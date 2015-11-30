var scoreApp = scoreApp || {};

scoreApp.player1 = {};
scoreApp.player2 = {};
scoreApp.turn = 1;

scoreApp.setup = function() {
  console.log('setting up');
  $('#score-board').hide(); 
  $('#players-form').on('submit', scoreApp.newGameHandler);
  $('#left-score-input').on('submit', scoreApp.logScore);
  $('#right-score-input').on('submit', scoreApp.logScore);
};

scoreApp.newGameHandler = function(e) {
  e.preventDefault();
  console.log('new game');
  scoreApp.player1.name = $('#player-1').val();
  scoreApp.player2.name = $('#player-2').val();
  scoreApp.player1.score = 501;
  scoreApp.player2.score = 501;  
  scoreApp.setupScoreboard();
};

scoreApp.setupScoreboard = function() {
  $('#players-form').hide();
  $('#score-board').show(); 
  $('#player1-heading').html(scoreApp.player1.name);
  $('#player2-heading').html(scoreApp.player2.name);
  $('#left-score').focus();
  $('#right-submit').attr('disabled', true);
};

scoreApp.logScore = function(e){
  e.preventDefault();
  if (scoreApp.whoseTurn() == scoreApp.player1) {
    var score = $('#left-score').val();
    if (scoreApp.checkScore(score, scoreApp.player1.score)){
      scoreApp.player1.score -= score;
      $( "#player1-score li:last-child" ).wrap("<strike>");
      $('#player1-score').append('<li>'+ scoreApp.player1.score + '</li>');
    };
    $('#left-score').val('');
    scoreApp.switchToPlayer(2);
  } else {
    var score = $('#right-score').val();
    if (scoreApp.checkScore(score, scoreApp.player2.score)){
      scoreApp.player2.score -= score;
      $( "#player2-score li:last-child" ).wrap("<strike>");
      $('#player2-score').append('<li>'+ scoreApp.player2.score + '</li>');
    };
    $('#right-score').val('');
    scoreApp.switchToPlayer(1);
  };
  scoreApp.turn++;
};

scoreApp.switchToPlayer = function(player) {
  if (player == 1){
    $('#left-submit').removeAttr('disabled');
    $('#left-score').focus();
    $('#right-submit').attr('disabled', true);
  } else {
    $('#right-submit').removeAttr('disabled');
    $('#right-score').focus();
    $('#left-submit').attr('disabled', true);
  };
};

scoreApp.checkScore = function(score, total) {
  if (total - score === 0) {
    scoreApp.endGame();
  } else if (total - score < 0) {
    return scoreApp.bust();
  }
  return true;
};

scoreApp.endGame = function() {
  $('#winner').html('<h3>' + scoreApp.whoseTurn().name + ' wins!</h3>');
  $('#left-score-input').remove();
  $('#right-score-input').remove();    
};

scoreApp.bust = function() {
  alert('Bust!');
  return false;
};

scoreApp.whoseTurn = function() {
  if (scoreApp.turn % 2 != 0) {
    return scoreApp.player1;
  } else {
    return scoreApp.player2;
  };
};


scoreApp.setup(); 


