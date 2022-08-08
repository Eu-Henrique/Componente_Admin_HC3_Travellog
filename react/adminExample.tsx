/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { Layout, PageBlock, Table } from 'vtex.styleguide'
import { FormattedCurrency } from 'vtex.format-currency'
import axios from 'axios'
// import { useQuery } from 'react-apollo'
// import GET_PRODUCTS from './graphql/schema.gql'

import combination from './pages/comboTable'

// var ids = [{}]

const defaultSchema = {
  properties: {
    imageOne: {
      title: 'Image',
      width: 100,
      cellRenderer: ({ cellData }: any) => {
        return <img src={cellData} />
      },
    },
    nameOne: {
      title: 'Product 1',
      width: 450,
    },
    imageTwo: {
      title: 'Image',
      width: 100,
      cellRenderer: ({ cellData }: any) => {
        return <img src={cellData} />
      },
    },
    nameTwo: {
      title: 'Product 2',
      width: 450,
    },
    price: {
      title: 'Combo Price',
      width: 150,
      cellRenderer: ({ cellData }: any) => {
        return <FormattedCurrency value={cellData} />
      },
    },
    qty: {
      title: 'Times Sold',
      width: 100,
    },
  },
}

const response = {
  topStore: {
    '1': [
      {
        '2': 2,
        '3': 3,
      },
      {
        '58': 58,
        '59': 59,
      },
    ],
    '2': [
      {
        '62': 62,
        '72': 72,
      },
    ],
    qty: {
      top1: 39,
      top2: 12,
    },
  },
}
var sideIds: any[] = []

function handleCombo(response: any) {
  sideIds = []
  const length: number = Object?.keys(response?.topStore).length

  for (var i = 1; i < length; i++) {
    var qty: any = Object?.values(response?.topStore.qty)[i - 1]
    var param = `${i}`
    for (var j = 0; j < response?.topStore[param].length; j++) {
      var newId = {}
      newId = {
        idOne: Object.keys(response?.topStore[param][j])[0],
        id2: Object.keys(response?.topStore[param][j])[1],
        quantity: qty,
      }
      sideIds.push(newId)
    }
  }
  return sideIds
}

function adminExample() {
  const [sideCombos, setSideCombos] = useState<any>(response)

  const [combos, setCombos] = useState<any>(response)

  const getData = async () => {
    await axios
      .get(
        'https://hccombinationsapi.tk/combinations-api/v1//store-top-combinations'
      )
      .then((request) => {
        setSideCombos(request.data)
      })
      .catch((e) => {
        console.log(`${e}`)
      })
  }

  getData()

  useEffect(() => {
    setCombos(sideCombos)
  }, [sideCombos])

  handleCombo(combos)

  var sideRows: any[] = []
  function handleRows() {
    sideRows = []

    for (var i = 0; i < sideIds?.length; i++) {
      sideRows?.push(
        combination(sideIds[i]?.idOne, sideIds[i]?.id2, sideIds[i]?.quantity)
      )
    }
    return sideRows
  }

  useEffect(() => {
    console.log('passei')
  }, [sideIds])

  // var rows:any[] = []
  //  for(var i = 0; i<ids?.length; i++){
  //     rows.push(combination(ids[i]?.idOne, ids[i]?.id2, ids[i]?.quantity))
  //   }
  const rows = handleRows()

  return (
    <Layout fullWidth>
      <PageBlock
        title="Principais Combinações"
        subtitle="As combinações mais vendidas de sua loja"
        variation="full"
      >
        <Table
          items={rows}
          schema={defaultSchema}
          desnsity={'low'}
          dynamicRowHeight={true}
        ></Table>
      </PageBlock>
    </Layout>
  )
}

export default adminExample
