import React from 'react';

import CloseIcon from "../../../../assets/close-icon.svg";

import { BoxInfoRootProps } from './box-info.types';
import { boxInfoCloseButtonVariants, boxInfoRootVariants } from './box-info.variants';

const BoxInfoRoot: React.FC<BoxInfoRootProps> = ({ type, className, children, onClosed, ...props }) => {
  return (
    <div className={boxInfoRootVariants({ type, className })} {...props}>
      {children}

      {onClosed && (
        <button type="button" onClick={onClosed} className={boxInfoCloseButtonVariants({ type })}>
          <CloseIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default BoxInfoRoot;
