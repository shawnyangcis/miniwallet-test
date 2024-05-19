import queryAddrBalance from './util/queryAddrBalance';
import queryTx from './util/queryTx';
import queryBlock from './util/queryBlock';
import { useState } from 'react';
import { Container, Button, Table, InputGroup, Form, Dropdown, ButtonGroup } from 'react-bootstrap';


function QueryInfo({ addr, setAddr }) {
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState(null);

    const [querySelect, setQuerySelect] = useState('');

    function queryAddr(inputValue) {
        queryAddrBalance(inputValue).then(
            resp => {
                const result = resp.data;
                console.log(`query balance resp: ${JSON.stringify(result)}`);
                setResponse(result);
            }
        ).catch(err => {
            console.error(`query balance error: ${err}`);
        });
    }

    function queryTxInfo(inputValue) {
        queryTx(inputValue).then(
            resp => {
                const result = resp.data;
                console.log(`query tx resp: ${JSON.stringify(result)}`);
                setResponse(result);
            }
        ).catch(err => {
            console.error(`query tx error: ${err}`);
        });
    }

    function queryBlockInfo(inputValue) {
        queryBlock(inputValue).then(
            resp => {
                const result = resp.data;
                console.log(`query tx resp: ${JSON.stringify(result)}`);
                setResponse(result);
            }
        ).catch(err => {
            console.error(`query tx error: ${err}`);
        });
    }

    const handleSubmit = async () => {
        switch (querySelect) {
            case 'Address':
                queryAddr(inputValue);
                break;
            case 'Transaction':
                queryTxInfo(inputValue);
                break;
            case 'Block':
                queryBlockInfo(inputValue);
                break;
            default:
                alert(`Please select one of the query types.`);
                break;
        }
        
    };

    function handleSelectQuery(eventKey, event) {
        console.log(`handleSelectQuery eventKey=${eventKey}, event=${(event)}`);
        setQuerySelect(eventKey);
    }

    return (
        <Container>
            <InputGroup>
                <Dropdown as={ButtonGroup} onSelect={(eventKey, event) => handleSelectQuery(eventKey, event)}>
                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic">
                        {querySelect ? querySelect : "Select query type"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey={'Address'}>Address</Dropdown.Item>
                        <Dropdown.Item eventKey={'Transaction'}>Transaction</Dropdown.Item>
                        <Dropdown.Item eventKey={'Block'}>Block</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    placeholder="Inpue address please"
                    aria-label="addr"
                    aria-describedby="addr"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button onClick={handleSubmit}>Query</Button>
            </InputGroup>
            <Container>
                <h3>Result:</h3>
                {
                    response && (
                        <Table variant="dark" bordered striped="columns">
                            <thead>
                                <tr>
                                    <th>Properties</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>address</td>
                                    <td>{response.address}</td>
                                </tr>
                                <tr>
                                    <td>total_received</td>
                                    <td>{response.total_received}</td>
                                </tr>
                                <tr>
                                    <td>total_sent</td>
                                    <td>{response.total_sent}</td>
                                </tr>
                                <tr>
                                    <td>balance</td>
                                    <td>{response.balance}</td>
                                </tr>
                                <tr>
                                    <td>unconfirmed_balance</td>
                                    <td>{response.unconfirmed_balance}</td>
                                </tr>
                                <tr>
                                    <td>final_balance</td>
                                    <td>{response.final_balance}</td>
                                </tr>
                                <tr>
                                    <td>n_tx</td>
                                    <td>{response.n_tx}</td>
                                </tr>
                                <tr>
                                    <td>unconfirmed_n_tx</td>
                                    <td>{response.unconfirmed_n_tx}</td>
                                </tr>
                                <tr>
                                    <td>final_n_tx</td>
                                    <td>{response.final_n_tx}</td>
                                </tr>
                            </tbody>
                        </Table>
                    )
                }
            </Container>
        </Container>
    );
}

export default QueryInfo;