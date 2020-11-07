// import { useRouter } from "next/router";
import Header from './Header';
import { Col, Row } from "react-bootstrap";
// import Footer2 from "./Footer2";
import Banner from "./Banner";
import Sidebar from "./Sidebar"
import React from "react";

// antialiased font-body

export default function Layout({ children }) {
  // const { pathname } = useRouter();

  return (
    <div className="app">
      <Banner/>
      <Header/>
      <div className="max-w-screen-lg px-4 py-12 mx-auto font-light" style={{paddingTop:'0'}}>
        <Row>
          <Col xs='12' sm='3'>
            <Sidebar/>
          </Col>
          <Col xs='12' sm='9'>
            <main>{children}</main>
          </Col>
        </Row>
      </div>
      {/*<Footer2>*/}
      {/*  /!*<div className="container text-lg font-light" style={{paddingLeft:'40px', paddingRight:'83px'}}>*!/*/}
      {/*              © {new Date().getFullYear()}, Built by{" "}*/}
      {/*    <a href="https://github.com/thanhlengoc">thanhlengoc</a>*/}
      {/*    &#128293;*/}
      {/*    <a href="#contact"*/}
      {/*       style={{float:'right', color:'#000', marginLeft:'20px', marginRight:'45px'}}>Contact</a>*/}
      {/*    <a href="#contact" style={{float:'right', color:'#000'}}>About</a>*/}
      {/*            */}
      {/*/!*</div>*!/*/}
      {/*</Footer2>*/}
    </div>
  );
}
