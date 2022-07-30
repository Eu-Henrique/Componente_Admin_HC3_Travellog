import React from 'react'
import { useQuery } from 'react-apollo'
import GET_PRODUCTS from '../graphql/schema.gql'


export interface props{
    id: String
};


function combination(id: String) {

    const { loading, error, data } = useQuery(GET_PRODUCTS, {
        variables: { "id": `${id}` }
    });


    console.log(loading)
    console.log(error)
    console.log (data)
    
    while (loading == true) {
     return (
        <p>Loading...</p>
     )
}     
    
    return (
       <div style={{display: 'inline-grid', gridTemplateColumns: 'auto 200px auto 200px auto', padding: '10px'}}>
        <img style={{width: '150px'}} src={data.product.items[0].images[0].imageUrl}/>
        <p style={{margin: '25px 15px', maxHeight: '50px', backgroundColor: 'white'}}>{data.product.items[0].name}</p>
       </div>
    )
}

export default combination