import {useEffect} from "react"
import axios from "axios"
import  {connect} from "react-redux"
import {add} from "../store/store"
import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()
const Index = ({counter,user,add,rename})=>{

    useEffect(()=>{
        axios.get("/api/user/info").then(response=>console.log(response))
    },[])

    return (<div>
        <span>count:{counter.count}</span>
        <span>username:{user.username}</span>
        <input value={user.username} onChange={(e)=>rename(e.target.value)}/>
        <button onClick={()=>add(counter)}>adds</button>
        <a href={publicRuntimeConfig.OAUTH_URL}>登录</a>
    </div>)
}
Index.getInitialProps = async ({reduxStore})=>{
    reduxStore.dispatch(add(10))
    return {}
}
export default connect(function mapStateToProps(state){
    return {
        counter:state.counter,
        user:state.user
    }
},function mapDispatchProps(dispatch) {
    return{
        add:(num)=>{dispatch({type:"ADD",num})},
        rename:(name)=>{dispatch({type:"USER",name})}
    }
})(Index)