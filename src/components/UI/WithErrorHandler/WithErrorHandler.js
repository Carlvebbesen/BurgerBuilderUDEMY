import React,{Component} from "react";
import Auxilian from "../../../hoc/Auxilian";
import Modal from "../Modal/Modal";

const WithErrorHandler = (WrappedComponent, axios )=>{
    return class extends Component{
        state ={
            error: null
        }
        constructor() {
            super();
            this.reqInterceptor = axios.interceptors.request.use(request=>{
                this.setState({error:null})
                return request;
            })
            this.resInterceptor = axios.interceptors.response.use(res=>res,error =>{
                this.setState({error:error});
            })
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }


        clickedHandler =()=>{
            this.setState({error:null})
        }

        render() {
            return(
                <Auxilian>
                    <Modal show={this.state.error}
                            modalClosed={this.clickedHandler}>
                        {this.state.error ? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent{...this.props}/>
                </Auxilian>
            )}
        }
}

export default WithErrorHandler;