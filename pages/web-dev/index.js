import Layout from 'components/Layout';
import React from 'react'
import SEO from "components/Seo";
import Bio from '../../components/Bio'
import {getSortedPosts} from "../../utils/posts";
import Link from "next/link";

export default function WebDevPage ({posts}) {
    return (
        <Layout>
            <SEO title="Web Dev" />
            <div style={{paddingTop:'1.7rem'}}>
                {posts.map(({ frontmatter: { title, description, date }, slug }) => (
                    <article key={slug}>
                        <header className="mb-2">
                            <h3 className="mb-2">
                                <Link
                                    href={`/web-dev/post/[slug]`}
                                    // href={{ pathname: `/post/[slug]`, query: { page: "web-dev" }}}
                                    // as={{pathname: `/post/${slug}`, query: { page: "web-dev" }}}
                                    as={`/web-dev/post/${slug}`}
                                >
                                    <a className="text-2xl font-bold font-display" style={{color:'#000'}}>
                                        {title}
                                    </a>
                                </Link>
                            </h3>
                            <span className="text-sm">{date}</span>
                        </header>
                        <section>
                            <p className="mb-8 text-md">{description}</p>
                        </section>
                        <hr className="mt-3 mb-3" />
                    </article>
                ))}
            </div>
            {/*<hr className="mt-4" />*/}
            <footer>
                <Bio className="mt-8 mb-16" />
            </footer>
        </Layout>
    )
}

export async function getStaticProps() {
    const posts = getSortedPosts("/web-dev");
    return {
        props: {
            posts,
        },
    };
}
