import React from 'react'
import {Card} from "react-bootstrap";
import {useViewport} from "../ViewportProvider";
import {breakpoint} from "../../conf/constants";

const Tags = () => {
    return (
        <>
            <h5>Popular Tags</h5>
            <a href="#front-end" >
                #front-end
            </a>
            <a href="#Java" >
                #Java
            </a>
            <a href="#docker" >
                #docker
            </a>
            <a href="#distributed">
                #distributed
            </a>
        </>
    )
}

const Sidebar = () => {
    const { width } = useViewport();

    return width < breakpoint ?
        <Card className="sidenav card-post border-0 rounded-0">
            <Card.Body>
                <Tags/>
            </Card.Body>
        </Card> :
        <Card className="sidenav card-post">
            <Card.Body>
                <Tags/>
            </Card.Body>
        </Card>
}

export default Sidebar;