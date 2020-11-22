import Header from './Header/Header';
import React from "react";
import {ToastContainer} from 'react-toastify';
import dynamic from "next/dynamic";

const ScrollToTop = dynamic(
    () => {return import("./ScrollTopArrow")},
    {ssr: false}
);

export default function TheLayout({children}) {

    return (
        <div className="app">
            <Header/>
            <div className="container pt-0 px-4 py-12 mx-auto font-light">
                <main>{children}</main>
            </div>
            <ScrollToTop/>
            <ToastContainer autoClose={2500}/>
        </div>

    );
}
