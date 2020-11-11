import React from 'react'
import {Form, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faAngleRight} from '@fortawesome/free-solid-svg-icons'
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
                        <FontAwesomeIcon icon={faSearch} style={{color: '#eee'}}/>
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    className="mr-sm-2"
                    style={{borderLeft: 'none', fontSize: '14px'}}
                    type="text"
                    placeholder="Search.."
                />
            </InputGroup>
            <a href="/get-started" className={currentPath === "/get-started" ? "font-bold" : ""}>Get Started</a>
            <a href="/" className={currentPath === "/" ? "font-bold" : ""}>
                <FontAwesomeIcon icon={faAngleRight} /> All posts
            </a>
            <a href="/web-dev" className={currentPath === "/web-dev" ? "font-bold" : ""}>
                <FontAwesomeIcon icon={faAngleRight} /> Web Development
            </a>
            <a href="/distributed" className={currentPath === "/distributed" ? "font-bold" : ""}>
                <FontAwesomeIcon icon={faAngleRight} /> Distributed
            </a>
        </div>
    )
}

export default Sidebar;