import React from 'react'

const Banner = () => {

    return (
        <div className="banner">
            <div className="container d-flex justify-content-end pt-2" style={{maxWidth:'1000px'}}>
                <a href="/admin" className="font-bold">
                    Admin page →
                </a>
            </div>
        </div>
    )
}

export default Banner;