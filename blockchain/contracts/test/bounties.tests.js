const { assert } = require('chai');
const _deploy_contracts = require('../migrations/2_deploy_contracts');

const Bounties = artifacts.require('Bounties');
require('chai')
.use(require('chai-as-promised'))
.should()
contract('Bounties', (accounts) => {
    describe('Mock Bounty deployement', async () => {
        it('matches name successfully', async () => {
            let bounty = await Bounties.new()
            const name = await bounty.name()
            assert.equal(name, 'bounty')
        })
    })
})