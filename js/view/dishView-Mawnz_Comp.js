var DishView = function (container,model) {
	model.addObserver(this);
	this.search = container.find("#searchForFood");
	this.display = container.find("#dishRows");
	//update
	this.update = function(){}

	this.paintDishView = function(model, dishes){
		//first empty everything
		this.display.empty();
		//then add the empty space above
		$("#dishRows").append(
		$('<div class = "col-xs-12"><br></div>')
		);

		//lastly add the rest
		for(var i in dishes){
			var figure = $('<figure class = "figure" id =' + dishes[i].id + '> </figure>');
			$(this.display)
			.append($('<div class = "col-xs-6 col-sm-6 col-md-4 col-lg-3 dishPadding"> </div>')
				.append($(figure).append(
					$('	<img class = "figure-img img-responsive" src = "'+ dishes[i].image
					+'"/> <figcaption class="desc text-responsive text-center">' + dishes[i].name
					+ '</figcaption>'
						)
					)
				)
			);
			//click function for each meal
			$(figure).click(function(){
				model.setDishForDisplay(this.id);
			});
		}
		$('#loading').hide();
		$('#dishRows').show();
	}
}
