"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedBrainZodschema = exports.neuronZodSchema = exports.UserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.UserZodSchema = zod_1.default.object({
    username: zod_1.default.string()
        .min(5, "username should be atleast 5 characters")
        .max(25, "max characters allowed is 25"),
    password: zod_1.default.string()
        .min(5, "password should be atleast 5 characters")
        .max(25, "max characters allowed is 25")
        .refine((password) => password.match(/[A-Z]/) !== null, "Password must contain one capital letter")
        .refine((password) => password.match(/[a-z]/) !== null, "Password must contain one small letter")
});
exports.neuronZodSchema = zod_1.default.object({
    title: zod_1.default.string(),
    url: zod_1.default.string(),
    type: zod_1.default.string(),
    description: zod_1.default.string()
});
exports.sharedBrainZodschema = zod_1.default.object({
    share: zod_1.default.boolean()
});
