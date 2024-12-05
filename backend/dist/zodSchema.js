"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.UserSchema = zod_1.default.object({
    username: zod_1.default.string()
        .min(5, "username should be atleast 5 characters")
        .max(25, "max characters allowed is 25"),
    password: zod_1.default.string()
        .min(5, "password should be atleast 5 characters")
        .max(25, "max characters allowed is 25")
        .refine((password) => password.match(/[A-Z]/) !== null, "Password must contain one capital letter")
        .refine((password) => password.match(/[a-z]/) !== null, "Password must contain one small letter")
});
