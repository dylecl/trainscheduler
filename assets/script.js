  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAemEdUevdtJKBJTI2ODpYO2B0AB2nurP4",
    authDomain: "traintimes-3b3c1.firebaseapp.com",
    databaseURL: "https://traintimes-3b3c1.firebaseio.com",
    projectId: "traintimes-3b3c1",
    storageBucket: "traintimes-3b3c1.appspot.com",
    messagingSenderId: "859758394981"
 };
 firebase.initializeApp(config);
 
 
 // globals
 var database = firebase.database();
 var name;
 var destination;
 var start;
 var frequency;

 $("#user-submit").on("click", function(event) {
     event.preventDefault();
     name = $("#user-train-name").val();
     destination = $("#user-destination").val();
     frequency = parseInt($("#user-frequency").val());
     start = $("#user-first").val();
     console.log(name, destination, frequency, start);
     $("input").val("");

     database.ref().push({
         name: name,
         destination: destination,
         frequency: frequency,
         start: start
     })
 })

database.ref().on("child_added", function(snapshot) {
    
    var fTT = snapshot.val().start;
    var fTTConverted = moment(fTT, "HH:mm").subtract(1, "day");
    var diffTime = moment().diff(moment(fTTConverted), "minutes")
    var tRemainer = diffTime % frequency
    var minutesAway = frequency - tRemainer;
    var nextArrival = moment().add(minutesAway, "minutes");
    var catchTrain = moment(nextArrival).format("HH:mm")
    
    
    
    
    
    // things to append
    $("tbody").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + catchTrain + "</td><td>" + nextArrival + "</td></tr>")


}, function(errorObject) {
   console.log("The read failed: " + errorObject.code);
})