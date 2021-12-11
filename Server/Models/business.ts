import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const BusinessSchema = new Schema
({
    bname: String,
    baddress: String,
    bdescription: String,
    bowner :String,
    btotalrating: Number,
    bnumberofratings: Number
},
{
    collection: "businesses"
});

const Model = mongoose.model("business", BusinessSchema);

export default Model;