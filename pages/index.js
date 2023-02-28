import Link from 'next/link';
import axios from 'axios';
import withLayout from '@/components/common/layout';
import Head from 'next/head';


function Home({ categories }) {
  return (
    <>
      <Head>
        <title>Экипировка в наличии</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="screen-container">
        <div className={'header__offset__top'}></div>

        <div className="home">
          {categories.map(item => {
            return (
             <div className={'col-12 col-sm-4 col-md-3 mt-15'} key={`cat-item-${item.id}`}>
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
        </div>

      </div>
    </>
  )
}

export async function getServerSideProps() {
  const categories = await axios
    .get(process.env.API_HOST + '/api/v1/public/product-category-pages')
    .then(({ data }) => {
      const { payload = null } = data;
      return payload;
    })
  ;

  return {props: { categories }};
}

export default withLayout(Home);
