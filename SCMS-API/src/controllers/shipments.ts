import express from 'express';

import {creatShipment,getAllShipments} from '../db/shipments';

export const createNewShipment = async (req: express.Request, res: express.Response) => {
    try {
        
        const { shipment_no,
        shipment_date,
        port,
        seal_no,
        shipping_line,
        registry_no,
        loading_date,
        depature_date,
        arrival_date } = req.body;

        

        const order = await creatShipment({
            shipment_no,
        shipment_date,
        port,
        seal_no,
        shipping_line,
        registry_no,
        loading_date,
        depature_date,
        arrival_date
        });

        return res.status(200).json(order).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getShipments = async (req: express.Request, res: express.Response) => {
    try {
        const shipments = await getAllShipments();
        return res.status(200).json(shipments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}