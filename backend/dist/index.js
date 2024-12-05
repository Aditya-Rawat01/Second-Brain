"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_connection_1 = require("./connection_strings/db_connection");
const userMiddleware_1 = require("./middlewares/userMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.connect(db_connection_1.dbURL);
app.post("/signup", userMiddleware_1.userMiddleware, (req, res) => {
    res.json({
        msg: "signedup"
    });
});
app.post("/signin", userMiddleware_1.userMiddleware, (req, res) => {
    res.json({
        msg: "signedin"
    });
});
app.listen(3000);
