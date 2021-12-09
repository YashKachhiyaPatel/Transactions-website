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
exports.ProcessRateBusiness = exports.DisplayRateBusinessPage = exports.DisplayBusinessListPage = exports.DisplayCustomerDashBoardPage = void 0;
const addbusiness_1 = __importDefault(require("../Models/addbusiness"));
const addcustomer_1 = __importDefault(require("../Models/addcustomer"));
const Util_1 = require("../Util");
function DisplayCustomerDashBoardPage(req, res, next) {
    res.render('customer', { title: 'Customer Dashboard', page: 'index', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayCustomerDashBoardPage = DisplayCustomerDashBoardPage;
function DisplayBusinessListPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var customersBusiness = yield addcustomer_1.default.find({ "custemail": Util_1.UserUserName(req) }, null, { sort: { bowner: 1 } }).exec();
            var result = customersBusiness.map(it => it.get("bowner"));
            var amountList = customersBusiness.map(it => it.get("custamount"));
            console.log(amountList);
            var businessList = yield addbusiness_1.default.find({ bowner: { $in: result } }, null, { sort: { bowner: 1 } }).exec();
            console.log(businessList);
            res.render('customer/businesslist', { title: 'List of Businesses', page: 'businesslist',
                amountList: amountList,
                businessCollection: businessList, displayName: Util_1.UserDisplayName(req) });
        }
        catch (err) {
            return console.error(err);
        }
    });
}
exports.DisplayBusinessListPage = DisplayBusinessListPage;
function DisplayRateBusinessPage(req, res, next) {
    let id = req.params.id;
    addbusiness_1.default.findById(id, {}, {}, (err, businessToRate) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('customer/ratebusiness', { title: 'Rate The Business', page: 'ratebusiness', businessCollection: businessToRate, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayRateBusinessPage = DisplayRateBusinessPage;
function ProcessRateBusiness(req, res, next) {
    let id = req.params.id;
    let rating = req.body.rating;
    addbusiness_1.default.updateOne({ _id: id }, { $inc: { btotalrating: +rating, bnumberofratings: +1 } }, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/customer/businesslist');
    });
}
exports.ProcessRateBusiness = ProcessRateBusiness;
//# sourceMappingURL=customerdash.js.map