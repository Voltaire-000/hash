const SHA256 = require("sha256");

class Blockchain{
	constructor () {
		this.chain = [this.creatGenesisBlock()];
		this.pendingTransactions = []
	}
}

Blockchain.prototype.creatGenesisBlock = function(){
	return {
		index: 1,
		timestamp: Date.now(),
		transactions: [],
		nonce: 0,
		hash: "hash",
		previousBlockHash: "previousBlockHash",
	};
}

Blockchain.prototype.getLastBlock = function(){
	return this.chain[this.chain.length - 1];
}

function generateHash(previousBlockHash, timestamp, nonce, transactions){
	let hash = "";
	let nonce = 0;
	
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

/* generateHash(previousBlockHash, timestamp, pendingTransactions) {
	let hash = "";
	let nonce = 0;
	
	while (hash.substring(0, 3) !== "000"){
		nonce++;
		hash = SHA256(
			previousBlockHash +
			timestamp + 
			JSON.stringify(pendingTransactions) +
			nonce
			).toString();
	}
	return (hash, nonce);
} */

function createNewTransaction(amount, sender, recipient){
	const newTransaction = {
		amount,
		sender,
		recipient,
	};
	this.pendingTransactions.push(newTransaction);
}

function createNewBlock(){
	const timestamp = Date.now();
	const transactions = this.pendingTransactions;
	const previousBlockHash = this.getLastBlock().hash;
	const generateHash = this.generateHash(
		previousBlockHash,
		timestamp,
		transactions
		);

	const newBlock = {
		index: this.chain.length + 1,
		timestamp,
		transactions,
		nonce: generateHash.nonce,
		hash: generateHash.hash,
		previousBlockHash,
	};

	this.pendingTransactions = [];
	this.chain.push(newBlock);
	
	return newBlock;
}

module.exports = Blockchain;			