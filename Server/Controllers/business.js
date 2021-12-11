"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessBusinessDeletePage = exports.ProcessBusinessEditPage = exports.DisplayaddbusinessEditPage = exports.ProcessBusinessAddPage = exports.DisplayBusinessAddPage = exports.DisplayaddBusinessListPage = void 0;
const business_1 = __importDefault(require("../Models/business"));
const Util_1 = require("../Util");
function DisplayaddBusinessListPage(req, res, next) {
    business_1.default.find({ bowner: Util_1.UserUserName(req) }, null, { sort: { name: 1 } }, function (err, businessCollection) {
        if (err) {
            return console.error(err);
        }
        res.render('owner/business-list', { title: 'Add Business', page: 'business-list', addbusiness: businessCollection, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayaddBusinessListPage = DisplayaddBusinessListPage;
function DisplayBusinessAddPage(req, res, next) {
    res.render('owner/updatebusiness', { title: 'Add', page: 'updatebusiness', addbusiness: '', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayBusinessAddPage = DisplayBusinessAddPage;
function ProcessBusinessAddPage(req, res, next) {
    let newCustomer = new business_1.default({
        "bname": req.body.bname,
        "baddress": req.body.baddress,
        "bdescription": req.body.bdescription,
        "bowner": Util_1.UserUserName(req),
        "btotalrating": 0,
        "bnumberofratings": 0
    });
    business_1.default.create(newCustomer, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/owner/business-list');
    });
}
exports.ProcessBusinessAddPage = ProcessBusinessAddPage;
function DisplayaddbusinessEditPage(req, res, next) {
    let id = req.params.id;
    business_1.default.findById(id, {}, {}, (err, addbusinessItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('owner/updatebusiness', { title: 'Edit', page: 'updatebusiness', addbusiness: addbusinessItemToEdit, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayaddbusinessEditPage = DisplayaddbusinessEditPage;
function ProcessBusinessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedaddbusinessItem = new business_1.default({
        "_id": id,
        "bname": req.body.bname,
        "baddress": req.body.baddress,
        "bdescription": req.body.bdescription
    });
    business_1.default.updateOne({ _id: id }, updatedaddbusinessItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/owner/business-list');
    });
}
exports.ProcessBusinessEditPage = ProcessBusinessEditPage;
function ProcessBusinessDeletePage(req, res, next) {
    let id = req.params.id;
    business_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/owner/business-list');
    });
}
exports.ProcessBusinessDeletePage = ProcessBusinessDeletePage;
//# sourceMappingURL=business.js.map