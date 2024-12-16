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
const signupMiddleware_1 = require("./middlewares/signupMiddleware");
const signinMiddleware_1 = require("./middlewares/signinMiddleware");
const validUserMiddleware_1 = require("./middlewares/validUserMiddleware");
const dbSchema_1 = require("./dbSchema");
const zodSchema_1 = require("./zodSchema");
const sharedUrlGenerator_1 = require("./miscellaneous/sharedUrlGenerator");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generative_ai_1 = require("@google/generative-ai");
/// cors is not imported yet so there can be some errors from frontend
const app = (0, express_1.default)();
app.use(express_1.default.json());
try {
    mongoose_1.default.connect(process.env.dbURL);
}
catch (error) {
    console.log("Error occurred");
}
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
    const ans = zodSchema_1.neuronZodSchema.safeParse({
        type: type,
        url: url,
        title: title
    });
    if (ans.success) {
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
                "msg": "neuron added successfully"
            });
        }
        catch (error) {
            res.json({
                "msg": "error while creating new neuron"
            });
            return;
        }
    }
    else {
        res.json({
            "msg": ans.error.issues[0].message
        });
    }
}));
app.get("/brain", validUserMiddleware_1.validUserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.delete("/:neuronId", validUserMiddleware_1.validUserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const neuronId = req.params.neuronId;
    try {
        const isValidNeuron = yield dbSchema_1.neuron.deleteOne({
            userId: req.id,
            _id: neuronId
        });
        if (isValidNeuron.deletedCount === 0) {
            res.json({
                "msg": "Invalid/deleted neuronId"
            });
            return;
        }
        else {
            res.json({
                "msg": "Neuron destroyed successfully"
            });
        }
    }
    catch (error) {
        res.json({
            "msg": error
        });
    }
}));
app.post("/shareBrain", validUserMiddleware_1.validUserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    const ans = zodSchema_1.sharedBrainZodschema.safeParse({
        share: share
    });
    if (ans.success) {
        if (share === true) {
            const url = yield (0, sharedUrlGenerator_1.uniqueUrl)();
            const alreadyShared = yield dbSchema_1.sharedBrain.findOne({
                userId: req.id
            });
            if (alreadyShared === null) {
                yield dbSchema_1.sharedBrain.create({
                    userId: req.id,
                    url: url,
                    share: true
                });
                res.json({
                    "msg": "Link to your shared brain is: " + url
                });
            }
            else {
                res.json({
                    "msg": "Link to your shared brain is: " + alreadyShared.url
                });
            }
            return;
        }
        else {
            const response = yield dbSchema_1.sharedBrain.deleteOne({
                userId: req.id
            });
            res.json({
                "msg": "Brain is private now"
            });
            return;
        }
    }
    else {
        res.json({
            "msg": "Some fields are empty"
        });
    }
}));
app.post("/shareBrain/:sharedLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sharedBrainLink = req.params.sharedLink;
    try {
        const Brain = yield dbSchema_1.sharedBrain.findOne({
            url: sharedBrainLink
        });
        if (Brain != null) {
            const response = yield dbSchema_1.neuron.find({
                userId: Brain.userId
            });
            res.json({
                "msg": response
            });
        }
        else {
            res.json({
                "msg": "Invalid Link"
            });
            return;
        }
    }
    catch (error) {
        res.json({
            "msg": error
        });
    }
}));
///// when doing app.get("/brain"), we are already getting neuron _id so in frontend 
//when one click on share neuron button just get neuron id and show him . no use of extra route
app.post("/shareNeuron/:neuronId", validUserMiddleware_1.validUserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const neuronId = req.params.neuronId;
    try {
        const foundNeuron = yield dbSchema_1.neuron.findOne({
            _id: neuronId
        });
        if (foundNeuron !== null) {
            res.json({
                "msg": foundNeuron
            });
        }
        else {
            res.json({
                "msg": "Invalid neuron id"
            });
        }
    }
    catch (error) {
        res.json({
            "msg": "neuron id length is invalid"
        });
    }
}));
// doesnt work.... gives wrong summary.....
app.post("/explainAi/:neuronId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const neuronId = req.params.neuronId;
    try {
        const foundNeuron = yield dbSchema_1.neuron.findOne({
            _id: neuronId
        });
        if (foundNeuron != null) {
            const url = foundNeuron.url;
            const prompt = `Please provide a concise summary of the content available at the following URL: ${url}
             Your summary should be objective, informative, and free of any personal opinions or biases. 
             If the URL leads to a document, please include key findings, arguments, or conclusions.
             If the URL leads to a webpage, please summarize the main purpose and key information presented on the page.`;
            const result = yield model.generateContent(prompt);
            res.json({
                "msg": result.response.text()
            });
            return;
        }
        else {
            res.json({
                "msg": "Invalid neuron id"
            });
            return;
        }
    }
    catch (_a) {
        res.json({
            msg: "Invalid neuron Id Length"
        });
    }
}));
app.listen(3000);
