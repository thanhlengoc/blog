import Header from './Header';
import Banner from "./Banner";
import React from "react";
import { ToastContainer } from 'react-toastify';
// antialiased font-body

export default function Layout({children}) {

    return (
        <div className="app">
            <Banner/>
            <Header/>
            <div className="max-w-screen-lg px-4 py-12 mx-auto font-light" style={{paddingTop: '0'}}>
                <main>{children}</main>
            </div>
            <ToastContainer autoClose={2500}/>
        </div>
    );
}
