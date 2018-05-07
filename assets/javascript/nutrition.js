//this click event will get the text from the ingredient and pass it to the nutrition api
$(document).on('click', '.mealItem', function () {
  var chosenIngredient = $(this).text();

  //this query uses the natural word api to pull a matching ingredient name for the next api
  var common = {
    "url": "https://trackapi.nutritionix.com/v2/search/instant",
    "method": "GET",
    "headers": {
      "x-app-id": "f27d5bae",
      "x-app-key": "3858e7b7b95259090466bdb18fe5293f",
      "x-remote-user-id": '0',
    },
    "data": {
      "query": chosenIngredient,
    }
  };
  // this query uses the search term from the first query to find the nutrient profile of the food
  $.ajax(common).done(function (response) {
    var nutrientItem = response.common[0].food_name;
    // console.log(nutrientItem);
    var settings = {
      "url": "https://trackapi.nutritionix.com/v2/natural/nutrients",
      "method": "POST",
      "headers": {
        "x-app-id": "f27d5bae",
        "x-app-key": "3858e7b7b95259090466bdb18fe5293f",
        "x-remote-user-id": '0',
      },
      "data": {
        "query": nutrientItem,
      }
    };

    // this area enters the name of the food, the serving size, list of nutrients and nutrient amount for the selected ingredient into a table
    $.ajax(settings).done(function (response) {
      var food = response.foods[0];
      console.log(food);
      var gramEquation = 100 / (food.serving_weight_grams);
      var servingSize = ("Per " + food.serving_unit + " (" + food.serving_weight_grams + " grams)");
      var nutrientNames = [];
      var nutrientValues = [];
      var keys = Object.keys(food);
      keys.forEach(function (key) {
        // if property starts with 'nf_' and not blank/empty
        if (/nf_.*/.test(key) && food[key] !== null && food[key] !== '') {
          nutrientNames.push(key.charAt(3).toUpperCase() + key.substr(4));
          nutrientValues.push(food[key]);
        }
      });
      var nutrName;
      //append the table that will hold the nutrient info onto the modal body
      $('#modalBody').append($nutrientTable);
      for (var l = 0; l < nutrientNames.length && l < nutrientValues.length; l++) {
        if (nutrientNames[l] == 'Cholesterol' || nutrientNames[l] == 'Sodium' || nutrientNames[l] == 'Potassium') {
          nutrName = nutrientNames[l]+ '(mg)';
        } else if(nutrientNames[l] == 'Calories'){
          nutrName = nutrientNames[l];
        } else {
          nutrName = nutrientNames[l]+ '(g)';
        }
        var nutrValue = nutrientValues[l];
        var $nutrRow = `<tr class="nutrientRow">
                            <td class='nutritionName'>${nutrName.split('_').join(' ')}</td>
                            <td>${Math.round(nutrValue)}</td>
                            <td>${Math.round(gramEquation * nutrValue)}</td>
                        </tr>`;
        //append the nutrient row to the nutriention table on the modal
        $('#nutritionTable').append($nutrRow);
      }
      $('#exampleModalLabel').text(chosenIngredient);
      $('#servingSize').text(servingSize);
    });
  });
});
