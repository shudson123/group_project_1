
//this click even will get the text from the ingredient and pass it to the nutrition api
$(document).on('click', '#ing', function () {
  $('#modal').modal(options);
    var term = $(this).text();
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
          $.ajax(settings).done(function (response){
              console.log(response);
            console.log((response.foods[0].nf_calories)+" calories per "+(response.foods[0].serving_unit));
           })

      })
});
var nutrientTable= `<table class="table table-sm">
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">First</th>
    <th scope="col">Last</th>
    <th scope="col">Handle</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">1</th>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
  </tr>
  <tr>
    <th scope="row">2</th>
    <td>Jacob</td>
    <td>Thornton</td>
    <td>@fat</td>
  </tr>
  <tr>
    <th scope="row">3</th>
    <td colspan="2">Larry the Bird</td>
    <td>@twitter</td>
  </tr>
</tbody>
</table>`

