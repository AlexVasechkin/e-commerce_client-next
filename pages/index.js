import Link from 'next/link';
import axios from 'axios';
import withLayout from '@/components/common/layout';
import Head from 'next/head';
import CatalogItem from '@/components/catalog/catalog-item';


function Home({ categories, productGroups, productsByGroups }) {
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
             <div className={'homepage__product-category__col'} key={`cat-item-${item.id}`}>
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

          <div className="homepage__products-by-groups">
          {
            productGroups
              .sort((a, b) => (a.homepageSort >= b.homepageSort))
              .map(group => {
              return (
                <div className="homepage__products-by-groups__section">
                  <h2 className="homepage__products-by-groups__title">{ `${ group.name }` }</h2>
                  <hr/>
                  <div>
                    <div className="overflow-y__container">
                      {
                        productsByGroups
                          .filter(el => Array.from(el.productGroups, ({id}) => id).includes(group.id))
                          .map(product => {
                            return (
                              <div className="inline-container">
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

  const productGroups = await axios
    .post(process.env.API_HOST + '/api/v1/public/product-group/list', {
      isToHomepage: true
    })
    .then(({ data = {} }) => {
      const { payload = [] } = data;
      return payload;
    })
  ;

  const productsByGroups = productGroups.length > 0
    ? await axios
        .post(process.env.API_HOST + '/api/v1/public/products', {
          productGroupIdList: Array.from(productGroups, ({ id }) => id),
          limit: 1000
        })
        .then(({ data = {} }) => {
          const { payload = [] } = data;
          return Array.isArray(payload) ? payload : [];
        })
    : []
  ;

  return {
    props: {
      categories,
      productGroups,
      productsByGroups
    }
  };
}

export default withLayout(Home);
