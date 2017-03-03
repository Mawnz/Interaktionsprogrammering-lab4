var DishViewController = function(view, model){

	model.getRecipes(model, "", "main course", function(dishes){
		model.dishes = dishes;
		view.paintDishView(model, model.dishes);
	}, function(){
		alert("Tjänsten kan vara nere just nu!");
	});
	
	view.search.click(function(){
		var filter = $("#searchBar").val();
		var type = $("#listTypes").find(":selected").text();
		if(type == "Main")type = "main course";
		if(type == "Starter") type = "appetizer";
		if(type == "Any") type = "";
		 $('#loading').show(), $('#dishRows').hide();
		model.getRecipes(model, type, filter, function(dishes){
			if(dishes.length == 0){
				alert("Whoops, din sökning gav inga träffar!");
			}else{
				model.dishes = dishes;
			}
			view.paintDishView(model, model.dishes);

		},function(){
			$('#loading').hide();
			$('#dishRows').show();
			alert("Sökningen misslyckades!");
		});

	});



}
