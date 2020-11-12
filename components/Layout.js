// import { useRouter } from "next/router";
import Header from './Header';
import {Col, Row} from "react-bootstrap";
import Banner from "./Banner";
import Sidebar from "./Sidebar"
import React from "react";

// antialiased font-body

export default function Layout({children}) {

    return (
        <div className="app">
            <Banner/>
            <Header/>
            <div className="max-w-screen-lg px-4 py-12 mx-auto font-light" style={{paddingTop: '0'}}>
                <Row>
                    <Col xs='12' sm='3'>
                        <Sidebar/>
                    </Col>
                    <Col xs='12' sm='9'>
                        <main>{children}</main>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
