import express from 'express';

import { createNewOrder, getOrdersByCustomer, statusUpdate, getOrders, getOrdersByStatus, getOrderByOrderNo } from '../controllers/orders';


export default (router: express.Router) => {
    router.post('/order/new', createNewOrder);
    router.get('/order/getMyOrders', getOrdersByCustomer);
    router.get('/order/getOrders', getOrders);
    router.get('/order/getOrdersBySts', getOrdersByStatus);
    router.get('/order/getOrdersByOrderNO', getOrderByOrderNo);
    router.post('/order/statusUpdate/', statusUpdate);

};