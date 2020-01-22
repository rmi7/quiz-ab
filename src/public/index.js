(async () => {
  // there is no metamask
  // const NODE_URL = 'https://dai.poa.network';
  const NODE_URL = 'http://localhost:8545';

  const QUIZ_ABI = [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "ended",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    },
    {
      "inputs": [],
      "name": "fund",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "end",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "reset",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "reward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  const QUIZ_ANSWER_A_ADDRESS = '0x9044E54B47Edf212bcC1706aE739fB244bEBa88F';
  const QUIZ_ANSWER_B_ADDRESS = '0xc08fD93ddce061268eAe60deAe779681d8526757';

  var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL));
  console.log('last blocknumber', await web3.eth.getBlockNumber());

  const answer_stats = { a: 0, b: 0 };

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  while(true) {
    await sleep(2000);
    answer_stats.a = await web3.eth.getBalance(QUIZ_ANSWER_A_ADDRESS);
    answer_stats.b = await web3.eth.getBalance(QUIZ_ANSWER_B_ADDRESS);
    console.log('ANSWERS', answer_stats);

    document.getElementById('answers').innerHTML = `
    <div>
      <div>A</div>
      <div>${answer_stats.a}</div>
    </div>
    <div>
      <div>B</div>
      <div>${answer_stats.b}</div>
    </div>
  `
  }

  // const quizAnswerA = new web3.eth.Contract(QUIZ_ABI, QUIZ_ADDRESS);
  
  // console.log(quizAnswerA);
  // console.log('neo', await quizAnswerA.methods.ended().call());
  
})()
