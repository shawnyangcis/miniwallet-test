import QueryInfo from './QueryInfo';
import Transaction from './Transaction'
import Wallet from './Wallet'
import { Container, Nav, Navbar } from 'react-bootstrap';
import "./App.css";
import {BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar bg='dark' data-bs-theme="dark" className="bg-body-tertiary">
          <Container>
            {/* <Navbar.Brand as={Link} to="/">MiniWallet</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/queryInfo">Query</Nav.Link>
                <Nav.Link as={Link} to="/transaction">Transaction</Nav.Link>
                <Nav.Link as={Link} to="/wallet">Wallet</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          <Container>
            <Routes>
              {/* <Route path='/' element={<App/>} /> */}
              <Route path='/queryInfo' element={<QueryInfo/>} />
              <Route path='/transaction' element={<Transaction/>} />
              <Route path='/wallet' element={<Wallet/>} />
            </Routes>
          </Container>
      </Router>
    </>
  );
}

export default App;
