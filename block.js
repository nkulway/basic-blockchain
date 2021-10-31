const SHA256 = require("crypto.js/sha256");
class BlockCrypto {
  constructor(index, current_time, info, nextHash = " ") {
    this.index = index;
    this.current_time = current_time;
    this.info = info;
    this.nextHash = nextHash;
    this.hash = this.computeHash();
  }
  computeHash() {
    return SHA256(
      this.info + this.nextHash + this.current_time + JSON.stringify(this.info)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.blockchain = [this.startGenesisBlock()];
  }
  // first block on the chain created with an index of 0
  initGenesisBlock() {
    return new BlockCrypto(0, "10/31/2021", "Initial Block in the Chain", "0");
  }
  // find last block added to map has of current block to
  // the one prior as to maintain integrity
  latestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  // new block is added with previous hash matched to current
  addNewBlock(newBlock) {
    newBlock.nextHash = this.latestBlock().hash;
    newBlock.hash = newBlock.computeHash();
    this.blockchain.push(newBlock);
  }

  checkValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const nextBlock = this.blockchain[i - 1];
      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.nextHash !== nextBlock.hash) {
        return false;
      }
      return true;
    }
  }
}
