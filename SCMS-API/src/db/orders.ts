
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    order_no: {type:String, required:true},
    order_date: {type:String, required:true},
    shipper: { 
        fullname: { type: String, required: true },
        addressline1: { type: String, required: true },
        city: { type: String, required: true },
        addressline2: { type: String, required: true },
        phone: { type: String, required: true }
    },
    shipper_id: { type: String },
    consignee: { 
        fullname: { type: String, required: true },
        addressline1: { type: String, required: true },
        city: { type: String, required: true },
        addressline2: { type: String, required: true },
        phone: { type: String, required: true },
        userid: { type: String },
    }, 
    status: { 
        type: String, 
        enum: ['Ready To Pickup', 'Picked Up By Agent', 'Shipping Zone Warehouse', 'Ready To Ship', 'In-Transit', 'Delievered'], 
        required: true
    },
    result:{ type: String, required: true },
    log:{ type: String, required: true },
    box_count: {type: String, required: true},
    contents_description: {type: String, required: true},
    payment_method: {type: String, enum: ['Cash','Card','Cheque'], required: true},
    estimated_price: {type: String,  required: true}
});

export const OrderModel = mongoose.model('Orders', orderSchema);

export const createOrder = (values: Record<string, any>) => new OrderModel(values).save().then((order) => order.toObject());

export const getAllOrders = () => OrderModel.find();
export const getOrderByStatus = (status: String) => OrderModel.find({status});
export const getOrderByOrderno = (order_no: String) => OrderModel.findOne({order_no: order_no});
export const getOrdersByShipperId = (user_id: String) => OrderModel.find({"shipper_id": user_id});

export const updateStatusByOrderno =  (order_no: string, values: Record<string, any> ) => OrderModel.findOneAndUpdate({order_no}, values);

