import React from 'react';
import Breadcrumbs from "@/components/common/breadcrumbs";

const InnerPage = ({
  children,
  headline,
  breadcrumbs
}) => {
  return (
    <div className="inner-page">
      <div className="page-headline-row">
        <div className={'main-headline__container'}>
          <h1 className={ 'main-headline' }>{ `${ headline }` }</h1>
        </div>
      </div>

      <div className="breadcrumb__container">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {children}

    </div>
  )
}

export default InnerPage
