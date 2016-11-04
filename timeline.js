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


function loadMilestones() {
  database.ref('/daily').on('value', function (results) {

    var allResults = results.val();
    //console.log(allResults);
    //console.log(allResults.child());
    var dailyEntry = [ ];
    //loop through comments coming from the database call
    for (var item in allResults) {
      //create an object literal with the data we'll pass to Handlebars

      var dailyEntry = {
        date: allResults[item].date,
        Milestone: allResults[item].Milestone,
        dailyPhoto: allResults[item].dailyPhoto,
      };

      console.log(dailyEntry);
      var source = $("#milestone-template").html();
      var template = Handlebars.compile(source);
      var storyElement = template(dailyEntry);
      $('.timeline').prepend(storyElement);
    } 
    //console.log("storyElement created");
    
});

};

loadMilestones();
console.log("loadMilestones function is run!");
