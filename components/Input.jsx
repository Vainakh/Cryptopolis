import React from 'react';

const Input = ({ inputType, title, placeholder, handleClick }) => (
  <div className="mt-10 w-full">
    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
      {title}
    </p>
    <input
      className="dark:bg-nft-black-1
                     bg-white border border-nft-grey-2 rounded-lg w-full outline-none font-poppins
                     dark:text-white text-nft-grey-2
                     text-base mt-4 px-4 py-3"
      placeholder={placeholder}
      onChange={handleClick}
    />
  </div>
);

export default Input;
