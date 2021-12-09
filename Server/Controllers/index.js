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
exports.ProcessChangepasswordPage = exports.DisplayChangepasswordPage = exports.DisplayErrorPage = exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.DisplayRegisterPage = exports.ProcessLoginPage = exports.DisplayLoginPage = exports.ProcessContactPage = exports.DisplayContactPage = exports.DisplayServicesPage = exports.DisplayProjectsPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../Models/user"));
const Util_1 = require("../Util");
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayAboutPage(req, res, next) {
    res.render('index', { title: 'About Us', page: 'about', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayAboutPage = DisplayAboutPage;
function DisplayProjectsPage(req, res, next) {
    res.render('index', { title: 'Our Projects', page: 'projects', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayProjectsPage = DisplayProjectsPage;
function DisplayServicesPage(req, res, next) {
    res.render('index', { title: 'Our Services', page: 'services', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayServicesPage = DisplayServicesPage;
function DisplayContactPage(req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayContactPage = DisplayContactPage;
function ProcessContactPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const output = ` 
      <p>You have new Request</p>
      <h3>User Information:</h3>
      <ul>
       <li><b>Name:</b> ${req.body.fullName}</li>
       <li><b>Email:</b> ${req.body.email}</li>
       <li><b>Phone Number:</b> ${req.body.phone}</li>
       <li><b>Message:</b> ${req.body.message}</li>
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
            to: 'transactionappg3s4@gmail.com',
            subject: "Message From G3-S4-F21",
            text: "Hello World",
            html: output
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('error');
            }
            else {
                console.log('success....' + data.response);
            }
        });
        res.render('index', { title: 'Home', page: 'home', displayName: Util_1.UserDisplayName(req) });
    });
}
exports.ProcessContactPage = ProcessContactPage;
function DisplayLoginPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: Util_1.UserDisplayName(req) });
    }
    if (Util_1.UserIsOwner)
        return res.redirect('/owner');
    return res.redirect('/customer');
}
exports.DisplayLoginPage = DisplayLoginPage;
function ProcessLoginPage(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            req.flash('loginMessage', 'UnAuthenticated Information');
            return res.redirect('/error');
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (Util_1.UserIsOwner)
                return res.redirect('/owner');
            else
                return res.redirect('/customer');
        });
    })(req, res, next);
}
exports.ProcessLoginPage = ProcessLoginPage;
function DisplayRegisterPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: Util_1.UserDisplayName(req) });
    }
    return res.redirect('/owner');
}
exports.DisplayRegisterPage = DisplayRegisterPage;
function ProcessRegisterPage(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName,
        isowner: req.body.isowner
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');
            return res.redirect('/register');
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.redirect('/owner');
        });
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
function ProcessLogoutPage(req, res, next) {
    req.logout();
    res.redirect('/home');
}
exports.ProcessLogoutPage = ProcessLogoutPage;
function DisplayErrorPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Error', page: 'error', messages: req.flash('error'), displayName: Util_1.UserDisplayName(req) });
    }
    return res.redirect('/error');
}
exports.DisplayErrorPage = DisplayErrorPage;
function DisplayChangepasswordPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Change Password', page: 'changepassword', messages: req.flash('Changepassword'), displayName: Util_1.UserDisplayName(req) });
    }
    return res.redirect('/changepassword');
}
exports.DisplayChangepasswordPage = DisplayChangepasswordPage;
function ProcessChangepasswordPage(req, res, next) {
}
exports.ProcessChangepasswordPage = ProcessChangepasswordPage;
//# sourceMappingURL=index.js.map