import {withRouter} from "next/router"
import getConfig from "next/config"
import styled from "styled-components"
import dynamic from "next/dynamic"
const Title = styled.h1`
color:yellow;
font-size:40px
`
const {serverRuntimeConfig,publicRuntimeConfig} = getConfig()
const Comp = dynamic(import("../components/Comp"))
const A = ({router,time})=>{
   console.log(serverRuntimeConfig,publicRuntimeConfig)
   return (<>
      <Title>this is a title{time}{process.env.customKey}</Title>
      <Comp />
   </>)
}
A.getInitialProps = async ctx =>{
   const moment = await import("moment")
   return {
      name:"kkk",
      time:moment.default(Date.now() - 60*1000).fromNow()
   }
}
export default withRouter(A)
