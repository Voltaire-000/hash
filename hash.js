const SHA256 = require("sha256");

let hash = "";
let nonce = 0;

// This loop calculates the hash using SHA256 until the first 3 characters of the hash are "000"
while (hash.substring(0, 3) !== "000") {
  nonce++;
  // Calculate the hash using SHA256 with the input "man" concatenated with the current nonce value
  hash = SHA256("man" + nonce).toString();
}

console.log(nonce);
console.log(hash);
