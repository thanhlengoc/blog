import Header from './Header';
import Banner from "./Banner";
import React from "react";
import {ToastContainer} from 'react-toastify';
import dynamic from "next/dynamic";
// import Footer from "./Footer";
// antialiased font-body

const ScrollToTop = dynamic(
    () => {
        return import("./ScrollTopArrow");
    },
    {ssr: false}
);

export default function Layout({children}) {

    return (
        <div className="app">
            {/*<Banner/>*/}
            <Header/>
            <div className="max-w-screen-lg px-4 py-12 mx-auto font-light" style={{paddingTop: '0'}}>
                <main>{children}</main>
            </div>
            <ScrollToTop/>
            {/*<Footer/>*/}
            <ToastContainer autoClose={2500}/>
        </div>

    );
}
