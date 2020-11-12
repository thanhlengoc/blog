import matter from "gray-matter";
import fs from "fs";

export function getPostsFolders(pagePath) {
    // Get all posts folders located in `content/posts`
    const postsFolders = fs
        .readdirSync(`${process.cwd()}/content/posts${pagePath}`)
        .map((folderName) => ({
            directory: folderName,
            filename: `${folderName}.md`,
        }));

    // console.log("postsFolders: ", postsFolders)

    return postsFolders;
}

// Get day in format: Month day, Year. e.g. April 19, 2020
function getFormattedDate(date) {
    const options = {year: "numeric", month: "long", day: "numeric"};
    return date.toLocaleDateString("en-US", options);
}

export function getSortedPosts(pagePath) {
    const postFolders = getPostsFolders(pagePath);

    const posts = postFolders
        .map(({filename, directory}) => {
            // Get raw content from file
            const markdownWithMetadata = fs
                .readFileSync(`content/posts${pagePath}/${directory}/${filename}`)
                .toString();

            // Parse markdown, get frontmatter data, excerpt and content.
            const {data, excerpt, content} = matter(markdownWithMetadata);

            const frontmatter = {
                ...data,
                date: getFormattedDate(data.date),
            };

            // Remove .md file extension from post name
            const slug = filename.replace(".md", "");

            return {
                slug,
                frontmatter,
                excerpt,
                content
            };
        })
        .sort(
            (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );

    return posts;
}

export function getPostsSlugs(pagePath) {
    const postFolders = getPostsFolders(pagePath);

    return postFolders.map(({filename}) => ({
        params: {
            slug: filename.replace(".md", "")
        },
    }));
}

export function getPostBySlug(slug, pagePath) {
    const posts = getSortedPosts(pagePath);

    const postIndex = posts.findIndex(({slug: postSlug}) => postSlug === slug);

    const {frontmatter, content, excerpt} = posts[postIndex];

    const previousPost = posts[postIndex + 1];
    const nextPost = posts[postIndex - 1];

    return {frontmatter, post: {content, excerpt}, previousPost, nextPost};
}
