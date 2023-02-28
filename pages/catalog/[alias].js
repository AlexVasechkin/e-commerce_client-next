import React from 'react';
import withLayout from '@/components/common/layout';
import axios from 'axios';
import CatalogItem from '@/components/catalog/catalog-item';
import Head from 'next/head';


const CatalogCategoryPage = ({ pageData, products }) => {
  return (
    <>
      <Head>
        <title>{`${ pageData.pagetitle }`}</title>
        <meta name="description" content={ `${pageData.description ?? ''}` } />
      </Head>

      <div className="screen-container">
        <div className="page-headline-row">
          <h1>{`${ pageData.headline }`}</h1>
          <hr/>
        </div>

        <div className="catalog__items">
          {products.map(product => <CatalogItem  key={ `catalog-item-${ product.id }` }
                                                 item={ product } />
          )}
        </div>

      </div>
    </>
  )
};

export const getServerSideProps = async ({ params }) => {

  const { alias = '' } = params;

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
        categoryAlias: alias
      }
    })
    .then(({ data }) => {
      const { payload = null } = data;
      return payload;
    });

  return {
    props: {
      pageData,
      products
    }
  }
};

export default withLayout(CatalogCategoryPage);
