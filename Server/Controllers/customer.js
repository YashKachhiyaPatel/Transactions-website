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
exports.ProcessSendReminderPage = exports.DisplaySendReminderPage = exports.ProcessAddCustomer = exports.DisplayTransactionHistoryPage = exports.ProcessCustomerDeletePage = exports.ProcessCustomerAddPage = exports.DisplayCustomerAddPage = exports.ProcessCustomerEditPage = exports.DisplayaddcustomerEditPage = exports.DisplayaddcustomerListPage = void 0;
const customer_1 = __importDefault(require("../Models/customer"));
const business_1 = __importDefault(require("../Models/business"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const Util_1 = require("../Util");
function DisplayaddcustomerListPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const businessCollection = yield business_1.default.find({ bowner: Util_1.UserUserName(req) });
        customer_1.default.find({ bowner: Util_1.UserUserName(req) }, null, { sort: { name: 1 } }, function (err, addcustomerCollection) {
            if (err) {
                return console.error(err);
            }
            res.render('owner/customers-list', { title: 'Add Contact', page: 'customers-list', addbusiness: businessCollection, addcustomer: addcustomerCollection, displayName: Util_1.UserDisplayName(req) });
        });
    });
}
exports.DisplayaddcustomerListPage = DisplayaddcustomerListPage;
function DisplayaddcustomerEditPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        const businessCollection = yield business_1.default.find({ bowner: Util_1.UserUserName(req) });
        customer_1.default.findById(id, {}, {}, (err, addcustomerItemToEdit) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                req.flash('customerMessage', 'Unable to display customer');
                return res.render('index', { title: 'customer-error', page: 'error', messages: req.flash('customerMessage'), displayName: Util_1.UserDisplayName(req) });
            }
            res.render('owner/updatecustomer', { title: 'Edit', page: 'updatecustomer', addbusiness: businessCollection, addcustomer: addcustomerItemToEdit, displayName: Util_1.UserDisplayName(req) });
        }));
    });
}
exports.DisplayaddcustomerEditPage = DisplayaddcustomerEditPage;
function ProcessCustomerEditPage(req, res, next) {
    let id = req.params.id;
    let updatedaddcustomerItem = new customer_1.default({
        "_id": id,
        "custname": req.body.custname,
        "custnumber": req.body.custnumber,
        "custemail": req.body.custemail,
        "custamount": req.body.custamount,
        "bowner": Util_1.UserUserName(req),
    });
    customer_1.default.updateOne({ _id: id }, updatedaddcustomerItem, {}, (err) => {
        if (err) {
            req.flash('customerMessage', 'Unable to display customer');
            return res.render('index', { title: 'customer-error', page: 'error', messages: req.flash('customerMessage'), displayName: Util_1.UserDisplayName(req) });
        }
        res.redirect('/owner/customers-list');
    });
}
exports.ProcessCustomerEditPage = ProcessCustomerEditPage;
function DisplayCustomerAddPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const businessCollection = yield business_1.default.find({ bowner: Util_1.UserUserName(req) });
            res.render('owner/updatecustomer', {
                title: 'Add',
                page: 'updatecustomer',
                addcustomer: '',
                addbusiness: businessCollection,
                displayName: Util_1.UserDisplayName(req)
            });
        }
        catch (_a) {
            res.redirect('owner/customers-list');
        }
    });
}
exports.DisplayCustomerAddPage = DisplayCustomerAddPage;
function ProcessCustomerAddPage(req, res, next) {
    let newCustomer = new customer_1.default({
        "custname": req.body.custname,
        "custnumber": req.body.custnumber,
        "custemail": req.body.custemail,
        "custamount": req.body.custamount,
        "bowner": Util_1.UserUserName(req),
    });
    customer_1.default.create(newCustomer, (err) => {
        if (err) {
            req.flash('customerAddMessage', 'Unable to display customer');
            return res.render('index', { title: 'customer-add-error', page: 'error', messages: req.flash('customerAddMessage'), displayName: Util_1.UserDisplayName(req) });
        }
        res.redirect('/owner/customers-list');
    });
}
exports.ProcessCustomerAddPage = ProcessCustomerAddPage;
function ProcessCustomerDeletePage(req, res, next) {
    let id = req.params.id;
    customer_1.default.remove({ _id: id }, (err) => {
        if (err) {
            req.flash('customerDeleteMessage', 'Unable to delete customer');
            return res.render('index', { title: 'customer-delete-error', page: 'error', messages: req.flash('customerDeleteMessage'), displayName: Util_1.UserDisplayName(req) });
        }
        res.redirect('/owner/customers-list');
    });
}
exports.ProcessCustomerDeletePage = ProcessCustomerDeletePage;
function DisplayTransactionHistoryPage(req, res, next) {
    customer_1.default.find({ bowner: Util_1.UserUserName(req) }, null, { sort: { name: 1 } }, function (err, addcustomerCollection) {
        if (err) {
            return res.redirect('/error');
        }
        res.render('owner/transactionhistory', { title: 'Transaction History', page: 'transactionhistory', addcustomer: addcustomerCollection, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayTransactionHistoryPage = DisplayTransactionHistoryPage;
function ProcessAddCustomer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const businessCollection = yield business_1.default.find({ bowner: Util_1.UserUserName(req) });
        res.render('owner', { title: 'DashBoard', page: 'index', displayName: Util_1.UserDisplayName(req), addbusiness: businessCollection, isowner: Util_1.UserRole(req) });
    });
}
exports.ProcessAddCustomer = ProcessAddCustomer;
function DisplaySendReminderPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        customer_1.default.findById(id, {}, {}, (err, addcustomerItemToEdit) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.render('owner/reminder', { title: 'Send Reminder', page: 'reminder', addcustomer: addcustomerItemToEdit, displayName: Util_1.UserDisplayName(req) });
        }));
    });
}
exports.DisplaySendReminderPage = DisplaySendReminderPage;
function ProcessSendReminderPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const output = ` 
      
      <h3>Your Payment Details:</h3>
      <ul>
      <li><b>Name:</b> ${req.body.custname}</li>
      <li><b>Email:</b> ${req.body.custemail}</li>
      <li><b>Amount:$</b> ${req.body.custamount}</li>
      </ul>
    `;
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'transactionappg3s4@gmail.com',
                pass: 'transaction@123',
            }
        });
        let mailOptions = {
            from: 'transactionappg3s4@gmail.com',
            to: req.body.custemail,
            subject: "URGENT (Pay Your Bill)",
            text: "Hello World",
            html: output
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('error');
            }
            else {
                console.log('success....' + data.response);
                alert('email sent..');
            }
        });
        res.redirect('/owner/customers-list');
    });
}
exports.ProcessSendReminderPage = ProcessSendReminderPage;
//# sourceMappingURL=customer.js.map