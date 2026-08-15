import { defineQuery } from "next-sanity";

// Index: newest published posts first.
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    "author": author->{ name, avatar }
  }
`);

// Single post by slug.
export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    body,
    seoTitle,
    seoDescription,
    "author": author->{ name, avatar, bio }
  }
`);

// All slugs, for generateStaticParams + sitemap.
export const SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current, publishedAt }
`);
