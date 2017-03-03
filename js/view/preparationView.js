var PreparationView = function (container,model) {
	model.addObserver(this);
	
	this.pv = container;
	
	this.update = function(){
		this.paintPrepare();
	}
	
	this.paintPrepare = function(){

		var menu = model.getFullMenu();
		//first remove everything
		$(this.pv).empty();
		
		for(var i in menu){
			$(this.pv).append(
				$('<div class ="row stretch bottomPadding"> </div>').append(
					$('<div class = "col xs-12 col-sm-6 col-md-4"> <br> <image class = "img-responsive" src = "'+menu[i].image+'"></div>' 
					 + 
					'<div class = "col-xs-12 col-sm-6 col-md-4"><h2>'+menu[i].name+
						'</h2><br><h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed dolor' +
						'eisumod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' +
						'veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
						'aliquip ex ea commodo consequat.</h5></div>' + 
					'<div class = "col-xs-12 col-sm-12 col-md-4">' +
						'<h3>Preperation</h3>' + 
						'<h5>'+menu[i].description+'</div>')
				)
			);
		}
		
		//so you can scroll
		$(this.pv).append($('<br><br><br><br><br><br><br><br><br><br><br><br>'));
		
	}

}

