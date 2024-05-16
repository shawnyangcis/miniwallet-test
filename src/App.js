import { useState } from 'react';
import { Container, Nav, Navbar, Stack, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import QueryInfo from './QueryInfo';
import Transaction from './Transaction';
import Wallet from './Wallet';
import Home from './Home';

function App() {
  const [addr, setAddr] = useState([].fill(null));
  const [currentAddr, setCurrentAddr] = useState('');

  function handleSelectAddr(selectedAddr) {
    setCurrentAddr(selectedAddr);
  }

  function AddrList() {
    return (
      <Dropdown.Menu>
        {addr.map((a, i) => (<Dropdown.Item key={i}>{a}</Dropdown.Item>))}
      </Dropdown.Menu>
    );
  }

  return (
    <>
      <Router>
        <Navbar bg='dark' data-bs-theme="dark" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand as={Link} to="/">MiniWallet</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/queryInfo">Query</Nav.Link>
                <Nav.Link as={Link} to="/transaction">Transaction</Nav.Link>
                <Nav.Link as={Link} to="/wallet">Wallet</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
          <Container>
              <Dropdown as={ButtonGroup}>
                <Button variant="success">{addr}</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <AddrList/>
                </Dropdown.Menu>
              </Dropdown>
              <Button as={Link} to="/wallet">Wallet Manage</Button>
            </Container>
        </Navbar>

        <p></p>
        <Container>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/queryInfo' element={<QueryInfo addr={addr} setAddr={setAddr} />} />
            <Route path='/transaction' element={<Transaction />} />
            <Route path='/wallet' element={<Wallet  addr={addr} setAddr={setAddr} />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
