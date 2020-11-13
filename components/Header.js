import React from 'react'
import {Navbar, Form, FormControl, Button, InputGroup} from 'react-bootstrap'
import Image from "./Image";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faPlus} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router'

const headerStyle = {
    width: '100%',
    background: '#fff',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #eaeaea',
}

const inner = {
    width: '100%',
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '0.2rem 1.7rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}

const childStyle = {
    display: 'inline-flex',
    color: '#fff',
}

const item = {
    color: '#6C757D',
    fontSize: '14px',
    margin:"0 20px",
    fontWeight: 'bold',
}

const Header = () => {
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push("/create-post")
    }

    return (
        <Navbar expand="lg" sticky="top" style={headerStyle}>
            <div style={inner}>
                <div style={childStyle}>
                    <Image
                        className="flex-shrink-0 mb-0 mr-3 rounded-full w-10 h-10"
                        src={require("../content/assets/thanhle.jpeg")}
                        webpSrc={require("../content/assets/thanhle.jpeg?webp")}
                        previewSrc={require("../content/assets/thanhle.jpeg?lqip")}
                        alt="Profile"
                    />
                    <Navbar.Brand href="/get-started">LNTBlog</Navbar.Brand>
                </div>
                <div style={childStyle}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <a href="/" className="font-light" style={item}>
                            Posts
                        </a>
                        <Form inline>
                            <FormControl type="text" placeholder="Feedback" className="mr-sm-2"
                                         style={{maxWidth: '120px',height:'30px',fontSize: '14px'}}/>
                            <Button color="info" onClick={handleClick}
                                    style={{marginLeft: '10px',height:'30px',fontSize: '14px', lineHeight: '0'}}>
                                <FontAwesomeIcon icon={faPlus}/> Create Post
                            </Button>
                        </Form>
                        <FontAwesomeIcon className='flex-shrink-0 ml-4 rounded-full'
                                         style={{width: '1.5rem', height: '1.5rem', color: '#6C757D'}}
                                         icon={["fab", "github"]}/>
                    </Navbar.Collapse>
                </div>
            </div>
        </Navbar>
    )
}

export default Header;