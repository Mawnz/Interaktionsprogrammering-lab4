$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	//state controller
	var stateController = new StateController($("#homeView"), $("#dinnerView"), $("#dishView"), $("#confirmView"), $("#overviewView"), $("#overPrepareView"), $("#preparationView"), model);

	//And create the needed controllers and views
	var homeView = new HomeView($("#homeView"), model);
	var dinnerView = new DinnerView($("#dinnerView"), model);
	var dishView = new DishView($("#dishView"), model);
	var confirmView = new ConfirmView($("#confirmView"), model);
	var overviewView = new OverviewView($("#overviewView"), model);
	var preparationView = new PreparationView($("#preparationView"), model);
	var overPrepareView = new OverPrepareView($("#overPrepareView"), model);
	var homeletteView = new HomeletteView($("#homeletteView"), model);

	//controllers created with respective views and model as input
	var homeViewController = new HomeViewController(homeView, model);
	var dinnerViewController = new DinnerViewController(dinnerView, model);
	var dishViewController = new DishViewController(dishView, model);
	var confirmViewController = new ConfirmViewController(confirmView, model);
	var overviewViewController = new OverviewViewController(overviewView, model);
	var preparationViewController = new PreparationViewController(preparationView, model);
	var overPrepareViewController = new OverPrepareViewController(overPrepareView, model);
	var homeletteViewController = new HomeletteViewController(homeletteView, model);
	
});
