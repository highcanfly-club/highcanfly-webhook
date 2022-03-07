import { VercelRequest, VercelResponse } from "@vercel/node";
import sanityClient from "../../src/sanity";
import algoliaSearch from "../../src/algolia";
import { algoliaIndexer } from "../../src/algolia";
import { WebhookBody } from "../../src/types";


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
  //compatibility between v1 and v2 webhook
  let  _idsBody: WebhookBody = { ids: { created: [], updated: [], deleted: [] }};
  if (req.body.ids === undefined){
    _idsBody.ids.created.push(req.body._id);
  }else{
    _idsBody = req.body;
  }

  console.log(`INCOMING_REQUEST:${JSON.stringify(req.body)}`);
  const sanityAlgolia = algoliaIndexer;

  return sanityAlgolia
    .webhookSync(client, _idsBody)
    .then(() => res.status(200).send(`ok`));
};

export default handler;
