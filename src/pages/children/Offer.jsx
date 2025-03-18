/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';

export const Offer = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('/docs/offer.html')
      .then((response) => response.text())
      .then((data) => { setHtmlContent(data); });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};