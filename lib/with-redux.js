import React from "react"
import createStore from "../store/store"

const isServer = typeof window ==='undefined' //是否是服务端
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'
function getOrCreateStore(initialState) {  //获得或者创建store
    if(isServer){
        return createStore(initialState)
    }
    if(!window[__NEXT_REDUX_STORE__]){
        window[__NEXT_REDUX_STORE__] = createStore(initialState)
    }
    return window[__NEXT_REDUX_STORE__]
}
export default (Comp)=>{
    class WithReduxApp extends  React.Component{
        constructor(props){
        super(props)
            this.reduxStore = getOrCreateStore(props.initialReduxState)
        }
        render() {
            const {Component,pageProps,...rest} =this.props
            if(pageProps){
                pageProps.test ="123"
            }
            return <Comp Component = {Component} pageProps={pageProps} {...rest } reduxStore={this.reduxStore}/>
        }
    }

    WithReduxApp.getInitialProps = async (ctx)=>{

         const reduxStore = getOrCreateStore()
        ctx.reduxStore = reduxStore
        let appProps ={}
        if(typeof  Comp.getInitialProps ==="function"){
            appProps = await  Comp.getInitialProps(ctx)
        }

        return {
             ...appProps,
            initialReduxState:reduxStore.getState()
        }
    }
    return WithReduxApp
}