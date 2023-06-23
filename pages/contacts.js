import React from 'react'

import withLayout from '@/components/common/layout';
import Head from "next/head";
import InnerPage from "@/components/common/inner-page";
import globalSettings from "@/components/common/global-settings";

const ContactsPage = () => {
  return (
    <>
      <Head>
        <title>{ `Контакты` }</title>
        <meta name="description"
              content="Контакты"
        />
      </Head>

      <InnerPage breadcrumbs={[{url: '', caption: 'Контакты'}]}
                 headline={'Контакты'}>
        <div className="contacts-page">
          <div className={'text-page_container'}>
            <p>Сеть магазинов &laquo;Военный стиль&raquo; (Милитари лайфстайл)</p>
            <br/>
            <p>
              Самовывоз: Московская область, городской округ Мытищи, пос. Нагорное, <a href="https://yandex.ru/maps/-/CCUDbAagHA" title="Липкинское шоссе, дом 7">Липкинское шоссе, дом 7</a><br/>
              <br/>
              Телефон: <a href={`tel:${ globalSettings.phone.value }`}>{ `${ globalSettings.phone.caption }` }</a><br/>
              <br/>
              ИП Васечкин Александр Валерьевич<br/>
              ИНН 771552569722
            </p>
          </div>
        </div>
      </InnerPage>
    </>
  )
}

export default withLayout(ContactsPage)
