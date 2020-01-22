pragma solidity 0.6.1;

contract Quiz {
    
    uint32 constant rewardfactor = 2;
    bool public ended = false;
     
    address owner;
    
    //These need to be reset after every round
    address payable[] voters;
    mapping(address => uint256) amount;
    mapping(address => bool) inArray;
    
    // Deployer will be the owner
    constructor() public payable {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner");
        _;
    }
    
    //Allows the owner to deposit funds into the contract without voting
    function fund() external payable onlyOwner {}

    function end() external onlyOwner {
        require(!ended, "already ended");
        require(voters.length == 0, "first need to reward/reset");
        ended = true;
        msg.sender.transfer(address(this).balance);
    }

    //Everyone can vote by sending up to one xDai
    //Note - supports multiple contributions per round up to a total of 1 xDai (prevents to send more)
    receive() payable external{
        require(!ended, "quiz ended");
        require(amount[msg.sender] + msg.value <= 1 ether, "max. 1 xDai allowed per round!");
        amount[msg.sender] += msg.value;
        
        //Caution, only add the address to the array of voters once, to prevent multiple payout
        if (inArray[msg.sender] == false){
                voters.push(msg.sender);
                inArray[msg.sender] = true;
        }
    }
    
    //Allows the admin to reset if this was not the correct answer
    function reset() public onlyOwner{
        require(!ended, "quiz ended");
        for (uint i = 0; i < voters.length; i++){
            //reset both mappings
            amount[voters[i]] = 0;
            inArray[voters[i]] = false;
        }
        //delete the array
        delete voters;
    }
    
    //Allows the admin to reward the voters if this was the correct answer
    function reward() public onlyOwner{
        require(!ended, "quiz ended");
        for (uint i = 0; i < voters.length; i++){
            require(voters[i].send(rewardfactor*amount[voters[i]]), "sending failed - insufficent funds? Add funds an try again");
        }
        // Reset everything to be ready for new round
        reset();
    }
}