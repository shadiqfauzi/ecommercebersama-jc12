import React, { Component } from 'react';
import { Input, FormGroup, Label, Form, Button, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import { API_URL } from '../Support/API_URL'
import { connect } from 'react-redux';
import { Login } from '../Redux/Action'
import Swal from 'sweetalert2'

class LoginPage extends Component {
    state = {  }

    onBtnRegister = (event) => {
        event.preventDefault()
        let username = this.username.value
        let email = this.email.value
        let password = this.password.value
        let confirmPass = this.confirmPass.value
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/
        let condition = passRegex.test(password)

        if(username){
            if(condition){
                if(password === confirmPass){
                    axios.get(`${API_URL}/users?username=${username}`)
                    .then((res)=>{
                        if(res.data.length > 0){
                            Swal.fire({
                                icon: 'error',
                                title: 'Username already exists.'
                            })
                        }else{
                            axios.post(`${API_URL}/users`, {
                                username,
                                email,
                                password,
                                role : 'user'
                            })
                            .then((res) => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'User Registered.',
                                    text: 'You Are Now Logged In.',
                                })
                                let { username, password } = res.data
                                this.props.Login(username, password)
                            })
                        }
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        text: 'Password and Current Password is not the same'
                    })
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    text: 'Password must contain atleast one symbol(!@#$%^&*()), a number, and more than 8 characters.'
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                text: 'Username cannot be blank.'
            })
        }
    }

    render() { 
        if(this.props.logged){
            return(
                <Redirect to='/'></Redirect>
            )
        }
        
        return ( 
            <React.Fragment>
            <h1 style={{'textAlign' : 'center', 'margin' : '0'}}>Register</h1>
            <div className='d-flex justify-content-center' style={{height : '70vh', alignItems : 'center'}}>
                <Form style={{width : '400px', height: '400px'}}>
                    <FormGroup>
                      <Label for="exampleUsername">Username</Label>
                      <Input type="text" name="username" id="exampleUsername" placeholder="Username" innerRef={(username) => this.username = username} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input type="email" name="email" id="exampleEmail" placeholder="Email" innerRef={(email) => this.email = email} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(password) => this.password = password} />
                        <FormText color='muted'>Password must contain atleast one of these symbol=" !@#$%^&*() ", 1 number, and more than 8 characters</FormText>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleConfirmPass">Confirm Password</Label>
                      <Input type="password" name="confirmPass" id="exampleConfirmPass" placeholder="Confirm Password" innerRef={(confirmPass) => this.confirmPass = confirmPass} />
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button type='submit' onClick={this.onBtnRegister}>
                            Register
                        </Button>
                        <Link to='/login'>
                            <Button>
                                Login
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
 
export default connect(mapStatetoProps, { Login }) (LoginPage);