import React from 'react'

const footerStyle = {
    width: '100%',
    paddingTop: '20px',
    paddingBottom: '20px',
    backgroundColor: '#fafafa',
    borderTop: '1px solid #eaeaea',
    borderBottom: '1px solid #eaeaea',
    overflow: 'hidden'
}

const Footer = () => {

    return (
        <div className="navbar navbar-inverse navbar-fixed-bottom text-lg font-light" style={footerStyle}>
          <div class="container">
            © {new Date().getFullYear()}, Built with{" "}
            <a href="https://nextjs.org/">ThanhLe</a>
            &#128293;
          </div>
        </div>
    )
}

export default Footer;