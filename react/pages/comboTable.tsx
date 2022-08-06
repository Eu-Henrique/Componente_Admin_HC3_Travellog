import React from 'react'
import { useQuery } from 'react-apollo'
import GET_PRODUCTS from '../graphql/schema.gql'
import { FormattedCurrency } from 'vtex.format-currency'
// import { Toggle } from 'vtex.styleguide'

// function invert(state:boolean) {
//     if (state == true){
//         return false
//     }
//     else {
//         return true
//     }
// }

function combination(productOne:String, productTwo:String, comboTimes:number) {

    console.log(productOne)

    const { loading: loadingOne,data: dataOne } = useQuery(GET_PRODUCTS, {
        variables: { "id": `${productOne}` }
    });


    const { loading: loadingTwo, data: dataTwo, error } = useQuery(GET_PRODUCTS, {
        variables: { "id": `${productTwo}` }
    });

    while(loadingOne==true || loadingTwo==true) {
        return(
            <div>
                <p><br/></p>
            </div>
        )
    }

    console.log(error)
    console.log(dataOne)

    const sliceOne = dataOne?.product.productName.slice(0, 50)
    const sliceTwo = dataTwo?.product.productName.slice(0, 50)

    const totalPrice = dataOne?.product.priceRange.sellingPrice.highPrice + dataTwo?.product.priceRange.sellingPrice.highPrice
    
    return (
        <>
       <div style={{display: 'inline-grid', gridTemplateColumns: '100px 250px 100px 250px auto', padding: '10px'}}>
        <img style={{maxHeight: '100px'}} src={dataOne?.product.items[0].images[0].imageUrl}/>
        <p style={{margin: '25px 15px', maxHeight: '50px', backgroundColor: 'white', textDecoration: 'none'}}>{sliceOne}</p>
        <img style={{maxHeight: '100px'}} src={dataTwo?.product.items[0].images[0].imageUrl}/>
        <p style={{margin: '25px 15px', maxHeight: '50px', backgroundColor: 'white', textDecoration: 'none'}}>{sliceTwo}</p>
        <p><b><FormattedCurrency value={totalPrice} /></b> <br/>{comboTimes} vezes<br/>vendidas</p>
       </div>
       <hr/>
       </>
    )
}

export default combination