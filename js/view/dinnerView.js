var DinnerView = function (container,model) {
	model.addObserver(this);

	//init
	this.plusGuest = container.find("#plusGuest");
	this.minusGuest = container.find("#minusGuest");
	this.numberOfGuests = container.find("#numberOfGuests");
	this.menuCost = container.find("#menuCost");
	this.confirmDinner = container.find("#confirmDinnerButton");
	this.allMenu = container.find("#allMenu");

  $(this.numberOfGuests).html(model.getNumberOfGuests());


	//function update

	this.update = function(){
		var nr = model.getNumberOfGuests();
		var price = model.getTotalMenuPrice();
		this.updatePrices(nr, price);
		this.paintMenu();
	}


	this.updatePrices = function(nr, price){
		$(this.numberOfGuests).html(nr);
		$(this.menuCost).html(price);
		$("#nrg").html(nr);
		$("#cost").html(function(){
			return ($(this).attr("cost") * nr).toFixed(2);
		});
		$("#qt").html(function(){
			return ($(this).attr("startVal") * nr);
		});


	}

	this.paintMenu = function(){
		//ta bort allt i listan
		$(this.allMenu).empty();
		//måla upp hela listan
		var menu = model.getFullMenu();
		if(menu.length == 0){
			this.confirmDinner.prop("disabled", true);
			return;
		}else{
			this.confirmDinner.prop("disabled", false);
		}
			
		
		for(var i in menu){
			var id = menu[i].id;
			var name = menu[i].name;
			var price = model.getDishPrice(id);

			var button = $('<div id='+id+' class ="col-xs-1" ><span class = "glyphicon glyphicon-remove"></span></div>');

			$(button).click(function(){
				model.removeDishFromMenu($(this).context.id);
			});

			$(this.allMenu).prepend(
				$('<div class = "row dishPadding lightGrey"></div>').append(
					$('<div class = "col-xs-8"> <span id="dish">' + name + '</span></div>' +
					'<div class = "col-xs-2"> <span cost = '+price+' id = "cost">' + (model.getNumberOfGuests() * price).toFixed(2) + '</span></div>')
				).append($(button))
			);

		}

		$(this.menuCost).html(model.getTotalMenuPrice());
	}
}
