import { createComponent } from 'effector-react';
import React, { useContext } from 'react';
import { Helmet as Head } from 'react-helmet';
import { HELMET_FIELDS } from 'src/dict/fields/models/app';
import { $helmetCombineData } from 'src/models/Helpers/Helmet';
import { I18nContext } from './i18n';

export const Helmet = createComponent($helmetCombineData, (_, helmetCombineData) => {
  const t = useContext(I18nContext);
  const {
    [HELMET_FIELDS.TITLE]: helmetTitle,
    [HELMET_FIELDS.DESCRIPTION]: helmetDescription,
    [HELMET_FIELDS.KEYWORDS]: helmetKeywords,
  } = helmetCombineData;

  return (
    <Head>
      <title>{t(helmetTitle)}</title>

      <meta name="description" content={helmetDescription} />
      <meta name="keywords" content={helmetKeywords} />

      <meta property="og:title" content={helmetTitle} />
      <meta property="og:description" content={helmetDescription} />
      <meta property="og:keywords" content={helmetKeywords} />
    </Head>
  );
});
