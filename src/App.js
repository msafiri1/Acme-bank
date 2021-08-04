import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccountPage from "./pages/AccountPage";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function App() {
    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Acme Bank</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>
            <AccountPage/>
        </React.Fragment>
    );
}

export default App;
