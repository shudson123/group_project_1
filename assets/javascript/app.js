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
        $('.form-control').css('border', '1px solid blue');
        $('#errorText').text('');
        // console.log(term);

        var settings = {
            "url": "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term,
            "method": "GET",
            };

        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(response.meals[0].strMeasure1);
            //evaluate that only meal that is in the meal database is returned
            if (response.meals === null) {
                //if meal not, found display message
                $('#input').val('').focus();
                $('#errorText').text('Oops! No meal matched your query.');
                //if meal is found, generate result and display in table
                } else {
                    // $('tbody').empty();
                    // $('body').removeClass('background');
                    $('body').addClass('secondBackground');

                    $('#majorContainer').empty();
                    $('#majorContainer').append($resultPage);
    
                    meal = response.meals;
                    for (var i = 0; i < meal.length; i++) {
                        
                         var list = `<tr class='index' id='${[i]}'> 
                                        <td >${meal[i].strMeal}</td>
                                        <td>${meal[i].strCategory}</td>
                                        <td>${meal[i].strArea}</td>
                                     </tr>`;
                        $('#mealTable').append(list);
                    }
                }
        });
//if search is empty, display message
            } else {
                $('.form-control').css('border', '1px solid red');
                $('#input').attr('placeholder', 'Please enter a valid search term').css('color','red');
            }
            e.preventDefault();
        });

//get the individual meal 
$(document).on('click', '.index', function () {
    var unit = $(this).attr('id');
    var detail = meal[unit];
    var area = detail.strArea;
    var inst = detail.strInstructions;
    var category = detail.strCategory;
    photo = detail.strMealThumb;
    source = detail.strSource;
    mealName = detail.strMeal;
    videoSource = detail.strYoutube;
      
//create empty array and if ingredient and mesurement are not an empty string, push into the array
    var ingArray = [];
    var meaArray = [];
    var keys = Object.keys(detail);
    keys.forEach(function(key){
    if( /strIngredient.*/.test(key) && detail[key] !== null && detail[key] !== ''){
        ingArray.push(detail[key]);
        }
    if( /strMeasure.*/.test(key) && detail[key] !== null && detail[key] !== ''){
        meaArray.push(detail[key]);
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


// create the ingredient table
    $('#ingTable').empty();
    ingArray.forEach(function(ing1){
        var ingred = ing1.charAt(0).toUpperCase() + ing1.toLowerCase().slice(1);
        var ingre = `<button class="btn btn-success" id="ing" data-toggle="modal" data-target=".bd-example-modal-lg">${ingred}</button>`;
        $('#ingre').append(ingre);
    });
    
//add photo, ingredients and measurement 
    $('#mealImg img').attr('src', photo);
    for (var k = 0; k < ingArray.length && k < meaArray.length; k++) {
        var meaIng = ingArray[k].charAt(0).toUpperCase() + ingArray[k].toLowerCase().slice(1);
        var measure = `<tr>
                         <td class="meaItem">${meaIng}</td>
                         <td class="meaItem">${meaArray[k]}</td>
                      </tr>`;
        $('#measureTable').append(measure);  
        }
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
    $('body').addClass('background');
    $('body').removeClass('secondBackground');
    $('#majorContainer').empty().append($homePageContent);
    $('#input').attr('placeholder', 'Search meals');

});


