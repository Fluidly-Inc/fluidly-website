import type { StructureResolver } from "sanity/structure";

// Clean, non-technical desk: just the two things maintainers touch, with
// posts sorted newest-first by default. No raw type list to get lost in.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Blog posts")
        .icon(() => "📝")
        .child(
          S.documentTypeList("post")
            .title("Blog posts")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Authors")
        .icon(() => "✍️")
        .child(S.documentTypeList("author").title("Authors")),
    ]);
