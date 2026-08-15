import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Live Content API: real-time updates + Visual Editing.
// Token is server-only; the dataset is private so reads require it.
// useCdn:false so the token is honored (the CDN drops auth for private data).
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ useCdn: false }),
  serverToken: token,
  browserToken: token,
});
