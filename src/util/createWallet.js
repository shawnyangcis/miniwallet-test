import bitcoin from "bitcoinjs-lib";
import { ECPairFactory } from "ecpair";
import * as ecc from "tiny-secp256k1";
import wif from "wif";


const TESTNET = bitcoin.networks.testnet;
const ECPair = ECPairFactory(ecc);
const keyPair = ECPair.makeRandom({ network: TESTNET });

const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: TESTNET });

let privateKey = keyPair.privateKey.toString("hex");
let publicKey = keyPair.publicKey.toString("hex");
let wifEncoded = wif.encode(0x80, Buffer.from(privateKey, "hex"), false);
console.log(`priKey = ${privateKey}, pubKey = ${publicKey}`);
console.log(`wallet addr = ${address.toString()}`);
console.log(`wif addr = ${wifEncoded}`);