import React, { FC } from 'react'
import { Layout, PageBlock, Button } from 'vtex.styleguide'
import axios from 'axios'
import { useQuery } from 'react-apollo'
import GET_PRODUCTS from './graphql/schema.gql'


// const ids = [{
//   produto1: 2,
//   produto2: 6,
//   quantity: 23
// },
// {
//   produto1: 2,
//   produto2: 6,
//   quantity: 14
// }
// ]


// const loading:any = {
//   skus: [{
//     image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
//   }]
// }

// function putProduct(object:any, produto:any) {
//   produto = object;
//   return produto
// }
// async function getImage() {
//   const res = await axios.get(url, headers);
//   console.log(res.data);
//   return await(res.data);
// }

const AdminExample: FC = () => {

  const { loading, error, data} = useQuery(GET_PRODUCTS, {
    variables: { "id": "2" }
  });


  console.log(product)
  console.log(loading)
  console.log(error)
  console.log (data)

  while (loading == true) {
    return (
      <Layout>
        <PageBlock
         title="Principais Combinações"
         subtitle="As combinações mais vendidas de sua loja"
         variation="full">
          <p>Loading...</p>
          <Button/>
        </PageBlock>
      </Layout>
      )
  }

  return (
  <Layout>
    <PageBlock
     title="Principais Combinações"
     subtitle="As combinações mais vendidas de sua loja"
     variation="full">
      <img src={data.product.items[0].images[0].imageUrl}/>
      <Button/>
    </PageBlock>
  </Layout>
  )
}

export default AdminExample
