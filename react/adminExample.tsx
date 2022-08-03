import React, { FC } from 'react'
import { Layout, PageBlock, Button } from 'vtex.styleguide'
import { useQuery } from 'react-apollo'
import GET_PRODUCTS from './graphql/schema.gql'

import combination from './pages/comboTable'
import head from './pages/header'


const ids = [{
  id1: '2',
  id2: '81',
  // produto2: '6',
  quantity: 23
},
{
  id1: '3',
  id2: '2',
  // produto2: '6',
  quantity: 14
}
]


const adminExample: FC = () => {

  const { loading, error, data} = useQuery(GET_PRODUCTS, {
    variables: { "id": "2" }
  });


  var rows = [];
  for (var i = 0; i<ids.length; i++){
    rows.push(combination(ids[i].id1, ids[i].id2, ids[i].quantity))
  }


  console.log(loading)
  console.log(error)
  console.log (data)

  return (
  <Layout>
    <PageBlock
     title="Principais Combinações"
     subtitle="As combinações mais vendidas de sua loja"
     variation="full">
      {head()}
      {rows}
      <Button/>
    </PageBlock>
  </Layout>
  )
}

export default adminExample
