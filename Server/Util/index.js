"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthOwner = exports.AuthGuard = exports.UserDisplayName = void 0;
function UserDisplayName(req) {
    if (req.user) {
        let user = req.user;
        return user.displayName.toString();
    }
    return '';
}
exports.UserDisplayName = UserDisplayName;
function AuthGuard(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
exports.AuthGuard = AuthGuard;
function AuthOwner(req, res, next) {
    let newuser = req.user;
    if ((newuser.isowner).toString() === "customer") {
        return res.redirect('/home');
    }
    else {
        return res.redirect('/owner');
    }
    next();
}
exports.AuthOwner = AuthOwner;
//# sourceMappingURL=index.js.map