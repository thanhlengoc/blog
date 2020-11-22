import React from 'react'
import {allPostFromFire} from "../utils/api";
import { getSiteMetaData } from "utils/helpers";

const EXTERNAL_DATA_URL = 'https://lengocthanh.vercel.app/posts/content';

const getRssXml = async (posts) => {
    const {rssItemsXml, latestPostDate} = await getRssItemsXml(posts)
    const siteMetaData = getSiteMetaData();

    return `<?xml version="1.0" ?>
      <rss version="2.0">
        <channel>
            <title>Blog by Le Ngoc Thanh</title>
            <link>https://lengocthanh.vercel.app</link>
            <description>${siteMetaData.description}</description>
            <language>en</language>
            <lastBuildDate>${latestPostDate}</lastBuildDate>
            ${rssItemsXml}
        </channel>
      </rss>`;
}

const getRssItemsXml = async (posts) => {
    let rssItemsXml = ""
    const latestPostDate = typeof posts === 'array' && posts.length ?
        posts[0].frontmatter.date : ""

    posts.map(({frontmatter, slug}) => {
        const pageURL = `${EXTERNAL_DATA_URL}/${slug}/`;
        rssItemsXml += `
          <item>
            <title>${frontmatter.title}</title>
            <link>${pageURL}</link>
            <pubDate>${frontmatter.date}</pubDate>
            <description>
            <![CDATA[${frontmatter.description}]]>
            </description>
          </item>
        `;
    })

    return {
        rssItemsXml,
        latestPostDate
    };
}

export default class Rss extends React.Component {
    static async getInitialProps({ res }) {
        if (!res) {
            return;
        }
        const posts = await allPostFromFire();
        res.setHeader("Content-Type", "text/xml; charset=utf-8");
        res.write(await getRssXml(posts));
        res.end();
    }
}