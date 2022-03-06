import { SanityDocumentStub } from '@sanity/client'
import { VercelRequest, VercelResponse } from '@vercel/node'
import sanityClient from '../../src/sanity';
import algoliaSearch from '../../src/algolia';
import {algoliaIndexer} from '../../src/algolia';
import indexer, { flattenBlocks } from '../../src/index'


const handler = async (req: VercelRequest, res: VercelResponse) => {

    const algolia = algoliaSearch;
    const client = sanityClient;
    
    // Fetch the _id of all the documents we want to index
    const types = ["post","club","author","clubtype"];
    const query = `* [_type in ["post","club","author","clubtype"] && !(_id in path("drafts.**"))][]._id`
    const sanityAlgolia = algoliaIndexer;

  //  if ((req.headers['content-type'] !== 'application/json')) {
    const hook = (req.query.token === undefined) ? '' : req.query.token;
    if (hook !== process.env.HOOK_TOKEN){
      res.status(400)
      res.json({ message: 'Bad request' })
      return
    }
  
    client.fetch(query, { types }).then(ids => 
        sanityAlgolia.webhookSync(client, { ids: { created: ids, updated: [], deleted: [] }})
        .then(() => {
            res.status(200).send("Index created");})
        //console.log(ids)
      );
  }
  
  export default handler

