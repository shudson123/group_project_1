// GLOBAL VERIABLES
var meal, videoSource, mealName, photo, source,
area, inst, category, ingArray, meaArray, favMeal, term;

window.addEventListener('popstate', function(event) {
    // The popstate event is fired each time when the current history entry changes.
        history.back();
        
         window.location = document.referrer;
         history.pushState({page: 1}, "title 1", "?page=1");
}, false);

//get text search field value and pass it over to the meal api 
$(document).on('click', '#submit', function (e) {
 e.preventDefault();
    term = $('#input').val();
    search();
});

//get text of the favorite item and pass it over to the meal api 
$(document).on('click','.dropdown-item', function () {
    term = $(this).text();
    search();
});

//
function search (){
   history.pushState({page: 2}, "title 2", "?page=2");
    
//evaluate that search is not empty string
    if (term.length > 0) {
        $('#errorText').text('');
        var settings = {
            "url": "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term,
            "method": "GET",
            };

        $.ajax(settings).done(function (response) {
            //evaluate that only meal that is in the meal database is returned
            if (response.meals === null) {
                $('#input').val('').focus();
                $('#input').attr('placeholder', 'Oops! your search does not match anything.');
                } else { 
                     //if meal is found, generate result
                    $('body').addClass('secondBackground');
                    $('#majorContainer').empty();
                    $('#majorContainer').append($page);
                    meal = response.meals;
                    for (var i = 0; i < meal.length; i++) {
                        $('#container').prepend($resultPage);
                         $('#resultImage').attr({'src': meal[i].strMealThumb, 'id':[i]});
                         $('#titleName').text(meal[i].strMeal).attr('id',[i]);
                         $('#category').text(meal[i].strCategory);
                         $('#region').text(meal[i].strArea);
                    }
                }
        });
    //if search is empty, display feedback message to user    
    } else {
        $('.form-control').css('border', '1px solid red');
        $('#input').attr('placeholder', 'Please enter a valid search value');
    }
}

//get the individual meal 
$(document).on('click', '.index', function () {
    
    var unit = $(this).attr('id');
    var detail = meal[unit];
    area = detail.strArea;
    inst = detail.strInstructions;
    photo = detail.strMealThumb;
    source = detail.strSource;
    mealName = detail.strMeal;
    category = detail.strCategory;
    videoSource = detail.strYoutube;
  
//create empty array and if ingredient and mesurement are not an empty string, push into the arrays
    ingArray = [];
    meaArray = [];
    var keys = Object.keys(detail);
    keys.forEach(function(key){
    if( /strIngredient.*/.test(key) && detail[key] !== null && detail[key] !== ''){
        ingArray.push(detail[key]);
        }
    if( /strMeasure.*/.test(key) && detail[key] !== null && detail[key] !== ''){
        meaArray.push(detail[key]);
        }
    });

    //add values to the favorite meal object 
    favMeal = {
        mealName: mealName, 
        mealArea: area,
        mealPhoto: photo,
        mealVideo: videoSource,
        mealSource: source,
        mealCategory: category,
        measurements: meaArray,
        mealIngredients: ingArray,
        mealInstructions: inst   
    };

//empty the container, add the meal details: name, category and area and instructions, 
    $('#container').empty();
    $('#container').append($headerDiv);
    $('.headerImage').attr('src', photo);
    $('#container').append($instDiv);
    $('.instructions').text(detail.strInstructions);
    $('#title').text(mealName);
    $('#category').text(category);
    $('#area').text(area);
    $('#sourceLink').attr('href', source);
  
//add ingredients and measurement 
    for (var k = 0; k < ingArray.length; k++) {
        var meaIng = ingArray[k].charAt(0).toUpperCase() + ingArray[k].toLowerCase().slice(1);
        var meas = meaArray[k];
        var line = `<tr class=" ing ingredients__text">
                        <td>${meas }</td>
                        <td class="mealItem" data-toggle="modal" data-target=".bd-example-modal-lg">${meaIng}</td>
                    </tr>`; 
        $('#ingredientsTable').append(line); 
        }
});

//open the instrctional video in a modal window
$(document).on('click', '#video', function () {
    $('#modalBody').append($mealVideo);
    $('#exampleModalLabel').text('Instructional Video for ' + mealName);
    var videoID = videoSource.split('v=', 2)[1];
    $('#videoIframe').attr('src', `https://www.youtube.com/embed/${videoID}?autoplay=1`);
    // $('#modalBody').append($mealVideo);
});

//remove all content from the modal and when it is closed
$('body').on('hidden.bs.modal', '.modal', function () {
    $('#modalBody').empty();
    $('#exampleModalLabel').text('');
    
});

// add the source reference to the link
    $(document).on('click', '#sourceLink', function () {
    $(this).attr('href', source);
});

//user is taken back to the home page when the home button is clicked
$('#home').click(function(){
    $('body').addClass('background');
    $('body').removeClass('secondBackground');
    $('#majorContainer').empty().append($homePageContent);
    $('#input').attr('placeholder', 'Search meals');
});
