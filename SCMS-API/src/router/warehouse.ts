import express from 'express';

import { registerWarehouse } from '../controllers/warehouse';

export default (router: express.Router) => {
    router.post('/warehouse/register', registerWarehouse);
};