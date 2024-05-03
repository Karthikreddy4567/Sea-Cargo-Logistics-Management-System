import express from 'express';

import { createNewShipment, getShipments } from '../controllers/shipments';


export default (router: express.Router) => {
    router.post('/shipment/new', createNewShipment);
    router.get('/shipment/get', getShipments);
    

};