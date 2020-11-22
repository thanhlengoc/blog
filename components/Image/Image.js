import React from "react";
import "lazysizes";

export default function Image({alt, src, previewSrc, webpSrc, className}) {
    return (
        <picture className={className}>
            <source type="image/webp" data-srcset={webpSrc}/>
            <source type="image/png" data-srcset={src}/>
            <source type="image/gif" data-srcset={src}/>
            <source type="video/mp4" data-srcset={src}/>
            <img
                className={`lazyload blur-up ${className}`}
                alt={alt}
                src={previewSrc}
            />
        </picture>
    );
}
