import Header from './Header/Header';
import React from "react";
import {ToastContainer} from 'react-toastify';
import dynamic from "next/dynamic";
import {useViewport} from "./ViewportProvider";
import {breakpoint} from "../conf/constants";

const ScrollToTop = dynamic(
    () => {return import("./ScrollTopArrow")},
    {ssr: false}
);

export default function TheLayout({children}) {
    const { width } = useViewport();

    return (
        <div className="app">
            <Header/>
            {
                width < breakpoint ?
                    <div className="container-sm mx-auto font-light">
                        <main>{children}</ main>
                    </div>
                    :
                    <div className="container-sm pt-0 px-4 py-12 mx-auto font-light">
                        <main>{children}</ main>
                    </div>
            }
            <ScrollToTop/>
            <ToastContainer autoClose={2500}/>
        </div>

    );
}
