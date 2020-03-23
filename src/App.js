import React, { Component } from 'react';
import './App.css';
import Home from './Pages/Home';
import { Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import CartPage from './Pages/CartPage';
import TransactionPage from './Pages/TransactionPage';
import ProductPage from './Pages/ProductPage';
import LatihanAxios from './Pages/LatihanAxios';
import ReviewPage from './Pages/ReviewPage';
import Review from './Pages/Review'
import ProductDetail from './Pages/ProductDetail'
import ManageProduct from './Pages/ManageProduct'
// import { API_URL } from './Support/API_URL'
// import axios from 'axios'
import { connect } from 'react-redux';
import { Login, keepLogin } from './Redux/Action'


class App extends Component{

  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
      this.props.keepLogin(token)
    }
    
    // if(token){
    //   axios.get(`${API_URL}/users?username=${token.username}&password=${token.password}`)
    //     .then((res) => {
    //       if(res.data.length === 0){
    //         window.alert('Wrong username / password.')
    //       }else{
    //         let { username, email, role, id } = res.data[0]
    //         this.props.Login({
    //           id,
    //           username,
    //           email,
    //           role
    //         })
    //       localStorage.setItem('username', username)
    //     }
    //   })
    //   .catch((err) => {
    //       console.log(err)
    //   })
    // }
  }

  render(){
    let routes = (
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/cart' component={CartPage} />
        <Route path='/transaction' component={TransactionPage} />
        <Route path='/product' component={ProductPage} />
        <Route path='/latihan' component={LatihanAxios} />
        <Route path='/review' component={ReviewPage} />
        <Route path='/reviewv2' component={Review} />
        <Route path='/product-detail' component={ProductDetail} />
        <Route path='/manage-product' component={ManageProduct} />
      </Switch>
    )
    return(
      <div>
        <Header />
          {routes}
        <Footer/>
      </div>
    )
  }
}

// kalau gak perlu data dari global state, isi null untuk parameter pertama.  
export default connect(null, { Login, keepLogin })(App);
