
var starWarsArray = ["Darth Maul","Darth Sidious", "Darth Vader", "Yoda", "Mace windu","Chewbacca", "Han Solo", "Rey", "R2D2", "C3PO","Jabba","Boba Fett", "Darth Tyranus"];

for ( var i= 0; i < starWarsArray.length; i++){
  var button = $("<button>");
  button.text(starWarsArray[i]);
  button.attr("data-person", starWarsArray[i]);
  $(".col-md").append(button);
}



// Event listener for all button elements
$(document).on("click", "button", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var person = $(this).attr("data-person");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;
        console.log(results)
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
          
          var movingLink = results[i].images.fixed_height.url
          var stillLink = results[i].images.fixed_height_still.url
          console.log(movingLink)
          console.log(stillLink)
            
          var gifDiv = $("<div class='item'>");
            
            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var personImage = $("<img>");
            personImage.addClass("clickMe");


            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", stillLink);
            personImage.attr('data-state', 'still');
            personImage.attr('data-animated', movingLink);
            personImage.attr('data-still', stillLink);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          // }  
        }
      });
  });

  $(document).on('click', '.clickMe', function(){
    var state = $(this).attr('data-state');

    if(state === 'still'){
      $(this).attr('data-state', 'animated');
      $(this).attr('src', $(this).attr('data-animated'));
    }else{
      $(this).attr('data-state', 'still');
      $(this).attr('src', $(this).attr('data-still'))
    }
  })

$("#add-starwar").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputStarWars = $("#starwar-input").val().trim();

    var newButton = $("<button>"); 
    newButton.text(inputStarWars);
    newButton.attr("data-person", inputStarWars);
    $(".col-md").append(newButton);

    // Running the searchBandsInTown function (passing in the artist as an argument)
  });