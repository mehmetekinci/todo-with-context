import React from 'react';

export const useGlobalState = () => React.useContext(window.GlobalState);
