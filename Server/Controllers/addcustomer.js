"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessAddCustomer = exports.ProcessCustomerDeletePage = exports.ProcessCustomerAddPage = exports.DisplayCustomerAddPage = exports.ProcessCustomerEditPage = exports.DisplayaddcustomerEditPage = exports.DisplayaddcustomerListPage = void 0;
const addcustomer_1 = __importDefault(require("../Models/addcustomer"));
const Util_1 = require("../Util");
function DisplayaddcustomerListPage(req, res, next) {
    addcustomer_1.default.find({}, null, { sort: { name: 1 } }, function (err, addcustomerCollection) {
        if (err) {
            return console.error(err);
        }
        res.render('owner/addcustomer', { title: 'Add Contact', page: 'addcustomer', addcustomer: addcustomerCollection, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayaddcustomerListPage = DisplayaddcustomerListPage;
function DisplayaddcustomerEditPage(req, res, next) {
    let id = req.params.id;
    addcustomer_1.default.findById(id, {}, {}, (err, addcustomerItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('owner/update', { title: 'Update', page: 'update', addcustomer: addcustomerItemToEdit, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayaddcustomerEditPage = DisplayaddcustomerEditPage;
function ProcessCustomerEditPage(req, res, next) {
    let id = req.params.id;
    let updatedaddcustomerItem = new addcustomer_1.default({
        "_id": id,
        "custname": req.body.custname,
        "custnumber": req.body.custnumber,
        "custemail": req.body.custemail,
        "custamount": req.body.custamount
    });
    addcustomer_1.default.updateOne({ _id: id }, updatedaddcustomerItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/owner/addcustomer');
    });
}
exports.ProcessCustomerEditPage = ProcessCustomerEditPage;
function DisplayCustomerAddPage(req, res, next) {
    res.render('owner/update', { title: 'Add', page: 'update', addcustomer: '', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayCustomerAddPage = DisplayCustomerAddPage;
function ProcessCustomerAddPage(req, res, next) {
    let newCustomer = new addcustomer_1.default({
        "custname": req.body.custname,
        "custnumber": req.body.custnumber,
        "custemail": req.body.custemail,
        "custamount": req.body.custamount
    });
    addcustomer_1.default.create(newCustomer, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/owner/addcustomer');
    });
}
exports.ProcessCustomerAddPage = ProcessCustomerAddPage;
function ProcessCustomerDeletePage(req, res, next) {
    let id = req.params.id;
    addcustomer_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/owner/addcustomer');
    });
}
exports.ProcessCustomerDeletePage = ProcessCustomerDeletePage;
function ProcessAddCustomer(req, res, next) {
    res.render('owner', { title: 'Contact Us', page: 'addcustomer', displayName: Util_1.UserDisplayName(req) });
}
exports.ProcessAddCustomer = ProcessAddCustomer;
//# sourceMappingURL=addcustomer.js.map