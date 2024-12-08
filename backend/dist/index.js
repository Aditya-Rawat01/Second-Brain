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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_connection_1 = require("./connection_strings/db_connection");
const signupMiddleware_1 = require("./middlewares/signupMiddleware");
const signinMiddleware_1 = require("./middlewares/signinMiddleware");
const validUserMiddleware_1 = require("./middlewares/validUserMiddleware");
const dbSchema_1 = require("./dbSchema");
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
app.post("/neuron", validUserMiddleware_1.validUserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, url, title } = req.body;
    const date = new Date();
    try {
        yield dbSchema_1.neuron.create({
            type: type,
            url: url,
            title: title,
            userId: req.id,
            createdAt: date.toDateString()
        });
        res.json({
            "msg": "ok"
        });
    }
    catch (error) {
        res.json({
            "msg": "error while creating new neuron"
        });
        return;
    }
}));
app.get("/neuron", validUserMiddleware_1.validUserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brain = yield dbSchema_1.neuron.find({
            userId: req.id
        });
        res.json({
            "msg": brain
        });
    }
    catch (error) {
        res.json({
            "msg": "error occured " + error
        });
        return;
    }
}));
app.listen(3000);
