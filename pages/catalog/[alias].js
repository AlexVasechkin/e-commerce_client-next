import React, { useState } from 'react';
import withLayout from '@/components/common/layout';
import axios from 'axios';
import CatalogItem from '@/components/catalog/catalog-item';
import Head from 'next/head';
import {useRouter} from 'next/router';


const CatalogCategoryPage = ({ pageData, products, qp }) => {

  const router = useRouter();

  const { searchString = '' } = qp;
  const [_searchString, setSearchString] = useState(searchString);

  const onSearchFormSubmit = e => {
    e.preventDefault();

    const paramsValues = [];
    for (let key in qp) {
      if (!['searchString', 'page'].includes(key)) {
        paramsValues.push(`${ key }=${ qp[key] }`);
      }
    }

    if (_searchString.length > 0) {
      paramsValues.push(`search_string=${ _searchString }`);
    }

    const [base = '/'] = router.asPath.split('?');

    router.push(base + '?' + paramsValues.join('&'));
  }

  return (
    <>
      <Head>
        <title>{`${ pageData.pagetitle }`}</title>
        <meta name="description" content={ `${pageData.description ?? ''}` } />
      </Head>

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

      <div className="catalog">
        <div className="screen-container">
          <div className="page-headline-row">
            <h1>{`${ pageData.headline }`}</h1>
            <hr/>
          </div>

          <div className="catalog__items">
            {products.map(product => <div className="grid-container">
                <CatalogItem  key={ `c-i-${ product.id }` }
                              item={ product } />
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
};

export const getServerSideProps = async ({ params, query }) => {

  const { alias = '' } = params;
  const {
    page = '',
    search_string = ''
  } = query;

  const queryParams = {};

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
      const { payload = null } = data;
      return payload;
    });

  if (search_string.length > 0) {
    queryParams.searchString = search_string;
  }

  return {
    props: {
      pageData,
      products,
      qp: queryParams
    }
  }
};

export default withLayout(CatalogCategoryPage);
