import * as React from 'react'
import { Suspense } from 'react'
import { Loader } from '../common/Loader/Loader'

export const withSuspense = (WrappedComponent: any) => {
  const wrapperComponent = (props: any) => {
    return (
      <Suspense fallback={<Loader />}>
        <WrappedComponent {...props} />
      </Suspense>
    )
  }

  return wrapperComponent
}
