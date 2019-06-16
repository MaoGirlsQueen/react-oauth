import {createStore,combineReducers,applyMiddleware} from "redux"
import RdeuxThunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
const initialState = {
    count:0
}
function countReduer(state=initialState,action) {
    switch (action.type) {
        case "ADD":
            return {count: state.count + action.num || 1}
        default:
            return state
    }
}
const userInitState = {
    username:"lili",
    age:34
}
function userReduer(state=userInitState,action) {
    switch (action.type) {
        case "USER":
            return {
                ...state,
                username:action.name
            }
        default:
            return state
    }
}
// action creatore
export function add(num) {
    return {
        type: "ADD",
        num,
    }
}

function addAsync(num) {
    return dispatch => {
        setTimeout(() => {
            dispatch(add(num))
        }, 1000)
    }
}
const reduer =combineReducers({
    counter:countReduer,
    user:userReduer
})
export default function initializeStore(state) {
    const store = createStore(reduer,Object.assign({},{
        counter:initialState,
        user:userInitState
    },state),composeWithDevTools(applyMiddleware(RdeuxThunk)))
    return store
}