import React from 'react'
import {Navbar, Form, FormControl} from 'react-bootstrap'
import Image from "./Image";
import DarkModeToggle from "./DarkModeToggle";

const inner = {
    width: '100%',
    maxWidth: '980px',
    margin: '0 auto',
    padding: '0.8rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}

const Header = () => {

    return (
        <Navbar className="header" expand="lg" sticky="top">
            <div style={inner}>
                <div className="d-inline-flex">
                    <Image
                        className="flex-shrink-0 mb-0 mr-3 rounded-full w-10 h-10"
                        src={require("../content/assets/thanhle.jpeg")}
                        webpSrc={require("../content/assets/thanhle.jpeg?webp")}
                        previewSrc={require("../content/assets/thanhle.jpeg?lqip")}
                        alt="Profile"
                    />
                    <Navbar.Brand className="navbar-brand font-bold" href="/get-started">LENGTH</Navbar.Brand>
                </div>
                <div className="d-inline-flex">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <a href="/" className="navbar-brand">Posts</a>
                        <a href="/admin" className="navbar-brand">
                            Admin
                        </a>
                        <Form inline>
                            <FormControl type="text" placeholder="Feedback"
                                         className="feedback"
                                         style={{maxWidth: '120px',height:'30px',fontSize: '14px'}}/>
                        </Form>
                        <DarkModeToggle />
                    </Navbar.Collapse>
                </div>
            </div>
        </Navbar>
    )
}

export default Header;