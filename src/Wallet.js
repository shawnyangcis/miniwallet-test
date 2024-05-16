import React from 'react';
import { useState } from 'react';
import { Button, Container, InputGroup, Form } from 'react-bootstrap';

function Wallet({addr, setAddr}) {
    const [inputValue, setInputValue] = useState('');

    function handleLogin() {
        setAddr([...addr, inputValue]);
    }

    return (
        <Container>
            <Button>Create a new address</Button>
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