import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import axios from 'axios';

import { MarketAddress, MarketAddressABI } from './constants';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const nftCurrency = 'Kosmos';

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  // check if is connected and set to the current state
  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }
  };

  // on every render of the page
  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount }}>
      {children}
    </NFTContext.Provider>
  );
};

// export const connectWallet = async () => {
//     if (window.ethereum) { //check if Metamask is installed
//           try {
//               const address = await window.ethereum.enable(); //connect Metamask
//               const obj = {
//                       connectedStatus: true,
//                       status: "",
//                       address: address
//                   }
//                   return obj;

//           } catch (error) {
//               return {
//                   connectedStatus: false,
//                   status: "🦊 Connect to Metamask using the button on the top right."
//               }
//           }

//     } else {
//           return {
//               connectedStatus: false,
//               status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
//           }
//         }
//   };

// if (window.ethereum) { // check if Metamask is installed
//     try {
//       const address = await window.ethereum.enable(); // connect Metamask
//       const accounts = await window.etherium.request({ method: 'eth accounts' });
//       console.log({ address });
//       console.log({ accounts });
//       const obj = {
//         connectedStatus: true,
//         status: '',
//         address,
//       };
//       return obj;
//     } catch (error) {
//       return {
//         connectedStatus: false,
//         status: '🦊 Connect to Metamask using the button on the top right.',
//       };
//     }
//   } else {
//     return {
//       connectedStatus: false,
//       status: '🦊 You must install Metamask into your browser: https://metamask.io/download.html',
//     };
//   }
// };
