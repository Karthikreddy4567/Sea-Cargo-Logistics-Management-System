import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
    shipment_no: {type:String, required:true},
    shipment_date: {type:String, required:true},
    port: {type:String, required:true},
    seal_no: {type:String, required:true},
    shipping_line: {type:String, required:true},
    registry_no: {type:String, required:true},
    loading_date: {type:String, required:true},
    depature_date: {type:String, required:true},
    arrival_date: {type:String, required:true}
});

export const ShipmentModel = mongoose.model('Shipments', shipmentSchema);

export const creatShipment = (values: Record<string, any>) => new ShipmentModel(values).save().then((shipment) => shipment.toObject());

export const getAllShipments = () => ShipmentModel.find();