"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const AddcustomerSchema = new Schema({
    custname: String,
    custnumber: String,
    custemail: String,
    custamount: String
}, {
    collection: "addcustomer"
});
const Model = mongoose_1.default.model("addcustomer", AddcustomerSchema);
exports.default = Model;
//# sourceMappingURL=addcustomer.js.map