import React, { lazy, Suspense } from 'react'
import Loader from './components/Loader'

const Load = (path) => (props) => {
  const Component = lazy(() => import(path))
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  )
}

export default Load
