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
            console.log(response.meals[0].strMeasure1);
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
    var ing1 = detail.strIngredient1;
    var ing2 = detail.strIngredient2;
    var ing3 = detail.strIngredient3;
    var ing4 = detail.strIngredient4;
    var ing5 = detail.strIngredient5;
    var ing6 = detail.strIngredient6;
    var ing7 = detail.strIngredient7;
    var ing9 = detail.strIngredient9;
    var ing8 = detail.strIngredient8;
    var ing11 = detail.strIngredient11;
    var ing10 = detail.strIngredient10;
    var ing12 = detail.strIngredient12;
    var ing13 = detail.strIngredient13;
    var ing14 = detail.strIngredient14;
    var ing15 = detail.strIngredient15;
    var ing16 = detail.strIngredient16;
    var ing17 = detail.strIngredient17;
    var ing18 = detail.strIngredient18;
    var ing19 = detail.strIngredient19;
    var ing20 = detail.strIngredient20;


//create empty array and if ingredient is not an empty string, push into the array
var arr = [];
    if (ing1.length > 0 ) {
        arr.push(ing1);
    }
    if (ing2.length > 0) {
        arr.push(ing2);
    }
    if (ing3.length > 0) {
        arr.push(ing3);
    }
    if (ing4.length > 0) {
        arr.push(ing4);
    }
    if (ing5.length > 0) {
        arr.push(ing5);
    }
    if (ing6.length > 0) {
        arr.push(ing6);
    }
    if (ing7.length > 0) {
        arr.push(ing7);
    }
    if (ing8.length > 0) {
        arr.push(ing8);
    }
    if (ing9.length > 0) {
        arr.push(ing9);
    }
    if (ing10.length > 0) {
        arr.push(ing10);
    }
    if (ing11.length > 0) {
        arr.push(ing11);
    }
    if (ing12.length > 0) {
        arr.push(ing12);
    }
    if (ing13.length > 0) {
        arr.push(ing13);
    }
    if (ing14.length > 0) {
        arr.push(ing14);
    }
    if (ing15.length > 0) {
        arr.push(ing15);
    }
    if (ing16 !== null && ing16 !== '') {
        arr.push(ing16);
    }
    if (ing17 !== null && ing17 !== '') {
        arr.push(ing17);
    }
    if (ing18 !== null && ing18 !== '') {
        arr.push(ing18);
    }
    if (ing19 !== null && ing19 !== '') {
        arr.push(ing19);
    }
    if (ing20 !== null && ing20 !== '') {
        arr.push(ing20);
    }

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



$('#home').click(function(){
$('#majorContainer').empty().append($homePageContent);

});
