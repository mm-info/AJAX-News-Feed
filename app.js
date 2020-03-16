'use strict';
(function() {

////////////////////////////////////////////////////////////////////////////////
// APIs w/ Keys
  const apiUrl_mashable = "https://cors-anywhere.herokuapp.com/https://api.mashable.com/v1/posts/";
  const apiUrl_newsapi  = "https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?country=us&apiKey=6a67f57ad9954cf29f8d464fa43cd800";
  const apiUrl_NYTimes  = "https://api.NYTimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=4hPAQezbHfC5HmgTqZFXDU56LWe0oHhQ";


////////////////////////////////////////////////////////////////////////////////
// Creating objects from each API
// + Each run from within the ajax request
  // Mashable
  function getMashable(dataDump) {
    $.each(dataDump, function() {
      if(this.title !== '') {
        // Define elements for article object
        let title = $('<h3>').text(this.title);
        let link = $('<a>').attr('href', this.link);
        let thumb = $('<img>').attr('src', this.images.i120x120);
        let author = $('<h6>').text(this.author);
        let fullCopy = $('<p>').text(this.content.excerpt).addClass('hidden');

        // Create article object
        let Content_Mashable = { title: title,link: link,thumb: thumb,fullCopy: fullCopy,author: author }
        domInsert(Content_Mashable);
      }
    });
    fullReveal();
  };

  // NewsAPI
  function getNewsApi(dataDump) {
    $.each(dataDump, function() {
      if(this.title !== '') {
        // Define elements for article object
        let title = $('<h3>').text(this.title);
        let link = $('<a>').attr('href', this.url);
        let thumb = $('<img>').attr('src', this.urlToImage);
        let source = $('<h6>').text(this.source.name);
        let fullCopy = $('<p>').text(this.description).addClass('hidden');

        // Create article object
        let Content_NewsAPI = { title: title, link: link, thumb: thumb, source: source, fullCopy: fullCopy }
        domInsert(Content_NewsAPI);
      }
    });
    fullReveal();
  };

  // NYT Books
  function getNYT(dataDump) {
    $.each(dataDump, function() {
      if(this.title !== '') {
        // Define elements for article object
        let title = $('<h3>').text(this.title).css('text-transform', 'lowercase');
        let link = $('<a>').attr('href', this.amazon_product_url);
        let thumb = $('<img>').attr('src', this.book_image);
        let author = $('<h6>').text(this.author);
        let fullCopy = $('<p>').text(this.description).addClass('hidden');

        // Create article object
        let Content_NYT = {title: title, link: link, thumb: thumb, author: author, fullCopy: fullCopy }

        domInsert(Content_NYT);
      }
    });
    fullReveal();
  };


////////////////////////////////////////////////////////////////////////////////
// Adding to the DOM
  function domInsert(data) {$('#main').append($('<article class="article">').append($('<section class="featuredImage">').append(data.thumb)).append($('<section class="articleContent">').append((data.link).append(data.title)).append(data.author).append(data.source).append(data.fullCopy)).append($('<div class="clearfix">')));}


////////////////////////////////////////////////////////////////////////////////
// Click listener on the navigation
  function fullReveal() {
  $('.article .articleContent h3').on('click', function(e){
    e.preventDefault();
    $('#popUp').removeClass('loader hidden');

    let title = $(this).text();
    let link = $(this).parent('a').attr('href');
    let desc = $(this).parent('a').siblings().last().text();

    $('#popUp .container h1').text(title);
    $('#popUp .container p').text(desc);
    $('#popUp .container a').attr('href', link);
  });
}


////////////////////////////////////////////////////////////////////////////////
// Mashable feed loader
  function homeFeed() {
    $('#main').empty();
    $.ajax({
      url: apiUrl_mashable,
      contentType: 'application/json',
      dataType: 'json',
      success: function(response) {
        getMashable(response.posts);
      },
      error: function() {
        $('#main').html('<div class="err"><p>Oh no, an error with the Mashable feed has occurred!</p></div>');
      }
    });
  }


////////////////////////////////////////////////////////////////////////////////
// Start with Mashable feed on load.
homeFeed();


////////////////////////////////////////////////////////////////////////////////
// Mashable listener
$('.Mashable').on('click', function(e) {
  homeFeed();
  $('.news-source').text($(this).text());
});


////////////////////////////////////////////////////////////////////////////////
// NYT Books listener
$('.NYT').on('click',function() {
  $('#main').empty();
  $('#source').text($(this).text());
  $.ajax({
    type: 'GET',
    url: apiUrl_NYTimes,
    data: { format: 'json' },
    error: function() {
      $('#main').html('<div class="err"><p>Oh no, an error with the NYT Books has occurred!</p></div>');
    },
    success: function(response) {
      getNYT(response.results.books);
    },
  });
});


////////////////////////////////////////////////////////////////////////////////
// News API listener
$('.NewsApi').on('click',function() {
  $('#main').empty();
  $('#source').text($(this).text());

  $.ajax({
    type: 'GET',
    url: apiUrl_newsapi,
    data: { format: 'json' },
    error: function() {
      $('#main').html('<div class="err"><p>Oh no, an error NewsApi has occurred!</p></div>');
    },
    success: function(response) {
      getNewsApi(response.articles);
    },
  });
});

////////////////////////////////////////////////////////////////////////////////
// Event Listeners
  // AJAX Events (Pop-up toggliong)
  $(document).ajaxStart(function() { $('#popUp').removeClass('hidden') });
  $(document).ajaxStop(function()  { $('#popUp').addClass('hidden'); });


  // Close popup
  $('#popUp').on('click', '.closePopUp', function(e){
    e.preventDefault();
    $('#popUp').addClass('loader hidden');
  });

  // Search bar interaction
  $('#search-icon').on('click', function(e) {
    e.preventDefault();
    $(this).parent('#search').toggleClass('active');
  });
})();
