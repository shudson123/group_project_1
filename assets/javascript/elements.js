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
                                    <a class="btn btn-link" id="video" data-toggle="modal" data-target=".bd-example-modal-lg">
                                        Watch the instructional video
                                    </a>
                                    <a class="btn btn-link" id="sourceLink" target="_blank">
                                        Learn More
                                    </a>
                                    <button class="btn btn-link" id="firebase">
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
                        </div>
                        <div id='modal' class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"></h5>
                                <button id="closeModal"type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body"  id="modalBody">
                             
                              </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>`;

var $homePageContent = `<div class="row justify-content-lg-center">
                            <div class="col-lg-6 col-md-8 col-sm-12 col-xs-12">
                                <div class="searchContent text-center">
                                    <h1 class"heading">Food For Thought</h1>
                                    <h4>This is where food is life</h4>
                                    <form>
                                        <div class="form-group">
                                            <input type="text" class="form-control" id="input" placeholder="Search for your meals">
                                            <div class="space"><span class="error" id="errorText"></span></div>
                                        </div>
                                        <button id="submit" type="submit" class="btn btn-primary btn-lg">Search</button>
                                    </form>
                                </div>
                            </div>
                        </div>`;

var $mealVideo =  `<iframe id="videoIframe" width="100%" height="400" frameborder="0" allowfullscreen></iframe>`;