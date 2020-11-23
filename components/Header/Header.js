import React from 'react'
import {Navbar, Form, FormControl, Nav} from 'react-bootstrap'
import DarkModeToggle from "./DarkModeToggle";
import {FiMenu} from 'react-icons/fi';
import Link from "next/link";

const Header = () => {

    return (
        <Navbar className="header" expand="lg" sticky="top">
            <div className="container mx-auto">
                <Navbar.Brand className="navbar-brand" href="/getting-started">LNT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <FiMenu className="btn-menu"/>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <hr className="mt-3 mb-2"/>
                    <Nav className="mr-auto">
                        <FormControl type="text" placeholder="Search.." className="feedback"/>
                    </Nav>
                    <Link href="/">
                        <a  className="header-link font-bold font-light">Posts</a>
                    </Link>
                    <Link href="/admin">
                        <a className="header-link font-bold font-light">Admin</a>
                    </Link>
                    <DarkModeToggle />
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;