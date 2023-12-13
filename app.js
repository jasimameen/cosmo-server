var express = require('express');
var stargate = require('@cosmjs/stargate')
var protoSign = require('@cosmjs/proto-signing')


var app = express();

const faucetAddress = "cosmos15aptdqmm7ddgtcrjvc5hs988rlrkze40l4q0he"
const rpcUrl = "rpc.sentry-01.theta-testnet.polypore.xyz:26657"


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.send("Welcome Leske.js, a cosmos server for basic wallet things hehe :)")
})

app.get('/createWallet', async (req, res) => {
    var wallet = await protoSign.DirectSecp256k1HdWallet.generate(24)
    var account = await wallet.getAccounts()
    res.json({
        "mnemonic": wallet.mnemonic,
        "address": account[0].address
    })
});

app.get('/importWallet', async (req, res) => {
    // var mnemonic = req.get("mnemonic")
    var mnemonic = "obvious proof animal aware evidence fee peasant alert effort destroy canyon violin gospel victory logic answer invest spread phrase purpose long leisure throw kiwi"
    var wallet = await protoSign.DirectSecp256k1HdWallet.fromMnemonic(mnemonic)
    var account = await wallet.getAccounts()
    res.json({
        "mnemonic": wallet.mnemonic,
        "address": account[0].address
    })
});

app.get('/getBalances', async (req, res) => {
    let client = await stargate.StargateClient.connect(rpcUrl)
    var balance = await client.getAllBalances(faucetAddress)
    var chainId = await client.getChainId()

    res.json({
        "balance": balance,
        "chainId": chainId
    })
});
