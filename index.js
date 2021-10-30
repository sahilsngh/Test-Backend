import { ethers } from "ether.js"

const startPayment = async ({ setError, setTxs, ether, addr }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      });
      console.log({ ether, addr });
      console.log("tx", tx);
      setTxs([tx]);
    } catch (err) {
      setError(err.message);
    }
};

let address = '0x66625d166aabC2f9e5675D8878b550bCc61e3A6b';
let ether_value = '0.25';

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  setError();
  await startPayment({
    setError,
    setTxs,
    ether: ether_value,
    addr: address
  });
};
// //////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////
// function send_address(param) {
//     console.log(param)
//     return param;
// };

// window.userWalletAddress = null
// const loginButton = document.getElementById('loginButton')
// const userWallet = document.getElementById('userWallet')

// function toggleButton() {
//     if (!window.ethereum) {
//         loginButton.innerText = 'MetaMask is not installed'
//         loginButton.classList.remove('bg-purple-500', 'text-white')
//         loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed')
//         return false
//     }

//     loginButton.addEventListener('click', loginWithMetaMask)
// }

// async function loginWithMetaMask() {
//     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
//         .catch((e) => {
//             console.error(e.message)
//             return
//         })
//     if (!accounts) { return }

//     window.userWalletAddress = accounts[0]
//     // send_address(accounts[0])
//     // wallet address of the user and it can be use to send transaction request to metamask.
//     const wallet_address = await send_address(accounts[0]);
//     // console.log(accounts[0])
//     userWallet.innerText = window.userWalletAddress
//     loginButton.innerText = 'Sign out of MetaMask'

//     loginButton.removeEventListener('click', loginWithMetaMask)
//     setTimeout(() => {
//         loginButton.addEventListener('click', signOutOfMetaMask)
//     }, 200)
// }

// function signOutOfMetaMask() {
//     window.userWalletAddress = null
//     userWallet.innerText = ''
//     loginButton.innerText = 'Sign in with MetaMask'

//     loginButton.removeEventListener('click', signOutOfMetaMask)
//     setTimeout(() => {
//         loginButton.addEventListener('click', loginWithMetaMask)
//     }, 200)
// }

// window.addEventListener('DOMContentLoaded', () => {
//     toggleButton()
// });
// //////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////