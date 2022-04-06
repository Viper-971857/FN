import React from 'react';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: 'solid 1px brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            userName: undefined,
            isLoggedIn: false
        }
    }

    handleNavigate = () => {
        this.props.history.push('/');
    }

    handleLogin = () => {
        this.setState({ loginModalIsOpen: true });
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined });
    }

    render() {
        const { loginModalIsOpen, isLoggedIn, userName } = this.state;
        return (
            <div className="header">
                <div className="header-logo" onClick={this.handleNavigate}>
                    <p>e!</p>
                </div>
                {
                    !isLoggedIn ? <div className="user-account">
                        <div className='login' onClick={this.handleLogin}>Login</div>
                        <div className='signup'>Create an account</div>
                    </div> :
                        <div className="user-account">
                            <div className='login'>{userName}</div>
                            <div className='signup' onClick={this.handleLogout}>Logout</div>
                        </div>
                }

                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <button className='btn btn-primary'>Continue with Credentials</button>
                        <br />
                        <GoogleLogin
                            clientId="954148826904-r4biqdtnbu5squql54c5d4qp8cu7cgd7.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Header);