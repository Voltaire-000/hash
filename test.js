import Blockchain from "./blockchain.js";

let bitcoin = new Blockchain();

bitcoin.createNewTransaction("100", "Mike", "bill");
bitcoin.createNewBlock();

console.log(bitcoin);
