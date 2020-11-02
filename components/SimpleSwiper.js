import React, { useRef } from 'react';
import Swiper from 'react-id-swiper';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const SimpleSwiper = () => {
    const ref = useRef(null);

    const goNext = () => {
        if (ref.current !== null && ref.current.swiper !== null) {
            ref.current.swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (ref.current !== null && ref.current.swiper !== null) {
            ref.current.swiper.slidePrev();
        }
    };

    return (
        <div className="trancarousel_area">
            <p className="trand">Tranding</p>
            <div className="trancarousel nav_style1">
                <Swiper ref={ref}>
                    <div className="trancarousel_item">
                        <p><Link href="/">Top 10 Best Technology of 2018 So Far: Greatting To Watch
                            Now</Link>
                        </p>
                    </div>
                    <div className="trancarousel_item">
                        <p><Link href="/">Top 10 Best Technology of 2019 So Far: Greatting To Watch
                            Now</Link>
                        </p>
                    </div>
                    <div className="trancarousel_item">
                        <p><Link href="/">Top 10 Best Technology of 2020 So Far: Greatting To Watch
                            Now</Link>
                        </p>
                    </div>
                </Swiper>
                <div className="navBtns">
                    <button className="navBtn prevBtn" onClick={goPrev}><FontAwesomeIcon icon={faAngleLeft}/>
                    </button>
                    <button className="navBtn nextBtn" onClick={goNext}><FontAwesomeIcon icon={faAngleRight}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SimpleSwiper;