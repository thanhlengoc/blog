import TheLayout from 'components/TheLayout';
import React from 'react'
import SEO from "components/Seo";
import {allPostFromFire} from "../utils/api";
import HomePage from "../components/HomePage";

export default function Home({allPosts}) {

    return (
        <TheLayout>
            <SEO title="Newest post"/>
            <HomePage allPosts={allPosts}/>
        </TheLayout>
    )
}

export async function getServerSideProps() {
    const allPosts = await allPostFromFire()
    return {
        props: {allPosts},
    }
}


