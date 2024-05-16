import * as bitcoin from "bitcoinjs-lib";
import { Buffer } from 'buffer';
import { ECPairFactory } from "ecpair";
import { useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
// import * as ecc from "tiny-secp256k1";
import ecc from '@bitcoinerlab/secp256k1';
import wif from "wif";


class SimpleAddr {
  constructor(privateKey, publicKey, wifEncoded, address) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this.wifEncoded = wifEncoded;
    this.address = address;
  }

  getAddressStr() {
    return this.address.toString();
  }
}

function createAddress() {
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
  let simpleAddr = new SimpleAddr(privateKey, publicKey, wifEncoded, address);
  return simpleAddr;
}

export default function CreateWallet() {
  const [addressObj, setAddressObj] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    const newAddr = createAddress();
    setAddressObj(newAddr)
    setShow(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>Create a new address</Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please copy all the infos and store them yourself.
        </Modal.Body>
        <Modal.Footer>
          {addressObj &&
            <Table variant="dark" bordered striped="columns">
              <tbody>
                <tr>
                  <td>Private Key</td>
                  <td>{addressObj.privateKey}</td>
                </tr>
                <tr>
                  <td>Public Key</td>
                  <td>{addressObj.publicKey}</td>
                </tr>
                <tr>
                  <td>Wallet address</td>
                  <td>{addressObj.getAddressStr()}</td>
                </tr>
                <tr>
                  <td>WIF</td>
                  <td>{addressObj.wifEncoded}</td>
                </tr>
              </tbody>
            </Table>
          }
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};