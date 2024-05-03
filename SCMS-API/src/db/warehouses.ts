import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
    warehouse_id : { type : String, required: true },
    warehouse_address: { type: String, required: true },
    warehouse_code: { type: String, required: true },
    warehouse_manager: {type: String, required: true},
})

export const WarehouseModel = mongoose.model('WarehouseAccount', warehouseSchema);
export const createWarehouse = (values: Record<string, any>) => new WarehouseModel(values).save().then((warehouse) => warehouse.toObject());
