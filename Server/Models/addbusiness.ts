import mongoose  from "mongoose";
const Schema = mongoose.Schema;

const BusinessSchema = new Schema
({
    bname: String,
    baddress: String,
    bdescription: String,
    bowner : {
        type: Schema.Types.ObjectId,
      ref: 'User'
    }
},
{
    collection: "business"
});

const Model = mongoose.model("business", BusinessSchema);
export default Model;