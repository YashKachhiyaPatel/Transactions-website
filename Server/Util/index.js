"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = exports.UserIsOwner = exports.UserRole = exports.UserUserName = exports.UserDisplayName = void 0;
function UserDisplayName(req) {
    if (req.user) {
        let user = req.user;
        return user.displayName.toString();
    }
    return '';
}
exports.UserDisplayName = UserDisplayName;
function UserUserName(req) {
    if (req.user) {
        let user = req.user;
        return user.username.toString();
    }
    return '';
}
exports.UserUserName = UserUserName;
function UserRole(req) {
    if (req.user) {
        let user = req.user;
        return user.isowner.toString();
    }
    return '';
}
exports.UserRole = UserRole;
function UserIsOwner(req) {
    if (req.user) {
        let user = req.user;
        if (user.isowner.toString().toLowerCase() == "owner")
            return true;
    }
    return false;
}
exports.UserIsOwner = UserIsOwner;
function AuthGuard(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=index.js.map