/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $(function() {
    tweetSubmit();
    writeToggle();
  });
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = function(tweetObj) {
    const $tweet = $(`<article class="tweet">Hello world</article>`);

    const userAvatar = $('<img>').addClass('tweet-avatar').attr('src', tweetObj.user.avatars);
    const userName = $('<span>').addClass('tweet-name').text(tweetObj.user.name);
    const headerDivLeft = $('<div>').addClass('header-left').append(userAvatar, userName);
    const userHandle = $('<span>').addClass('tweet-id').text(tweetObj.user.handle);
    const headerDivRight = $('<div>').addClass('header-right').append(userHandle);
    const tweetHeader = $('<header>').addClass('old-tweet').append(headerDivLeft, headerDivRight);

    const userTweet = $('<p>').addClass('old-tweet').append(document.createTextNode(tweetObj.content.text));

    const tweetDate = $('<span>').addClass('tweet-date').text(timeago.format(tweetObj.created_at));
    const footerDivLeft = $('<div>').addClass('footer-left').append(tweetDate);
    const footerDivRight = $('<div>').addClass('footer-right').html(`
      <a href=""><i class="fas fa-flag"></i></a>
      <a href=""><i class="fas fa-retweet"></i></a>
      <a href=""><i class="fas fa-heart"></i></a>
    `);
    const tweetFooter = $('<footer>').addClass('old-tweet').append(footerDivLeft, footerDivRight);
    const tweetArticle = $('<article>').addClass('old-tweet').append(tweetHeader, userTweet, tweetFooter);
    return tweetArticle;   
  }

  // Display existing tweets
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('.tweets-container')
    // Emptying the "tweets-container" element
    $('.tweets-container').empty();
      // loops through tweets
      for (const tweet of tweets) {
        // calls createTweetElement for each tweet
        const $tweet = createTweetElement(tweet)
        // takes return value and appends it to the tweets container (index 0)
        $tweetsContainer.prepend($tweet);
    }
  }

  // renderTweets(data);

  // Submit new tweet
  const tweetSubmit = function() {
    $('#tweet-text').submit(function(event) {
      event.preventDefault();

      const $tweetText = $('#tweet-text :input').val();
      // Error message for invalid submission
      if ($tweetText.length < 1) {
        if ($('.submit-error').text() !== 'Please tweet something') {
          $('.submit-error').hide().text('');
        }
        return $('.submit-error').text('Please tweet something').slideDown(750);
      }
      if ($tweetText.length > 140) {
        if ($('.submit-error').text() !== 'Tweet too long') {
          $('.submit-error').hide().text('');
        }
        return $('.submit-error').text('Tweet too long').slideDown(750);
      }
      // Hide error message for valid submission
      $('.submit-error').hide();

      // Convert input to JSON format
      const $data = $('#tweet-text :input').serialize();
      // POST submission
      $.post('/tweets', $data)
        .done(function() {
          // Empting the textarea input field
          $('#tweet-text textarea').val('');
          $.get('/tweets')
            .done(function(data) {
              // Word counter resets
              $('.new-tweet .counter').text(140);
              // Updates the list of tweets
              renderTweets(data);
            });
          });
      })
  }

  // Display tweets from database
  const loadTweets = function() {
    $.get('/tweets', function(data) {
      renderTweets(data);
    });
  };

  loadTweets();
});