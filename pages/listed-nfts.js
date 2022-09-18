import { useState, useContext, useEffect } from 'react';
import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader } from '../components';

const ListedNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      ListedNFTs
    </div>
  );
};

export default ListedNFTs;
