import express from 'express';

import auth from './auth';

import warehouse from './warehouse';
import orders from './orders';
import customers from './customers';
import shipments from './shipments';



const router = express.Router();

export default (): express.Router => {
    auth(router);
  
    warehouse(router);
    orders(router);
    customers(router);
    shipments(router);
    return router;
};