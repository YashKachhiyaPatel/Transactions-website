import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const ContactingSchema = new Schema
({
    name: String,
    number: String,
    emailAddress: String
},
{
    collection: "contacting"
});

const Model = mongoose.model("contacting", ContactingSchema);
export default Model;