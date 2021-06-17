"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contacting_1 = require("../Controllers/contacting");
const router = express_1.default.Router();
exports.default = router;
router.get('/', contacting_1.DisplayContactingListPage);
router.get('/cedit/:id', contacting_1.DisplayContactingEditPage);
router.get('/cadd', contacting_1.DisplayContactAddPage);
router.post('/cadd', contacting_1.ProcessContactAddPage);
router.post('/cedit/:id', contacting_1.ProcessContactEditPage);
router.get('/cdelete/:id', contacting_1.ProcessContactDeletePage);
//# sourceMappingURL=contacting.js.map