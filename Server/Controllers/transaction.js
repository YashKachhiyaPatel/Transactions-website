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
                customer: customerCollection,
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
    let id = req.params.customerid;
    let updatedaddcustomerItem = new customer_1.default({
        "_id": id,
        "custname": req.body.custname,
        "custnumber": req.body.custnumber,
        "custemail": req.body.custemail,
        "custamount": finalAmount,
        "bowner": Util_1.UserUserName(req),
    });
    customer_1.default.updateOne({ _id: id }, updatedaddcustomerItem, {}, (err) => {
        if (err) {
            req.flash('customerMessage', 'Unable to display customer');
            return res.render('index', { title: 'customer-error', page: 'error', messages: req.flash('customerMessage'), displayName: Util_1.UserDisplayName(req) });
        }
    });
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
        res.redirect('/owner/customers-list');
    });
}
exports.ProcessTransactionAddPage = ProcessTransactionAddPage;
//# sourceMappingURL=transaction.js.map