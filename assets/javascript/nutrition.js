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
      // store the food result to a food variable
      var food = response.foods[0];
      console.log(food);
      //get the serving weight per gram
      var gramEquation = 100 / (food.serving_weight_grams);
      //variable for servicing size
      var servingSize = ("Per "+food.serving_unit+" ("+food.serving_weight_grams+" grams)");
      // create two empty arrays to store object keys as string and their values
      var nutrientNames = [];
      var nutrientValues = [];
      // create a variable to hold the object properties
      var keys = Object.keys(food);
      //loop through the properties
      keys.forEach(function (key) {
        // if property starts with 'nf_' and not blank/empty
        if (/nf_.*/.test(key) && food[key] !== null && food[key] !== '') {
          //remove the nf_ from the nutrient name and make the first letter uppercase
          //push both the nutrient name and value into their arrays
          nutrientNames.push(key.charAt(3).toUpperCase() + key.substr(4));
          nutrientValues.push(food[key]);
        }
      });
      
      //append the table that will hold the nutrient info onto the modal body
      $('#modalBody').append($nutrientTable);
      //loop their both nutrientNames and nutrientValues array
      for (var l = 0; l < nutrientNames.length && l < nutrientValues.length; l++) {
        //assign each nutrient Name and nutrient value to a variable
        var nutrName = nutrientNames[l];
        var nutrValue = nutrientValues[l];
        //create a jquery variable to hold each nutrient row 
        //replace the underscores with space
        //round up the values
        var $nutrRow = `<tr class="nutrientRow">
                           <td>${nutrName.split('_').join(' ')}</td>
                           <td>${Math.round(nutrValue)}</td>
                           <td>${Math.round(gramEquation * nutrValue)}</td>
                       </tr>`;
         //append the nutrient row to the nutriention table on the modal
         $('#nutritionTable').append($nutrRow);
        }
     
        //Set the modal label as the chosen ingredient
        $('#exampleModalLabel').text(chosenIngredient);
        $('#servingSize').text(servingSize);
    });
  });
});
