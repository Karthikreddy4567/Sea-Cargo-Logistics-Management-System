import express from 'express';
import _ from "lodash";

import {createOrder, getAllOrders, getOrdersByShipperId, updateStatusByOrderno, getOrderByStatus, getOrderByOrderno} from '../db/orders';

export const createNewOrder = async (req: express.Request, res: express.Response) => {
    try {
        
        const { order_no,order_date,fullname,
            addressline1,
            city,
            addressline2,
            phone,shipper_id, consignee_name,consignee_al1,consignee_city,consignee_al2,consignee_phone,consignee_userid, status, result,log, box_count,contents_description,payment_method, estimated_price } = req.body;

        

        const order = await createOrder({
            order_no,
            order_date,
            shipper:{
                fullname,
                addressline1,
                city,
                addressline2,
                phone
            },
            shipper_id,
            consignee: {
                "fullname":consignee_name,
                "addressline1":consignee_al1,
                "city": consignee_city,
                "addressline2":consignee_al2,
                "phone":consignee_phone,
                "userid":consignee_userid
            },
            status,
            result,
            log,
            box_count,
            contents_description,
            payment_method,
            estimated_price
        });

        return res.status(200).json(order).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getOrdersByCustomer = async (req: express.Request, res: express.Response) => {
    try {
        const { userid } = req.body;
        const orders = await getOrdersByShipperId(userid);
        return res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getOrdersByStatus = async (req: express.Request, res: express.Response) => {
    try {
        const { status } = req.body;
        const orders = await getOrderByStatus(status);
        return res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getOrders = async (req: express.Request, res: express.Response) => {
    try {
        const orders = await getAllOrders();
        return res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getOrderByOrderNo = async (req: express.Request, res: express.Response) => {
    try {
        const {order_no} = req.body;
        const order = await getOrderByOrderno(order_no);
        return res.status(200).json(order);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const statusUpdate = async (req: express.Request, res: express.Response) => {
    try {
        
        const { order_no,status,result } = req.body;
        const value = {status,result};
        const order = await  updateStatusByOrderno(order_no,value);
        return res.status(200).json(order).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}