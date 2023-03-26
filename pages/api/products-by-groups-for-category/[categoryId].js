import axios from 'axios';


export default async function handler(req, res) {
  const { categoryId } = req.query;

  const responseBody = await axios
    .get(`${ process.env.API_HOST }/api/v1/public/category-products-by-groups/${ categoryId }`)
    .then(({ data = {} }) => {
      const { payload = {} } = data;
      return payload;
    })

  res.status(200).json(responseBody)
}