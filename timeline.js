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


//function that queries database for child's data

/*function loadChild() {
  database.ref('/children').on('value', function (results) {

    var allResults = results.val();

    for (var item in allResults) {

      var childData = {
        birthday: allResults[item].birthday,
        firstName: allResults[item].firstName,
        lastName: allResults[item].lastName
      }
    }      
      var source = $("#name-template").html();
      var template = Handlebars.compile(source);
      $('#timeline').prepend(template(childData));
    }); 

    }

loadChild();
console.log("loadChild function is run!");
*/

//function that queries database for form data
function loadMilestones() {
  database.ref('/daily').on('value', function (results) {

    var allResults = results.val();

    //loop through the data coming from the database call
    for (var item in allResults) {
      //create an object literal with the data we'll pass to Handlebars

      var dailyEntry = {
        date: allResults[item].date,
        Milestone: allResults[item].Milestone,
        dailyPhoto: allResults[item].dailyPhoto,
        type: (allResults[item].type == "video/mp4") ? true : false
      };

      var source = $("#milestone-template").html();
      var template = Handlebars.compile(source);
      var storyElement = template(dailyEntry);
      $('.timeline').prepend(storyElement);
    } 
    
});

};

loadMilestones();
console.log("loadMilestones function is run!");
