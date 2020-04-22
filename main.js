const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.data = data;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
    }

    // creating a new blockchain
    createGenesisBlock(){
        return new Block(0, "01/01/2017", "Genesis block", "0")
    }

    // getting the latest block from the blockchain
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    // adding new block to the blockchain
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash; // previous has will be the hash of latest one
        newBlock.hash = newBlock.calculateHash() // for every new block, we need to calculate hash to create new hash
        this.chain.push(newBlock);
    }

    // checking for valid blockchain
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        
        return true;
    }
}

// creating instance of blockchain
let savjeeCoin = new Blockchain(); 

// adding blocks to blockchain
savjeeCoin.addBlock(new Block(1, "10/07/2017", {amount:4}));
savjeeCoin.addBlock(new Block(2, "10/07/2017", {amount:10}));

// checking blockchain is valid or not?
console.log("is block chain valid? : ",savjeeCoin.isChainValid()) // true

// console.log(JSON.stringify(savjeeCoin, null, 4)) //console the blockchain data

// trying to make change in block // deleting and changig a block is not possinble
savjeeCoin.chain[1].data = {amount:100};
savjeeCoin.chain[1].previousHash = savjeeCoin.chain[0].hash;
savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash();
console.log("is block chain valid? : ",savjeeCoin.isChainValid()) //false
