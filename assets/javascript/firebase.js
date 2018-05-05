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
var database = firebase.database();


//Push recipe into Firebase storage
$(document).on('click', '#firebase', function () {
    console.log(favMeal);
    database.ref().push(favMeal)
});

//Retrieve all meals name and image 
database.ref().on("child_added", function (childSnapshot) {
    var snapMeal = childSnapshot.val().mealName;
    var snapPhoto = childSnapshot.val().mealPhoto;
    var list = `<span data-meal="${snapMeal}" class="dropdown-item text-truncate "><img class="mealThumbnail img-thumbnail" src="${snapPhoto}">${snapMeal}</span>`;

    //Stops a recipe from repeating in the collection
    if ($(`span[data-meal="${snapMeal}"]`).length > 0) return;
    $('#favList').prepend(list);
},
    function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });