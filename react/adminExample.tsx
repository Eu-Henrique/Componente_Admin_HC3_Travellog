import React, { useEffect } from 'react'
import { Layout, PageBlock } from 'vtex.styleguide'
// import { useQuery } from 'react-apollo'
// import GET_PRODUCTS from './graphql/schema.gql'

import combination from './pages/comboTable'
import head from './pages/header'

// var ids = [{}]

const response = {
  "topStore": {
      "1": [
          {
              "88": 88,
              "106": 106
          }
      ],
      "2": [
          {
              "84": 84,
              "115": 115
          },
          {
              "141": 141,
              "145": 145
          }
      ],
      "qty": {
          "top1": 6,
          "top2": 5
      }
  }
}
var sideIds:any[] = []

  function handleCombo(response:any) {
    sideIds = []
    const length:number = (Object.keys(response?.topStore).length)

    for (var i=1; i<length; i++){
      
      var qty:any = Object.values(response?.topStore.qty)[i -1]
      var param = `${i}`
      for (var j=0; j<response?.topStore[param].length; j++){
        var newId = {}
        newId = {
          idOne: Object.keys(response?.topStore[param][j])[0],
          id2: Object.keys(response?.topStore[param][j])[1], 
          quantity: qty }
          sideIds.push(newId)
        }
      }
      return sideIds
  }

function adminExample() {
  
  handleCombo(response)
  var sideRows:any[] = [];
  function handleRows(){
    sideRows = []
    
    for (var i = 0; i<sideIds?.length; i++){
      sideRows?.push(combination(sideIds[i]?.idOne, sideIds[i]?.id2, sideIds[i]?.quantity))
    }
    return sideRows
  }

  useEffect(() => {
    console.log("passei")
}, [sideIds])

// var rows:any[] = []
//  for(var i = 0; i<ids?.length; i++){
//     rows.push(combination(ids[i]?.idOne, ids[i]?.id2, ids[i]?.quantity))
//   }
  const rows = handleRows()

  return(
    <Layout>
    <PageBlock
     title="Principais Combinações"
     subtitle="As combinações mais vendidas de sua loja"
     variation="full">
      {head()}
      {rows}
    </PageBlock>
  </Layout>
  )
  
}

export default adminExample
