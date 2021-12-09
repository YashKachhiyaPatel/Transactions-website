"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("../Controllers");
const router = express_1.default.Router();
exports.default = router;
router.get('/', Controllers_1.DisplayHomePage);
router.get('/home', Controllers_1.DisplayHomePage);
router.get('/about', Controllers_1.DisplayAboutPage);
router.get('/projects', Controllers_1.DisplayProjectsPage);
router.get('/services', Controllers_1.DisplayServicesPage);
router.get('/contact', Controllers_1.DisplayContactPage);
router.post('/contact', Controllers_1.ProcessContactPage);
router.get('/login', Controllers_1.DisplayLoginPage);
router.post('/login', Controllers_1.ProcessLoginPage);
router.get('/logout', Controllers_1.ProcessLogoutPage);
router.post('/register', Controllers_1.ProcessRegisterPage);
router.get('/register', Controllers_1.DisplayRegisterPage);
router.get('/changepassword', Controllers_1.DisplayChangepasswordPage);
router.post('/changepassword', Controllers_1.ProcessChangepasswordPage);
router.get('/error', Controllers_1.DisplayErrorPage);
//# sourceMappingURL=index.js.map