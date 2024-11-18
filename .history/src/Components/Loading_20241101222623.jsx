import React, { Fragment } from 'react'
import { ThreeCircles } from 'react-loader-spinner'

export default function Loading() {
  return (
    <Fragment>
    <div className="row justify-content-center align-items-center vh-100 p-0 m-0" >
    <ThreeCircles
      visible={true}
      height="100"
      width="100"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}}
      wrapperClass="main-color justify-content-center overflow-hidden"
    />
    </div>
    </Fragment>
  )
}
