import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';

const BitcoinWallet = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [address, setAddress] = useState('');
  const [utxo, setUtxo] = useState([]);
  const [transaction, setTransaction] = useState('');
  const [message, setMessage] = useState('');

  // 生成钱包地址
  const generateWallet = () => {
    const newMnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(newMnemonic);
    const root = bip32.fromSeed(seed, bitcoin.networks.testnet);
    const account = root.derivePath("m/44'/1'/0'/0/0");
    const { address } = bitcoin.payments.p2pkh({ pubkey: account.publicKey, network: bitcoin.networks.testnet });
    
    setMnemonic(newMnemonic);
    setAddress(address);
    setMessage('Wallet generated successfully.');
  };

  // 查询UTXO
  const fetchUtxo = async () => {
    if (!address) {
      setMessage('Please generate a wallet first.');
      return;
    }
    try {
      const response = await axios.get(`https://blockstream.info/testnet/api/address/${address}/utxo`);
      setUtxo(response.data);
      setMessage('UTXO fetched successfully.');
    } catch (error) {
      setMessage('Error fetching UTXO.');
    }
  };

  // 创建交易
  const createTransaction = async (recipientAddress, amount) => {
    if (!address) {
      setMessage('Please generate a wallet first.');
      return;
    }
    if (utxo.length === 0) {
      setMessage('No UTXO available to create a transaction.');
      return;
    }

    try {
      const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet });
      let totalInput = 0;

      utxo.forEach((utxo) => {
        psbt.addInput({
          hash: utxo.txid,
          index: utxo.vout,
          nonWitnessUtxo: Buffer.from(utxo.txid, 'hex'),
        });
        totalInput += utxo.value;
      });

      psbt.addOutput({
        address: recipientAddress,
        value: amount,
      });

      // Calculate change
      const fee = 1000; // Set an arbitrary fee for simplicity
      const change = totalInput - amount - fee;

      if (change > 0) {
        psbt.addOutput({
          address: address,
          value: change,
        });
      }

      // Sign transaction
      const seed = bip39.mnemonicToSeedSync(mnemonic);
      const root = bip32.fromSeed(seed, bitcoin.networks.testnet);
      const account = root.derivePath("m/44'/1'/0'/0/0");

      utxo.forEach((_, idx) => {
        psbt.signInput(idx, account);
      });

      psbt.finalizeAllInputs();

      const txHex = psbt.extractTransaction().toHex();
      setTransaction(txHex);
      setMessage('Transaction created successfully.');
    } catch (error) {
      setMessage('Error creating transaction.');
    }
  };

  // 查询交易
  const fetchTransaction = async (txid) => {
    try {
      const response = await axios.get(`https://blockstream.info/testnet/api/tx/${txid}`);
      setTransaction(response.data);
      setMessage('Transaction fetched successfully.');
    } catch (error) {
      setMessage('Error fetching transaction.');
    }
  };

  return (
    <Container>
      <h1>Bitcoin Wallet</h1>
      <Button onClick={generateWallet}>Generate Wallet</Button>
      {message && <Alert variant="info">{message}</Alert>}
      {mnemonic && <Alert variant="success">Mnemonic: {mnemonic}</Alert>}
      {address && <Alert variant="success">Address: {address}</Alert>}
      
      <Button onClick={fetchUtxo} disabled={!address}>Fetch UTXO</Button>
      {utxo.length > 0 && (
        <div>
          <h3>UTXO:</h3>
          <ul>
            {utxo.map((utxo, index) => (
              <li key={index}>
                {utxo.txid}:{utxo.vout} - {utxo.value} satoshis
              </li>
            ))}
          </ul>
        </div>
      )}

      <Form>
        <Form.Group controlId="recipientAddress">
          <Form.Label>Recipient Address</Form.Label>
          <Form.Control type="text" placeholder="Enter recipient address" />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Amount (in satoshis)</Form.Label>
          <Form.Control type="number" placeholder="Enter amount" />
        </Form.Group>
        <Button onClick={() => createTransaction(
          document.getElementById('recipientAddress').value,
          parseInt(document.getElementById('amount').value)
        )}>
          Create Transaction
        </Button>
      </Form>

      {transaction && (
        <div>
          <h3>Transaction:</h3>
          <p>{transaction}</p>
        </div>
      )}

      <Form>
        <Form.Group controlId="txid">
          <Form.Label>Transaction ID</Form.Label>
          <Form.Control type="text" placeholder="Enter transaction ID" />
        </Form.Group>
        <Button onClick={() => fetchTransaction(document.getElementById('txid').value)}>
          Fetch Transaction
        </Button>
      </Form>
    </Container>
  );
};

export default BitcoinWallet;
