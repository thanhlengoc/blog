import Layout from 'components/Layout';
import React from 'react'
import SEO from "components/Seo";
import {useRouter} from "next/router";
import Link from "next/link";
import Bio from "../../components/Bio";
import {getSortedPosts} from "../../utils/posts";

export default function DevOpsPage({posts}) {
    const path = useRouter();
    const currentPage = path.pathname;
    return (
        <Layout>
            <SEO title="DevOps" />
            <div style={{paddingTop:'1.7rem'}}>
                {posts.map(({ frontmatter: { title, description, date }, slug }) => (
                    <article key={slug}>
                        <header className="mb-2">
                            <h3 className="mb-2">
                                <Link href={{
                                    pathname: '/post/[slug]',
                                    query: { slug: slug, pagePath: currentPage }
                                }}
                                    // as={`/post/${slug}`}
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
    const posts = getSortedPosts("/dev-ops");
    return {
        props: {
            posts,
        },
    };
}
