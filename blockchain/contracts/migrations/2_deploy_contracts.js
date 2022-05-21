const Bounties = artifacts.require('Bounties');

module.exports = async function (deployer) {
    await deployer.deploy(Bounties)
};