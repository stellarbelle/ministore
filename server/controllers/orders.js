var mongoose = require('mongoose');
var Order = mongoose.model('Order');

module.exports = (function() {
	return {
		add: function(req, res) {
			var new_order = new Order(req.body);
			new_order.save(function(err, data) {
				if(err) {
					console.log("Didn't save order")
				} else {
					res.redirect('/get_orders');
				}
			})
		},
		show: function(req, res) {
			Order.find({}, function(err, orders) {
				if(err) {
					console.log('Failed to get all orders');
				} else {
					res.json(orders);
				}
			})
		}
	}
})();