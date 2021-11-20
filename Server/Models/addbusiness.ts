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
    collection: "addbusiness"
});

const Model = mongoose.model("addbusiness", BusinessSchema);
export default Model;