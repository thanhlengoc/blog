import React, {useEffect} from "react";
import "typeface-open-sans";
import "typeface-merriweather";

// import css
import "styles/tailwind.css"
import "styles/global.scss";
import "styles/darkmode.scss"
import "styles/lightmode.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import "styles/sidebar.scss";
import "react-mde/lib/styles/css/react-mde-all.css";
import 'react-toastify/dist/ReactToastify.css';
import "nprogress/nprogress.css";
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import {useRouter} from 'next/router'
import * as gtag from '../lib/gtag'
import dynamic from "next/dynamic";
import ViewportProvider from "../components/ViewportProvider";

const TopProgressBar = dynamic(
    () => {return import("../components/TopProgressBar")},
    { ssr: false },
);

export default function App({Component, pageProps}) {
    const router = useRouter()

    // For Google Search Console Detect
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return <>
        <TopProgressBar />
        <ViewportProvider>
            <Component {...pageProps} />
        </ViewportProvider>
    </>
}
