import React, {Suspense} from 'react';
import {IRouteObj} from '../@types/routes';
import {Dig} from '../@types/helper';
import {Indexable} from '../@types/common';
import Fallback from '../components/common/Fallback';

const lazy = (
  target: Dig<IRouteObj, 'component'>,
  fallback?: Dig<React.SuspenseProps, 'fallback'>
) => {
  const Lazy = (props: Indexable) => {
    const LazyComp = React.lazy(target);
    const fb = fallback || (
      props.location.pathname === '/'
        ? ''
        : <Fallback/>
    );

    return (
      <Suspense fallback={fb}>
        <LazyComp {...props}/>
      </Suspense>
    );
  };

  return Lazy;
};

export default lazy;
