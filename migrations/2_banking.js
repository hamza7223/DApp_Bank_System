const bankingSystem = artifacts.require("bankingSystem");

module.exports = function (deployer) {
    deployer.deploy(bankingSystem);
};
