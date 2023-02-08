import React from 'react';

export const CatalogCategoryPage = ({ alias }) => {
  return (
    <h1>{alias}</h1>
  )
};

export default CatalogCategoryPage;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
};

export const getStaticProps = async ({ params }) => {
  const { alias = '' } = params;
  return {
    props: {
      alias
    }
  }
};
