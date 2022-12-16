import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: '6m3bq7ij',
    dataset: 'production',
    apiVersion: '2022-12-15',
    useCdn: true,
    // token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    token: 'sktk8uB5sgiskQs2dSwXqRHFVY1J0jtlPLvY8NJHH3sKcFdrETyVtU0cVq6ddUiUQSrGpMz5NQ6KSC1wi73JY86ee3zKqVD6A823v3Dqu9eMIpMBjG6Yq9hmYkKOYKTjEgm75s2M7aI1YPezw61Acf0QpUK3YaXutcnvCxPkoKwNxroSNlOB',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);