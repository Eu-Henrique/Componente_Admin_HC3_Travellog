import React, { FC } from 'react'
import { Layout, PageBlock, Button } from 'vtex.styleguide'
import { useQuery } from 'react-apollo'
import GET_PRODUCTS from './graphql/schema.gql'

import combination from './pages/comboTable'


const ids = [{
  id: '2',
  // produto2: '6',
  // quantity: '23'
},
{
  id: '3',
  // produto2: '6',
  // quantity: '14'
}
]


const AdminExample: FC = () => {

  const { loading, error, data} = useQuery(GET_PRODUCTS, {
    variables: { "id": "2" }
  });


  var rows = [];
  for (var i = 0; i<ids.length; i++){
    rows.push(combination(ids[i].id))
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
      {rows}
      <Button/>
    </PageBlock>
  </Layout>
  )
}

export default AdminExample
