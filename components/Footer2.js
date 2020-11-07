import React from "react";

const footerStyle = {
  backgroundColor: '#fafafa',
  borderTop: '1px solid #eaeaea',
  textAlign: "left",
  padding: "30px 200px",
  // position: "fixed",
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
    </div>
  );
}