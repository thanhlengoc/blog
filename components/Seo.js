import React from "react";
import Head from "next/head";
import {getSiteMetaData} from "utils/helpers";
import {GA_TRACKING_ID} from "../lib/gtag";

export default function SEO({title, description = ""}) {
    const siteMetadata = getSiteMetaData();

    const metaDescription = description || siteMetadata.description;

    return (
        <Head>
            <title>
                {siteMetadata.title} | {title}
            </title>
            <meta name="description" content={metaDescription}/>
            <meta property="og:type" content="website"/>
            <meta name="og:title" property="og:title" content={title}/>
            <meta
                name="og:description"
                property="og:description"
                content={metaDescription}
            />
            <meta name="github:card" content="summary"/>
            <meta name="github:title" content={title}/>
            <meta name="github:description" content={metaDescription}/>
            <meta name="github:creator" content={siteMetadata.social.github}/>
            <link rel="icon" type="image/png" href="./thanhle.jpeg"/>
            <link rel="apple-touch-icon" href="./thanhle.jpeg"/>
            <link rel="alternate" type="application/rss+xml"
                  title="RSS for LeeNTH blog"
                  href="https://lengocthanh.vercel.app/rss"/>
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
            />
        </Head>
    );
}
