import express from 'express';

import { createNewCustomer, getCustomers, getCustomerPhone, updateCustomer } from '../controllers/customers';

export default (router: express.Router) => {
    router.post('/customer/new', createNewCustomer);
    router.get('/customer/get', getCustomers);
    router.get('/customer/getByPhone', getCustomerPhone);
    router.post('/customer/update', updateCustomer);

};