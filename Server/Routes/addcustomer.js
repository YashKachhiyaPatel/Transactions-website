"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const addcustomer_1 = require("../Controllers/addcustomer");
const business_1 = require("../Controllers/business");
const index_1 = require("../Util/index");
router.get('/', addcustomer_1.ProcessAddCustomer);
router.get('/addcustomer/add', index_1.AuthGuard, addcustomer_1.DisplayCustomerAddPage);
router.get('/addcustomer/edit/:id', index_1.AuthGuard, addcustomer_1.DisplayaddcustomerEditPage);
router.post('/addcustomer/add', index_1.AuthGuard, addcustomer_1.ProcessCustomerAddPage);
router.post('/addcustomer/edit/:id', index_1.AuthGuard, addcustomer_1.ProcessCustomerEditPage);
router.get('/addcustomer/delete/:id', index_1.AuthGuard, addcustomer_1.ProcessCustomerDeletePage);
router.get('/addcustomer', index_1.AuthGuard, addcustomer_1.DisplayaddcustomerListPage);
router.get('/addbusiness/add', index_1.AuthGuard, business_1.DisplayBusinessAddPage);
router.post('/addbusiness/add', index_1.AuthGuard, business_1.ProcessBusinessAddPage);
router.get('/', index_1.AuthGuard, business_1.DisplaybusinessListPage);
//# sourceMappingURL=addcustomer.js.map