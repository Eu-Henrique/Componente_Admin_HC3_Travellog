import React from 'react'
import { useQuery } from 'react-apollo'
import GET_PRODUCTS from '../graphql/schema.gql'


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
    <div style={{"display": "grid", "gridTemplateColumns": "auto auto 50px", "borderWidth": "2px", "borderColor": "gray"}}>
        <img style={{"maxWidth": "150px"}} src={data?.product.items[0].images[0].imageUrl}/>
        <p style={{margin: '25px 15px', maxHeight: '50px', backgroundColor: 'white', textDecoration: 'none'}}>{data?.product.productName}</p>
    </div>
    </>
    )
}

export default productSummary