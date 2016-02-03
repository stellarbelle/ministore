var myApp = angular.module('myApp', ['ngRoute']);

//CLIENTSIDE ROUTING
myApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {templateUrl: 'partials/customers.html'})
	.when('/orders', {templateUrl: 'partials/orders.html'})
	.otherwise({redirectTo: '/'});
});

//FACTORIES
myApp.factory('customersFactory', function($http) {
	var factory = {}

	factory.create_customer = function(info, callback) {
		$http.post('/create_customer', info).success(function(output) {
			callback(output);
		})
	};

	factory.get_all = function(callback) {
		$http.get('/get_customers').success(function(output) {
			callback(output);
		})
	};

	factory.delete_customer = function(info, callback) {
		$http.post('/delete_customer', info).success(function(output) {
			callback(output);
		})
	}


	return factory
});

myApp.factory('OrdersFactory', function($http) {
	var factory = {};

	factory.get_products = function(callback) {
		var products = [
						{product: 'Ninja Shoes'},
						{product: 'Ninja Bike'}
						];
		callback(products);
	}

	factory.get_quantity = function(callback) {
		var quantity = [];

		for (i=1; i<100; i++) {
			quantity.push(i);
		};

		callback(quantity);
	}

	factory.add_order = function(info, callback) {
		$http.post('/create_order', info).success(function(data) {
			callback(data);
		})
	}

	factory.get_orders = function(callback) {
		$http.get('/get_orders').success(function(data) {
			callback(data);
		})
	}

	return factory;
})

//CLIENT CONTROLLERS
myApp.controller('customersController', function($scope, customersFactory) {
	$scope.addCustomer = function() {
		customer_repack = {
							name: $scope.new_customer.name,
							created_at: new Date() 
						  };
		customersFactory.create_customer(customer_repack, function(data) {
			$scope.customers = data;
		})
	}

	$scope.deleteCustomer = function(customer) {
		customersFactory.delete_customer(customer, function(data) {
			$scope.customers = data;
		});
	}

	customersFactory.get_all(function(data) {
		$scope.customers = data;
	})
});

myApp.controller('OrdersController', function($scope, customersFactory, OrdersFactory) {

	customersFactory.get_all(function(data) {
		$scope.customers = data;
	});

	OrdersFactory.get_products(function(data) {
		$scope.products = data;
	});

	OrdersFactory.get_quantity(function(data) {
		$scope.quantity = data;
	});

	OrdersFactory.get_orders(function(data) {
		$scope.orders = data;
	})

	$scope.addOrder = function() {
		var order_repack = {
						customer_name: $scope.new_order.customer_name,
						product: $scope.new_order.product,
						quantity: $scope.new_order.quantity,
						created_at: new Date()
					   }
		OrdersFactory.add_order(order_repack, function(data) {
			$scope.orders = data;
			console.log(data);
		})
	}
})




