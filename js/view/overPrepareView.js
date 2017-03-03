var OverPrepareView = function (container,model) {
	model.addObserver(this);
	this.guests = container.find("#nrOfGuests");
	this.goBackEditDinner = container.find("#goBackEditDinner");
	
	this.update = function(){
		$(this.guests).html(model.getNumberOfGuests());
	}
}
