"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculatedBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => {
    return (typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.data === "string" &&
        typeof aBlock.timestamp === "number");
};
const createBlockChain = () => new Blockchain();
class Blockchain {
    constructor(blockchain = []) {
        this.createNewBlock = (data) => {
            const previousBlock = this.latestBlock;
            const newIndex = this.latestIndex + 1;
            const nextTimeStamp = Blockchain.getNewTimeStamp();
            const nextHash = Block.calculatedBlockHash(newIndex, previousBlock === null || previousBlock === void 0 ? void 0 : previousBlock.hash, nextTimeStamp, data);
            const newBlock = new Block(newIndex, nextHash, previousBlock === null || previousBlock === void 0 ? void 0 : previousBlock.hash, data, nextTimeStamp);
            // this.push(newBlock);
            return newBlock;
        };
        this.addBlock = (candidateBlock) => {
            if (Blockchain.isBlockValid(candidateBlock, this.latestBlock)) {
                this.push(candidateBlock);
                return true;
            }
            else
                return false;
        };
        this.addBlockByData = (data) => this.addBlock(this.createNewBlock(data));
        this._list = blockchain;
    }
    get list() {
        return this._list;
    }
    get latestBlock() {
        return this._list[this.latestIndex];
    }
    get latestIndex() {
        return this._list.length - 1;
    }
    push(aBlock) {
        this._list.push(aBlock);
    }
}
Blockchain.getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
Blockchain.getHashForBlock = (aBlock) => Block.calculatedBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
Blockchain.isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock))
        return false;
    else if (previousBlock.index + 1 !== candidateBlock.index)
        return false;
    else if (previousBlock.hash !== candidateBlock.previousHash)
        return false;
    else if (Blockchain.getHashForBlock(candidateBlock) !== candidateBlock.hash)
        return false;
    else
        return true;
};
const genesisBlock = new Block(0, "2034981029", "", "Hello", 123456);
let blockchain = createBlockChain();
blockchain.push(genesisBlock);
console.log(blockchain.addBlockByData("Invidam coin~!"));
console.log(blockchain.addBlockByData("bye bye"));
console.log(blockchain);
//# sourceMappingURL=index.js.map