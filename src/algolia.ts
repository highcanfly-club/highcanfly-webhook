import { SanityDocumentStub } from "@sanity/client";
import indexer, { flattenBlocks } from "./index";
import algoliasearch from "algoliasearch";
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID !== undefined ? process.env.ALGOLIA_APP_ID : "",
  process.env.ALGOLIA_ADMIN_KEY !== undefined
    ? process.env.ALGOLIA_ADMIN_KEY
    : ""
);
const algoliaIndex = algolia.initIndex("highcanfly-index");

const algoliaIndexer = indexer(
  {
    post: {
      index: algoliaIndex,
    },
    club: { index: algoliaIndex },
  },

  (document: SanityDocumentStub) => {
    switch (document._type) {
      case "post":
        return {
          title: document.title,
          slug: document.slug.current,
          body: flattenBlocks(document.body),
        };
      case "club":
        return {
          title: document.name,
          body: document.web,
        };
      default:
        throw new Error("You didnt handle a type you declared interest in");
    }
  },

  (document: SanityDocumentStub) => {
    if (document.hasOwnProperty("isHidden")) {
      return !document.isHidden;
    }
    return true;
  }
);
export { algoliaIndexer, algoliaIndex, algoliasearch };
export default algoliasearch(
  process.env.ALGOLIA_APP_ID !== undefined ? process.env.ALGOLIA_APP_ID : "",
  process.env.ALGOLIA_ADMIN_KEY !== undefined
    ? process.env.ALGOLIA_ADMIN_KEY
    : ""
);
