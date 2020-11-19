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
            <h6>Tìm kiếm</h6>
            {/*<InputGroup>*/}
            {/*    <InputGroup.Prepend style={{borderRight: 'none'}}>*/}
            {/*        <InputGroup.Text className="feedback" style={{paddingRight: '0'}}>*/}
            {/*            <FontAwesomeIcon icon={faSearch}/>*/}
            {/*        </InputGroup.Text>*/}
            {/*    </InputGroup.Prepend>*/}
            {/*</InputGroup>*/}
            <Form.Control
                className="mr-sm-2 feedback"
                type="text"
                placeholder="Search.."
            />
            <hr className="mt-3 mb-3"/>
            <h6>Tags</h6>
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