import React, { Component } from 'react';
import { Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';
import { connect } from 'react-redux';
import { Login } from '../Redux/Action'
// import { API_URL } from '../Support/API_URL'

class LoginPage extends Component {
    state = {  }

    onBtnLogin = () => {
        let username = this.username.value
        let password = this.password.value
        
        this.props.Login(username, password)

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
            <div className='d-flex justify-content-center' style={{height : '100vh', alignItems : 'center'}}>
                <Form style={{width : '400px', height: '400px'}}>
                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input type="text" name="email" id="exampleEmail" placeholder="Username" innerRef={(username) => this.username = username} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(password) => this.password = password}/>
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button onClick={this.onBtnLogin}>
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
        );
    }
}
 
const mapStatetoProps = (state) => {
    return{
        logged : state.auth.logged
    }
}

export default connect(mapStatetoProps, { Login })(LoginPage);