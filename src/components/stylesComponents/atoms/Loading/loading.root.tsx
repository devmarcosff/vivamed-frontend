import React from 'react';

import clsx from 'clsx';

import { AiOutlineLoading3Quarters } from "react-icons/ai";


import { LoadingRootProps } from './loading.types';

const LoadingRoot: React.FC<LoadingRootProps> = ({ rootClass, loadClass, isLoading, children }) => {
  if (isLoading)
    return (
      <div role="status" className={rootClass}>
        <AiOutlineLoading3Quarters
          className={clsx('w-6 h-6', 'text-allintra-gray-400 animate-spin fill-allintra-primary-500', loadClass)}
        />
        <span className="sr-only">Loading...</span>
      </div>
    );

  return children;
};

export default LoadingRoot;
