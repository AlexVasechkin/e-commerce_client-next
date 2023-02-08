import Head from 'next/head'
import Link from 'next/link';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';

export default function Home({ categories }) {
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

        <Row>
          {categories.map(item => {
            return (
             <div className={'col-12 col-sm-4 col-md-3'}>
               <Link href={'/catalog/' + item.alias}>
                 <div className="homepage__product-category__container">
                   <div className="catalog__item__image__row">
                     <div className="catalog__item__image__container">
                       <div className="catalog__item__image__substrate">
                         <img className="catalog__item__image"
                              src={ `${ item.picture }` } alt={ '' } />
                       </div>
                     </div>
                   </div>
                 </div>
               </Link>
             </div>
            )
          })}
        </Row>
        {/*{[...new Set(payload.map(item => item.productCategory.name))]*/}
        {/*  .map(categoryName =>*/}
        {/*    (*/}
        {/*      <div className={'homepage__category__block__container'}>*/}
        {/*        <h2 className={'homepage__category__title'}>{ `${categoryName}` }</h2>*/}
        {/*        <hr/>*/}
        {/*        <Row>*/}
        {/*          {*/}
        {/*            payload*/}
        {/*              .filter(el => el.productCategory.name === categoryName)*/}
        {/*              .map(product => <CatalogItem item={ product } key={ `catalog-item-${ product.id }` } />)*/}
        {/*          }*/}
        {/*        </Row>*/}
        {/*      </div>*/}
        {/*    )*/}
        {/*  )*/}
        {/*}*/}
      </Container>

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

      <footer>
        <div className={'container'}>
          <div>&copy; Интернет-магазин &laquo;Военный стиль&raquo; 2023. Все права защищены. </div>
        </div>
      </footer>
    </>
  )
}

export async function getServerSideProps() {
  const categories = await axios
    .get(process.env.API_HOST + '/api/v1/public/product-category-pages')
    .then(({ data }) => {
      console.log(data);
      const { payload = null } = data;
      return payload;
    })
  ;

  return {props: { categories }};
}
