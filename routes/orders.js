const express = require('express');
const router = express.Router();
const OrderService = require('../services/OrderService')

/* GET orders listing. */
router.get('/', function(req, res, next) {
  const orders = OrderService.getOrder()
  return res.status(200).send(orders)
});

/* GET an order */
router.get('/:id', function(req, res, next) {
  
    const order = OrderService.getOrder(req.params['id'])
    if(order.length)
      return res.status(200).send(order)
    return res.status(400).send('Order not found.')
});

/* POST an order */
router.post('/', function(req, res, next) {
  
  const plants = req.body['plants'];
  const buyer_name = req.body['buyer_name'];
  const buyer_address = req.body['buyer_address']
  
  const result = OrderService.buy({plants, buyer_name, buyer_address})
  
  if(result.unavailable.length > 0){
    return res.status(400).send({message: 'Purchase aborted. The following plants are out of stock', unavailable: result.unavailable.map(item=>item.id)})
  }
  return res.status(200).send('The purchase was successful')

});

module.exports = router;
