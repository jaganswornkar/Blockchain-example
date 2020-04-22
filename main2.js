const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.data = data;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty){
      while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
          this.nonce++;  
          this.hash = this.calculateHash();
        }
        
      console.log("Block mined: "+ this.hash)
  }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
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
        newBlock.mineBlock(this.difficulty) // for every new block, we need to calculate hash to create new hash
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

console.log('Mining block 1...')
savjeeCoin.addBlock(new Block(1, "10/07/2017", {amount:4}));

console.log('Mining block 1...')
savjeeCoin.addBlock(new Block(2, "10/07/2017", {amount:10}));

// console.log(JSON.stringify(savjeeCoin, null, 4)) //console the blockchain data