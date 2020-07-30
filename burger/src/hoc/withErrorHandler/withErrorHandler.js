import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxip/Auxilp';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null,
        }

        componentWillMount() {
            this.reInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }
        render() {
            return (
                <Aux>
                    <Modal
                        clicked={this.errorConfirmedHandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }

    }

}

export default withErrorHandler;