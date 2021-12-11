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
    custamount: Number,
    bowner: String
}, {
    collection: "customers"
});
const Model = mongoose_1.default.model("customer", AddcustomerSchema);
exports.default = Model;
//# sourceMappingURL=customer.js.map