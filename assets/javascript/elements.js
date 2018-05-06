var $resultPage = `<div class="row">
                      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                          <div class="imageDiv">
                              <img class="img-fluid max-width: 100% index" id="resultImage" alt="">
                          </div>
                      </div>
                      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                          <div class="row">
                              <div class="col-12"><div class="title">
                                  <h1 class="index" id="titleName"></h1>
                              </div>
                          </div>
                              <div class="col-12"><div class="category">
                                 <h2 id="category"></h2>
                              </div>
                          </div>
                              <div class="col-12"><div class="region">
                                  <h1 id="region"></h1>
                              </div>
                          </div>     
                       </div>
                    </div>
                   </div>
               </div>
             <hr>`;

var $page = `<div class="container" id="container"></div>
<div id='modal' class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"></h5>
                <button id="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            <div class="modal-body" id="modalBody">
            </div>
        </div>
    </div>
</div>
<div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <button type="button" class="btn btn-success" data-dismiss="modal">Meal Has Been Added!</button>
            <div id="" saveMessage>
                <img class="save" src="assets/images/save.gif">
            </div>
        </div>
    </div>
</div>`;

var $headerDiv = `<div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xm-12">  
                            <div>
                                <h1 id="title"></h1>
                            </div>
                        </div>
                  </div>
                  <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-12 col-xm-12">
                      <div class="row">
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                 <div id="headingDiv">
                                        <img class="headerImage img-fluid max-width: 100%; height: auto">
                                </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="buttonDiv">
                                    <button class="btn btn-danger btn-lg justify-content-center" id="video" data-toggle="modal" data-target=".bd-example-modal-lg">Watch Video</button>
                                    <a class="btn btn-outline-primary btn-lg justify-content-center" target="_blank" id="sourceLink">Learn More</a>
                                    <button class="btn btn-outline-success btn-lg justify-content-center" id="firebase" data-toggle="modal" data-target=".bd-example-modal-sm">Add to Collections</button>
                                </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-12 col-xm-12">
                      <div class="row">
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                 <div>
                                     <h3 class=" headings ingredientHeading">INGREDIENTS</h3>
                                </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="tableDiv">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="ingredientsTable">
                                    </tbody>
                                </table>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>`;


var $instDiv = `<div class="row">
                  <div class="col-lg-12">
                      <div id="instDiv">
                      <hr>
                      <h3 class="headings">INSTRUCTIONS</h3>
                      <p class="instructions"></p>  
                      </div>
                  </div>
                </div>`;
  

var $homePageContent = `<div class="row justify-content-lg-center">
                            <div class="col-lg-6 col-md-8 col-sm-12 col-xs-12">
                                <div class="searchContent text-center">
                                    <h1 class"welcome">ALIMENTUM</h1>
                                    <h4>Where Food is Life</h4>
                                    <form>
                                        <div class="form-group">
                                            <input type="text" class="form-control invalidInput" id="input" placeholder="Search...">
                                            <div class="space"><span class="error" id="errorText"></span></div>
                                        </div>
                                        <button id="submit" type="submit" class="btn btn-primary btn-lg">Search</button>
                                    </form>
                                </div>
                            </div>
                        </div>        
                        <ul id ="backgroundUl" class="slideshow">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                      </ul>`;

var $mealVideo = `<iframe id="videoIframe" class="embed-responsive-item" width="100%" height="400" frameborder="0" allowfullscreen></iframe>`;

var $nutrientTable = `<table class="table table-sm table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Nutrient</th>
                                <th scope="col" id = "servingSize"></th>
                                <th scope="col" id = "hundredGram">Amout Per 100g</th>
                            </tr>
                        </thead>
                        <tbody id="nutritionTable">
                            
                        </tbody>
                    </table>`;
