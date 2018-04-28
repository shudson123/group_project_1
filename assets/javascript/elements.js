var $resultPage = `<div class="container" id="container">
                       <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Meal</th>
                                <th scope="col">Category</th>
                                <th scope="col">Area</th>
                            </tr>
                        </thead>
                        <tbody id='mealTable'>
                        </tbody>
                    </table>
                </div>`

var $mealDetail = `<div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div class="item" id="title"></div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div class="item" id="category"></div>
                         </div>
                         <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div class="item" id="area"></div>
                        </div>
                    </div>`



var $mealDetail2 = `<div id="accordion">
<div class="card">
  <div class="card-header" id="headingOne">
    <h5 class="mb-0">
      <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        Instructions 
      </button>
      <button class="btn btn-link" id="video" href="">
      Watch the instructional video
      </button>
      <button class="btn btn-link" id="video" href="">
      Learn More at 
      </button>
      <button class="btn btn-link" id="video" href="">
      Add to Collection
      </button>
    </h5>
    
  </div>

  <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion" style="">
    <div class="card-body" id="instr">
    </div>
  </div>
</div>
<div class="card">
  <div class="card-header" id="headingTwo">
    <h5 class="mb-0">
      <button class="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
        Ingredients
      </button>
    </h5>
  </div>
  <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion" style="">
    <div class="card-body text-center" id="ingre">
     
    </div>
  </div>
</div>
<div class="card">
  <div class="card-header" id="headingThree">
    <h5 class="mb-0">
      <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Measurements
      </button>
    </h5>
  </div>
  <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion" style="">
    <div class="card-body" id="measure">
        <table class="table table-hover">
             <thead>
                <tr>
                    <th scope="col">Ingredient</th>
                    <th scope="col">Measure</th>
                </tr>
            </thead>
            <tbody id="measureTable">
            </tbody>
        </table>
    </div>
  </div>
  <div class="clear"></div>
</div>
</div>`