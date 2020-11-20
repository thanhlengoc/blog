import React from 'react'
import {Navbar, Form, FormControl, Nav, Button} from 'react-bootstrap'
import Image from "./Image";
import DarkModeToggle from "./DarkModeToggle";
import {FiMenu} from 'react-icons/fi';

const Header = () => {

    return (
        <Navbar className="header" expand="lg" sticky="top">
            <div className="container mx-auto ">
                <div className="d-inline-flex">
                    <Image
                        className="flex-shrink-0 ml-1 mb-0 mr-2 rounded-full w-10 h-10"
                        src={require("../content/assets/thanhle.jpeg")}
                        webpSrc={require("../content/assets/thanhle.jpeg?webp")}
                        previewSrc={require("../content/assets/thanhle.jpeg?lqip")}
                        alt="Profile"
                    />
                    <Navbar.Brand className="navbar-brand font-bold" href="/get-started">LENGTH</Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <FiMenu className="btn-menu"/>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <hr className="mt-3 mb-2"/>
                    <Nav className="mr-auto">
                        {/*<FormControl type="text" placeholder="Feedback" className="feedback"/>*/}
                        {/*<a href="/" className="header-link font-bold font-light">Posts</a>*/}
                        {/*<a href="/admin" className="header-link font-bold font-light">Admin</a>*/}
                    </Nav>
                    <FormControl type="text" placeholder="Search.." className="feedback"/>
                    <a href="/" className="header-link font-bold font-light">Posts</a>
                    <a href="/admin" className="header-link font-bold font-light">Admin</a>
                    <DarkModeToggle />
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;