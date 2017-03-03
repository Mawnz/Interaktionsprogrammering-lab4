var ConfirmView = function (container,model) {
	model.addObserver(this);

	this.backButton = container.find("#backpls");
	this.confirmDishButton = container.find("#confirmDishButton");
	this.foodDesc = container.find("#foodDesc");
	this.title = container.find("#confirmFoodTitle");
	this.img = container.find("#confirmFoodImage");
	this.txt = container.find("#cofirmFoodText");
	this.recipe = container.find("#recipe");
	this.cost = container.find("#cost");
	this.totCost = container.find("#totCost");
	this.people = container.find("#nrog");

	//update
	this.update = function(){
		this.fillRecipe(model, model.currentDish.id);
	}

	//fills in information about recipe
	this.fillRecipe = function(model, id){
		//do nothing if you get nothing
		if(!id)return;

		//get the selected dish
		var dish = model.getDishFromSearch(id);
		console.log(dish);
		//change pic text n stuff
		$(this.title).html(dish.name);
		$(this.img).attr("src", dish.image);
		$(this.txt).html("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doloreisumod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");

		//save nr guests for easy fill in
		var nrg = model.getNumberOfGuests();

		//show right number of people
		this.people.html(nrg);

		//put food id on button confirm
		$(this.confirmDishButton).attr("food", dish.id);

		//takes it all away
		$(this.recipe).empty();

		//adds id to recipe
		$(this.recipe).attr("dish", id);

		//the actual ingredients
		var pricedesu = 0;
		for(var i in dish.ingredients){
			var ing = dish.ingredients[i];
			$(this.recipe).append(
				$('<div class = "row dishPadding"> </div>').append(
					$('<div class = "col-xs-1"> </div>' +
						'<div class = "col-xs-2"><span startVal = '+ing.quantity+' id = "qt">'+ ing.quantity * nrg + '</span> ' + ing.unit + '</div>' +
						'<div class = "col-xs-5">'+ ing.name + '</div>' +
						'<div class = "col-xs-2">SEK</div>' +
						'<div cost = '+ing.price+' id = "cost" class = "col-xs-1">'+ (ing.price * nrg).toFixed(2) + '</div>'
					)
				)
			);

			pricedesu += dish.ingredients[i].price;
		}

		$(this.totCost).html('<h5>' + (pricedesu * nrg).toFixed(2) + '</h5>');

		//fill the description
		$(this.foodDesc).html(dish.description);
	}
}
