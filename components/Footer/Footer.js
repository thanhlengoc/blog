import React from "react";
import Bio from "../Bio";

export default function Footer() {
    return (
        <div className="my-footer">
            <div className="container p-24">
                <div className="d-flex justify-content-center">
                    <Bio className=""/>
                </div>
            </div>
        </div>
    );
}