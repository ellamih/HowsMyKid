
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAI8h1SgbrccNMTzCdDbz4JBxidnqCLB3E",
    authDomain: "hows-my-kid.firebaseapp.com",
    databaseURL: "https://hows-my-kid.firebaseio.com",
    storageBucket: "hows-my-kid.appspot.com",
    messagingSenderId: "694614334571"
  };
  firebase.initializeApp(config);
console.log("firebase initialized");

// Connect to your Firebase application using your reference URL
var database = firebase.database();

console.log("Database connected");

var rules {
  "rules": {
    ".read": true,
    ".write": true
  }
}






// Function that queries our database for comments

function getComments() {
  // Listen for changes in comments data
  database.ref('comments').on('value', function (results) {
    // Get all comments stored in the results we eceived back from Firebase
    var allComments = results.val();
    //set an empty array to add comments we'll append to the DOM
    var comments = [ ];
    //loop through comments coming from the database call
    for (var item in allComments) {
    	//create an object literal with the data we'll pass to Handlebars
    	var context = {
    		comment: allComments[item].comment,
    		likes: allComments[item].likes,
    		commentId: item
    	};
   	

    // Get the HTML from our Handlebars comment template
      var source = $("#comment-template").html();
      // Compile our Handlebars template
      var template = Handlebars.compile(source);
      // Pass the data for this comment (context) into the template
      var commentListElement = template(context);
      // push newly created element to array of comments
      comments.push(commentListElement)
    }
    // remove all list items from DOM before appending list items
    $('.comments').empty()
    // append each comment to the list of comments in the DOM
    for (var i in comments) {
      $('.comments').append(comments[i])
    }
    
  });
}
// When page loads, call getComments function
getComments();

// function to run when a user clicks on the button with the class ".like"

$('.comments').on('click', '.like', function (e) {

  // Get the ID from the parent of the like button we clicked on
  var id = $(e.target).parent().data('id');

  // find comment whose objectId is equal to the id we're searching with
  var commentReference = database.ref('comments/' + id);

  // Get number of likes from HTML
  var likes = $('#likes').html();

  // Convert likes to a number and add a like
  likes = parseInt(likes, 10) + 1;

  // Update likes property in database using Firebase's update() method.
  commentReference.update({
    likes: likes
  });

});

//set date 

var d = new Date();
console.log("date variable created");
document.getElementById("date").innerHTML = d.toDateString();
console.log("date variable added to html");


