import {
    useState,
    useEffect,
    useLayoutEffect,
    useContext,
    useReducer,
    memo,
    useMemo,
    useCallback
} from "react"
import MyContent from "../../lib/my-content"

function countReducer(state, action) {
    switch (action.type) {
        case "add":
            return state + 1
        case "minuse":
            return state - 1
        default:
            return state
    }
}

function MyFunction() {
    // const [conut,setConut] = useState(10)
    const [count, dispatchCount] = useReducer(countReducer, 0)
    const [name, setName] = useState("lili")
    const config = useMemo(()=>({
        text: `count is ${count}`,
        color: count > 3 ? "red" : "blue"
    }),[count])
    // const hanlderButtonClick = useCallback(() => dispatchCount({type: "add"}),[])
    const hanlderButtonClick = useMemo(()=>() => dispatchCount({type: "add"}),[])
    return (
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <Child config={config} buttonClick={hanlderButtonClick}/>
        </div>

    )
}

const Child =memo(function Child({buttonClick, config}) {
    console.log("child render")
    return (
        <button onClick={buttonClick} style={{color: config.color}}>{config.text}</button>
    )
})

export default MyFunction;

