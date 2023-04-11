import Link from 'next/link';
import axios from 'axios';
import withLayout from '@/components/common/layout';
import Head from 'next/head';
import CatalogItem from '@/components/catalog/catalog-item';
import {useMemo} from 'react';
import {Tabs, Tab} from 'react-bootstrap';


function Home({
  categories,
  productGroups,
  productsByGroups
}) {

  const productsForTabs = useMemo(() => {

    let r = {};

    productsByGroups.forEach(item => {
      for (let i = 0; i < item.productGroups.length; i++) {

        if (typeof r[item.productGroups[i].id] !== 'object') {
          r[item.productGroups[i].id] = {};
        }

        if (typeof r[item.productGroups[i].id][item.productCategory.id] === 'undefined') {
          r[item.productGroups[i].id][item.productCategory.id] = [];
        }

        r[item.productGroups[i].id][item.productCategory.id].push(item);
      }
    });

    return r;

  }, []);


  const renderTabsWithProducts = groupProducts => {

    const categoryIdList = [];

    for (const [key] of Object.entries(groupProducts)) {
      categoryIdList.push(key);
    }

    const defaultActiveKey = categoryIdList[0] ?? null;

    const tabs = categoryIdList.map(categoryId => {

      const categoryIdx = categories.findIndex(el => el.categoryId == categoryId);

      return (
        <Tab key={ categoryId }
             eventKey={ categoryId }
             title={ `${ categories[categoryIdx].name }` }>
          <div className="overflow-x__container">
            {
              groupProducts[categoryId]
                .map(product => {
                  return (
                    <div key={ product.id } className="inline-container">
                      <CatalogItem item={product} />
                    </div>
                  )
                })
            }
          </div>
        </Tab>
      );
    });

    return [defaultActiveKey, tabs]
  };


  const renderProductsByTabs = groupId => {

    const groupProducts = productsForTabs[groupId] ?? [];

    const [defaultActiveKey, tabs] = renderTabsWithProducts(groupProducts);

    return (
      <Tabs defaultActiveKey={ defaultActiveKey } id={ `group-tabs-${ groupId }` }>
        { tabs }
      </Tabs>
    )
  };


  return (
    <>
      <Head>
        <title>Экипировка в наличии</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="screen-container">
        <div className="home">
          <div className="homepage__products-by-groups">
          {
            productGroups
              .sort((a, b) => (a.homepageSort >= b.homepageSort))
              .map(group => {
              return (
                <div className="homepage__products-by-groups__section">
                  <h2 className="homepage__products-by-groups__title">{ `${ group.name }` }</h2>

                  <div style={ { paddingTop: '15px' } }></div>

                  { renderProductsByTabs(group.id) }

                </div>
              );
            })
          }
          </div>

          <div className="homepage__categories__section">
            <h2 className="homepage__categories__title">Категории товаров</h2>

            {
              categories.map(item => {
                return (
                  <div className={'homepage__product-category__col'} key={`cat-item-${item.id}`}>
                    <Link href={'/catalog/' + item.alias}>
                      <div className="homepage__product-category__container">
                        <div className="catalog__item__image__row">
                          <div className="catalog__item__image__container">
                            <div className="catalog__item__image__substrate">
                              <img className="catalog__item__image"
                                   src={ `${ item.picture }` }
                                   alt={ '' }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
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
