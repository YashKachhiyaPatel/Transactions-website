"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessTransactionAddPage = exports.DisplayTransactionAddPage = void 0;
const customer_1 = __importDefault(require("../Models/customer"));
const Util_1 = require("../Util");
const transaction_1 = __importDefault(require("../Models/transaction"));
function DisplayTransactionAddPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customerCollection = yield customer_1.default.find({});
            res.render('owner/transaction', {
                title: 'Add',
                page: 'transaction',
                addcustomer: customerCollection,
                displayName: Util_1.UserDisplayName(req)
            });
        }
        catch (_a) {
            res.redirect('owner/transaction');
        }
    });
}
exports.DisplayTransactionAddPage = DisplayTransactionAddPage;
function ProcessTransactionAddPage(req, res, next) {
    var finalAmount = req.body.amount;
    if (req.body.type == "debit") {
        finalAmount = finalAmount * -1;
    }
    let newTransaction = new transaction_1.default({
        "customerid": req.body.customerid,
        "type": req.body.type,
        "amount": finalAmount
    });
    transaction_1.default.create(newTransaction, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/owner/addcustomer');
    });
}
exports.ProcessTransactionAddPage = ProcessTransactionAddPage;
//# sourceMappingURL=transaction.js.map