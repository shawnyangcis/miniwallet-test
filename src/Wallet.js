import React from 'react';
import { useState } from 'react';
import { Button, Container, InputGroup, Form } from 'react-bootstrap';
import CreateWallet from './CreateWallet';

function Wallet({addr, setAddr}) {
    const [inputValue, setInputValue] = useState('');

    function handleLogin() {
        if (addr.indexOf(inputValue) === -1) {
            setAddr([...addr, inputValue]);
        }
    }

    return (
        <Container>
            <CreateWallet/>
            <p></p>
            or
            <p></p>
            <InputGroup>
                <InputGroup.Text id='addr'>Import from an existing address</InputGroup.Text>
                <Form.Control
                    placeholder="Inpue address please"
                    aria-label="addr"
                    aria-describedby="addr"
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button onClick={handleLogin}>Import</Button>
            </InputGroup>
        </Container>
    )
}

export default Wallet;