import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { createTx, postTx } from './util/postTx';
import * as bitcoin from "bitcoinjs-lib";
import ecc from '@bitcoinerlab/secp256k1';
import { ECPairFactory } from "ecpair";

function Transaction() {
    const ECPair = ECPairFactory(ecc);
    const [formData, setFormData] = useState({
        pubKey: "",
        privateKey: "",
        inputAddr: "",
        outputAddr: "",
        value: "",
    });
    const [txId, setTxId] = useState('');

    function handleSubmit(element) {
        element.preventDefault();
        const keyBuffer = Buffer.from(formData.privateKey, 'hex')
        var keys = ECPair.fromPrivateKey(keyBuffer)
        console.log('Form Data:', formData);
        const responseCreate = createTx(Array.from([formData.inputAddr]), Array.from([formData.outputAddr]), formData.value);
        responseCreate.then(resp => {
            console.log(JSON.stringify(resp.data));
            const tmptx = resp.data;
            tmptx.pubkeys = [];
            tmptx.signatures = tmptx.tosign.map(function (tosign, n) {
                tmptx.pubkeys.push(keys.publicKey.toString('hex'));
                return bitcoin.script.signature.encode(
                    keys.sign(Buffer.from(tosign, "hex")),
                    0x01,
                ).toString("hex").slice(0, -2);
            });
            console.log(`tmptx: ${JSON.stringify(tmptx)}`);
            postTx(tmptx).then(resp => {
                console.log(`Transaction: ${resp.data}`);
                setTxId(resp.data.tx.hash);
            }).catch(err => {
                console.error(`Transaction err: ${err}`);
                setTxId(err);
            });
        }).catch(err => {
            console.error(err);
        });
    }

    function handleChange(element) {
        const { name, value } = element.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="pubKey">
                <Form.Label>Publick Key</Form.Label>
                <Form.Control required placeholder="Enter your publick key"
                    name='pubKey'
                    value={formData.pubKey}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="privateKey">
                <Form.Label>Private Key</Form.Label>
                <Form.Control type='password' required placeholder="Enter your private key"
                    name='privateKey'
                    value={formData.privateKey}
                    onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="inputAddr">
                <Form.Label>Input Address</Form.Label>
                <Form.Control placeholder="Enter sender address"
                    name='inputAddr'
                    value={formData.inputAddr}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Text className="text-muted">
                If input address is empty, the selected in the navbar will be used as input address.
            </Form.Text>

            <Form.Group className="mb-3" controlId="outputAddr">
                <Form.Label>Output Address</Form.Label>
                <Form.Control required placeholder="Enter receiver address"
                    name='outputAddr'
                    value={formData.outputAddr}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="value">
                <Form.Label>Send Value(Satoshi)</Form.Label>
                <Form.Control required placeholder="Enter value"
                    name='value'
                    value={formData.value}
                    onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            <Container>
                Result:
                {txId}
            </Container>
        </Form>
    )
}

export default Transaction;