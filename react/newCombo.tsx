import React, {useState, useEffect } from 'react'
import getProducts from './graphql/products.gql'
import { useQuery } from 'react-apollo'
import productSummary from './pages/productSummary'
import newCombination from './pages/newCombination'




function newCombo() {
    var sideIds:String[] = []
    const [ newIds, setNewIds ] = useState<String[]>([])
    const [ loading, setLoading ] = useState<boolean>(true)

    function selectProduct (event: React.ChangeEvent<HTMLInputElement>) {
        var selectedId = event.target.value

        if(sideIds.includes(selectedId)){
            sideIds.shift();
        }
        else{
        sideIds.push(selectedId)
        }
            
        if(sideIds.length == 2){
            setNewIds(sideIds)
            setLoading(false)
        }
    }
    function handleRows(data:any){
        var rows:any = [];
            for (var i = 0; i<67; i++){
                rows.push(productSummary(data?.products[i].productId))
                rows.push(<input
                    type="checkbox"
                    name={data?.products[i].productId}
                    value={data?.products[i].productId}
                    onChange={selectProduct}
                />)
                rows.push(<hr style={{"background": "gray", "height": "2px"}}/>)
            }
        return rows
        }

    function handleNewCombo(id:String[]){
        var row = []
        row.push(newCombination(id))
        return row;
    }

    const{data} = useQuery(getProducts);
    
    useEffect(() => {
        console.log("passei")
    }, [data])

    const rows = handleRows(data)
    const newCombo = handleNewCombo(newIds)

    while (loading){
    return (
        <div style={{ "gridTemplateColumns": "auto auto auto"}}>
            {rows}
        </div>
    )
}

console.log(loading)

    return(
        <div>
            {newCombo}
        </div>)
}


export default newCombo
