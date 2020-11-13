import React from 'react'
import {Form, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

const Sidebar = () => {
    const path = useRouter();
    const currentPath = path.pathname;

    return (
        <div className="sidenav">
            <h4>Tìm kiếm</h4>
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
                    placeholder="search.."
                />
            </InputGroup>
            <hr className="mt-3 mb-3"/>
            <h4>Tags</h4>
            <a href="/" className={currentPath === "/web-dev" ? "font-bold" : ""}>
                Front-end
            </a>
            <a href="/" className={currentPath === "/web-dev" ? "font-bold" : ""}>
                Java
            </a>
            <a href="/" className={currentPath === "/web-dev" ? "font-bold" : ""}>
                Docker
            </a>
            <a href="/" className={currentPath === "/distributed" ? "font-bold" : ""}>
                Distributed
            </a>
        </div>
    )
}

export default Sidebar;