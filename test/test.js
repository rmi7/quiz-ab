const AnswerToken = artifacts.require('AnswerToken');
const Question = artifacts.require('Question');

const BN = v => new web3.utils.BN(v);
const ethToWei = eth => web3.utils.toWei(eth.toString(), 'ether');

const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

contract('Question', ([deployer, user1, user2, user3, user4]) => {
  it('init', async () => {
    const aToken = await AnswerToken.new('A');
    const bToken = await AnswerToken.new('B');
    const cToken = await AnswerToken.new('C');
    const dToken = await AnswerToken.new('D');

    const question = await Question.new(
      'First question',
      'answer 1', aToken.address,
      'answer 2', bToken.address,
      'answer 3', cToken.address,
      'answer 4', dToken.address,
    );

    await aToken.transfer(question.address, ethToWei(1));
  });

  // it('non-owner cannot add charity', async () => {
  //   const instance = await Question.new();

  //   try {
  //       await instance.addCharity(addr3, { from: addr1 });
  //   } catch (err) {
  //       return;
  //   }
  //   throw new Error('should have thrown');
  // });

  // it('only owner can add charity', async () => {
  //   const instance = await Question.new();

  //   await instance.addCharity(addr3);
  //   assert((await instance.charityCount()).toString() === '1');
  //   assert((await instance.charities(1)) === addr3);
  // });

  // it('non-owner cannot remove charity', async () => {
  //   const instance = await Question.new();

  //   try {
  //       await instance.removeCharity(addr3, { from: addr1 });
  //   } catch (err) {
  //       return;
  //   }
  //   throw new Error('should have thrown');
  // });

  // it('only owner can remove charity', async () => {
  //   const instance = await Question.new();
  //   await instance.addCharity(addr3);

  //   const charitiesCountBefore = BN(await instance.charityCount());
  //   await instance.removeCharity(addr3);
  //   const charitiesCountAfter = BN(await instance.charityCount());
  //   assert(charitiesCountAfter.eq(charitiesCountBefore.sub(BN(1))));
  // });

  // it('evenly divides eth transfers amongst the charities - 0 leftover wei', async () => {
  //   const instance = await Question.new();

  //   await instance.addCharity(addr3);
  //   await instance.addCharity(addr4);
  //   await instance.addCharity(addr5);

  //   const balanceContractBefore = BN(await web3.eth.getBalance(instance.address));   
  //   const balanceCharityBefore = BN(await web3.eth.getBalance(addr3));
  //   await instance.sendTransaction({ from: deployer, value: '9' });
  //   const balanceCharityAfter = BN(await web3.eth.getBalance(addr3));    
  //   const balanceContractAfter = BN(await web3.eth.getBalance(instance.address));   
  //   assert(balanceContractAfter.sub(balanceContractBefore).toString() === '0');
  //   assert(balanceCharityAfter.sub(balanceCharityBefore).toString() === '3');
  // });
  // it('evenly divides eth transfers amongst the charities - leftover 1 wei', async () => {
  //   const instance = await Question.new();

  //   await instance.addCharity(addr3);
  //   await instance.addCharity(addr4);
  //   await instance.addCharity(addr5);

  //   const balanceContractBefore = BN(await web3.eth.getBalance(instance.address));   
  //   const balanceCharityBefore = BN(await web3.eth.getBalance(addr3));
  //   await instance.sendTransaction({ from: deployer, value: '10' });
  //   const balanceCharityAfter = BN(await web3.eth.getBalance(addr3));    
  //   const balanceContractAfter = BN(await web3.eth.getBalance(instance.address));   
  //   assert(balanceContractAfter.sub(balanceContractBefore).toString() === '1');
  //   assert(balanceCharityAfter.sub(balanceCharityBefore).toString() === '3');
  // });
});
