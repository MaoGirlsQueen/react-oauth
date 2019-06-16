import {useState,useEffect,useLayoutEffect,useContext,useReducer} from "react"
import MyContent from "../../lib/my-content"
function countReducer(state,action) {
    switch (action.type) {
        case "add":
            return state+1
        case "minuse":
            return state-1
        default:
            return state
    }
}
function MyFunction() {
    // const [conut,setConut] = useState(10)
    const [count,dispatchCount] = useReducer(countReducer,0)
    const [name,setName] = useState("lili")
    const content = useContext(MyContent)
    // useEffect(()=>{
    //     const interval = setInterval(()=>{
    //         // setConut(c=>c+1)
    //         dispatchCount({type:"minuse"})
    //     },1000)
    //     return ()=>clearInterval(interval)
    // },[])
    useEffect(()=>
        {
            console.log("effect invoked")
            return ()=> console.log("effect deteched")
        },[]
    )
    useLayoutEffect(()=>
        {
            console.log("useLayoutEffect invoked")
            return ()=> console.log("useLayoutEffect deteched")
        },[]
    )
    return (
        <div>
            <input value={name} onChange={(e)=>setName(e.target.value)}/>
            <button onClick={()=>dispatchCount({type:"add"})}>{count}</button>
            <span>{content}</span>
        </div>

    )
}
export default MyFunction;

