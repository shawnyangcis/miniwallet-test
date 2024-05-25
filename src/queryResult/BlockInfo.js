import { Container, Table, Accordion } from "react-bootstrap";

function Txids({ txids }) {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Tx Count: {txids.length}</Accordion.Header>
                <Accordion.Body>
                    <tbody>
                        {Object.entries(txids).map(([key, value]) => {
                            return (
                                <tr>
                                    <td>{String(value)}</td>
                                </tr>
                            );
                        })}
                </tbody>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

function BookInfo({response}) {
    if (response === null || response === undefined) {
        return;
    }
    return (
        <Container>
            <h3>Block Info:</h3>
            <Table variant="dark" bordered striped="columns">
                <thead>
                    <tr>
                        <th>Properties</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(response).map(([key, value]) => {
                        if (key === "txids") {
                            return (
                                <tr>
                                    <td>{key}</td>
                                    <td><Txids txids={value}/></td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr>
                                    <td>{key}</td>
                                    <td>{String(value)}</td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </Table>
        </Container>
    );
}

export default BookInfo;