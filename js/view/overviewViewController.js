var OverviewViewController = function(view, model){

  view.prepareviewer.click(function(){
	model.pView();
	model.notifyObservers();
  });

}
