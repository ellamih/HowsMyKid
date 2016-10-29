
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


//function that queries database for form data

function loadEntry() {
      database.ref('/daily').on('value', function (results) {
      var allResults = results.val();
     // console.log(allResults.child());
     var dailyEntry = [ ];
    //loop through comments coming from the database call
    for (var item in allResults) {
      //create an object literal with the data we'll pass to Handlebars

      var dailyEntry = {
        milestone: allResults[item].milestone,
        note: allResults[item].note,
        name: allResults[item].Name,
        dailyEntryId: item,
        dailyPhoto: allResults[item].dailyphoto,
        bfastRating: allResults[item].bfastRating,
        lunchRating: allResults[item].lunchRating,
        dinnerRating: allResults[item].dinnerRating
        
        };
      console.log("object pulled from Firebase:" + dailyEntry);
      console.log(dailyEntry);
      } 
 

      var source = $("#story-template").html();
    //console.log("source of the template is defined")
    var template = Handlebars.compile(source);
    //console.log("template is compiled")
  
    var storyElement = template(dailyEntry);
    //console.log("storyElement created");
    $('.story').html(storyElement);

  });

};

loadEntry();
console.log("loadData function is run");





// Function that queries our database for comments

function getComments() {
        // Listen for changes in comments data
  database.ref('comments').on('value', function (results) {
    var allComments = results.val();
      //console.log("Get all comments stored in the results we eceived back from Firebase");
    var comments = [ ];
      //console.log("set empty array to add comments we'll append to DOM");

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
              //console.log("Handlebars template compiled");
        var commentListElement = template(context);
              //console.log("Data was passed to the template");
        comments.push(commentListElement)
              //console.log("newly created element pushed to comments array");
      }

    $('.comments').empty()
            //console.log("all list items removed from DOM before appending list items");
    for (var i in comments) {
      $('.comments').append(comments[i])
            //console.log("each comment append to the list of comments in the DOM");
      };
    
    });
  };
  

 
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


// function to run when a user clicks on the button with the class ".delete"
$('.comments').on('click', '.delete', function (e) {
    // Get the ID from the parent of the Delete button we clicked on
    var id = $(e.target).parent().data('id');
    
    //need to delete the appropriate <li>
    $(e.target).parent().remove();

    // find comment whose objectId is equal to the id we're searching with
    var commentReference = database.ref('comments/' + id);

    
    // Update likes property in database using Firebase's remove() method. However, this is asynchronouse, so not sure how to make this happen right away. Help :)
     commentReference.remove();

    });




