"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BusinessSchema = new Schema({
    bname: String,
    baddress: String,
    bdescription: String,
    bowner: String,
    btotalrating: Number,
    bnumberofratings: Number
}, {
    collection: "addbusiness"
});
const Model = mongoose_1.default.model("addbusiness", BusinessSchema);
exports.default = Model;
//# sourceMappingURL=addbusiness.js.map