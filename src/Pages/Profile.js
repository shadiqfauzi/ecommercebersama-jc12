import React, { Component } from 'react';
import { Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import { connect } from 'react-redux'
import { Logout } from '../Redux/Action/'
import Swal from 'sweetalert2'

class Profile extends Component {
    state = {
        user: {},
        passwordChanged: false
    }

    componentDidMount(){
        let token = localStorage.getItem('token')
        let user = JSON.parse(token)
        this.setState({
            user
        })
    }

    handleChangePassword = (e) => {
        e.preventDefault()
        let currentPass = this.currentPass.value
        let newPass = this.newPass.value
        let confirmNewPass = this.confirmNewPass.value
        
        if(currentPass === this.state.user.password){
            if(newPass === confirmNewPass){
                Axios.patch(`${API_URL}/users/${this.state.user.id}`,{password: newPass} )
                .then(res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Password Successfully Changed.',
                        text: 'Please Login Again.',
                    })
                    this.props.Logout()
                    localStorage.removeItem('token')
                    this.setState({
                        passwordChanged: true
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    text: 'New Password and Confirm Password doesn\'t match. Please Try Again.',
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                text: 'Wrong Current Password. Please Try Again.',
            })
        }
        // if(password === confirmPass){
        //     Axios.get(`${API_URL}/users?username=${username}`)
        //     .then((res)=>{
        //         if(res.data.length > 0){
        //             window.alert('Username already exists')
        //         }else{
        //             Axios.post(`${API_URL}/users`, {
        //                 username,
        //                 email,
        //                 password,
        //                 role : 'user'
        //             })
        //             .then((res) => {
        //                 console.log(res.data)
        //                 let { username, email, role, id } = res.data
        //                 this.props.Login({
        //                     username,
        //                     email,
        //                     role,
        //                     id
        //                 })
        //             })
        //         }
        //     })
        //     .catch((err)=> {
        //         console.log(err)
        //     })
        // }else{
        //     window.alert('Invalid Password')
        // }
    }

    render() { 
        if(this.state.passwordChanged){
            return(<Redirect to={'/login'} />)
        }
        return (
            <React.Fragment>
            <h1 style={{'textAlign' : 'center', 'margin' : '0'}}>{this.state.user.username}'s Profile Page</h1>
            <div className='d-flex justify-content-center' style={{height : '70vh', alignItems : 'center'}}>
                <Form style={{width : '400px', height: '400px'}}>
                    <h4>Change Password</h4>
                    <FormGroup>
                      <Label for="exampleCurrentPassword">Current Password</Label>
                      <Input type="password" name="currentPass" id="exampleCurrentPassword" placeholder="Current Password" innerRef={(currentPass) => this.currentPass = currentPass}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleNewPassword">New Password</Label>
                      <Input type="password" name="newPass" id="exampleNewPassword" placeholder="New Password" innerRef={(newPass) => this.newPass = newPass}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleConfirmNewPassword">Confirm New Password</Label>
                      <Input type="password" name="confirmNewPass" id="exampleConfirmPass" placeholder="Confirm New Password" innerRef={(confirmNewPass) => this.confirmNewPass = confirmNewPass}/>
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button type='submit' onClick={this.handleChangePassword}>
                            Change Password
                        </Button>
                        {/* <Link to='/login'>
                            <Button>
                                Login
                            </Button>
                        </Link> */}
                    </div>
                </Form>
            </div>
            </React.Fragment>
        );
    }
}
 
export default connect(null, { Logout }) (Profile);