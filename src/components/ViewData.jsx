import { useState } from 'react'
import {getData} from '../apiFacade'

function ViewData() {

    const [data, setData] = useState(null)
    const handleClick = async () => {
        const result = await getData();
        setData(result);
    }


  return (
    <div> 
    {data && <div>{data.msg}</div>} 
    <button onClick={handleClick}>View Data</button>
     </div> )
}


export default ViewData;