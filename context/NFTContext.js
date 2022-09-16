import React, { useState, useEffect } from 'react';
import { ethers, utils } from 'ethers';
import Web3Modal from 'web3modal';
import axios from 'axios';
import { create } from 'ipfs-http-client';
import CreateNFT from '../pages/create-nft';

import { MarketAddress, MarketAddressABI } from './constants';

const projectId = '2EkC73kHZ7FbaOWnRmZLN1eUJyK';
const projectSecret = '292313816d6190ac4ce5f5abb9830cf7';
const authorization = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;
const client = create({
  url: 'https://infura-ipfs.io:5001/api/v0',
  headers: {
    authorization,
  },
});
const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const nftCurrency = 'Kosmos';

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return alert('Please install MetaMask.');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }
  };

  const uploadToIPFS = async (file, setFileUrl) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;

      return url;
    } catch (error) {
      console.log(`Error uploading file to IPFS${error}`);
    }
  };

  const createNFT = async (formInput, fileUrl, router) => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    const data = JSON.stringify({ name, description, image: fileUrl });
    try {
      const added = await client.add(data);
      console.log('1');
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      console.log('2');
      await createSale(url, price);
      console.log('3');
      router.push('/');
    } catch (error) {
      console.log(`Error uploading file to IPFS :" ${error}`);
    }
  };

  const createSale = async (url, formInputPrice, isReselling, Id) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, 'ether');
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();
    const transaction = await contract.createToken(url, price, { value: listingPrice.toString() });
    await transaction.wait();
    console.log({ contract });
  };

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS, createNFT }}>
      {children}
    </NFTContext.Provider>
  );
};
