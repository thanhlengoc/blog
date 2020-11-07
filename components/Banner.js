import React from 'react'

const bannerStyle = {
    width: '100%',
    background: '#000',
    color: '#fff',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
}

const inner = {
    width: '100%',
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    webkitBoxPack: 'justify'
}

const aStyle = {
    display: 'inline-flex',
    color: '#fff',
}

const Banner = () => {

    return (
        <div className="font-light" style={bannerStyle}>
            <div style={inner}>
                <a href="/" style={aStyle}>
                    Hello
                </a>
                <a href="/" style={aStyle}>
                    Go to social web →
                </a>
            </div>
        </div>
    )
}

export default Banner;