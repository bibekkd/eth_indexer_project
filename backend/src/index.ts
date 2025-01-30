import express, { json } from 'express';
import pg from "pg";
import { HDNodeWallet } from "ethers6";
import { mnemonicToSeedSync } from "bip39";
import { MNUEMONICS } from './config';


const seed = mnemonicToSeedSync(MNUEMONICS)

const app = express();

interface User {
    username: string,
    password: string
}

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'bibek',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
})

app.use(express.json());

app.post("/signup", async (req, res) => {
    
    const {username, password} : User = req.body;
    
    const result = await pool.query('INSERT INTO binanceUser (username, password, privateKey, depositAddress, balance) VALUES ($1, $2, $3, $4, $5) RETURNING id', [username, password, "", "", 0])
    
    const userId = result.rows[0].id;

    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(`m/44'/60'/${userId}'/0'`);

    await pool.query('UPDATE binanceUser SET privateKey=$1, depositAddress = $2 WHERE id=$3', [child.privateKey, child.address, userId]);
    console.log(`-----`)
    console.log(`Public Key: ${child.publicKey}`)
    console.log(`Address: ${child.address}`)
    console.log(`Private Key: ${child.privateKey}`)
    console.log(`-----`)
    
    res.json({
        userId
    })
})

app.get("/depositAddress/:userId", (req, res) => {
    res.send("Your address is 0x1028303967f763912C539A14919F29f5DFAfFEBC");
})

app.listen(3000);
