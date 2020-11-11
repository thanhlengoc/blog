import React from 'react'
import Bio from '../../components/Bio'
import Layout from '../../components/Layout'
import SEO from "../../components/Seo";

export default function GetStartedPage () {

    return (
        <Layout>
            <SEO title="Get-started" />
            <div style={{paddingTop:'1.7rem'}}>
            <header className="mb-8">
                <h1 className="mb-2 text-5xl font-black leading-none font-display">
                    Getting started
                </h1>
            </header>
            <p>Welcome to Le Ngoc Thanh Blog!</p>
            <hr className="mt-4" />
            <footer>
                <Bio className="mt-8 mb-16" />
            </footer>
            </div>
        </Layout>
    )
}
