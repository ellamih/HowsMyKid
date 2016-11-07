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
var birthdayEpoch = {};

function loadChild() {
  database.ref('/children').on('value', function (results) {
    //console.log(results);
    
    var allResults = results.val();
    
    console.log(allResults);

    var Henry = allResults['-KVhkTz3gDkj5auuR71w'];
    var birthday = Henry.birthday;
  
    birthday = birthday.replace(/-/g,',');

    console.log(birthday);

    birthdayEpoch = new Date(birthday).getTime();
    console.log(birthdayEpoch);

  });
}

loadChild();
console.log("loadChild function is run!");

var photoDateEpoch = {};

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
        type: (allResults[item].type == "video/mp4") ? true : false,
        ageMonths: 0
      };

      photoDateEpoch = new Date(dailyEntry.date).getTime();
      //console.log(photoDateEpoch);

      var age = photoDateEpoch - birthdayEpoch;
      age = new Date(age);
      age = age/(60*60*24*30)/1000
      ageMonths = Math.round(age)
      console.log("months: " + ageMonths);

      var dailyEntry = {
        date: allResults[item].date,
        Milestone: allResults[item].Milestone,
        dailyPhoto: allResults[item].dailyPhoto,
        type: (allResults[item].type == "video/mp4") ? true : false,
        ageMonths: ageMonths
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


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function changeNav(t) {
  if (t.checked) {
        openNav();
      } else {
        closeNav();
      }
    }


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


//load birthday from Firebase
//load time photo was taken
//subtract date photo was taken from birthday


