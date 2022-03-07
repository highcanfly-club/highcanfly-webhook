import { VercelRequest, VercelResponse } from '@vercel/node'
import { getSanityClient } from '../../src/sanity';
import {algoliaIndexer} from '../../src/algolia';


const handler = async (req: VercelRequest, res: VercelResponse) => {
    
    // Fetch the _id of all the documents we want to index
    const types = ["post","club"];
    const query = `* [_type in ["post","club"] && !(_id in path("drafts.**"))][]._id`

  //  if ((req.headers['content-type'] !== 'application/json')) {
    const hook = (req.query.token === undefined) ? '' : req.query.token;
    if (hook !== process.env.HOOK_TOKEN){
      res.status(400)
      res.json({ message: 'Bad token' })
      return
    }

    const datasetName = (req.query.dataset === undefined) ? '' : (typeof(req.query.dataset) === 'string') ? req.query.dataset : req.query.dataset[0];
    if (datasetName.length === 0){
      res.status(400)
      res.json({ message: 'Bad dataset' })
      return
    }
    const sanityAlgolia = algoliaIndexer(`highcanfly-${datasetName}-index`);
    const client = getSanityClient(  process.env.SANITY_PROJECT_ID,
      datasetName,
      process.env.SANITY_TOKEN,
      true,
      process.env.SANITY_API_VERSION);
    client.fetch(query, { types }).then(ids => 
        sanityAlgolia.webhookSync(client, { ids: { created: ids, updated: [], deleted: [] }})
        .then(() => {
            res.status(200).send("Index created");})
        //console.log(ids)
      );
  }
  
  export default handler

