'use client'

import GlobeTmpl from 'react-globe.gl'

// Wrapper component to properly forward ref in Next.js dynamic import
// See: https://github.com/vasturiano/react-globe.gl/issues/15
// See: https://github.com/vasturiano/react-globe.gl/issues/45
export default function GlobeWrapper({
  forwardRef,
  ...otherProps
}: { forwardRef: React.MutableRefObject<any> } & any) {
  return <GlobeTmpl {...otherProps} ref={forwardRef} />
}
