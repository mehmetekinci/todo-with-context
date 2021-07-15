import React from 'react';
import { GlobalState } from './Global';

export const useGlobalState = () => React.useContext(GlobalState);
