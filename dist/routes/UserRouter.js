"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = require("./../models/APIError");
const APIResponse_1 = require("./../models/APIResponse");
const UserModel_1 = require("./../models/UserModel");
const express_1 = require("express");
class UserRouter {
    constructor(app) {
        this.router = express_1.Router();
        this.config();
        app.use('/users', this.router);
    }
    config() {
        this.router.get('/', this.getUsers);
        this.router.post('/', this.createUser);
    }
    getUsers(req, res) {
        res.send("Get Users!");
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new UserModel_1.User(req.body);
            try {
                const u = yield newUser.save();
                let response = new APIResponse_1.APIResponse(true, 201, u);
                res.status(201).send(response);
            }
            catch (err) {
                let apiError = new APIError_1.APIError(err.message, null, 422);
                next(apiError);
            }
        });
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=UserRouter.js.map