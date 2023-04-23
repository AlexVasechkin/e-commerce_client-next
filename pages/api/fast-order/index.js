import axios from 'axios';


export default async function handler(req, res) {
  const result = await axios
    .post(`${ process.env.API_HOST }/api/v1/public/fast-order/create`, req.body)
    .then(({ data = {} }) => {
      return data;
    });

  res.status(200).json(result);
}
