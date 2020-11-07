import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSortedPosts } from "utils/posts";
import React from "react";
import Bio from "../components/Bio";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="All posts" />
      <div style={{paddingTop:'1.7rem'}}>
        {posts.map(({ frontmatter: { title, description, date }, slug }) => (
          <article key={slug}>
            <header className="mb-2">
              <h3 className="mb-2">
                <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                  <a className="text-2xl font-bold font-display" style={{color:'#000'}}>
                    {title}
                  </a>
                </Link>
              </h3>
              <span className="text-sm">{date}</span>
            </header>
            <section>
              <p className="mb-8 text-lg">{description}</p>
            </section>
          </article>
        ))}
      </div>
        <hr className="mt-4" />
        <footer>
            <Bio className="mt-8 mb-16" />
        </footer>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}
