/* eslint-disable */
const Xdc3 = require("xdc3");
require("dotenv").config();

const internalABI = require("../build/contracts/InternalContract.json");

module.exports.custom_pair = async ({ CONTRACT_ADDR, RPC_URL, FSymbol, TSymbol }) => {
    console.log(CONTRACT_ADDR)

    const xdc3 = new Xdc3(
        new Xdc3.providers.HttpProvider(RPC_URL)
    );

    console.log("FSymbol", FSymbol, TSymbol)
    const contractInstance = new xdc3.eth.Contract(internalABI, CONTRACT_ADDR);
    const account = xdc3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
    const nonce = await xdc3.eth.getTransactionCount(account.address);
    const gasPrice = await xdc3.eth.getGasPrice();
    const tx = {
        nonce: nonce,
        data: contractInstance.methods.requestGeneric(account.address, FSymbol.toString(), TSymbol.toString()).encodeABI(),
        gasPrice: gasPrice,
        to: CONTRACT_ADDR,
        from: account.address,
    };

    tx["gasLimit"] = 200000;

    const signed = await xdc3.eth.accounts.signTransaction(
        tx,
        process.env.PRIVATE_KEY
    );

    console.log("Signed", signed);
    const txt = await xdc3.eth
        .sendSignedTransaction(signed.rawTransaction)
        .once("receipt", console.log);
    // const result = async function showvalue() {
    //     await contractInstance.methods.showPrice().call();
    // }
    if(txt){
        return true;
    }
};


module.exports.default_pair = async ({ CONTRACT_ADDR, RPC_URL }) => {
    console.log("log::::contract_address::::",CONTRACT_ADDR)

    const xdc3 = new Xdc3(
        new Xdc3.providers.HttpProvider(RPC_URL)
    );

    const contractInstance = new xdc3.eth.Contract(internalABI, CONTRACT_ADDR);
    const account = xdc3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
    const nonce = await xdc3.eth.getTransactionCount(account.address);
    const gasPrice = await xdc3.eth.getGasPrice();
    const tx = {
        nonce: nonce,
        data: contractInstance.methods.requestData(account.address).encodeABI(),
        gasPrice: gasPrice,
        to: CONTRACT_ADDR,
        from: account.address,
    };

    tx["gasLimit"] = 200000;

    const signed = await xdc3.eth.accounts.signTransaction(
        tx,
        process.env.PRIVATE_KEY
    );

    console.log("Signed", signed);
    const txt = await xdc3.eth
        .sendSignedTransaction(signed.rawTransaction)
        .once("receipt", console.log);
    if(txt){
        return true;
    }
};

module.exports.show = async ({ CONTRACT_ADDR, RPC_URL }) => {
    const xdc3 = new Xdc3(
        new Xdc3.providers.HttpProvider(RPC_URL)
    );
    const contractInstance = new xdc3.eth.Contract(internalABI, CONTRACT_ADDR);
    const result = await contractInstance.methods.showPrice().call();
    return result;
};
