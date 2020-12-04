import React from 'react';
import {useViewport} from "./ViewportProvider";
import TheMobileContent from "./Mobile/TheMobileContent";
import TheDesktopContent from "./Desktop/TheDesktopContent";
import {breakpoint} from "../conf/constants";

const MyContent = ( props ) => {
    const { width } = useViewport();
    const { post, frontmatter, nextPost, previousPost } = props

    return width < breakpoint ?
        <TheMobileContent post={post} frontmatter={frontmatter}
                          nextPost={nextPost} previousPost={previousPost}/> :
        <TheDesktopContent post={post} frontmatter={frontmatter}
                           nextPost={nextPost} previousPost={previousPost}/>;
};

export default MyContent