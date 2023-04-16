import React, {useState} from 'react';
import CountSwitcher from '@/components/common/count-switcher';
import { NumericFormat } from 'react-number-format';
import {Delius} from '@next/font/google';

const fontDelius = Delius({weight: '400', subsets: ['latin']});


export const FastOrderForm = ({
  item,
  onSuccess
}) => {

  const [isAwait, setIsAwait] = useState(false);

  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = e => {
    e.preventDefault();
  }

  const getForm = () => <form onSubmit={ onSubmit }>
    <p className="h4">{ 'Вы заказываете:' }</p>
    <p className="h3">{ `${ [item?.vendor.name ?? '', item.name ?? ''].join(' ').trim() }` }</p>

    <div className="form-group">
      <div className="row">
        <div className="col-6">
          <div className="catalog__item__image__container">
            <div className="catalog__item__image__substrate">
              <img className="catalog__item__image"
                   src={ `${ item.path }` } alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="form-group">
      <div style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } } >
        <div>
          <div className="small text-grey">за шт.</div>
          <div className={ fontDelius.className }>
            <NumericFormat value={ item.price }
                           displayType={ 'text' }
                           thousandSeparator=" " /> &#8381;
          </div>
        </div>
        <div>
          <div className="small text-grey">на сумму</div>
          <div className={ fontDelius.className }>
            <NumericFormat value={ item.price * count }
                           displayType={ 'text' }
                           thousandSeparator=" " /> &#8381;
          </div>
        </div>
        <div>
          <CountSwitcher value={ count }
                            dec={ () => setCount(count - 1 < 1 ? 1 : count - 1) }
                            inc={ () => setCount(count + 1) }
          />
        </div>
      </div>
    </div>

    <div className="form-group">
      <label>Телефон</label>
      <input type="text"
             value={ name }
             className="form-control"
             disabled={ isAwait }
             onChange={ e => setName(e.target.value) }
      />
    </div>

    <div className="form-group">
      <label>Email</label>
      <input type="text"
             value={ email }
             className="form-control"
             disabled={ isAwait }
             onChange={ e => setEmail(e.target.value) }
      />
    </div>

    <div className="form-group">
      <label>Имя получателя</label>
      <input type="text"
             value={ phone }
             className="form-control"
             disabled={ isAwait }
             onChange={ e => setPhone(e.target.value) }
      />
    </div>

    <div className="form-group">
      <div className="text-right">
        <button className="btn btn-outline-success"
                type="submit"
        >Заказать</button>
      </div>
    </div>

  </form>;

  return getForm();
};
