
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




// Function that queries our database for comments

function getComments() {
  // Listen for changes in comments data
  database.ref('comments').on('value', function (results) {
    var allComments = results.val();
          console.log("Get all comments stored in the results we eceived back from Firebase");
    var comments = [ ];
          console.log("set empty array to add comments we'll append to DOM");

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
      var template = Handlebars.compile(source);
            console.log("Handlebars template compiled");
      var commentListElement = template(context);
            console.log("Data for this comment (context) was passed to the template");
      comments.push(commentListElement)
            console.log("newly create element pushed to comments array");

    }
    $('.comments').empty()
            console.log("all list items removed from DOM before appending list items");
    for (var i in comments) {
      $('.comments').append(comments[i])
            console.log("each comment append to the list of comments in the DOM");

    }
    
  });
}
// When page loads, call getComments function
    getComments();
      console.log("getComments function is run");

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




