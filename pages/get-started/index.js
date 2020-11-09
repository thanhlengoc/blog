import React from 'react'
import Bio from '../../components/Bio'
import Layout from '../../components/Layout'

const GetStartedPage = () => {

    return (
        <Layout>
            <div style={{paddingTop:'3rem'}}>
            <header className="mb-8">
                <h1 className="mb-2 text-5xl font-black leading-none font-display">
                    Getting started
                </h1>
            </header>
            <p>Welcome to ThanhLe documentation!</p>

            <footer>
                <Bio className="mt-8 mb-16" />
            </footer>
            </div>
        </Layout>
    )
}

// export async function getStaticProps() {
//     const posts = getSortedPosts("get-started");
//
//     return {
//         props: {
//             posts,
//         },
//     };
// }

export default GetStartedPage;