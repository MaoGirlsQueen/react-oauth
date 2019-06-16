import App ,{Container}from "next/app"
import "antd/dist/antd.css"
import Layout from "../components/Layout"
import MyContent from "../lib/my-content"
import {Provider} from "react-redux"
import withRedux from "../lib/with-redux"
class MyApp extends App{
    state = {
        context: 'value',
    }
    static async getInitialProps(ctx){
        const {Component}=ctx
        let pageProps = null
        if(Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx)
        }
        return {
            pageProps
        }
    }
    render(){
        const {Component,pageProps,reduxStore} = this.props
        return(
            <Container>
                <Layout>
                <Provider store={reduxStore}>
                    <MyContent.Provider value="content test">

                            <Component {...pageProps}/>

                    </MyContent.Provider>
                </Provider>
                </Layout>
            </Container>
        )
    }
}
export default withRedux(MyApp)