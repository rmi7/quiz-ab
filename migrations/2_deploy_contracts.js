const Quiz = artifacts.require("Quiz");

const WHITELISTED_ADDRS = [
  '0x01f856D75f064fA793efAc0A8657fC32a5cacFb2',
  '0xb9B760670dC693bFc8D9FA202DF817de861cACC3',
  '0x9366728a1b95d6006F15B30225D9E9AA68838cb7',
  '0xd047FC353fdBe82940A8BA6Da4E3C8ba7B7f864F',
  '0xe1A1232A6605C7e8902e9a8Dd51781c1fD76Eb13',
  '0x3c17fFFde5725BbFf40a52F60f0D1999F16eC556',
  '0xf2E1eAAf8526097E8504aD4c521839117dcaA222',
  '0x70310755D5abF316Ad87868d5E9b191ADd7c64aB',
  '0x461aea035025c56cEfdF725E444151186e01798B',
  '0xbDCd39F3179dC823b99D54F31Be8EEDb914d92a4',
  '0xdD406EE0709fAE34537F17594dBc20c5B40f39e2',
  '0x55bf921dd4f9f25f5f3F98811F4019A519d734B5',
  '0x56f51f0c9763B9d426447dF94c40D55634E417bF',
  '0xF95A6EB8C7b22327a5C5A6902Cc68302E4Aad01f',
  '0xc34a3f2AcBF6494289c5a3e939B6a5106f3E6e56',
  '0x853506Aa502A9B6f790437e3470A6abbd816C096',
  '0xB4ce64818543748C517309B561b621116034aB35',
  '0xb5CEd91118C891b7515B0650e9aB8F35Aae5Ea76',
  '0x07F32C9D9FFBB7b025e353fD873D8b6406A7bA6a',
  '0xc7B8b4cbeA66cD89f2832e3C23c33dFfeBe7D823',
  '0x2f1f081641e47ca0321243aE018A278455A927cD',
  '0xbA4c96AEeba055Fb89a436aDebF8B43Aa270Ddd6',
  '0x74153a070886fb8D8f1Ae0DC4fe767f9988B43E5',
  '0xe2E7188595C4e9534488Fe6B28E0d7E4ca5d6Cb5',
  '0x263b25288E198a916E87e5415e9a884D9049F466',
  '0xcfd409F8cD9df631C9AD27872bDFC3980BD287ee',
  '0x6aef80E706D52032176d9674c0FaB435dFDAD845',
  '0xADb28161d1789FA06907d157FcacB970aED0215a',
  '0xd883a7A6a90f0ee1f17BF7d34aec7825AeA4f70C',
  '0x64c5752E1f33889720045C43De6EBC1D71D4A99F',
  '0x3993989d220ca42fDA7e90796f8632181C8cF0eA',
  '0x9E73A3f9bC741562b81ddCD1B4a7A8c0f1BB47d7',
  '0xde35cE7A86F51E79d6FC9A1b8cbBb1a941120C0E',
  '0x01f856D75f064fA793efAc0A8657fC32a5cacFb2',
  '0xb9B760670dC693bFc8D9FA202DF817de861cACC3',
  '0x9366728a1b95d6006F15B30225D9E9AA68838cb7',
  '0xd047FC353fdBe82940A8BA6Da4E3C8ba7B7f864F',
  '0xe1A1232A6605C7e8902e9a8Dd51781c1fD76Eb13',
  '0x3c17fFFde5725BbFf40a52F60f0D1999F16eC556',
  '0xf2E1eAAf8526097E8504aD4c521839117dcaA222',
  '0x70310755D5abF316Ad87868d5E9b191ADd7c64aB',
  '0x461aea035025c56cEfdF725E444151186e01798B',
  '0xbDCd39F3179dC823b99D54F31Be8EEDb914d92a4',
  '0xdD406EE0709fAE34537F17594dBc20c5B40f39e2',
  '0x55bf921dd4f9f25f5f3F98811F4019A519d734B5',
  '0x56f51f0c9763B9d426447dF94c40D55634E417bF',
  '0xF95A6EB8C7b22327a5C5A6902Cc68302E4Aad01f',
  '0xc34a3f2AcBF6494289c5a3e939B6a5106f3E6e56',
  '0x853506Aa502A9B6f790437e3470A6abbd816C096',
  '0xB4ce64818543748C517309B561b621116034aB35',
  '0xb5CEd91118C891b7515B0650e9aB8F35Aae5Ea76',
  '0x07F32C9D9FFBB7b025e353fD873D8b6406A7bA6a',
  '0xc7B8b4cbeA66cD89f2832e3C23c33dFfeBe7D823',
  '0x2f1f081641e47ca0321243aE018A278455A927cD',
  '0xbA4c96AEeba055Fb89a436aDebF8B43Aa270Ddd6',
  '0x74153a070886fb8D8f1Ae0DC4fe767f9988B43E5',
  '0xe2E7188595C4e9534488Fe6B28E0d7E4ca5d6Cb5',
  '0x263b25288E198a916E87e5415e9a884D9049F466',
  '0xcfd409F8cD9df631C9AD27872bDFC3980BD287ee',
  '0x6aef80E706D52032176d9674c0FaB435dFDAD845',
  '0xADb28161d1789FA06907d157FcacB970aED0215a',
  '0xd883a7A6a90f0ee1f17BF7d34aec7825AeA4f70C',
  '0x64c5752E1f33889720045C43De6EBC1D71D4A99F',
  '0x3993989d220ca42fDA7e90796f8632181C8cF0eA',
  '0x9E73A3f9bC741562b81ddCD1B4a7A8c0f1BB47d7',
  '0xde35cE7A86F51E79d6FC9A1b8cbBb1a941120C0E',
  '0x2994476502FcD24E2EFcc5faf8521892850ffc6d',
  '0x3c4231032586fc53b607D4dC69730D4aB1B47C16',
  '0xf7E86f012e550331532b9a01C97874C527f4b8B5',
  '0x07944B1f7782e468A46FE57A5a448bd28C8Fe46F',
  '0x0790831A1edD4821fe74A190205722e137547efc',
  '0x3bbA3c00C5f8d289BaE1Cbd0e18832Bfd0a0052f',
  '0xf23A2fAe5b6d44d8a76a433Ac014ACCB2B204238',
  '0x05976AbBA3591bc1BC05f97117A7cf84C3C1f439',
  '0x3E86381c5C05Bd7516FcBBbC24b788517b7Bb1aC',
  '0xDdA825e0976B8345ebf24AcD130573270D55BE82',
  '0x73f53aF998f04Fc5aCeA3402111C90906fCE8941',
  '0xbf70d139bff45D58A1Fb4785524dBa0335B06140',
  '0xD8b115a6377dfCB0c49c8639Dc8f1ED32a5480cA',
  '0xd2f000e9425329efd194f880Ad6Be141dEBa68E1',
  '0x2981aeb50BB9152F5A667894774115577D59b736',
  '0xCCa9BB225B8c1099a1955CFE8f199F6E5164953b',
  '0xd3f636B6A585A2aCD5217a4fFcF330455983eb27',
]

module.exports = function(deployer, network, accounts) {
  console.log({ network, accounts})
  if (network === 'development') {
    deployer.deploy(Quiz, [...WHITELISTED_ADDRS, ...accounts.slice(1)], { value: web3.utils.toWei('10') });
    deployer.deploy(Quiz, [...WHITELISTED_ADDRS, ...accounts.slice(1)], { value: web3.utils.toWei('10') });
  }
  else if (network === 'xdai') {
    const TEST_ADDR = '0x32518C542CcA9A671d688eC88d9e01206b3dCcd5'
    deployer.deploy(Quiz, [...WHITELISTED_ADDRS, TEST_ADDR], { value: web3.utils.toWei('0'), gas: 3000000 });
    deployer.deploy(Quiz, [...WHITELISTED_ADDRS, TEST_ADDR], { value: web3.utils.toWei('0'), gas: 3000000 });
  }
};
