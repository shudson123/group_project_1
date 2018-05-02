// Initialize Firebase
var config = {
    apiKey: "AIzaSyBJJXRbQl_3MgQaqRE-uZ_p9axmv0kn50E",
    authDomain: "food-for-thought-dc63a.firebaseapp.com",
    databaseURL: "https://food-for-thought-dc63a.firebaseio.com",
    projectId: "food-for-thought-dc63a",
    storageBucket: "food-for-thought-dc63a.appspot.com",
    messagingSenderId: "110594113089"
};
firebase.initializeApp(config);
var database = firebase.database()
var ref = database.ref('plate')
//   ref.on('value', gotData);

//Push recipe into Firebase storage
$(document).on('click', '#firebase', function () {
    console.log(favMeal);
    database.ref().push(favMeal)
});


// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

console.log(childSnapshot.val());


    var snapDetail = childSnapshot.val().detail;
    var snapRole = childSnapshot.val().mealName;
    var snapCategory = childSnapshot.val().category;
    var snapArea = childSnapshot.val().area;
    var snapInst = childSnapshot.val().inst;
    var snapIngArray = childSnapshot.val().ingArray;
    var snapMeaArray = childSnapshot.val().meaArray;
    var snapPhoto = childSnapshot.val().photo;
    var snapVideoSourse = childSnapshot.val().videoSource;

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid

$("#myCollections").on("click", function (event) {
    event.preventDefault();
    // Get the input values

    // $('tbody').empty();
    $('#logo').addClass('hide');
    $('body').removeClass('background');

    $('#majorContainer').empty();
    $('#majorContainer').append($resultPage, $mealDetail, $mealDetail2, $mealVideo);


    for (var i = 0; i < meal.length; i++) {

        var list = `<tr class='index' id='${[i]}'> 
                                <td >${meal[i].strMeal}</td>
                                <td>${meal[i].strCategory}</td>
                                <td>${meal[i].strArea}</td>
                             </tr>`;
        $('#mealTable').append(list);

    }
});