import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from "./Image";
import SimpleSwiper from "./SimpleSwiper"

const bannerStyle = {
    width: '100%',
    background: '#000',
    color: '#fff',
    borderBottom: '1px solid #eaeaea',
    paddingTop: '0',
    paddingBottom: '0'
}

const Banner = () => {

    return (
        <Navbar expand="sm" style={bannerStyle}>
            <div className="container font-light" style={{paddingLeft:"67px", paddingRight:'67px'}}>
                <div className="row">
                    <div className="col-md-8 align-self-center" style={{paddingLeft:'30px'}}>
                        <SimpleSwiper/>
                    </div>
                    <div className="col-md-4 align-self-center d-flex justify-content-end">
                        <Nav.Link href="/" style={{color:'#fff', paddingRight:'25px'}}>
                            Go to social web →
                        </Nav.Link>
                    </div>
                </div>
            </div>
        </Navbar>
    )
}

export default Banner;