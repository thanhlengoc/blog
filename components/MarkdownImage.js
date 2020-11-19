import React from 'react'
import Image from "./Image";

const MarkdownImage = ({ alt, src }) => (
    <Image
        alt={alt}
        src={require(`../content/assets/${src}`)}
        webpSrc={require(`../content/assets/${src}?webp`)}
        previewSrc={require(`../content/assets/${src}?lqip`)}
        className="w-full"
    />
);

export default MarkdownImage