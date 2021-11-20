import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const AddcustomerSchema = new Schema
({
    custname: String,
    custnumber: String,
    custemail: String,
    custamount: String,
    businessname: {
        type: Schema.Types.ObjectId,
        ref: 'addbusiness'
    }
},
{
    collection: "addcustomer"       
});

const Model = mongoose.model("addcustomer", AddcustomerSchema);
export default Model;