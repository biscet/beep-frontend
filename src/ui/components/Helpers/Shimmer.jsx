import React from 'react';
import { TYPES_CATALOG_FIELDS } from 'src/dict/header-catalog';
import { crossPagination } from 'src/dict/pagination';
import { cx } from 'src/lib/lodash';

const sidebarRoutesShimmerStyle = (length) => ({ height: (54 * length) + (8 * (length - 2)) });

export const ShimmerUserInfo = React.memo(() => <div className="shimmer shimmer_user-info" />);

export const ShimmerBreadCrumbs = React.memo(() => <div className="shimmer shimmer_side-bar-breadcrumbs" />);

export const ShimmerSideBarCreateBtn = React.memo(() => <div className="shimmer shimmer_side-bar-link" />);

export const ShimmerSideBarLink = ({ length }) => <div className="shimmer shimmer_side-bar-link" style={sidebarRoutesShimmerStyle(length)} />;

export const ShimmerCodeResend = React.memo(() => <div className="shimmer shimmer_resend-code" />);

export const ShimmerProjectViewingValues = React.memo(() => (
  <>
    <div className="shimmer shimmer_project-viewing-values" />
    <div className="projects-viewing__divider" />

    <div className="shimmer shimmer_project-viewing-values" />
    <div className="projects-viewing__divider" />

    <div className="shimmer shimmer_project-viewing-values" />
    <div className="projects-viewing__divider" />

    <div className="shimmer shimmer_project-viewing-values" />
    <div className="projects-viewing__divider" />

    <div className="shimmer shimmer_project-viewing-values" />
  </>
));

export const ShimmerProjectUploading = React.memo(() => <div className="shimmer shimmer_project-uploading" />);

export const ShimmerProjectContent = React.memo(() => (
  <>
    <div className="shimmer shimmer_project-content-player" />
    <div className="shimmer shimmer_project-content-wave" />

    <div className="projects-content__button-box">
      <div className="shimmer shimmer_project-content-button" />
    </div>
  </>
));

export const ShimmerProjectContentWaveSurfer = React.memo(() => (
  <>
    <div className="shimmer shimmer_project-content-player" />
    <div className="shimmer shimmer_project-content-wave" />
  </>
));

export const ShimmerProjectCatalog = React.memo(({ cardType, count = 0 }) => (
  Array.from({ length: count <= 0 ? crossPagination : count }, () => '').map((_, i) => (
    <div
      className={cx({
        defaultClass: ['shimmer', 'projects-catalog__card', 'card'],
        activeClass: 'shimmer_project-catalog-row',
        nonActiveClass: 'shimmer_project-catalog-column',
        condition: TYPES_CATALOG_FIELDS.ROW !== cardType,
      })}
      key={i}
      data-card={cardType === TYPES_CATALOG_FIELDS.ROW ? 'false' : 'true'}
    />
  ))
));

export const ShimmerPaymentsQuantity = React.memo(() => <div className="shimmer shimmer_payment-cards-quantity" />);

export const ShimmerPaymentsButton = React.memo(() => <div className="shimmer shimmer_payment-cards-button" />);
