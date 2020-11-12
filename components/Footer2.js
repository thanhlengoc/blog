import React from "react";

const footerStyle = {
  backgroundColor: '#fafafa',
  borderTop: '1px solid #eaeaea',
  textAlign: "left",
  padding: "30px 200px",
  left: "0",
  bottom: "0",
  height: "80px",
  width: "100%"
};

const phantomStyle = {
  display: "block",
  padding: "20px",
  height: "90px",
  width: "100%"
};

export default function Footer2({ children }) {
  return (
    <div>
      <div style={phantomStyle} />
      <div className="text-lg font-light" style={footerStyle}>{children}</div>
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