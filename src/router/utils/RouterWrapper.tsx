import React from 'react';
import { Router } from 'react-router-dom';
import type { appHistory } from '..';

const RouterWrapper: React.FC<{ history: typeof appHistory }> = ({ history, children }) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return React.createElement(Router, Object.assign({ children, navigator: history }, state));
};

export default RouterWrapper;
