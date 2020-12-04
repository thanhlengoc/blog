import React from "react";
import TheLayout from "components/TheLayout";
import SEO from "components/Seo";
import {getPostBySlug} from "../../utils/api";
import MyContent from "../../components/MyContent";

export default function PostSlug({post, frontmatter, nextPost, previousPost}) {

    return (
        <TheLayout>
            <SEO
                title={frontmatter.title}
                description={frontmatter.description || post.excerpt}
            />
            <MyContent post={post} frontmatter={frontmatter}
                       nextPost={nextPost} previousPost={previousPost}/>
        </TheLayout>
    );
}

export async function getServerSideProps ({ query }) {
    console.log("ssr posts/slug Component query: ", JSON.stringify(query))
    const postData = await getPostBySlug(query.slug);

    if (!postData.previousPost) {
        postData.previousPost = null;
    }
    if (!postData.nextPost) {
        postData.nextPost = null;
    }

    return { props: postData };
}