import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import images from '../assets';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const { theme } = useTheme();

  return (
    <>
      <div className="flex-1 flexCenter dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-grey-2 px-4 rounded-md">
        <Image
          src={images.search}
          objectFit="contain"
          width={20}
          height={20}
          alt="search"
          className={theme === 'light' && 'filter invert'}
        />
        <input
          type="text"
          placeholder="Search NFT here"
          className="dark:bg-nft-black-2 bg-white mx-4 w-full dark:text-white text-nft-black-1 font-normal text-xs outline-none"
          onChange={() => {}}
          value=""
        />
      </div>
      <div
        onClick={() => {}}
        className="relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer dark:bg-nft-black-2 bg-white-border dark:border-nft-black-2 border-nft-grey-2 px-4 rounded-md"
      >
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs">Recently listed</p>
        <Image
          src={images.arrow}
        />
      </div>
    </>
  );
};

export default SearchBar;
