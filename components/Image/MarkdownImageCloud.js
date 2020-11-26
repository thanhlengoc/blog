import React from 'react'

const MarkdownImageCloud = ({alt, src}) => {
    return (
        <img src={src}
             alt={alt}
             className='lazyload blur-up'/>
    )
}

export default MarkdownImageCloud