import React, { useEffect, useState } from 'react'
import { Layout, PageBlock, Table } from 'vtex.styleguide'
import { FormattedCurrency } from 'vtex.format-currency'
// import axios from 'axios'
// import { useQuery } from 'react-apollo'
// import GET_PRODUCTS from './graphql/schema.gql'

import combination from './pages/comboTable'
import head from './pages/header'

// var ids = [{}]

const tableLength = 5


const defaultSchema = {
  properties: {
    imageOne: {
      title: '  ',
      width: 80,
      cellRenderer: ({ cellData }: any) => {
        return(
          <img src={cellData}/>
        )
      }
    },
    nameOne: {
      title: 'Product',
      width: 250
    },
    imageTwo: {
      title: '  ',
      width: 80,
      cellRenderer: ({ cellData }: any) => {
        return(
          <img src={cellData}/>
        )
      }
    },
    nameTwo: {
      title: 'Product',
      width: 250
    },
    price: {
      title: 'Combo Price',
      width: 150,
      cellRenderer: ({ cellData }: any) => {
        return(
          <FormattedCurrency style={{"textAlign": "center"}} value={cellData}/>
        )
      }
    },
    qty: {
      title: 'Sells',
      width: 70
    }
  },
}

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

  // const [ combos, setCombos ] = useState<any>()

  // const getData = async () => {
  //   await axios.get('https://hccombinationsapi.tk/combinations-api/v1//store-top-combinations')
  //   .then(request => {
  //     console.log(request.data)
  //     setCombos(request.data)
  //   })
  //   .catch(e => {console.log(`${e}`)})
  // }
  // getData()

  // console.log(combos)
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

  const initialState = {
    tableLength,
    currentPage: 1,
    slicedData: rows.slice(0, tableLength),
    currentItemFrom: 1,
    currentItemTo: tableLength,
    itemsLength: rows.length,
    emptyStateLabel: 'Nothing to show.',
  }

  var [ state, setState ] = useState<any>()

 state = initialState
 
 function handleNextClick() {
  const newPage = state.currentPage + 1
  const itemFrom = state.currentItemTo + 1
  const itemTo = tableLength * newPage
  const data = rows.slice(itemFrom - 1, itemTo)
  goToPage(newPage, itemFrom, itemTo, data)
}

  function handlePrevClick() {
    if (state.currentPage === 0) return
    const newPage = state.currentPage - 1
    const itemFrom = state.currentItemFrom - tableLength
    const itemTo = state.currentItemFrom - 1
    const data = rows.slice(itemFrom - 1, itemTo)
    goToPage(newPage, itemFrom, itemTo, data)
  }

  function goToPage(currentPage:any, currentItemFrom:any, currentItemTo:any, slicedData:any) {
    setState({
      currentPage,
      currentItemFrom,
      currentItemTo,
      slicedData,
    })
  }

  function handleRowsChange(value:any) {
    setState(
      {
        tableLength: parseInt(value),
        currentItemTo: parseInt(value),
      }
    )
  }

  return(
    <Layout>
    <PageBlock
     title="Principais Combinações"
     subtitle="As combinações mais vendidas de sua loja"
     variation="full">
      {head()}
      <Table
      items={rows}
      schema={defaultSchema}
      desnsity="low" 
      dynamicRowHeight={true}
      pagination={{
        onNextClick: handleNextClick,
        onPrevClick: handlePrevClick,
        currentItemFrom: state.currentItemFrom,
        currentItemTo: state.currentItemTo,
        onRowsChange: handleRowsChange,
        textShowRows: 'Show rows',
        textOf: 'of',
        totalItems: state.itemsLength}}>
      </Table>
    </PageBlock>
  </Layout>
  )
  
}

export default adminExample
