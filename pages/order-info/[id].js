import React from 'react';
import withLayout from '@/components/common/layout';
import axios from 'axios';
import CatalogItem from '@/components/catalog/catalog-item';
import Head from 'next/head';
import OrderItem from '@/components/common/product/order-item';


const OrderInfoPage = ({
  order
}) => {
  return (
    <>
      <Head>
        <title>{ `Заказ ${ order.id }` }</title>
      </Head>

      <div className="order-info" >
        <div className="screen-container">
          <div className="page-headline-row">
            <div className={'main-headline__container'}>
              <h1 className={ 'main-headline' }>{ `Заказ ${ order.id }` }</h1>
            </div>
          </div>

          <div className={ 'section-headline__container' }>
            <h2 className="section-headline">Состав заказа</h2>
          </div>

          <div className="catalog__items">
            {order.products.map(product => <div key={ `c-i-${ product.id }` }
                                                className="grid-container">
                <OrderItem item={ product } />
              </div>
            )}
          </div>

        </div>
      </div>

    </>
  )
};

export const getServerSideProps =  async ({ params }) => {

  const { id = '' } = params;

  const order = await axios
    .get(`${ process.env.API_HOST }/api/v1/public/order/${ id }`)
    .then(({ data = {} }) => {
      return data;
    })

  return {
    props: {
      order
    }
  }
};

export default withLayout(OrderInfoPage);
