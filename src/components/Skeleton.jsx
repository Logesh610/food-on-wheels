import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={twMerge('skeleton animate-pulse', className)}
      {...props}
    />
  );
};

export default Skeleton;
