import React from 'react';
import {useViewport} from "./ViewportProvider";
import {breakpoint} from "../conf/constants";
import MobileHomePage from "./Mobile/MobileHomePage";
import DesktopHomePage from "./Desktop/DesktopHomePage";

const HomePage = ( props ) => {
    const { width } = useViewport();
    const { allPosts } = props

    return width < breakpoint ?
        <MobileHomePage allPosts={allPosts} /> :
        <DesktopHomePage allPosts={allPosts} />;
};

export default HomePage