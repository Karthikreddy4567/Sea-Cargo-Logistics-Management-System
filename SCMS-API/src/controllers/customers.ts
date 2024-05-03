import express from 'express';

import {createCustomer, getCustomerById, getCustomerByPhone, updateCustomerByID} from '../db/customers';

export const createNewCustomer = async (req: express.Request, res: express.Response) => {
    try {
        
        const { userid, name, addressline1, city, addressline2, phone} = req.body;

        

        const customer = await createCustomer({
            userid,
            name,
            addressline1,
            city,
            addressline2,
            phone,
        });

        return res.status(200).json(customer).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getCustomers = async (req: express.Request, res: express.Response) => {
    try {
        const { userid } = req.body;
        const customer = await getCustomerById(userid);
        return res.status(200).json(customer).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getCustomerPhone = async (req: express.Request, res: express.Response) => {
    try {
        
        const { phone } = req.body;

        const customer = await getCustomerByPhone(phone);

        return res.status(200).json(customer).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateCustomer = async (req: express.Request, res: express.Response) => {
    try {
        
        const { userid, name, addressline1, city, addressline2, phone} = req.body;

        
        const value = {name,
            addressline1,
            city,
            addressline2,
            phone};

        const customer = await updateCustomerByID(userid,value);
        
        return res.status(200).json(customer).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}