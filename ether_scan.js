// import * as ethers from "ethers.js";
// const ether = require('ether.js')
// const { ethers } = require("ethers");
// import { ether } from 'ethers'


async function getMetamaskWallet () {

    window.userWalletAddress = null
    if (!window.ethereum) {
        console.log('No Metamaks Wallet Found!')
        return false
    }

    const walletAddress = loginWithMetaMask();
    return walletAddress
};

async function loginWithMetaMask() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((e) => {
            console.error(e.message)
            return
        })
    if (!accounts) { return }

    window.userWalletAddress = accounts[0]
    console.log(accounts[0])
    return accounts[0]
}

let wallets = null
async function initialization() {
    const userWallet = await getMetamaskWallet()
    wallets = console.log(userWallet)
};

function handlePayments () {

    sender = userWallet
    let reciever = '0x66625d166aabC2f9e5675D8878b550bCc61e3A6b';
    let ether_value = '0.25';

    console.log(wallets, reciever)
    // await startPayment()
};

window.onload = initialization();

document.getElementById("paymentButton").addEventListener("click", handlePayments);
