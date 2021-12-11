import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const AddcustomerSchema = new Schema
({
    custname: String,
    custnumber: String,
    custemail: String,
    custamount: Number,
    bowner: String
},
{
    collection: "customers"       
});

const Model = mongoose.model("customer", AddcustomerSchema);
export default Model;