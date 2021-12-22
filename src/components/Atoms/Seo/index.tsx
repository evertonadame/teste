import Head from 'next/head';

type SeoProps = {
  title: string;
  metaDesc?: string;
}

export const Seo = ({ title, metaDesc }:SeoProps): JSX.Element => (
  <Head>
    <title>{title}</title>
    {metaDesc && (
      <meta name="description" content={metaDesc} />
    )}
  </Head>
);
