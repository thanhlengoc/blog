import React from 'react'
import {Image} from "react-bootstrap";
// import Image from 'next/image'

const MarkdownImageCloud = ({ alt, src }) => {
    return (
        <Image src={src} alt={alt} unsized/>
    )
}

export default MarkdownImageCloud