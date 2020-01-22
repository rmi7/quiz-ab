(async () => {
  // there is no metamask
  // const NODE_URL = 'https://dai.poa.network';
  const NODE_URL = 'http://localhost:8545';

  const QUIZ_ABI = [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor",
      "payable": true
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
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "stateMutability": "payable",
      "type": "receive",
      "payable": true
    },
    {
      "inputs": [],
      "name": "fund",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
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

  const QUIZ_ANSWER_A_ADDRESS = '0x551200f83b24e0337C64b027655b44bdCC18a651';
  const QUIZ_ANSWER_B_ADDRESS = '0xCD2ae2704F19e7a17484d8cb59b8f1d9D0AcAcca';

  // var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL));
  var web3 = new Web3(Web3.givenProvider);
  console.log('last blocknumber', await web3.eth.getBlockNumber());
  
  const weiToEth = wei => web3.utils.fromWei(wei);
  const quizAnswerA = new web3.eth.Contract(QUIZ_ABI, QUIZ_ANSWER_A_ADDRESS);
  const quizAnswerB = new web3.eth.Contract(QUIZ_ABI, QUIZ_ANSWER_B_ADDRESS);
  
  const answer_stats = { a: 0, b: 0 };

  await window.ethereum.enable()

  window.chooseAnswerA = async function chooseAnswerA() {
    const from = web3.currentProvider.selectedAddress
    quizAnswerA.methods.reward().send({ from, gas: 200000, gasPrice: 240000000000 })
      .on('confirmation', () => {
        console.log('1 confirmed');
        quizAnswerB.methods.reset().send({ from, gas: 200000, gasPrice: 240000000000 })
          .on('confirmation', () => console.log('2 confirmed'));
      })
  }

  window.chooseAnswerB = async function chooseAnswerB() {
    const from = web3.currentProvider.selectedAddress
    quizAnswerA.methods.reset().send({ from, gas: 200000, gasPrice: 240000000000 })
    .on('confirmation', () => {
      console.log('1 confirmed');
      quizAnswerB.methods.reward().send({ from, gas: 200000, gasPrice: 240000000000 })
        .on('confirmation', () => console.log('2 confirmed'));
    })
  }

  // await quizAnswerA.methods.fund().send({ from:web3.currentProvider.selectedAddress, value: web3.utils.toWei('45'), gas: 200000 })
  // await quizAnswerB.methods.fund().send({ from:web3.currentProvider.selectedAddress, value: web3.utils.toWei('45'), gas: 200000 })
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  while(true) {
    await sleep(2000);
    answer_stats.a = weiToEth(await quizAnswerA.methods.totalAmount().call());
    answer_stats.b = weiToEth(await quizAnswerB.methods.totalAmount().call());
    console.log('ANSWERS', answer_stats);

    document.getElementById('answers').innerHTML = 
    `<div>
      <span style="font-size:30px;">A =</span>
      <span style="font-size:30px;">${answer_stats.a} xDAI</span>
    </div>
    <div>
      <span style="font-size:30px;">B =</span>
      <span style="font-size:30px;">${answer_stats.b} xDAI</span>
    </div>

    ${ answer_stats.a !== "0" || answer_stats.b !== "0" 
      ? `<div style="height:300px;"><div onclick="chooseAnswerA()" style="font-size:20px;margin: 10px;width:100px; padding:20px; text-align:'center'; border:3px solid black; background-color:grey;">A is correct</div>
        <div onclick="chooseAnswerB()" style="margin: 10px; width:100px; font-size:20px;padding: 20px; text-align:'center';border:3px solid black; background-color:grey;">B is correct</div></div>`
       : '' }

    `
  }

  
  
})()
