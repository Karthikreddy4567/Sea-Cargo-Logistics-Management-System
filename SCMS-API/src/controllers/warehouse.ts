import express from 'express';

import {createWarehouse} from '../db/warehouses';

export const registerWarehouse = async (req: express.Request, res: express.Response) => {
    try {
        
        const { warehouse_id, warehouse_address, warehouse_code, warehouse_manager } = req.body;

        if (!warehouse_id || !warehouse_address || !warehouse_code || !warehouse_manager ) {
            return res.sendStatus(400);
        }

        const warehouse = await createWarehouse({
            warehouse_id,
            warehouse_address,
            warehouse_code,
            warehouse_manager
        });

        return res.status(200).json(warehouse).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}