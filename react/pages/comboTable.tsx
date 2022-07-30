import React from 'react'
import { useQuery } from 'react-apollo'
import GET_PRODUCTS from '../graphql/schema.gql'



function combination(productOne:String, productTwo:String, comboTimes:number) {

    const { loading: loading1, error: error1, data: data1 } = useQuery(GET_PRODUCTS, {
        variables: { "id": `${productOne}` }
    });

    const { loading: loading2, error: error2, data: data2 } = useQuery(GET_PRODUCTS, {
        variables: { "id": `${productTwo}` }
    });

    console.log(productTwo)
    console.log(comboTimes)
    console.log(loading1)
    console.log(error1)
    console.log (data1)
    console.log(error2)
    
    while (loading1 == true || loading2 == true) {
     return (
        <p>Loading...</p>
     )
}     
    
    return (
       <div style={{display: 'inline-grid', gridTemplateColumns: 'auto 200px auto 200px 100px auto', padding: '10px'}}>
        <img style={{width: '150px'}} src={data1.product.items[0].images[0].imageUrl}/>
        <p style={{margin: '25px 15px', maxHeight: '50px', backgroundColor: 'white', textDecoration: 'none'}}>{data1.product.items[0].name}</p>
        <img style={{width: '150px'}} src={data2.product.items[0].images[0].imageUrl}/>
        <p style={{margin: '25px 15px', maxHeight: '50px', backgroundColor: 'white', textDecoration: 'none'}}>{data2.product.items[0].name}</p>
        <p><b>R${data1.product.priceRange.sellingPrice.highPrice + data2.product.priceRange.sellingPrice.highPrice},00</b> <br/>{comboTimes} vezes<br/>vendidas</p>
        <button>Ativa/Desativa</button>
       </div>
    )
}

export default combination