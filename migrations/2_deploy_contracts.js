const Quiz = artifacts.require("Quiz");

module.exports = function(deployer) {
  deployer.deploy(Quiz);
  deployer.deploy(Quiz);
};
