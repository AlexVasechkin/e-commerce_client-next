import React, {useMemo} from 'react';
import FastOrderModal from '@/components/common/fast-order-modal';
import { NumericFormat } from 'react-number-format';
import { Delius } from '@next/font/google';
import {useRouter} from 'next/router';

const fontDelius = Delius({weight: '400', subsets: ['latin']});


const CatalogItem = ({
  item = {
    id: 0,
    price: 0,
    code: '',
    images: [],
    name: '',
    productGroups: [],
    vendor: {
      id: 0,
      name: ''
    }
  }
}) => {
  const [firstImage = {}] = item.images;
  const { path = '', description = '' } = firstImage;
  const router = useRouter();

  return <div className="catalog__item">
    <div className="catalog__item__code__row">
      <div className="catalog__item__code__container">
        <div>
          <div>
            <div className="catalog__item__vendor">{ `${ item.vendor.name ?? '' }` }</div>
          </div>
        </div>

        <div>
          <div className="catalog__item__code">{ `${ item.code }` }</div>
        </div>

      </div>
    </div>
    <div className="catalog__item__image__row">
      <div className="catalog__item__image__container">
        <div className="catalog__item__image__substrate">
          <img className="catalog__item__image"
            src={ `${ path }` } alt={ description } />
        </div>
      </div>
    </div>
    <div className="catalog__item__group__row">
      { Array.isArray(item.productGroups) && item.productGroups.map(item => {
          return (
            <div key={`pg-${item.id}`} className="catalog__item__group__sticker-container">
              <div className="catalog__item__group__sticker">{`${ item.name }`}</div>
            </div>
          )
        })
      }
    </div>
    <div className="catalog__item__prices__row">
      <div className="catalog__item__prices__container">
      <div>
        <div className={['catalog__item__prices__price', fontDelius.className].join(' ')}>
          <NumericFormat value={ item.price }
                         displayType={ 'text' }
                         thousandSeparator=" " /> &#8381;
        </div>
      </div>
      <div>
        <FastOrderModal
          getInitComponents={ (show) => <button onClick={ show } className="btn btn-outline-success">Заказать</button> }
          item = { {...item, path} }
          onSuccess={ ({ orderId = '', close }) => {
            close();
            router.push(`/order-info/${ orderId }`)
          }}
        />
      </div>
      </div>
    </div>
    <div className="catalog__item__deliveries__row">
      <div className="catalog__item__deliveries__container">
        <div>
          <div className="catalog__item__available"><i className="fa fa-circle" /> в наличии</div>
        </div>
        <div>
          <div className="catalog__item__delivery-time">от 2-х дней</div>
        </div>
      </div>
    </div>
    <div className="catalog__item__name__row">
      <div className="catalog__item__name__container">
        <div className="catalog__item__name">
          <span className="catalog__item__name-category">{ `${ item.productCategory.nameSingle }` }</span>
          <br />
          <span className="catalog__item-vendor-name">{ `${ item.vendor.name ?? '' }` }</span> {`${ item.name ?? '' }`}
        </div>
      </div>
    </div>
  </div>;
};

export default CatalogItem;  
