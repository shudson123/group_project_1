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

 

















database.ref().on("child_added", function(childSnapshot) {
    // console.log(childSnapshot.val().mealName);
        // if (snapshot.child("mealName").exists() && snapshot.child("mealPhoto").exists()) {
            var snapMeal = childSnapshot.val().mealName;
            var snapPhoto = childSnapshot.val().mealPhoto;
            // console.log(snapMeal);
            // console.log(snapPhoto);
        //     // var snapPhoto = snapshot.val().mealPhoto;
        var list = `<span class="dropdown-item"> ${snapMeal}<img class=mealThumbnail src="${snapPhoto}"></span>`;
        //    }
        // console.log(list);
        // $('#favList').empty();
          $('#favList').prepend(list);


        }, 
      
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        

      });



// var snapDetail = childSnapshot.val().detail;
// var snapRole = childSnapshot.val().mealName;
// var snapCategory = childSnapshot.val().category;
// var snapArea = childSnapshot.val().area;
// var snapInst = childSnapshot.val().inst;
// var snapIngArray = childSnapshot.val().ingArray;
// var snapMeaArray = childSnapshot.val().meaArray;
// var snapPhoto = childSnapshot.val().photo;
// var snapVideoSourse = childSnapshot.val().videoSource;