import React from 'react'
import {Navbar, Form, FormControl, Nav} from 'react-bootstrap'
import DarkModeToggle from "./DarkModeToggle";
import {FiMenu} from 'react-icons/fi';
import ActLink from "../ActLink";

const Header = () => {

    return (
        <Navbar className="header" expand="lg" sticky="top">
            <div className="container-sm mx-auto">
                <Navbar.Brand className="navbar-brand" href="/">LNT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <FiMenu className="btn-menu"/>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <hr className="mt-3 mb-2"/>
                    <Nav className="mr-auto">
                        <FormControl type="text" placeholder="Search.." className="feedback"/>
                    </Nav>
                    <ActLink href="/">
                        <a  className="header-link">Newest</a>
                    </ActLink>
                    <ActLink href="/admin">
                        <a className="header-link">Admin</a>
                    </ActLink>
                    <ActLink href="/about">
                        <a className="header-link">About</a>
                    </ActLink>
                    <DarkModeToggle />
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;