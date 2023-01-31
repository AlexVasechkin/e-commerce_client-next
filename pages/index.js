import Head from 'next/head'
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import CatalogItem from '@/components/catalog/catalog-item';

export default function Home({ payload }) {
  return (
    <>
      <Head>
        <title>Экипировка в наличии</title>
        <meta name="description" content="Военная и охотничья экипировка" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className={'header__offset__top'}></div>
        {[...new Set(payload.map(item => item.productCategory.name))]
          .map(categoryName =>
            (
              <div className={'homepage__category__block__container'}>
                <h2 className={'homepage__category__title'}>{ `${categoryName}` }</h2>
                <hr/>
                <Row>
                  {
                    payload
                      .filter(el => el.productCategory.name === categoryName)
                      .map(product => <CatalogItem item={ product } key={ `catalog-item-${ product.id }` } />)
                  }
                </Row>
              </div>
            )
          )
        }
      </Container>

      <footer>
        <div className={'container'}>
          <div>&copy; Интернет-магазин &laquo;Военный стиль&raquo; 2023. Все права защищены. </div>
        </div>
      </footer>

      <header>
        <div className="header__navbar__main__section">
          <div className="header__navbar__main__section__container">
            <div>
              <div className={'header__navbar__main__section__logo'}>

              </div>
            </div>

            <div>
              <div className={'header__navbar__main__section__phone'}>
                <a href="tel:84959999999">+7 (495) 999 99 99</a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export async function getServerSideProps() {
  const payload = await axios
    .post(process.env.API_HOST + '/api/v1/public/products')
    .then(({ data }) => {
      console.log(data);
      const { payload = null } = data;
      return payload;
    })
  ;

  return {props: { payload }};
}
