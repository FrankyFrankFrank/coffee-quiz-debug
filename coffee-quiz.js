$(document).ready(function () {

  var quiz = {};

  quiz.results = [];

  quiz.counter = 0;

  quiz.questions = [
    $('#qtype'),
    $('#qfruit'),
    $('#qfamiliar'),
    $('#qbetween'),
    $('#qdark'),
    $('#qadventure'),
    $('#qcomments'),
    $('#qsublength'),
    $('#qconfirm')
  ];

  var products = {};

  products.onemonth = 545700893;
  products.threemonth = 2827920068;
  products.sixmonth = 2827927940;
  products.twelvemonth = 2827938564;

  // buttons

  var nextButton = $('#next');
  var backButton = $('#back');
  var startOverButton = $('#restart');


  function start() {
    $('.question').hide();
    quiz.counter = 0;
    quiz.questions[quiz.counter].show();
    backButton.addClass('disabled');
    console.log("There are " + (quiz.questions.length - 1) + " Questions in this quiz.");
  }

  function goNext() {
    quiz.questions[quiz.counter].hide();
    quiz.counter += 1;
    quiz.questions[quiz.counter].show();

    if (quiz.counter > 0) {
      backButton.removeClass('disabled');
    }

    if (quiz.counter >= quiz.questions.length) {
      nextButton.addClass('disabled');
      console.log('disabled added to next');
    }

    console.log('Quiz Counter = ' + quiz.counter);
  }

  function goBack() {
    quiz.questions[quiz.counter].hide();
    quiz.counter -= 1;
    quiz.questions[quiz.counter].show();

    if (quiz.counter === 0) {
      backButton.addClass('disabled');
      console.log('disabled added to back');
    }

    if (quiz.counter <= quiz.questions.length) {
      nextButton.removeClass('disabled');
    }

  }

  function checkIfFinished() {
    console.log('test');
  }


  function collectAnswers() {
    var type = $("input:radio[name=type]:checked").val();
    var fruit = $("input:radio[name=fruit]:checked").val();
    var familiar = $("input:radio[name=familiar]:checked").val();
    var between = $("input:radio[name=between]:checked").val();
    var dark = $("input:radio[name=dark]:checked").val();
    var adventure = $("input:radio[name=adventure]:checked").val();
    var comments = $("textarea[name=comments]").val();
    var subid = $("input:radio[name=subid]:checked").val();

    quiz.results = [type, fruit, familiar, between, dark, adventure, comments, subid];

  }


  function ajaxAdd(type, fruit, familiar, between, dark, adventure, comments, subid) {

    $.post('/cart/add.js', {
      quantity: 1,
      id: subid,
      properties:
        {
          'Type' : type,
          'Fruit' : fruit,
          'Familiar' : familiar,
          'Between' : between,
          'Dark' : dark,
          'Adventure' : adventure,
          'Comments' : comments
        }
    });

  }

  start();

  $('#next').click(function () {
    if (!$(this).hasClass('disabled')) {
      goNext();
    }
  });

  $('#back').click(function () {
    if (!$(this).hasClass('disabled')) {
      goBack();
    }
  });

  $('#restart').click(function () {
    start();
  });

  // Test Quiz Submission to Console
  // $('#quiz').submit(function ( event ) {
  //   event.preventDefault();
  //   collectAnswers();
  //   console.log(quiz.results);
  // })


  $('#quiz').submit(function (event) {
    event.preventDefault();
    console.log('submit');
    collectAnswers();
    console.log(quiz.results);
    ajaxAdd(quiz.results);
  });

});//End Document Ready