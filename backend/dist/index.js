"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
console.log("heooolo");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    res.json({
        username,
    });
});
app.get("/depositAddress/:userId", (req, res) => {
    res.send("Your address is 0x1028303967f763912C539A14919F29f5DFAfFEBC");
});
app.listen(3000);
