var categories = ['dallas cowboys', 'shaq', 'president', 'who cares', 'turn up', 'workout'];

function loadButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttonDiv").empty();
    
    // Looping through the array of movies
    for (var i = 0; i < categories.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<a>");
        // Adding a class
        a.addClass("btn btn-info btn-sm button m-1 queryButton");
        // Added a data-attribute
        a.attr("data-name", categories[i].replace(/\s+/g, '+'));
        
        
        // Provided the initial button text
        a.text(categories[i]);
        // Added the button to the HTML
        $("#buttonDiv").append(a);
        $("#newCategory").val();
    }
}

loadButtons();

$("#submitCategory").on("click", function(event) {
    event.preventDefault();

    // This line of code will grab the input from the textbox
    var category = $("#newCategory").val();

    // The movie from the textbox is then added to our array
    categories.push(category);

    // Calling renderButtons which handles the processing of our movie array
    loadButtons();
    // Clear the input field on add
    $("#newCategory").val("");
});

function loadGifs() {
    $("#resultsDiv").empty();
    var queryType = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=M9aywJ6suHn4lLhcdFehVRMjooA3zG4F&q=" + queryType + "&limit=18&offset=0&rating=R&lang=en";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        console.log(response);

        for (i = 0; i < 9; i++) {
            var image = response.data[i].images.fixed_height_still.url;
            var rating = response.data[i].rating;
            var date = response.data[i].import_datetime;
            var card = ('<div class="col-md-6 col-sm-6"> <div class="card"><div class="imgContainer"> <img class="card-img-top" src=' + image + '></div> <ul class="list-group list-group-flush"> <li class="list-group-item"><strong>Uploaded: </strong>' + date + '<span id="date"></span></li><li class="list-group-item"><strong>Rating: </strong><span id="rating">' + rating + '</span></li></ul> <div class="card-body justify-content-center bg-dark"> <center> <a target="_blank" href="' + image + '" class="btn btn-sm btn-info"><i class="fa fa-cloud-download" aria-hidden="true"></i> Giphy</a> </center> </div></div></div>')
            $("#resultsDiv").append(card);
        }

    });

}
// Function to add a class on click & switch the image suffix to mimic play/pause
$('body').on('click', '.card-img-top', function() {
    var src = $(this).attr("src");
    if ($(this).hasClass('playing')) {
        //stop
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
});

// Function to load all of the GIFs for a certain keyword
$(document).on("click", ".queryButton", loadGifs);

// Function to remove the loading icon on loading GIFs 
$('.queryButton').on("click", function() {
    $('.fa-spin').css('display', 'none');
})

