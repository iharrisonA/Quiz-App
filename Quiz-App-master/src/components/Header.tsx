import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export default function Header() {

    return (
        <Navbar bg="light" expand="sm" className="justify-content-center">
            <Navbar.Brand href="">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link href="#home">Home</Nav.Link> */}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
