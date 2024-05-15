import AddrBalance from './AddrBalance';
import { Container, Button, ButtonToolbar } from 'react-bootstrap';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import "./App.css";

const AddrDetail = () => <span>Address Detail</span>;

const Transaction = () => <span>Transaction</span>;

function App() {
  return (
    <Container className='p-3'>
      <MemoryRouter>
        <Container className="p-3">
          <Container className="p-5 mb-4 bg-light rounded-3">
            <h1 className="header">Welcome To React-Bootstrap</h1>
            <h2>
              Current Page is{' '}
              <Routes>
                <Route path="/transaction">
                  <Transaction />
                </Route>
                <Route path="/addrDetail">
                  <AddrDetail />
                </Route>
              </Routes>
            </h2>
            <h2>
              Navigate to{' '}
              <ButtonToolbar className="custom-btn-toolbar">
                <LinkContainer to="/transaction">
                  <Button>Transaction</Button>
                </LinkContainer>
                <LinkContainer to="/addrDetail">
                  <Button>Address Detail</Button>
                </LinkContainer>
              </ButtonToolbar>
            </h2>
          </Container>
        </Container>
      </MemoryRouter>
      <AddrBalance />
    </Container>
  );
}

export default App;
