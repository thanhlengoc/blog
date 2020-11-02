import React from 'react'
import { Navbar,Nav,Form,FormControl,Button, Col, Row } from 'react-bootstrap'
import Image from "./Image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const headerStyle = {
    paddingTop: '15px',
    paddingBottom: '15px',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    background: '#fff',
    borderBottom: '1px solid #eaeaea'
}

const temp = {
    marginLeft: '235px',
    marginRight:'280px'
}

const Header = () => {

    return (
        <Navbar expand="lg" sticky="top" style={headerStyle}>
            <div className='font-light' style={{display:'flex'}}>
                <Image
                    className="flex-shrink-0 mb-0 mr-3 rounded-full w-10 h-10"
                    src={require("../content/assets/thanhle.jpeg")}
                    webpSrc={require("../content/assets/thanhle.jpeg?webp")}
                    previewSrc={require("../content/assets/thanhle.jpeg?lqip")}
                    alt="Profile"
                />
                <Navbar.Brand href="/">Thanh Le</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav style={temp}>
                        <Nav.Link href="/">Blog</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Feedback" className="mr-sm-2" style={{maxWidth:'130px'}}/>
                    <Button color="info" style={{marginLeft:'10px'}}>Learn</Button>
                    </Form>
                </Navbar.Collapse>
                <FontAwesomeIcon className='flex-shrink-0 ml-3 mt-2 rounded-full' 
                                 style={{width:'1.5rem', height:'1.5rem', color: '#6C757D'}} 
                                 icon={["fab", "github"]} />
            </div>
        </Navbar>
    )
}

export default Header;