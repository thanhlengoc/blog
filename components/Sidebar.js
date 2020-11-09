import React from 'react'
import {Form, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faDotCircle} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

const Sidebar = () => {
    const path = useRouter();
    const currentPath = path.pathname;
    // console.log("path: ", path)

    return (
        <div className="sidenav">
            <InputGroup>
                <InputGroup.Prepend style={{borderRight: 'none'}}>
                    <InputGroup.Text style={{backgroundColor: '#fff', paddingRight: '0'}}>
                        <FontAwesomeIcon icon={faSearch} style={{color: '#6C757D'}}/>
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    className="mr-sm-2"
                    style={{borderLeft: 'none'}}
                    type="text"
                    placeholder="Search.."
                />
            </InputGroup>
            <a href="/" className={currentPath === "/" ? "font-bold" : ""}>
                {/*<FontAwesomeIcon icon={faDotCircle}/> */}
                All posts
            </a>
            <a href="/get-started" className={currentPath === "/get-started" ? "font-bold" : ""}>Get Started</a>
            <a href="/web-dev" className={currentPath === "/web-dev" ? "font-bold" : ""}>Web Development</a>
            <a href="/dev-ops" className={currentPath === "/dev-ops" ? "font-bold" : ""}>DevOps</a>
        </div>
    )
}

export default Sidebar;