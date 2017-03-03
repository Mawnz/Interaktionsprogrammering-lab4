var OverviewView = function (container,model) {
	model.addObserver(this);
	this.prepareviewer = container.find("#prepareviewer");
	this.fill = container.find("#fillMe");
	this.total = container.find("#totalMenuPrice");
	//update function
	this.update = function(){
		this.paintOverview();
	}
	this.paintOverview = function(){
		var menu = model.getFullMenu();
		if(menu.length == 0)return;
		//first nullify everything
		$(this.fill).empty();
		for(var i in menu){
			$(this.fill).append(
				$('<div class = "col-sm-4 col-xs-12"> </div>').append(
					$('<figure class = "figure"> </figure>').append(
						$('<img class = "img-responsive" src = "'+menu[i].image+'">'+
							'<figcaption class = "desc text-responsive text-center">'+menu[i].name+'</figcaption>'+
							'<h4 class = "overviewPriceBig overviewPriceSmall red">'+(model.getNumberOfGuests() * model.getDishPrice(menu[i].id)).toFixed(2)+' SEK</h4>')
					)
				)
			);
		}
		$(this.total).html(model.getTotalMenuPrice() + " SEK");
	}
	
}