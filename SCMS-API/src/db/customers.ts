import { values } from "lodash";
import mongoose, { Schema } from "mongoose";

const customerSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    name: { type: String, required: true},
    addressline1: { type: String, required: true},
    city: { type: String, required: true},
    addressline2: { type: String, required: true},
    phone: { type: String, required: true},
    
});

export const customerModel = mongoose.model('Customers', customerSchema);

export const createCustomer = (values: Record<string, any>) => new customerModel(values).save().then((customer) => customer.toObject());

export const getCustomerById = (userid: string) => customerModel.findOne({userid});

export const getCustomerByPhone = (phone: String) => customerModel.findOne({
    'phone': phone,
});

export const updateCustomerByID =  (userid: string, values: Record<string, any> ) => customerModel.findOneAndUpdate({"userid":userid}, values);


