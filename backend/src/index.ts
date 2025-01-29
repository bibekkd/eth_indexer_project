import express, { json } from 'express';
import pg from "pg";
import { HDNodeWallet, Wallet } from "ethers";


console.log("heooolo")

const app = express();

interface User {
    username: string,
    password: string
}

app.use(express.json());

app.post("/signup", (req, res) => {
    const {username, password} : User = req.body;

    res.json({
        username,
    })
})

app.get("/depositAddress/:userId", (req, res) => {
    res.send("Your address is 0x1028303967f763912C539A14919F29f5DFAfFEBC");
})

app.listen(3000);
