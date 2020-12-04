import React, {useEffect, useState} from 'react';
import {CgArrowUpR} from 'react-icons/cg';

const ScrollTopArrow = () => {

    const [showScroll, setShowScroll] = useState(false)

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    useEffect(() => {
        const checkScrollTop = () => {
            if (!showScroll && window.pageYOffset > 400){
                setShowScroll(true)
            } else if (showScroll && window.pageYOffset <= 400){
                setShowScroll(false)
            }
        };

        window.addEventListener('scroll', checkScrollTop)
        return () => window.removeEventListener('scroll', checkScrollTop)
    }, [])


    return (
        <CgArrowUpR className="scrollTop" onClick={scrollTop} style={{height: 40, display: showScroll ? 'flex' : 'none'}}/>
    );
}

export default ScrollTopArrow;