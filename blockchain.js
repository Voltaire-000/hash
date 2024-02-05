const SHA256 = require("sha256");

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
/*     if (this.chain.length === 0) {
        throw new Error("Blockchain is empty");
    } */
    return {
        index: 1,
        timestamp: Date.now(),
        transactions: [],
        nonce: 0,
        hash: "hash",
        previousBlockHash: "previousBlockHash",
    };
}

Blockchain.prototype.getLastBlock = function() {
/*     if (this.chain.length === 0) {
        throw new Error("Blockchain is empty");
    } */
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.generateHash = function(previousBlockHash, timestamp, nonce, transactions){
	let hash = "";
	// let nonce = 0;
	
	while (hash.substring(0, 3)!== "000"){
		nonce++;
		hash = SHA256(
			previousBlockHash +
			timestamp +
			JSON.stringify(transactions) +
			nonce
		).toString();
	}
return(hash, nonce);
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
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
		nonce: this.generateHash.nonce,
		hash: this.generateHash.hash,
		previousBlockHash: this.getLastBlock().hash,
	};
	this.pendingTransactions = [];
	this.chain.push(newBlock);
	
	return newBlock;
}

module.exports = Blockchain;		
