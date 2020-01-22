pragma solidity ^0.5.1;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract AnswerToken is Ownable {
  
  mapping(address => bool) voted;
  address payable[] voters;

  function() payable external {
    require(msg.value <= 1 ether, "cannot send more than 1 xDAI");
    require(!voted[msg.sender], "already voted");
    voted[msg.sender] = true;
    voters.push(msg.sender);
  }

  function reward() onlyOwner {
    for (uint i = 0; i < voters.length; i++) {
      address voter = voters[i];
      require(voted[voter], "did not vote");
      voted[voters[i]] = false;
      voters[i].send(1 ether);
    }
    delete voters;
  }
}
