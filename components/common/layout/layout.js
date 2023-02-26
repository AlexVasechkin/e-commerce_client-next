import React from 'react';


export const Layout = ({ children }) => {
  return (
    <>
      <div style={{ marginTop: '50px' }}>
        {children}
      </div>

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
