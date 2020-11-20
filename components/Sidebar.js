import React from 'react'
import {Card, Form} from "react-bootstrap";
import { useRouter } from 'next/router'

const Sidebar = () => {
    const path = useRouter();
    const currentPath = path.pathname;

    return (
        <Card className="sidenav card-post">
            <Card.Body>
                {/*<h5>Tìm kiếm</h5>*/}
                {/*<Form.Control*/}
                {/*    className="input-search mr-sm-2"*/}
                {/*    type="text"*/}
                {/*    placeholder="Search.."*/}
                {/*/>*/}
                {/*<hr className="mt-3 mb-3"/>*/}
                <h5>Tags</h5>
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
            </Card.Body>
        </Card>
        // <div className="sidenav">
        //     <h5>Tìm kiếm</h5>
        //     <Form.Control
        //         className="input-search mr-sm-2"
        //         type="text"
        //         placeholder="Search.."
        //     />
        //     <hr className="mt-3 mb-3"/>
        //     <h5>Tags</h5>
        //     <a href="/" className={currentPath === "/web-dev" ? "font-bold" : ""}>
        //         Front-end
        //     </a>
        //     <a href="/" className={currentPath === "/web-dev" ? "font-bold" : ""}>
        //         Java
        //     </a>
        //     <a href="/" className={currentPath === "/web-dev" ? "font-bold" : ""}>
        //         Docker
        //     </a>
        //     <a href="/" className={currentPath === "/distributed" ? "font-bold" : ""}>
        //         Distributed
        //     </a>
        // </div>
    )
}

export default Sidebar;