import React from 'react';


const CountSwitcher = ({
  value,
  dec,
  inc
}) => {
  return <div className="btn-group">
    <button type={ 'button' } className="btn btn-outline-secondary" onClick={ dec }>-</button>
    <button type={ 'button' } className="btn btn-outline-secondary disabled" disabled>{ value }</button>
    <button type={ 'button' } className="btn btn-outline-secondary" onClick={ inc }>+</button>
  </div>
};

export default CountSwitcher;
