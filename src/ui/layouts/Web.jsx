import React, { useRef } from 'react';
import { useGate } from 'effector-react';
import { useHistory } from 'react-router-dom';
import { get, isEmptyRef } from 'src/lib/lodash';
import { RouteGate } from 'src/models/App';
import { LayoutGroup } from 'framer-motion';
import { Sidebar } from 'src/ui/blocks/Sidebar';
import { SidebarHeader } from 'src/ui/blocks/SidebarHeader';
import { ScrollToTop } from '../components/ScrollToTop';
import { Modal } from '../components/Helpers';

const WebLayout = ({ children }) => {
  useGate(RouteGate, {
    pathname: get(window, 'location.pathname', ''),
    pathParams: get(window, 'location.search', ''),
    history: useHistory(),
  });

  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  const contentContainer = !isEmptyRef(contentRef) ? null : contentRef.current;
  const wrapperContainer = !isEmptyRef(wrapperRef) ? null : wrapperRef.current;

  return (
    <LayoutGroup id="web">
      <Sidebar />

      <div className="web-content" ref={contentRef}>
        <SidebarHeader />

        <div className="web-content__wrapper" ref={wrapperRef}>
          {children}
        </div>

        <Modal container={contentContainer} />
      </div>

      <ScrollToTop container={wrapperContainer} />
    </LayoutGroup>
  );
};

export { WebLayout };
