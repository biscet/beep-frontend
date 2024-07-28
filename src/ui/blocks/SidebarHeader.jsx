import React from 'react';
import { LanguagePicker, ThemePicker, BreadCrumbs } from 'src/ui/components/Helpers';

export const SidebarHeader = () => (
  <div className="sidebar-header">
    <BreadCrumbs />

    <div className="sidebar-header__right-side">
      <ThemePicker />
      <LanguagePicker abrvLeftSide={false} />
    </div>
  </div>
);