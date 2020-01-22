const Quiz = artifacts.require('Quiz');
// const web3 = require('web3');
const BN = v => new web3.utils.toBN(v);
const ethToWei = eth => web3.utils.toWei(eth.toString(), 'ether');

const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

contract('Quiz', ([admin, user1, user2, user3, user4]) => {
  it('can vote', async () => {
    const aContract = await Quiz.new({ value: ethToWei(10) });
    const aContractBalBef = await web3.eth.getBalance(aContract.address);
    await aContract.sendTransaction({ from: user1, value: ethToWei(1) });
    const aContractBalAft = await web3.eth.getBalance(aContract.address);
    assert(BN(aContractBalBef).eq(BN(ethToWei(10))));
    assert(BN(aContractBalAft).eq(BN(ethToWei(11))));
  });
  it('admin can reset', async () => {
    const aContract = await Quiz.new({ value: ethToWei(10) });
    await aContract.sendTransaction({ from: user1, value: ethToWei(1) });
    await aContract.reset({ from: admin });
    const aContractBalAftReset = await web3.eth.getBalance(aContract.address);
    assert(BN(aContractBalAftReset).eq(BN(ethToWei(11))));
    
  });
  it('admin can end', async () => {
    const aContract = await Quiz.new({ value: ethToWei(10) });
    await aContract.sendTransaction({ from: user1, value: ethToWei(1) });
    let ended = await aContract.ended.call();
    assert(!ended);
    await aContract.reset({ from: admin });
    await aContract.end({ from: admin });
    const aContractBalAftReset = await web3.eth.getBalance(aContract.address);
    assert(BN(aContractBalAftReset).eq(BN(0)));
    ended = await aContract.ended.call();
    assert(ended);
  });
  it('admin can reward', async () => {
    const aContract = await Quiz.new({ value: ethToWei(10) });
    await aContract.sendTransaction({ from: user1, value: ethToWei(1) });
    await aContract.reward({ from: admin });
    const aContractBalAftReset = await web3.eth.getBalance(aContract.address);
    assert(BN(aContractBalAftReset).eq(BN(ethToWei(9))));
  });
  it('admin can fund the contract', async () => {
    const aContract = await Quiz.new({ value: ethToWei(10) });
    await aContract.fund({ from: admin, value: ethToWei(3) });
    const aContractBalAftReset = await web3.eth.getBalance(aContract.address);
    assert(BN(aContractBalAftReset).eq(BN(ethToWei(13))));
  });
});
