"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: String,
    password: String
});
exports.users = (0, mongoose_1.model)("users", userSchema);
