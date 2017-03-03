var DishViewController = function(view, model){
	model.searching(1);
	model.getRecipes(model, "", "main course", function(results){
		makeRecipes(model, results, function(){
					view.paintDishView(model, model.dishes);
					model.searching(-1);
		});
	}, function(){
		alert("Tjänsten kan vara nere just nu eller så är det något fel med din internetanslutning!");
		model.searching(-1);
	});

	view.search.click(function(){
		var filter = $("#searchBar").val();
		var type = $("#listTypes").find(":selected").text();
		if(type == "Main")type = "main course";
		if(type == "Starter") type = "appetizer";
		if(type == "Any") type = "";
		
		model.searching(1);
		
		model.getRecipes(model, type, filter, function(results){
			if(results.length == 0){
				alert("Whoops, din sökning gav inga träffar!");
				model.searching(-1);
			}
			else{
				model.dishes = [];
				makeRecipes(model, results, function(){
							view.paintDishView(model, model.dishes);
				model.searching(1);
				});
			}
			
		},function(){
			alert("Sökningen misslyckades! Tjänsten kan antingen vara nere, det kan vara problem med din internetanslutning eller något annat knas!");
			model.searching(-1);
		});

	});

	var makeRecipes = function(model, results, cb){
		//if we succeed in getting data we need to empty the existing list of dishes
		
		var recipes = results;
		var dishes = [];
		//for(var key in results){
		//	recipes.push(results[key]);
		//}
		
		//goes through all the found recipes, we need to use the ID in order to get more detailed information
		for(var i in recipes){
			model.recipeInformation(recipes[i], function(recipe){
				var dish;
				var ingredients = [];

				for(var index in recipe.extendedIngredients){
					//adds all ingredients for said dish
					var unit = recipe.extendedIngredients[index].unit;
					var amount = recipe.extendedIngredients[index].amount;
					var name = recipe.extendedIngredients[index].name;
					ingredients.push({"name":name, "quantity":amount, "unit":unit, "price":1});
				}
				//adds the newly created dish to the list.
				var types = {};
				if(recipe.dishTypes.length != 0){
					for(var type in recipe.dishTypes){
						types[recipe.dishTypes[type]] = recipe.dishTypes[type];
					}
				}else{
					types.any = "any";
				}

				dish = {
					"id":recipe.id,
					"name":recipe.title,
					"image":recipe.image,
					"description":recipe.instructions,
					"ingredients":ingredients,
					"type":types
				};
				//console.log(model.dishes);
				model.dishes.push(dish);
				cb();
				
				}, function(){
					cbError();
			});
		}
	}

}
