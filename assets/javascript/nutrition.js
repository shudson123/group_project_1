
var $nutrientTable= `<table class="table table-sm">
<thead>
  <tr>
    <th scope="col">Nutrient</th>
    <th scope="col" id = "servingSize">Amount Per </th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">Calories</th>
    <td colspan= "2" id = "calAmount"></td>
  </tr>
  <tr>
    <th scope="row">Cholesterol</th>
    <td id = "cholesterolAmount"></td>
  </tr>
  <tr>
    <th scope="row">Dietary Fiber</th>
    <td id = "dietaryFiberAmount"></td>
    
  </tr>
  <tr>
    <th scope="row">Phosphorus</th>
    <td id = "phosphorusAmount"></td>
    
  </tr>
  <tr>
    <th scope="row">Potassium</th>
    <td id = "potassiumAmount"></td>
    
  </tr>
  <tr>
    <th scope="row">Protein</th>
    <td id = "proteinAmount"></td>
    
  </tr>
  <tr>
    <th scope="row">Saturated Fat</th>
    <td id = "saturatedFatAmount"></td>
    
  </tr>
  <tr>
    <th scope="row">Sodium</th>
    <td id = "sodiumAmount"></td>
    
  </tr>
  <tr>
    <th scope="row">Sugar</th>
    <td id = "sugarAmount"></td>
    
  </tr>
  <tr>
    <th scope="row">Total Carbohydrate</th>
    <td id = "totalCarbohydrateAmount"></td>
    
  </tr>
  <tr>
    <th scope="row">Total Fat</th>
    <td id = "totalFatAmount"></td>
    
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
            console.log(response);
            console.log(response.foods);
            $('#servingSize').empty().append("Per "+response.foods[0].serving_unit);
            $('#calAmount').empty().append(response.foods[0].nf_calories);
            $('#cholesterolAmount').empty().append(response.foods[0].nf_cholesterol);
            $('#dietaryFiberAmount').empty().append(response.foods[0].nf_dietary_fiber);
            $('#phosphorusAmount').empty().append(response.foods[0].nf_p);
            $('#potassiumAmount').empty().append(response.foods[0].nf_potassium);
            $('#proteinAmount').empty().append(response.foods[0].nf_protein);
            $('#saturatedFatAmount').empty().append(response.foods[0].nf_saturated_fat);
            $('#sodiumAmount').empty().append(response.foods[0].nf_sodium);
            $('#sugarAmount').empty().append(response.foods[0].nf_sugars);
            $('#totalCarbohydrateAmount').empty().append(response.foods[0].nf_total_carbohydrate);
            $('#totalFatAmount').empty().append(response.foods[0].nf_total_fat);
           })

      })
;
  
});

