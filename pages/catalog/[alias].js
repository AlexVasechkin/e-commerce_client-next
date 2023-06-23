import React, {useMemo, useState} from 'react';
import withLayout from '@/components/common/layout';
import axios from 'axios';
import CatalogItem from '@/components/catalog/catalog-item';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PageNavigator from '@/components/common/page-navigator';
import {ucFirst} from '@/components/utils/func';
import Breadcrumbs from "@/components/common/breadcrumbs";
import InnerPage from "@/components/common/inner-page";


const CatalogCategoryPage = ({
  pageData,
  products,
  qp,
  groups,
  productsByGroups
}) => {

  const router = useMemo(() => useRouter(), []);

  const baseUrl = useMemo(() => {
    const [base = '/'] = router.asPath.split('?');
    return base;
  }, []);


  const [_searchString, setSearchString] = useState(qp.searchString);


  const createUrl = (base, queryParams) => {

    const paramsValues = [];

    for (let key in queryParams) {
      paramsValues.push(`${ key }=${ queryParams[key] }`);
    }

    return base + '?' + paramsValues.join('&')
  };


  const generateUrl = (params) => {

    const queryParams = {};

    for (let key in qp) {
      if (!['searchString', 'page'].includes(key)) {
        queryParams[key] = qp[key];
      }
    }

    if ((typeof params.page === 'number') && params.page > 1) {
      queryParams.page = params.page;
    }

    if ((typeof params.searchString === 'string') && (params.searchString.length > 0)) {
      queryParams.search_string = params.searchString;
    }

    return createUrl(baseUrl, queryParams);
  };


  const onSearchFormSubmit = e => {

    e.preventDefault();

    router.push(generateUrl({
      searchString: _searchString,
      page: qp.page
    }));
  }


  const Navigator = () => {
    return (
      <PageNavigator currentPage={ products.currentPage }
                     totalPageCount={ products.totalPageCount }
                     firstPageUrl={ qp.page < 2 ? null : generateUrl({ searchString: _searchString, page: 1 }) }
                     onFirstPageClick={ () => null }
                     prevPageUrl={ qp.page - 1 < 1 ? null : generateUrl({ searchString: _searchString, page: qp.page - 1 }) }
                     onPrevPageClick={ () => null }
                     nextPageUrl={ qp.page + 1 > products.totalPageCount ? null : generateUrl({ searchString: _searchString, page: qp.page + 1 }) }
                     onNextPageClick={ () => null }
                     lastPageUrl={ qp.page >= products.totalPageCount ? null : generateUrl({ searchString: _searchString, page: products.totalPageCount }) }
                     onLastPageClick={ () => null }
      />
    )
  }


  const productsByGroupsBlock = () => {
    return (
      <div className="catalog__products-by-groups">
        {
          groups
            .sort((a, b) => (a.sortOrder >= b.sortOrder))
            .map(group => {
              return (
                <div className="homepage__products-by-groups__section" key={ `c-g-${ group.id }` }>
                  <div className="section-headline__container">
                    <h2 className="section-headline">{ ucFirst(`${ group.name }`) }</h2>
                  </div>

                  <div>
                    <div className="overflow-x__container">
                      {
                        productsByGroups
                          .filter(el => Array.from(el.productGroups, ({id}) => id).includes(group.id))
                          .map(product => {
                            return (
                              <div className="inline-container" key={ `c-i-${ product.id }` }>
                                <CatalogItem item={product} />
                              </div>
                            )
                          })
                      }
                    </div>
                  </div>
                </div>
              );
            })
        }
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{`${ pageData.pagetitle }`}</title>
        <meta name="description" content={ `${pageData.description ?? ''}` } />
      </Head>

      <InnerPage headline={ucFirst(`${ pageData.headline }`)}
                 breadcrumbs={[{url: '', caption: ucFirst(`${ pageData.pagetitle ?? '' }`)}]}
      >
        <div className="catalog">
          {
            qp.page === 1 && qp.searchString.length === 0 && productsByGroupsBlock()
          }

          <div className={ 'catalog__all-products' }>
            <div className={ 'section-headline__container' }>
              <h2 className="section-headline">{ `Все ${ pageData.headline ?? '' }` }</h2>
            </div>

            <div className="catalog__search-form__section">
              <div className="catalog__search-form">
                <div className="screen-container">
                  <form method={'GET'}
                        onSubmit={ onSearchFormSubmit }
                        className="input-group">
                    <input type="form-control"
                           name="search_string"
                           value={ _searchString }
                           onChange={ e => setSearchString(e.target.value) }
                    />
                    <div className="input-group-append">
                      <button type="submit"
                              className="btn btn-outline-primary"
                      >Найти</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className={ 'catalog__page-navigator text-center' }>
              <Navigator />
            </div>

            <div className="catalog__items">
              {products.payload.map(product => <div key={ `c-i-${ product.id }` }
                                                    className="grid-container">
                  <CatalogItem item={ product } />
                </div>
              )}

            </div>

            <div className={ 'catalog__page-navigator text-center' }>
              <Navigator />
            </div>
          </div>

          {
            ((qp.page > 1) || (qp.searchString.length > 0)) && productsByGroupsBlock()
          }
        </div>
      </InnerPage>
    </>
  )
};

export const getServerSideProps = async ({ params, query }) => {

  const { alias = '' } = params;
  const {
    page = '',
    search_string = ''
  } = query;

  const queryParams = {
    page: 1,
    searchString: ''
  };

  let qPage = null;
  try {
    qPage = parseInt(page);
  } catch (e) {
    qPage = 1;
  }

  if (qPage > 1) {
    queryParams.page = qPage;
  }

  const pageData = await axios
    .post(process.env.API_HOST + '/api/v1/public/product-category', {
      alias
    })
    .then(({ data }) => {
      const { payload = null } = data;
      return payload;
    });

  const products = await axios
    .post(process.env.API_HOST + '/api/v1/public/products', {
      filters: {
        categoryAlias: alias,
        productPageActive: true,
        searchString: search_string
      },
      limit: 12,
      currentPage: queryParams.page
    })
    .then(({ data }) => {
      return data;
    });

  const { productsByGroups = [], groups = [] } = await axios
    .get(`${ process.env.API_HOST }/api/v1/public/category-products-by-groups/${ pageData.productCategoryId }`)
    .then(({ data = {} }) => {
      const {
        payload = {}
      } = data;

      const { products = [], groups = [] } = payload;

      return {
        productsByGroups: products,
        groups
      }
    })

  if (search_string.length > 0) {
    queryParams.searchString = search_string;
  }

  return {
    props: {
      pageData,
      products,
      qp: queryParams,
      productsByGroups,
      groups
    }
  }
};

export default withLayout(CatalogCategoryPage);
