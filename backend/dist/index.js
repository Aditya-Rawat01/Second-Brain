"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_connection_1 = require("./connection_strings/db_connection");
const signupMiddleware_1 = require("./middlewares/signupMiddleware");
const signinMiddleware_1 = require("./middlewares/signinMiddleware");
const validUserMiddleware_1 = require("./middlewares/validUserMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.connect(db_connection_1.dbURL);
app.post("/signup", signupMiddleware_1.signupMiddleware, (req, res) => {
    res.json({
        msg: "New User signed up successfully"
    });
});
app.post("/signin", signinMiddleware_1.signinMiddleware, (req, res) => {
    res.json({
        msg: req.token
    });
});
app.post("/neuron", validUserMiddleware_1.validUserMiddleware, (req, res) => {
    res.json({
        "msg": "ok"
    });
});
app.listen(3000);
