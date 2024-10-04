'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#22d3ee"
        options={{ showSpinner: false }}
        shallowRouting
        startPosition={0.6}
      />
    </>
  );
};

export default ProgressBarProvider;