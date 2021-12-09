"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerdash_1 = require("../Controllers/customerdash");
const Util_1 = require("../Util");
const router = express_1.default.Router();
exports.default = router;
router.get('/', Util_1.AuthGuard, customerdash_1.DisplayCustomerDashBoardPage);
router.get('/businesslist', Util_1.AuthGuard, customerdash_1.DisplayBusinessListPage);
router.get('/ratebusiness/:id', Util_1.AuthGuard, customerdash_1.DisplayRateBusinessPage);
router.post('/ratebusiness/:id', Util_1.AuthGuard, customerdash_1.ProcessRateBusiness);
//# sourceMappingURL=customerdash.js.map