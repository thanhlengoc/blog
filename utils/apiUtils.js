import {cloudinaryUrl, collectionId, unsignedUploadPreset} from "../conf/constants";
import fireDb from "../conf/fire-config";

export async function uploadImageToCloud (dataUrl) {
    const fd = new FormData();
    fd.append('file', dataUrl);
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload');
    const options = {
        method: "POST", body: fd
    }
    return await fetch(cloudinaryUrl, options)
        .then((res) => {
            return res.json();
        })
}

export async function uploadPost(docId, frontmatter, content) {
    return await fireDb.firestore()
        .collection(collectionId).doc(docId)
        .set({
            slug: docId,
            frontmatter: frontmatter,
            content: content,
            excerpt: ""
        })
}

export async function updatePost(docId, frontmatter, content) {
    return await fireDb.firestore()
        .collection(collectionId).doc(docId)
        .update({
            slug: docId,
            frontmatter: frontmatter,
            content: content,
            excerpt: ""
        })
}

export async function getPostByDoc(docId) {
    return await fireDb.firestore()
        .collection(collectionId).doc(docId).get()
}

export async function allPostFromFire () {
    const snapshot = await fireDb.firestore().collection(collectionId).get()
    return snapshot.docs.map(doc => doc.data());
}

export async function getAllDocFromFire () {
    return await fireDb.firestore().collection(collectionId).get()
}

export async function getPostBySlug (slug) {
    const posts = await allPostFromFire();

    const postIndex = posts.findIndex(({slug: postSlug}) => postSlug === slug);

    const {frontmatter, content, excerpt} = posts[postIndex];

    const previousPost = posts[postIndex + 1];
    const nextPost = posts[postIndex - 1];

    return {frontmatter, post: {content, excerpt}, previousPost, nextPost};
}

export async function getDocBySlug (slug) {
    const posts = await allPostFromFire();

    const postIndex = posts.findIndex(({slug: postSlug}) => postSlug === slug);

    const {frontmatter, content, excerpt} = posts[postIndex];

    return {frontmatter, post: {content, excerpt, slug}};
}

export async function deletePostByDoc(docId) {
    return await fireDb.firestore()
        .collection(collectionId).doc(docId).delete()
}
