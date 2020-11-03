import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSortedPosts } from "utils/posts";
import React from "react";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="All posts" />
      <div style={{paddingTop:'2rem'}}>
        {posts.map(({ frontmatter: { title, description, date }, slug }) => (
          <article key={slug}>
            <header className="mb-2">
              <h3 className="mb-2">
                <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                  <a className="font-bold font-display" style={{color:'#000'}}>
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

// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: { ... } }
//         ],
//         fallback: false
//     };
// }
