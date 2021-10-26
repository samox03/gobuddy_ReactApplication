import React from 'react'
import axios from 'axios'

//////so far its a plane login mechanism without differenciate between buddy and tiger!


class Login extends React.Component {

    state = {
        email: '',
        password: '',
        
    }

    // generic change handler for text input fields
    changeHandler = (e) => {
        let currentName = e.target.name

        let newState = {}
        newState[currentName] = e.target.value;

        this.setState(newState)
    }

    //class property syntax
    submitHandler = () => {
        axios.post('/api/user/login', { email: this.state.email, password: this.state.password }).then((resp) => {

            let data = resp.data
            //let message = data.message
            let user = data.user

            this.props.logInTheUser(user)
        })
    }

    render() {

        return (
            <div className="App">
                {/* <form > */}
                <input type='text' name='email' value={this.state.email} placeholder="Username" onChange={this.changeHandler} />
                <input type='text' name='password' value={this.state.password} placeholder="Password" onChange={this.changeHandler} />
                <button onClick={this.submitHandler}>Log in</button>
                {/* </form> */}
            </div>
        );
    }
}

export default Login;