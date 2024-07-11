import { useUnit } from 'effector-react';
import React from 'react';
import { Helmet as Head } from 'react-helmet';
import { HELMET_FIELDS } from 'src/dict/fields/app';
import { $helmetDataCombine } from 'src/models/App';

export const Helmet = () => {
  const {
    [HELMET_FIELDS.TITLE]: helmetTitle,
    [HELMET_FIELDS.DESCRIPTION]: helmetDescription,
    [HELMET_FIELDS.KEYWORDS]: helmetKeywords,
  } = useUnit($helmetDataCombine);

  return (
    <Head>
      <title>{helmetTitle}</title>

      <meta name="description" content={helmetDescription} />
      <meta name="keywords" content={helmetKeywords} />

      <meta property="og:title" content={helmetTitle} />
      <meta property="og:description" content={helmetDescription} />
      <meta property="og:keywords" content={helmetKeywords} />
    </Head>
  );
};
