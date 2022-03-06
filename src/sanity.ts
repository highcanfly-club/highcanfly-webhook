import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    useCdn: true,
    "apiVersion": process.env.SANITY_API_VERSION,
  });