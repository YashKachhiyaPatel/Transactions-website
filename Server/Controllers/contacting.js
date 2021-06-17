"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessContactDeletePage = exports.ProcessContactAddPage = exports.ProcessContactEditPage = exports.DisplayContactAddPage = exports.DisplayContactingEditPage = exports.DisplayContactingListPage = void 0;
const contacting_1 = __importDefault(require("../Models/contacting"));
const Util_1 = require("../Util");
function DisplayContactingListPage(req, res, next) {
    contacting_1.default.find(function (err, contactingCollection) {
        if (err) {
            return console.error(err);
        }
        res.render('index', { title: 'contacting-list', page: 'contacting-list', contacting: contactingCollection, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayContactingListPage = DisplayContactingListPage;
function DisplayContactingEditPage(req, res, next) {
    let id = req.params.id;
    contacting_1.default.findById(id, {}, {}, (err, contactingItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'contactingupdate', contacting: contactingItemToEdit, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayContactingEditPage = DisplayContactingEditPage;
function DisplayContactAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'contactingupdate', contacting: '', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayContactAddPage = DisplayContactAddPage;
function ProcessContactEditPage(req, res, next) {
    let id = req.params.id;
    let updatedContactingItem = new contacting_1.default({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "emailAddress": req.body.emailAddress
    });
    contacting_1.default.updateOne({ _id: id }, updatedContactingItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contacting-list');
    });
}
exports.ProcessContactEditPage = ProcessContactEditPage;
function ProcessContactAddPage(req, res, next) {
    let newContact = new contacting_1.default({
        "name": req.body.name,
        "number": req.body.number,
        "emailAddress": req.body.emailAddress
    });
    contacting_1.default.create(newContact, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contacting-list');
    });
}
exports.ProcessContactAddPage = ProcessContactAddPage;
function ProcessContactDeletePage(req, res, next) {
    let id = req.params.id;
    contacting_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contacting-list');
    });
}
exports.ProcessContactDeletePage = ProcessContactDeletePage;
//# sourceMappingURL=contacting.js.map