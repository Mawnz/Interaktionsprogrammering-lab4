var HomeletteViewController = function(view, model){

  view.homelette.click(function(){
    $("#container").css('background-image', 'url("images/happy-family.jpg")');
	model.goHome();
  });

}
