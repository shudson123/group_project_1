
var $nutrientTable= `<table class="table table-sm">
<thead>
  <tr>
    <th scope="col">Nutrient</th>
    <th scope="col" id = "servingSize">Amount Per </th>
    <th scope="col" id = "hundredGram">Amout Per 100g</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">Calories</th>
    <td id = "calAmount"></td>
    <td id = "calHundredGram"></td>
  </tr>
  <tr>
    <th scope="row">Cholesterol</th>
    <td id = "cholesterolAmount"></td>
    <td id = "cholesterolHundredGram"></td>
  </tr>
  <tr>
    <th scope="row">Dietary Fiber</th>
    <td id = "dietaryFiberAmount"></td>
    <td id = "fiberHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Phosphorus</th>
    <td id = "phosphorusAmount"></td>
    <td id = "phosphorusHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Potassium</th>
    <td id = "potassiumAmount"></td>
    <td id = "potassiumHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Protein</th>
    <td id = "proteinAmount"></td>
    <td id = "proteinHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Saturated Fat</th>
    <td id = "saturatedFatAmount"></td>
    <td id = "saturatedFatHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Sodium</th>
    <td id = "sodiumAmount"></td>
    <td id = "sodiumHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Sugar</th>
    <td id = "sugarAmount"></td>
    <td id = "sugarHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Total Carbohydrate</th>
    <td id = "totalCarbohydrateAmount"></td>
    <td id = "totalCarbohydrateHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Total Fat</th>
    <td id = "totalFatAmount"></td>
    <td id = "totalFatHundredGram"></td>
    
  </tr>
</tbody>
</table>`



//this click event will get the text from the ingredient and pass it to the nutrition api
$(document).on('click', '#ing', function () {
  var chosenIngredient = $(this).text();

  //open the nutrient table for ingredient in modal window
  $('#modalBody').empty().append($nutrientTable);
  $('#exampleModalLabel').append(chosenIngredient);

  
    var term = $(this).text();
    //this query uses the natural word api to pull a matching ingredient name for the next api

    var common = {
        "url": "https://trackapi.nutritionix.com/v2/search/instant",
        "method": "GET",
        "headers": {
          "x-app-id": "f27d5bae",
          "x-app-key": "3858e7b7b95259090466bdb18fe5293f",
          "x-remote-user-id":'0',
        },
        "data":{
          "query": term,
        }
      }
      // this query uses the search term from the first query to find the nutrient profile of the food
      $.ajax(common).done(function (response){
        var nutrientItem=response.common[0].food_name;
        console.log(nutrientItem);
        var settings = {
            "url": "https://trackapi.nutritionix.com/v2/natural/nutrients",
            "method": "POST",
            "headers": {
              "x-app-id": "f27d5bae",
              "x-app-key": "3858e7b7b95259090466bdb18fe5293f",
              "x-remote-user-id":'0',
            },
            "data":{
              "query": nutrientItem,
            }
          }

          // this area enters the name of the food, the serving size, list of nutrients and nutrient amount for the selected ingredient into a table
          $.ajax(settings).done(function (response){

            $('#exampleModalLabel').append();
            var gramEquation = 100/(response.foods[0].serving_weight_grams);
            console.log(response);
            console.log(response.foods);
            $('#servingSize').empty().append("Per "+response.foods[0].serving_unit+" ("+response.foods[0].serving_weight_grams+" grams)");
            
            $('#calAmount').empty().append(response.foods[0].nf_calories.toFixed(0));
            $('#cholesterolAmount').empty().append(response.foods[0].nf_cholesterol.toFixed(2));
            $('#dietaryFiberAmount').empty().append(response.foods[0].nf_dietary_fiber.toFixed(2));
            $('#phosphorusAmount').empty().append(response.foods[0].nf_p.toFixed(2));
            $('#potassiumAmount').empty().append(response.foods[0].nf_potassium.toFixed(2));
            $('#proteinAmount').empty().append(response.foods[0].nf_protein.toFixed(2));
            $('#saturatedFatAmount').empty().append(response.foods[0].nf_saturated_fat.toFixed(2));
            $('#sodiumAmount').empty().append(response.foods[0].nf_sodium.toFixed(2));
            $('#sugarAmount').empty().append(response.foods[0].nf_sugars.toFixed(2));
            $('#totalCarbohydrateAmount').empty().append(response.foods[0].nf_total_carbohydrate.toFixed(2));
            $('#totalFatAmount').empty().append(response.foods[0].nf_total_fat.toFixed(2));
            
            console.log(gramEquation);
            $('#calHundredGram').empty().append((gramEquation*response.foods[0].nf_calories).toFixed(0));
            $('#cholesterolHundredGram').empty().append((gramEquation*response.foods[0].nf_cholesterol).toFixed(2));
            $('#fiberHundredGram').empty().append((gramEquation*response.foods[0].nf_dietary_fiber).toFixed(2));
            $('#phosphorusHundredGram').empty().append((gramEquation*response.foods[0].nf_p).toFixed(2));
            $('#potassiumHundredGram').empty().append((gramEquation*response.foods[0].nf_potassium).toFixed(2));
            $('#proteinHundredGram').empty().append((gramEquation*response.foods[0].nf_protein).toFixed(2));
            $('#saturatedFatHundredGram').empty().append((gramEquation*response.foods[0].nf_saturated_fat).toFixed(2));
            $('#sodiumHundredGram').empty().append((gramEquation*response.foods[0].nf_sodium).toFixed(2));
            $('#sugarHundredGram').empty().append((gramEquation*response.foods[0].nf_sugars).toFixed(2));
            $('#totalCarbohydrateHundredGram').empty().append((gramEquation*response.foods[0].nf_total_carbohydrate).toFixed(2));
            $('#totalFatHundredGram').empty().append((gramEquation*response.foods[0].nf_total_fat).toFixed(2));

           })

      })
;
  
});

