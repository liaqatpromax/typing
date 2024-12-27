import { useCallback, useState } from "react";

function Result ({fun}) {
    const [wpms, setwpm] = useState(0)

    const wpmHandle = useCallback(() =>{
        setwpm(fun)
    },[fun])
    return(
        <h1>{count}</h1>
    )
    
}
export default Result