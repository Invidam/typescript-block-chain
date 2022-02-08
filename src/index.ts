import * as CryptoJS from "crypto-js";
class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;
  static calculatedBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
  static validateStructure = (aBlock: Block): boolean => {
    return (
      typeof aBlock.index === "number" &&
      typeof aBlock.hash === "string" &&
      typeof aBlock.previousHash === "string" &&
      typeof aBlock.data === "string" &&
      typeof aBlock.timestamp === "number"
    );
  };
  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const createBlockChain = (): Blockchain => new Blockchain();
class Blockchain {
  private _list: Block[];
  constructor(blockchain: Block[] = []) {
    this._list = blockchain;
  }
  get list(): Block[] {
    return this._list;
  }
  get latestBlock(): Block {
    return this._list[this.latestIndex];
  }
  get latestIndex(): number {
    return this._list.length - 1;
  }
  static getNewTimeStamp = (): number =>
    Math.round(new Date().getTime() / 1000);
  push(aBlock: Block): void {
    this._list.push(aBlock);
  }
  createNewBlock = (data: string): Block => {
    const previousBlock: Block = this.latestBlock;
    const newIndex: number = this.latestIndex + 1;
    const nextTimeStamp: number = Blockchain.getNewTimeStamp();
    const nextHash: string = Block.calculatedBlockHash(
      newIndex,
      previousBlock?.hash,
      nextTimeStamp,
      data
    );
    const newBlock: Block = new Block(
      newIndex,
      nextHash,
      previousBlock?.hash,
      data,
      nextTimeStamp
    );
    // this.push(newBlock);
    return newBlock;
  };
  static getHashForBlock = (aBlock: Block): string =>
    Block.calculatedBlockHash(
      aBlock.index,
      aBlock.previousHash,
      aBlock.timestamp,
      aBlock.data
    );
  static isBlockValid = (
    candidateBlock: Block,
    previousBlock: Block
  ): boolean => {
    if (!Block.validateStructure(candidateBlock)) return false;
    else if (previousBlock.index + 1 !== candidateBlock.index) return false;
    else if (previousBlock.hash !== candidateBlock.previousHash) return false;
    else if (Blockchain.getHashForBlock(candidateBlock) !== candidateBlock.hash)
      return false;
    else return true;
  };
  addBlock = (candidateBlock: Block): boolean => {
    if (Blockchain.isBlockValid(candidateBlock, this.latestBlock)) {
      this.push(candidateBlock);
      return true;
    } else return false;
  };
  addBlockByData = (data: string): boolean =>
    this.addBlock(this.createNewBlock(data));
}

const genesisBlock: Block = new Block(0, "2034981029", "", "Hello", 123456);

let blockchain: Blockchain = createBlockChain();

blockchain.push(genesisBlock);
console.log(blockchain.addBlockByData("Invidam coin~!"));
console.log(blockchain.addBlockByData("bye bye"));
console.log(blockchain);

export {};
