const assert = require('assert');
const Blockchain = require('../blockchain'); // Import the Blockchain class

describe('Blockchain', function() {
  let blockchain;

  beforeEach(function() {
    blockchain = new Blockchain();
  });
  describe('createGenesisBlock', function() {
    it('should create a genesis block', function() {
      blockchain.createGenesisBlock();
      assert.equal(blockchain.chain.length, 1); // Ensure the genesis block is the only block in the chain
      // Add additional assertions to verify the properties of the genesis block
    });
  });

  describe('createNewTransaction', function() {
    it('should create a new transaction', function() {
      const amount = 100;
      const sender = 'sender1';
      const recipient = 'recipient1';
      blockchain.createNewTransaction(amount, sender, recipient);
      assert.equal(blockchain.pendingTransactions.length, 1);
    });
  });

  describe('createNewBlock', function() {
    it('should create a new block', function() {
      const initialLength = blockchain.chain.length;
      const previousBlockHash = blockchain.getLastBlock().hash;
      blockchain.createNewBlock();
      assert.equal(blockchain.chain.length, initialLength + 1);
      assert.equal(blockchain.chain[initialLength].previousBlockHash, previousBlockHash);
    });
  });

  describe('getLastBlock', function() {
    it('should return the last block', function() {
      const lastBlock = blockchain.getLastBlock();
      assert.equal(lastBlock, blockchain.chain[blockchain.chain.length - 1]);
    });
  });

  // Add tests for other functions such as createGenesisBlock, generateHash, etc.
});