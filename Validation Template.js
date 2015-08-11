/*Minimum libraries to make this work:
<script type="text/javascript" src="/SiteAssets/scripts/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="/SiteAssets/scripts/jquery-validation-1.14.0/dist/jquery.validate.min.js"></script>
*/


//layout of functions for custom validation
$(document).ready(function() { 

  //Refactor default sharepoint classes to use bootstrap classes
  //when hellbilly forms passes in the inputs from sharepoint.
  var validator = $("form").validate({ errorClass: "ms-formvalidation" });

  //EXAMPLE: adds validation and placeholder text to bellow items
  /*
  $("input[title='item']").attr("placeholder", "What is the item you plan on purchasing?").
    attr("name", $("input[title='item']").attr("id")).rules("add", 
                                                            { required: true,
                                                              messages: {
                                                                required: "Cannot be blank." //message to user if field is blank.
                                                              } 
                                                            });
  */

  // custom submit hook that hooks into the jquery validate plugin. 
  // This overrides the default save behavior and looks to ensure all submission requirements are met
  $("input[value='Save']").each(function () {
    var js = $(this).attr("onclick");
    $(this).attr("onclick", "");//remove sharepoint click handler...
    $(this).click(function (event) {
        if (!validator.form()) {
            return false;
        } else {
            //call sharepoint click handler..
            eval(" ( function () {" + js + " })();");
        }
    })
  })
});
