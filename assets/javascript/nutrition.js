
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
    <th scope="row">Cholesterol (mg)</th>
    <td id = "cholesterolAmount"></td>
    <td id = "cholesterolHundredGram"></td>
  </tr>
  <tr>
    <th scope="row">Dietary Fiber (g)</th>
    <td id = "dietaryFiberAmount"></td>
    <td id = "fiberHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Phosphorus (mg)</th>
    <td id = "phosphorusAmount"></td>
    <td id = "phosphorusHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Potassium (mg)</th>
    <td id = "potassiumAmount"></td>
    <td id = "potassiumHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Protein (g)</th>
    <td id = "proteinAmount"></td>
    <td id = "proteinHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Saturated Fat (g)</th>
    <td id = "saturatedFatAmount"></td>
    <td id = "saturatedFatHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Sodium (mg)</th>
    <td id = "sodiumAmount"></td>
    <td id = "sodiumHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Sugar (g)</th>
    <td id = "sugarAmount"></td>
    <td id = "sugarHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Total Carbohydrate (g)</th>
    <td id = "totalCarbohydrateAmount"></td>
    <td id = "totalCarbohydrateHundredGram"></td>
    
  </tr>
  <tr>
    <th scope="row">Total Fat (g)</th>
    <td id = "totalFatAmount"></td>
    <td id = "totalFatHundredGram"></td>
    
  </tr>
</tbody>
</table>`



//this click event will get the text from the ingredient and pass it to the nutrition api
$(document).on('click', '.mealItem', function () {
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

              if (response.foods[0].nf_calories == null){
                $('#calAmount').empty().append('0');
                $('#calHundredGram').empty().append('0');
              }
              else{
              $('#calAmount').empty().append(response.foods[0].nf_calories.toFixed(0));
              $('#calHundredGram').empty().append((gramEquation*response.foods[0].nf_calories).toFixed(0));
              }

              if (response.foods[0].nf_cholesterol == null){
                $('#cholesterolAmount').empty().append('0');
                $('#cholesterolHundredGram').empty().append('0');
              }
              else{
              $('#cholesterolAmount').empty().append(response.foods[0].nf_cholesterol.toFixed(0));
              $('#cholesterolHundredGram').empty().append((gramEquation*response.foods[0].nf_cholesterol).toFixed(0));
              }
              
              if (response.foods[0].nf_dietary_fiber == null){
                $('#dietaryFiberAmount').empty().append('0');
                $('#fiberHundredGram').empty().append('0');
              }
              else{
              $('#dietaryFiberAmount').empty().append(response.foods[0].nf_dietary_fiber.toFixed(0));
              $('#fiberHundredGram').empty().append((gramEquation*response.foods[0].nf_dietary_fiber).toFixed(0));
              }
              
              if (response.foods[0].nf_p == null){
                $('#phosphorusAmount').empty().append('0');
                $('#phosphorusHundredGram').empty().append('0');
              }
              else{
              $('#phosphorusAmount').empty().append(response.foods[0].nf_p.toFixed(2));
              $('#phosphorusHundredGram').empty().append((gramEquation*response.foods[0].nf_p).toFixed(2));
              }
              
              if (response.foods[0].nf_potassium == null){
                $('#potassiumAmount').empty().append('0');
                $('#potassiumHundredGram').empty().append('0');
              }
              else{
              $('#potassiumAmount').empty().append(response.foods[0].nf_potassium.toFixed(2));
              $('#potassiumHundredGram').empty().append((gramEquation*response.foods[0].nf_potassium).toFixed(2));
              }

              if (response.foods[0].nf_protein == null){
                $('#proteinAmount').empty().append('0');
                $('#proteinHundredGram').empty().append('0');
              }
              else{
              $('#proteinAmount').empty().append(response.foods[0].nf_protein.toFixed(2));
              $('#proteinHundredGram').empty().append((gramEquation*response.foods[0].nf_protein).toFixed(2));
              }

              if (response.foods[0].nf_saturated_fat == null){
                $('#saturatedFatAmount').empty().append('0');
                $('#saturatedFatHundredGram').empty().append('0');
              }
              else{
              $('#saturatedFatAmount').empty().append(response.foods[0].nf_saturated_fat.toFixed(2));
              $('#saturatedFatHundredGram').empty().append((gramEquation*response.foods[0].nf_saturated_fat).toFixed(2));
              }

              if (response.foods[0].nf_sodium == null){
                $('#sodiumAmount').empty().append('0');
                $('#sodiumHundredGram').empty().append('0');
              }
              else{
              $('#sodiumAmount').empty().append(response.foods[0].nf_sodium.toFixed(2));
              $('#sodiumHundredGram').empty().append((gramEquation*response.foods[0].nf_sodium).toFixed(2));
              }

              if (response.foods[0].nf_sugars == null){
                $('#sugarAmount').empty().append('0');
                $('#sugarHundredGram').empty().append('0');
              }
              else{
              $('#sugarAmount').empty().append(response.foods[0].nf_sugars.toFixed(2));
              $('#sugarHundredGram').empty().append((gramEquation*response.foods[0].nf_sugars).toFixed(2));
              }

              if (response.foods[0].nf_total_carbohydrate == null){
                $('#totalCarbohydrateAmount').empty().append('0');
                $('#totalCarbohydrateHundredGram').empty().append('0');
              }
              else{
              $('#totalCarbohydrateAmount').empty().append(response.foods[0].nf_total_carbohydrate.toFixed(2));
              $('#totalCarbohydrateHundredGram').empty().append((gramEquation*response.foods[0].nf_total_carbohydrate).toFixed(2));
              }


              if (response.foods[0].nf_total_fat == null){
                $('#totalFatAmount').empty().append('0');
                $('#totalFatHundredGram').empty().append('0');
              }
              else{
              $('#totalFatAmount').empty().append(response.foods[0].nf_total_fat.toFixed(2));
              $('#totalFatHundredGram').empty().append((gramEquation*response.foods[0].nf_total_fat).toFixed(2));
              }
           })

      })
;
  
});

