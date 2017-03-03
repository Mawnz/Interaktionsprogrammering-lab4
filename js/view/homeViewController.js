var HomeViewController = function(view, model){

  view.createDinner.click(function(){
	//new dinner new menu
    model.resetMenu();

    $("#container").css('background-image', 'none');
  });

}
