import { Table, Accordion, Container } from 'react-bootstrap';

function TransactionList({ txrefs }) {
    if (txrefs === null || txrefs === undefined) {
        return;
    }

    return (
        <Container>
            <h3>Transaction List:</h3>
            <Accordion>
                {
                    txrefs.map((txref, index) => (
                        <Accordion.Item eventKey={index}>
                            <Accordion.Header>{txref.tx_hash}</Accordion.Header>
                            <Accordion.Body>
                                <MapItem txref={txref} />
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </Container>
    )
}

function MapItem({txref}) {
    return (
        <Table variant="dark" bordered hover>
            <thead>
                <tr>
                    <th>Properties</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(txref).map(([key, value]) => (
                    <tr>
                        <td>{key}</td>
                        <td>{String(value)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

function AddressInfo({ response }) {
    if (response === null || response === undefined) {
        return;
    }
    return (
        <>
            <h3>Address Info:</h3>
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
            <TransactionList txrefs={response.txrefs}/>
        </>
    )
}

export { MapItem };
export default AddressInfo;