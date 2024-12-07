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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupMiddleware = void 0;
const zodSchema_1 = require("../zodSchema");
const dbSchema_1 = require("../dbSchema");
const signupMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const ans = zodSchema_1.UserSchema.safeParse({
        username: username,
        password: password
    });
    if (ans.success) {
        try {
            yield dbSchema_1.users.create({
                username: username,
                password: password
            });
            next();
        }
        catch (error) {
            res.json({
                "msg": "Error while creating a new user"
            });
            return;
        }
    }
    else {
        res.json({
            "msg": ans.error.issues[0].message
        });
        return;
    }
});
exports.signupMiddleware = signupMiddleware;
