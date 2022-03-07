import sanityClient from "@sanity/client";

const getSanityClient = (
  projectId: string = process.env.SANITY_PROJECT_ID,
  dataset: string = process.env.SANITY_DATASET,
  token: string = process.env.SANITY_TOKEN,
  useCdn: boolean = true,
  apiVersion: string = process.env.SANITY_API_VERSION
) => {
  return sanityClient({
    projectId: projectId,
    dataset: dataset,
    token: token,
    useCdn: useCdn,
    apiVersion: apiVersion,
  });
};
export default sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: true,
  apiVersion: process.env.SANITY_API_VERSION,
});

export { getSanityClient };
