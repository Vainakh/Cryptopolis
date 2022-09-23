export const getCreators = (nfts) => {
  const finalized = [];
  const creators = nfts.reduce((creatorObject, nft) => {
    (creatorObject[nft.seller] = creatorObject[nft.seller] || []).push(nft);
    return creatorObject;
  }, {});

  Object.entries(creators).map((creator) => {
    const seller = creator[0];
    const sum = creator[1].map((item) => Number(item.price)).reduce((prev, curr) => prev + curr, 0);
    // return ({ seller, sum });
    finalized.push({ seller, sum });
  });

  return finalized;
};

// export const getCreators = (array) => {
//   const finalized = [];

//   const result = array.reduce((res, currentValue) => {
//     (res[currentValue.seller] = res[currentValue.seller] || []).push(currentValue);

//     return res;
//   }, {});

//   Object.entries(result).forEach((itm) => {
//     const seller = itm[0];
//     const sumall = itm[1].map((item) => Number(item.price)).reduce((prev, curr) => prev + curr, 0);

//     finalized.push({ seller, sumall });
//   });

//   return finalized;
// };

// create a function that returns an array of top sellers
// a top seller is a person with a high sum of all NFTs they've listed.

// const array = [
//   { price: '2', seller: 'A' },
//   { price: '1', seller: 'B' },
//   { price: '4', seller: 'A' },
//   { price: '5', seller: 'C' },
// ];

// [
//     {sum: '1', seller: 'B'},
//     {sum: '6', seller: 'A'},
//     {sum: '5', seller: 'C'},
// ]
