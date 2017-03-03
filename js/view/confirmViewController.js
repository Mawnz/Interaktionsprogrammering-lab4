var ConfirmViewController = function(view, model){

	view.confirmDishButton.click(function(){
		var id = $(view.confirmDishButton).attr("food");
		model.addDishToMenu(id);

	});

	view.backButton.click(function(){
		model.currentDish = "";
		model.backToDish();
	});


}
