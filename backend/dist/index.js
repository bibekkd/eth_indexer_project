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
const ethers6_1 = require("ethers6");
const bip39_1 = require("bip39");
const config_1 = require("./config");
const seed = (0, bip39_1.mnemonicToSeedSync)(config_1.MNUEMONICS);
const app = (0, express_1.default)();
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'bibek',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});
app.use(express_1.default.json());
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const result = yield pool.query('INSERT INTO binanceUser (username, password, privateKey, depositAddress, balance) VALUES ($1, $2, $3, $4, $5) RETURNING id', [username, password, "", "", 0]);
    const userId = result.rows[0].id;
    const hdNode = ethers6_1.HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(`m/44'/60'/${userId}'/0'`);
    yield pool.query('UPDATE binanceUser SET privateKey=$1, depositAddress = $2 WHERE id=$3', [child.privateKey, child.address, userId]);
    console.log(`-----`);
    console.log(`Public Key: ${child.publicKey}`);
    console.log(`Address: ${child.address}`);
    console.log(`Private Key: ${child.privateKey}`);
    console.log(`-----`);
    res.json({
        userId
    });
}));
app.get("/depositAddress/:userId", (req, res) => {
    res.send("Your address is 0x1028303967f763912C539A14919F29f5DFAfFEBC");
});
app.listen(3000);
