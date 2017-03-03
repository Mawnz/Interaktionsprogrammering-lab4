var StateController = function (home, dinner, dish, confirm, overview, opview, prepare, model) {
	//set the statecontroller in model
	model.setSC(this);
	
	this.homelette = function(){
		$(dinner).hide();
		$(dish).hide();
		$(confirm).hide();
		$(overview).hide();
		$(opview).hide();
		$(prepare).hide();
		$(home).show();
	}
	//this.homelette();
	//functions for switching between states
	this.main = function(){
		$(confirm).hide();
		$(home).hide();
		$(opview).hide();
		$(overview).hide();
		$(prepare).hide();
		$(dinner).show();
		$(dish).show();
	}
	
	this.overview = function(){
		$(dinner).hide();
		$(dish).hide();
		$(confirm).hide();
		$(opview).show();
		$(overview).show();
	}

	this.preparation = function(){
		$(overview).hide();
		$(prepare).show();
	}
	
	this.edit = function(){
		$(overview).hide();
		$(prepare).hide();
		$(opview).hide();
		$(dinner).show();
		$(dish).show();
	}
	
	this.recipe = function(){
		$(dish).hide();
		$(confirm).show();
	}
	
	this.recipeToDish = function(){		
		$(confirm).hide();
		$(dish).show();
	}
}

