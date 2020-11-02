import React from 'react'
import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {

    return (
        <div className="sidenav">
              <InputGroup>
                <InputGroup.Prepend style={{borderRight:'none'}}>
                    <InputGroup.Text style={{backgroundColor:'#fff', paddingRight:'0'}}>
                        <FontAwesomeIcon icon={faSearch} style={{color:'#6C757D'}} />
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    className="mr-sm-2"
                    style={{borderLeft:'none'}}
                    type="text"
                    placeholder="Search.."
                />
              </InputGroup>
              <a href="/" className="text-lg font-bold">Documentation</a>
              <a href="/get-started">- Get Started</a>
              <a href="/web-dev">- Web Development</a>
              <a href="/web-dev" style={{marginLeft:'20px'}}>+ Front-end</a>
              <a href="/web-dev" style={{marginLeft:'20px'}}>+ Back-end</a>
              <a href="/dev-ops">- DevOps</a>
              <a href="/dev-sec-ops">- DevSecOps</a>
        </div>
    )
}

export default Sidebar;