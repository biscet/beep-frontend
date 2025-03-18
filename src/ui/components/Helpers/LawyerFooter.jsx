import React, { useContext } from 'react';
import { I18nContext } from './i18n';

export const LawyerFooter = React.memo(({ defaultPage = true }) => {
  const t = useContext(I18nContext);

  return (
    <div className="lawyer-footer">
      <div className="lawyer-footer__support">
        {defaultPage ? (
          <>
            <p>
              {t('Ваши вопросы и предложения вы можете отправлять по email-адресу:')}
              <span> support@get-beeped.tech</span>
            </p>
            <p>{t('Мы всегда готовы помочь вам!')}</p>
          </>
        ) : (
          <>
            <div className="lawyer-footer__body">
              {t('Договор публичной ')}
              <a
                href="/offer"
                target="__blank"
                rel="noopener noreferrer"
              >
                {t('оферты')}
              </a>
              {t(' о предоставлении услуг')}
            </div>

            <div className="lawyer-footer__body">
              <a
                href="/privacy"
                target="__blank"
                rel="noopener noreferrer"
              >
                {t('Политика обработки персональных данных')}
              </a>
            </div>
          </>
        )}
      </div>

      <div className="lawyer-footer__lawyer">
        <h4>{t('Юридическая информация')}</h4>
        <p>{t('Самозанятый {{value1}}', ['Кандрахин Никита Александрович'])}</p>
        <p>{t('ИНН: {{value1}}', ['637212006108'])}</p>
      </div>
    </div>
  );
});
