import "typeface-open-sans";
import "typeface-merriweather";

// import css
import "styles/global.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "styles/sidebar.css";
import '../styles/my-swiper.css';
import 'swiper/swiper.scss';
import "react-mde/lib/styles/css/react-mde-all.css";
import 'react-toastify/dist/ReactToastify.css';

import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

import React from "react";
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import * as gtag from '../lib/gtag'

export default function App({Component, pageProps}) {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return <Component {...pageProps} />
}
