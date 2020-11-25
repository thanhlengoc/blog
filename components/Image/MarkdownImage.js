import React from 'react'
import Image from "./Image";

const MarkdownImage = ({ alt, src }) => (
    <Image
        alt={alt}
        src={src}
        webpSrc={`${src}?webp`}
        previewSrc={`${src}?lqip`}
        className="w-full"
    />
);

export default MarkdownImage