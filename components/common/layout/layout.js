import React from 'react';


export const Layout = ({ children }) => {
  return (
    <>
      <header className="header__navbar__main__section">
        <div className="screen-container">
          <div className="row">
            <div className="col-12">
              <div className="header__navbar__main__section__container">
                <div>
                  <div className="header__navbar__main__section__descriptor">
                    Сеть магазинов боевой экипировки
                  </div>
                </div>

                <div>
                  <div className={'header__navbar__main__section__phone'}>
                    <a href="tel:84959999999">+7 (495) 999 99 99</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={'header__offset__top'}></div>

      <div id="main">
        {children}
      </div>

      <footer>
        <div className="screen-container">
          <div>&copy; Интернет-магазин &laquo;Военный стиль&raquo; 2023. Все права защищены. </div>
        </div>
      </footer>
    </>
  );
};

export const withLayout = (Component) => {
  return function withLayoutComponents(props) {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
