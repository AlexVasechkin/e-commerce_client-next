import React from 'react';


const CountSwitcher = ({
  value,
  dec,
  inc
}) => {
  return <div className="btn-group">
    <button className="btn btn-outline-secondary" onClick={ dec }>-</button>
    <button className="btn btn-outline-secondary disabled" disabled={ true }>{ value }</button>
    <button className="btn btn-outline-secondary" onClick={ inc }>+</button>
  </div>
};

export default CountSwitcher;
