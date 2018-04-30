var meal;
var videoSource;
var mealName;
var photo;
var source;


//get text search field and pass it over to the meal api 
$(document).on('click', '#submit', function (e) {
    var term = $('#input').val();
    e.preventDefault();
//evaluate that search is not empty string
    if (term.length > 0) {
        $('#errorText').text('');
        // console.log(term);

        var settings = {
            "url": "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term,
            "method": "GET",
            };

        $.ajax(settings).done(function (response) {
            console.log(response);
            //evaluate that only meal that is in the meal database is returned
            if (response.meals === null) {
                //if meal not, found display message
                $('#input').val('').focus();
                $('#errorText').text('Oops we do not have such a meal');
                //if meal is found, generate result and display in table
                } else {
                    // $('tbody').empty();
                    $('#majorContainer').empty();
                    $('#majorContainer').append($resultPage);
    
                    meal = response.meals;
                    for (var i = 0; i < meal.length; i++) {
                        
                         var list = `<tr> 
                                        <td class='index' id='${[i]}'>${meal[i].strMeal}</td>
                                        <td>${meal[i].strCategory}</td>
                                        <td>${meal[i].strArea}</td>
                                     </tr>`;
                        $('#mealTable').append(list);
                    }
                }
        });
//if search is empty, display message
            } else {
                $('#errorText').text('Please enter a valid search term');
            }
            e.preventDefault();
        });

//get the individual meal 
$(document).on('click', '.index', function () {
    var unit = $(this).attr('id');
    var detail = meal[unit];
    var category = detail.strCategory;
    var inst = detail.strInstructions;
    mealName = detail.strMeal;
    var area = detail.strArea;
    videoSource = detail.strYoutube;
    source = detail.strSource;
    photo = detail.strMealThumb;
//create empty array and if ingredient is not an empty string, push into the array
   
    var arr = [];
    var keys = Object.keys(detail);
    keys.forEach(function(key){
    if( /strIngredient.*/.test(key) && detail[key] !== null && detail[key] !== ''){
        arr.push(detail[key]);
        }
    });

//empty the container, add the meal details: name, category and area, 
    $('#container').empty();
    $('#container').append($mealDetail);
    $('#title').text(mealName);
    $('#category').text(category);
    $('#area').text(area);
    $('#container').append($mealDetail2);
    $('#instr').text(detail.strInstructions);

// console.log(arr);
// create the ingredient table
    $('#ingTable').empty();
    arr.forEach(function(ing1){
        var ingre = `<button class="btn btn-success" id="ing" data-toggle="modal" data-target=".bd-example-modal-lg">${ing1.charAt(0).toUpperCase() + ing1.toLowerCase().slice(1)}</button>`;
         
        var measure = `<tr>
                            <td>${ing1.toUpperCase()}</td>
                            <td>${ing1}</td>
                        </tr>`;
        $('#ingre').append(ingre);
        $('#measureTable').append(measure);
    }); 
});


//this click even will get the text from the ingredient and pass it to the nutrition api
$(document).on('click', '#ing', function () {
    var term = $(this).text();
    // console.log(term);
});

//open the instrctional video in a modal window
$(document).on('click', '#video', function () {
    $('#modalBody').empty().append($mealVideo);
    $('#exampleModalLabel').text('Instructional Video for ' + mealName);
    var videoID = videoSource.split('v=', 2)[1];
    $('#videoIframe').attr('src', `https://www.youtube.com/embed/${videoID}?autoplay=1`);
});

//remove all content from the modal when it is closed
$('body').on('hidden.bs.modal', '.modal', function () {
    $('#exampleModalLabel').text('');
    $('#modalBody').empty();
});

//add the source reference to the link
$(document).on('click', '#sourceLink', function () {
    $('#sourceLink').attr('href', source);
});

//user is taken back to the home page when the home button is clicked
$('#home').click(function(){
$('#majorContainer').empty().append($homePageContent);
});


