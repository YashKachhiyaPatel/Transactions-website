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
    collection: "addcustomer"       
});

const Model = mongoose.model("addcustomer", AddcustomerSchema);
export default Model;