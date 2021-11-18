import React from 'react'
import axios from 'axios'
import NavbarFrontpage from '../navigation/NavbarFrontpage'

//////so far its a plane login mechanism without differenciate between buddy and tiger!


class Login extends React.Component {

    state = {
        email: '',
        password: '',
        errorMessage: ""
    }

    // generic change handler for text input fields
    changeHandler = (e) => {
        let currentName = e.target.name

        let newState = {}
        newState[currentName] = e.target.value;

        this.setState(newState)
    }

    //class property syntax
    submitHandler = (event) => {
        event.preventDefault();
        axios.post('/api/user/login', { email: this.state.email, password: this.state.password })
            .then((resp) => {
                console.log("response: ", resp.data.errorMessage)
                if (resp.data.errorMessage) {
                    this.setState({
                        errorMessage: resp.data.errorMessage
                    })
                } else {
                    let data = resp.data
                    //let message = data.message
                    let user = data.user
                    this.props.logInTheUser(user)
                }
            }).catch(error => {
                console.log("error", error)
            })
    }

    render() {

        return (
            <div>
                <NavbarFrontpage />
                <div className="content-body-tight">
                    <section>
                        <div className="header-basic">
                            <h2 className="heading-font">BUILD NEW BRIDGES!</h2>
                        </div>
                    </section>
                    <section className="login-wrapper-section">
                        <div className="header-basic">
                            <h4>Log into your account:</h4>
                        </div>

                        <div className="login-wrapper">

                            <div className="login-box">
                                <form className="loginForm" onSubmit={this.submitHandler}>
                                    <input className="loginFormInput" type='text' name='email' value={this.state.email} placeholder="Username" onChange={this.changeHandler} />
                                    <input className="loginFormInput" type='password' name='password' value={this.state.password} placeholder="Password" onChange={this.changeHandler} />
                                    <button>Log in</button>
                                </form>
                                <div>
                                    {
                                        this.state.errorMessage && <h1 className="errorMessage">{this.state.errorMessage}</h1> 
                               }
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Login;