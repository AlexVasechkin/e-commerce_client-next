import React from 'react';

import globalSettings from '@/components/common/global-settings';


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
                    <a href={ `tel:${ globalSettings.phone.value }` } >{ `${ globalSettings.phone.caption }` }</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={'header__offset__top'}></div>

      <div id="main">
        <div className="screen-container">
          <div className="main-navigation">
            <div className="main-navigation__container">
              <div className="main-navigation__item">
                <a className="main-navigation__item-link"
                   href="/"
                   title="Главная"
                >Главная</a>
              </div>

              {/*<div className="main-navigation__item">*/}
              {/*  <a className="main-navigation__item-link"*/}
              {/*     href="/catalog"*/}
              {/*     title="Каталог"*/}
              {/*  >Каталог</a>*/}
              {/*</div>*/}

              {/*<div className="main-navigation__item">*/}
              {/*  <a className="main-navigation__item-link"*/}
              {/*     href="/pickup-points"*/}
              {/*     title="Пункты выдачи"*/}
              {/*  >Пункты выдачи</a>*/}
              {/*</div>*/}

              <div className="main-navigation__item">
                <a className="main-navigation__item-link"
                   href="/contacts"
                   title="Контакты"
                >Контакты</a>
              </div>

            </div>
          </div>

          {children}

        </div>
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
  return function withLayoutComponent(props) {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
