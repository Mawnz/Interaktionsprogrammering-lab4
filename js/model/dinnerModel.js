//DinnerModel Object constructor
var DinnerModel = function() {

  this.guestAmount = 1;
  this.fullMenu = [];
  this.dishToShow = {};
  this.observers = [];
  this.currentDish = {};
  this.stateController;
  this.dishes = [];

  // add new observer to the array
  this.addObserver = function(observer) {
    this.observers.push(observer);
  }

	this.setSC = function(sc){
		this.stateController = sc;
	}

	this.overview = function(){
		this.stateController.overview();
		this.notifyObservers();
	}

	this.pView = function(){
		this.stateController.preparation();
	}

	this.edit = function(){
		this.stateController.edit();
	}

	this.goHome = function(){
		this.stateController.homelette();
	}

// call the update method on each of the observers in the array
  this.notifyObservers = function(obj) {
	for (var i in this.observers){
		this.observers[i].update();
	}
  }

  this.getRecipes = function(model, type, filter, cb, cbError){
		var number = 10;
		$.ajax({
				url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
				headers: {
					'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
				},
				data: {
				'type' : type,
				'number' : number,
				'query' : filter
				},
				success: function(data){
					if(data.results.length == 0){
						cb([]);
					}else{
						cb(data.results);
					}
				},
				error: function(data){
					cbError();
				}
			});
  }

  this.recipeInformation = function(recipe, cb, cbError){
	$.ajax({
		url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+recipe.id+'/information',
		headers: {
			'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
		},
		success: function(data){
			cb(data);
		},
		error: function(data){
			cbError();
		}
	});
  }

  this.resetMenu = function(){
	  this.fullMenu = [];
	  this.notifyObservers();
	  this.stateController.main();
  }

  this.setDishForDisplay = function(id){
	  this.currentDish = this.getDishFromSearch(id);
	  this.notifyObservers();
	  this.stateController.recipe();
  }
  
  this.searching = function(state){
	  this.stateController.searching(state);
  }

  this.backToDish = function(){
	  this.stateController.main();
  }

  //sets the number of guests
	this.setNumberOfGuests = function(num) {
		this.guestAmount = (num == 0 ? 1 : num);
		this.notifyObservers(num);
	}

	// should return number of guests
	this.getNumberOfGuests = function() {
		return this.guestAmount;
	}

	this.getPriceForDish = function(id){
		var dish = this.getDish(id);
		var price = 0;
		for(var i in dish.ingredients){
			price += dish.ingredients[i].price;
		}
		return price;
	}
	//Returns the dish that is on the menu for selected type
	this.getSelectedDish = function(type) {
		for (var dish in this.fullMenu){
			if (dish.type == type) return dish;
		}
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
    return this.fullMenu;
  }

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
    var allIng = [];
    this.ingMenu = this.getFullMenu();

		for(ing in this.ingMenu){
		allIng.push(this.ingMenu[ing].ingredients);
		}

	   return allIng;
	}


  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    this.price = 0;
    this.ingredients = this.getAllIngredients();

    for(bit in this.ingredients){
      for(small in this.ingredients[bit]){
        this.price += this.ingredients[bit][small].price;
      }
    }
    return (this.price * this.guestAmount).toFixed(2);
  }

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		if(!id){
			this.currentDish = {};
			this.stateController.recipeToDish();
		}
		var bool = true;

		for(var i in this.fullMenu){
			for(var key in this.fullMenu[i].type){
				if(key == this.getDishFromSearch(id).type[key]){
					this.removeDishFromMenu(id, i);
					bool = false;
				}
			}
		}
		this.fullMenu.push(this.getDishFromSearch(id));
		this.notifyObservers(this.fullMenu);
		this.stateController.recipeToDish();
	}

	this.getDishPrice = function(id){
		var price = 0;
		var dish = this.getDishFromMenu(id);
		for(var i in dish.ingredients){
			price += dish.ingredients[i].price;
		}
		return price;
	}

	//Removes dish with specific id from menu
	this.removeDishFromMenu = function(id, index) {
		if(!index){
			for(var i in this.fullMenu){
				if(this.fullMenu[i].id == id) index = i;
			}
		}
		this.fullMenu.splice(index, 1);
		this.notifyObservers(this.fullMenu);
  }

	this.returnAllDishes = function(){
		return this.dishes;
	}
	//not needed?
	this.getAllDishes = function (type,filter) {
		var listToFill = [];
		var allDishes = this.returnAllDishes();
		for(var i in allDishes){
			var dish = allDishes[i];

			if(dish.type.toLowerCase() == type.toLowerCase() || type == "Any"){
				if(dish.name.toLowerCase().indexOf(filter.toLowerCase()) != -1 || filter == ""){
					listToFill.push(dish);
				}
			}
		}
		return listToFill;

	}

	//function that returns a dish of specific ID that is in the Menu
	this.getDishFromMenu = function (id) {
	  for(key in this.fullMenu){
			if(this.fullMenu[key].id == id) {
				return this.fullMenu[key];
			}
		}
	}
	this.getDishFromSearch = function (id) {
	  for(key in this.dishes){
			if(this.dishes[key].id == id) {
				return this.dishes[key];
			}
		}
	}
}
