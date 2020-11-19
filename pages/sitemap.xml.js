import React from 'react';
import {allPostFromFire} from "../utils/apiUtils";

const EXTERNAL_DATA_URL = 'https://lengocthanh.vercel.app/posts/content';

const createSitemap = async (posts) => {
    let projectsXML = "";

    posts.map(({frontmatter, slug}) => {
        const pageURL = `${EXTERNAL_DATA_URL}/${slug}/`;
        projectsXML += `
          <url>
            <loc>${pageURL}</loc>
            <lastmod>${frontmatter.date}</lastmod>
            <priority>0.50</priority>
          </url>`;
    })


    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://lengocthanh.vercel.app/</loc>
            <priority>1.00</priority>
        </url>
        <url>
            <loc>https://lengocthanh.vercel.app/create-post</loc>
            <priority>1.00</priority>
        </url>
        ${projectsXML}
    </urlset>
    `
}

class Sitemap extends React.Component {

    static async getInitialProps({res}) {
        const posts = await allPostFromFire();
        res.setHeader("Content-Type", "text/xml; charset=utf-8");
        res.write(await createSitemap(posts));
        res.end();
    }
}

export default Sitemap;