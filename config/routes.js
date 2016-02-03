var customers = require('../server/controllers/customers.js')
var orders = require('../server/controllers/orders.js')
module.exports = function(app) {
	app.post('/create_customer', function(req, res) {
		customers.add(req, res);
	})
	app.get('/get_customers', function(req, res) {
		customers.show(req, res);
	})
	app.post('/delete_customer', function(req, res) {
		customers.remove(req, res);
	})
	app.post('/create_order', function(req, res) {
		orders.add(req, res);
	})
	app.get('/get_orders', function(req, res) {
		orders.show(req, res);
	})
}