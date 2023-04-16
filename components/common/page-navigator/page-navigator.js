import React from 'react';


const PageNavigator = ({
  currentPage,
  totalPageCount,
  firstPageUrl,
  onFirstPageClick,
  prevPageUrl,
  onPrevPageClick,
  nextPageUrl,
  onNextPageClick,
  lastPageUrl,
  onLastPageClick,
  firstPageDisabled = false,
  prevPageDisabled = false,
  nextPageDisabled = false,
  lastPageDisabled = false
}) => {
  return (
    <>
      <div className="btn-group">
        {
          firstPageUrl !== null && (
            <a href={ firstPageUrl }
               onClick={ onFirstPageClick }
               title={ 'в начало' }
               className={ [...['btn', 'btn-outline-dark'], ...[firstPageDisabled ? 'disabled' : '']].join(' ').trim() }
            >{ `|<` }</a>
          )
        }
        {
          prevPageUrl !== null && (
            <a href={ prevPageUrl }
               onClick={ onPrevPageClick }
               title={ 'назад' }
               className={ [...['btn', 'btn-outline-dark'], ...[prevPageDisabled ? 'disabled' : '']].join(' ').trim() }
            >{ `<` }</a>
          )
        }

        <button className="btn btn-outline-dark"
        >{ `${ currentPage }/${ totalPageCount }` }</button>

        {
          (nextPageUrl !== null) && (
            <a href={ nextPageUrl }
               onClick={ onNextPageClick }
               title={ 'далее' }
               className={ [...['btn', 'btn-outline-dark'], ...[nextPageDisabled ? 'disabled' : '']].join(' ').trim() }
            >{ '>' }</a>
          )
        }
        {
          lastPageUrl !== null && (
            <a href={ lastPageUrl }
               onClick={ onLastPageClick }
               title={ 'в конец' }
               className={ [...['btn', 'btn-outline-dark'], ...[lastPageDisabled ? 'disabled' : '']].join(' ').trim() }
            >{ '>|' }</a>
          )
        }
      </div>
    </>
  )
};

export default PageNavigator;
