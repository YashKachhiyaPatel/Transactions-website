"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Processbusiness = exports.ProcessBusinessAddPage = exports.DisplayBusinessAddPage = exports.DisplaybusinessListPage = void 0;
const business_1 = __importDefault(require("../Models/business"));
const Util_1 = require("../Util");
function DisplaybusinessListPage(req, res, next) {
    business_1.default.find({}, null, { sort: { name: 1 } }, function (err, businessCollection) {
        if (err) {
            return console.error(err);
        }
        res.render('owner', { title: 'Add Contact', page: 'index', business: businessCollection, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplaybusinessListPage = DisplaybusinessListPage;
function DisplayBusinessAddPage(req, res, next) {
    res.render('owner/addbusiness', { title: 'Add', page: 'addbusiness', business: '', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayBusinessAddPage = DisplayBusinessAddPage;
function ProcessBusinessAddPage(req, res, next) {
    let newCustomer = new business_1.default({
        "bname": req.body.bname,
        "baddress": req.body.baddress,
        "bdescription": req.body.bdescription
    });
    business_1.default.create(newCustomer, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/owner');
    });
}
exports.ProcessBusinessAddPage = ProcessBusinessAddPage;
function Processbusiness(req, res, next) {
    res.render('business', { title: 'Contact Us', page: 'addbusiness', displayName: Util_1.UserDisplayName(req) });
}
exports.Processbusiness = Processbusiness;
//# sourceMappingURL=business.js.map