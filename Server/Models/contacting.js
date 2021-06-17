"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ContactingSchema = new Schema({
    name: String,
    number: String,
    emailAddress: String
}, {
    collection: "contacting"
});
const Model = mongoose_1.default.model("contacting", ContactingSchema);
exports.default = Model;
//# sourceMappingURL=contacting.js.map