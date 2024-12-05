"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const zodSchema_1 = require("../zodSchema");
const userMiddleware = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const ans = zodSchema_1.UserSchema.safeParse({
        username: username,
        password: password
    });
    if (ans.success) {
        next();
    }
    else {
        res.json({
            "msg": ans.error.issues[0].message
        });
        return;
    }
};
exports.userMiddleware = userMiddleware;
