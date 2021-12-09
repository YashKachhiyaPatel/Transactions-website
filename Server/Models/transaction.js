"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TransactionSchema = new Schema({
    customerid: String,
    type: String,
    amount: Number
}, {
    collection: "transactions"
});
const Model = mongoose_1.default.model("transaction", TransactionSchema);
exports.default = Model;
//# sourceMappingURL=transaction.js.map