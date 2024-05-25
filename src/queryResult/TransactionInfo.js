import { Container, Table, Accordion } from "react-bootstrap";
import { MapItem } from './AddressInfo';

function InputOutputList({ inputs }) {
    return (
        <Accordion>
            {
                inputs.map((input, index) => (
                    <Accordion.Item eventKey={index}>
                        <Accordion.Header>{index}</Accordion.Header>
                        <Accordion.Body>
                            <MapItem txref={input} />
                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }
        </Accordion>
    )
}

function TransactionInfo({ response }) {
    if (response === null || response === undefined) {
        return;
    }

    return (
        <Container>
            <h3>Transaction Info:</h3>
            <Table variant="dark" bordered striped="columns">
                <thead>
                    <tr>
                        <th>Properties</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(response).map(([key, value]) => {
                        if (key === "inputs" || key === "outputs") {
                            return null;
                        }
                        return (
                            <tr>
                                <td>{key}</td>
                                <td>{String(value)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <h3>Inputs</h3>
            <InputOutputList inputs={response.inputs}/>
            <h3>Outputs</h3>
            <InputOutputList inputs={response.outputs}/>
        </Container>
    )
}

export default TransactionInfo;