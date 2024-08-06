import React from 'react';

const sidebarRoutesShimmerStyle = (length) => ({ height: (54 * length) + (8 * (length - 2)) });

export const ShimmerUserInfo = React.memo(() => <div className="shimmer shimmer_user-info" />);

export const ShimmerBreadCrumbs = React.memo(() => <div className="shimmer shimmer_side-bar-breadcrumbs" />);

export const ShimmerSideBarCreateBtn = React.memo(() => <div className="shimmer shimmer_side-bar-link" />);

export const ShimmerSideBarLink = ({ length }) => <div className="shimmer shimmer_side-bar-link" style={sidebarRoutesShimmerStyle(length)} />;
