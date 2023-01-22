import React, {useState} from 'react';
import axios from 'axios';
import { FormGroup } from 'react-bootstrap';
import CountSwitcher from '@/components/common/count-switcher';


export const FastOrderForm = ({
  item,
  onSuccess
}) => {

  const [isAwait, setIsAwait] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = e => {
    e.preventDefault();
  }

  const getForm = () => <form onSubmit={ onSubmit }>
    <p className="h4">{ 'Вы заказываете:' }</p>
    <p className="h3">{ `${ item.name }` }</p>

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
          <div>{ `${ item.price } р.` }</div>
        </div>
        <div>
          <div className="small text-grey">на сумму</div>
          <div>{ `${ item.price * count } р.` }</div>
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
      <div className="text-right"><button className="btn btn-outline-success" type="submit">Заказать</button></div>
    </div>

  </form>;

  return getForm();
};
