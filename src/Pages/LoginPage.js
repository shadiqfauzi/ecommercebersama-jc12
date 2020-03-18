import React, { Component } from 'react';
import { Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';
import { connect } from 'react-redux';
import { Login } from '../Redux/Action'
// import { API_URL } from '../Support/API_URL'

class LoginPage extends Component {
    state = {
        logged: false
    }

    onBtnLogin = (event) => {
        event.preventDefault()
        let username = this.username.value
        let password = this.password.value
        
        this.props.Login(username, password)
        if(this.props.logged){
            this.setState({
                logged: true
            })
        }

        // axios.get(`${API_URL}/users?username=${username}&password=${password}`)
        // .then((res) => {
        //     // console.log(res.data)
        //     if(res.data.length === 0){
        //         window.alert('Wrong username / password.')
        //     }else{
        //         // res.data = [{}]
        //         //  {username: 'shadiq', email:'shadiqalifauzi@gmail.com', role: 'user'}
        //         // this.props.login()
        //         let { username, email, role, id } = res.data[0]
        //         this.props.Login({
        //             id,
        //             username,
        //             email,
        //             role
        //         })
        //         localStorage.setItem('token', JSON.stringify({username, password}))
        //     }
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }

    render() { 
        if(this.props.logged){
            return(
                <Redirect to='/'></Redirect>
            )
        }

        return (
            <React.Fragment>
                <h1 style={{'textAlign' : 'center'}}>Login</h1>
            <div className='d-flex justify-content-center' style={{height : '70vh', alignItems : 'center'}}>
                <Form onSubmit={this.onBtnLogin} style={{width : '400px', height: '400px'}}>
                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input type="text" name="email" id="exampleEmail" placeholder="Username" innerRef={(username) => this.username = username} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(password) => this.password = password}/>
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button type='submit' onClick={this.onBtnLogin}>
                            Login
                        </Button>
                        <Link to='/register'>
                            <Button>
                                Register
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
            </React.Fragment>
        );
    }
}
 
const mapStatetoProps = (state) => {
    return{
        logged : state.auth.logged
    }
}

export default connect(mapStatetoProps, { Login })(LoginPage);