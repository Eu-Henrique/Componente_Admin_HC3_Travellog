import React from 'react'
import { useQuery } from 'react-apollo'
import GET_PRODUCTS from '../graphql/newCombo.gql'
import { FormattedCurrency } from 'vtex.format-currency'


function productSummary(productId:String) {
    const {loading, data } = useQuery(GET_PRODUCTS, {
        variables: { "id": `${productId}` }
    });

    while(loading == true) {
        return (
            <div>
                <p>  <br/>  </p>
            </div>
        )
    }
    

    return (
    <>
    <div style={{"display": "grid", "gridTemplateColumns": "2fr 1fr 2fr"}}>
        <img style={{"maxWidth": "150px"}} src={data?.product.items[0].images[0].imageUrl}/>
        <p style={{margin: '25px 15px', maxHeight: '50px', backgroundColor: 'white', textDecoration: 'none'}}>{data?.product.productName}</p>
        <b><FormattedCurrency value={data?.product.priceRange.sellingPrice.highPrice} /></b>
    </div>
    </>
    )
}

export default productSummary