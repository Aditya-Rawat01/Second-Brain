"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validUserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret_1 = require("../connection_strings/jwtsecret");
const validUserMiddleware = (req, res, next) => {
    //const token=localStorage.getItem("token") ~~~~~~~~ put this line in frontend for any further routes and pass it in req headers token
    const token = req.headers.token;
    try {
        const tokenObj = jsonwebtoken_1.default.verify(token, jwtsecret_1.JWTsecret);
        req.id = tokenObj.id;
        next();
    }
    catch (error) {
        res.json({
            "msg": "Invalid token/Session expired"
        });
        return;
    }
};
exports.validUserMiddleware = validUserMiddleware;
