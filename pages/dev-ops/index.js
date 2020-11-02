import Layout from 'components/Layout';
import React from 'react'
import SEO from "components/Seo";

const DevOpsPage = () => {

    return (
        <Layout>
            <SEO title="DevOps" />
            {/* <div style={{paddingTop:'3rem'}}>
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
            </div> */}
        </Layout>
    )
}

export default DevOpsPage;