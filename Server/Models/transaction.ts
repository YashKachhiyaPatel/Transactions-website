import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const TransactionSchema = new Schema
({
    customerid: String,
    type: String,
    amount: Number
},
{
    collection: "transactions"       
});

const Model = mongoose.model("transaction", TransactionSchema);
export default Model;