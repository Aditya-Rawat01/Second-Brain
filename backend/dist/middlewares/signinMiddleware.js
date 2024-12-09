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
exports.signinMiddleware = void 0;
const dbSchema_1 = require("../dbSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signinMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const userFound = yield dbSchema_1.users.findOne({
            username: username
        });
        if (userFound !== null) {
            const token = jsonwebtoken_1.default.sign({ "id": userFound._id }, process.env.JWTsecret);
            //localStorage.setItem("token",token) ~~~~~~~~~~~~~~~ put it in frontend while signing up
            req.token = token;
            next();
        }
        else {
            res.json({
                "msg": "No such user found. Try signing up"
            });
            return;
        }
    }
    catch (error) {
        res.json({
            "msg": error
        });
        return;
    }
});
exports.signinMiddleware = signinMiddleware;
