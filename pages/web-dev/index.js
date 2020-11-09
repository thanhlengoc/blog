import Layout from 'components/Layout';
import React from 'react'
import SEO from "components/Seo";
import Bio from '../../components/Bio'
import {getSortedPosts} from "../../utils/posts";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function WebDevPage ({posts}) {
    // const path = useRouter();
    return (
        <Layout>
            <SEO title="Web Dev" />
            <div style={{paddingTop:'1.7rem'}}>
                {posts.map(({ frontmatter: { title, description, date }, slug }) => (
                    <article key={slug}>
                        <header className="mb-2">
                            <h3 className="mb-2">
                                <Link
                                    href={`/post/[slug]`}
                                    // href={{ pathname: `/post/[slug]`, query: { page: "web-dev" }}}
                                    // as={{pathname: `/post/${slug}`, query: { page: "web-dev" }}}
                                    as={`/post/${slug}`}
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
                    </article>
                ))}
            </div>
            <hr className="mt-4" />
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
