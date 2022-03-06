import { VercelRequest, VercelResponse } from "@vercel/node";
import sanityClient from "../../src/sanity";
import algoliaSearch from "../../src/algolia";
import { algoliaIndexer } from "../../src/algolia";


const algolia = algoliaSearch;
const client = sanityClient;


const handler = async (req: VercelRequest, res: VercelResponse) => {

  const hook = req.query.token === undefined ? "" : req.query.token;
  if (
    req.headers["content-type"] !== "application/json" &&
    hook !== process.env.HOOK_TOKEN
  ) {
    res.status(400);
    res.json({ message: "Bad request" });
    return;
  }
  console.log(`INCOMING_REQUEST:${req.body}`);
  const sanityAlgolia = algoliaIndexer;

  return sanityAlgolia
    .webhookSync(client, req.body)
    .then(() => res.status(200).send("ok"));
};

export default handler;
