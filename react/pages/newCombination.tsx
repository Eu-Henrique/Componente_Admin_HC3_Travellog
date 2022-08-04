import React from 'react'
import { useQuery } from 'react-apollo'
import GET_PRODUCTS from '../graphql/schema.gql'
import {IconPlus } from 'vtex.styleguide'


function newCombination(productIds:String[]) {

    const { data: dataOne } = useQuery(GET_PRODUCTS, {
        variables: { "id": `${productIds[0]}` }
    });

    const { data: dataTwo } = useQuery(GET_PRODUCTS, {
        variables: { "id": `${productIds[1]}` }
    });

    return (
    <>
    <h1>Nova Combinação</h1>
    <div style={{"display": "grid", "gridTemplateColumns": "2fr 2fr 1fr 2fr 2fr", "borderWidth": "2px", "borderColor": "gray"}}>
        
        <img style={{maxHeight: '100px'}} src={dataOne?.product.items[0].images[0].imageUrl}/>
        <p style={{margin: '25px 15px', maxHeight: '50px', backgroundColor: 'white', textDecoration: 'none'}}>{dataOne?.product.productName}</p>
        <IconPlus/>
        <img style={{maxHeight: '100px'}} src={dataTwo?.product.items[0].images[0].imageUrl}/>
        <p style={{margin: '25px 15px', maxHeight: '50px', backgroundColor: 'white', textDecoration: 'none'}}>{dataTwo?.product.productName}</p>
        <p><b>R${dataOne?.product.priceRange.sellingPrice.highPrice + dataTwo?.product.priceRange.sellingPrice.highPrice}</b></p>
    </div>
    </>
    )
}

export default newCombination