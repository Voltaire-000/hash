const SHA256 = require('sha256');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
    }

    createGenesisBlock() {
        return new Block(0, "0", "Genesis Block");
    }
}
Blockchain.prototype.createGenesisBlock = function() {
    return {
        index: 1,
        timestamp: Date.now(),
        transactions: [],
        nonce: 0,
        hash: "genesisHash",
        previousBlockHash: "genesisPreviousBlockHash",
    };
}

Blockchain.prototype.getLastBlock = function() {
    if (this.chain.length > 0) {
        return this.chain[this.chain.length - 1];
    } else {
        throw new Error("Blockchain is empty, there are no blocks to retrieve.");
    }
}

Blockchain.prototype.generateHash = function(data) {
  return SHA256(data).toString();
};

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
  if (!this.pendingTransactions) {
    this.pendingTransactions = [];
  }
  const newTransaction = {
    amount,
    sender,
    recipient,
  };
  this.pendingTransactions.push(newTransaction);
}

Blockchain.prototype.createNewBlock = function(){
	const newBlock = {
		index: this.chain.length + 1,
		timestamp: Date.now(),
		transactions: this.pendingTransactions,
		nonce: String(Math.random()),
		hash: String(Math.random()),
		previousBlockHash: this.getLastBlock().hash,
	};
	newBlock.hash = this.generateHash(JSON.stringify(newBlock));
	this.pendingTransactions = [];
	this.chain.push(newBlock);
	
	return newBlock;
}

module.exports = Blockchain;	
