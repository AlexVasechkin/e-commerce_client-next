import React from 'react';

const Breadcrumbs = ({
  items = [
    {
      url: '/',
      caption: ''
    }
  ]
}) => {

  const _items = [...[{url: '/', caption: 'Главная'}], ...items];

  return (
    <>
      <div className={ 'catalog__nav-container' }>
        <nav>
          <ol className="breadcrumb">
            {
              _items.map((item, index) => {
                return (typeof _items[index + 1] === 'undefined')
                  ? (
                        <li key={index} className="breadcrumb-item active"
                            aria-current="page"
                        >{ `${ item.caption ?? '' }` }</li>
                    )
                  : (<li key={index} className="breadcrumb-item"><a href="/" title={ `${ item.caption ?? '' }` }>{ `${ item.caption ?? '' }` }</a></li>)
              })
            }
          </ol>
        </nav>
      </div>
    </>
  )
}

export default Breadcrumbs
