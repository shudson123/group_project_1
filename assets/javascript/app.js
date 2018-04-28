var meal;

//get text search field and pass it over to the meal api 
$(document).on('click', '#submit', function (e) {
    var term = $('#input').val();
    e.preventDefault();
//evaluate that search is not empty string
    if (term.length > 0) {
        $('#errorText').text('');
        console.log(term);

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
    var name = detail.strMeal;
    var area = detail.strArea;
    var video = detail.strYoutube;
    var source = detail.strSource;
    var photo = detail.strMealThumb;
//create empty array and if ingredient is not an empty string, push into the array
   
    var arr = [];
    var keys = Object.keys(detail);
    keys.forEach(function(key){
    if( /strIngredient.*/.test(key) && detail[key] !== null && detail[key] !== ''){
        arr.push(detail[key]);
        }
    });


    $('#container').empty();
    $('#container').append($mealDetail);
    $('#title').text(name);
    $('#category').text(category);
    $('#area').text(area);
    $('#container').append($mealDetail2);
    $('#instr').text(detail.strInstructions);


    console.log(arr);
// create the ingredient table
    $('#ingTable').empty();
    arr.forEach(function(ing1){
        var ingre = `<button class="btn btn-success"id='ing'>${ing1}</button>`;
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
    console.log(term);
});

$('#home').click(function(){
$('#majorContainer').empty().append($homePageContent);
});
