import React from 'react';
import { Table, Button } from 'reactstrap'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom';

class Cart extends React.Component {
    state = { 
        data: [],
        grandTotal: 0,
        finishCart: false
    }

    componentDidMount(){
        this.setState({
            grandTotal: 0,
            finishCart: false
        })
        let token = localStorage.getItem('token')
        let userId = JSON.parse(token)
        this.fetchData(userId.id)
    }

    componentWillUnmount() {
        this.setState({
            data: [],
            grandTotal: 0
        })
    }

    handleBtnClick = (id, num, image, name) => {
        let userId = this.props.userId
        Axios.get(`${API_URL}/cart?userId=${userId}&id=${id}`)
        .then(res => {
            Axios.patch(`${API_URL}/cart/${id}`, {count: res.data[0].count + num})
            .then(res => {
                if(res.data.count === 0){
                    this.deleteCart(id, image, name, num)
                }
                this.componentDidMount()
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    fetchData = ( userId )  => {
        Axios.get(`${API_URL}/cart?userId=${userId}`)
            .then(res => {
                this.setState({
                    data: res.data,
                })
                this.countGrandTotal()
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderCart = ( ) => {
        let num = 0
        return this.state.data.map(val => {
            num++
            return(
                <tr key={val.id}>
                    <td>{num}</td>
                    <td>{val.name}</td>
                    <td><img width='50%' src={val.image} alt='foto cepatu' /></td>
                    <td>{val.size}</td>
                    <td>
                        <Button onClick={() => this.handleBtnClick(val.id, -1, val.image, val.name)} color='primary'>-</Button>
                        {val.count}
                        <Button onClick={() => this.handleBtnClick(val.id, 1, val.image, val.name)} color='primary'>+</Button>
                    </td>
                    <td>Rp. {(val.price*val.count).toLocaleString('id-ID')}</td>
                    <td><Button color='danger' onClick={() => this.deleteCart(val.id, val.image, val.name)}>Delete</Button></td>
                </tr>
            )
        })
    }

    countGrandTotal = () => {
        this.setState({
            grandTotal: 0
        })
        this.state.data.forEach(val => {
            if(val.count > 1){
                this.setState(prevState => {
                    return{
                        grandTotal : prevState.grandTotal + (val.price * val.count)
                    }
                })
            }else{
                this.setState(prevState => {
                    return{
                        grandTotal : prevState.grandTotal + val.price
                    }
                })
            }
        })
    }

    deleteCart = (id, image, name, num) => {
        Swal.fire({
            title: 'Are you sure you want to delete this item?',
            html: `<img width=75% src='${image}'> <p>${name}<p>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                Axios.delete(`${API_URL}/cart/${id}`)
                .then(res => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    this.componentDidMount()
                })
                .catch(err => {
                    console.log(err)
                })
            }else if(!result.value && num){
                this.handleBtnClick(id, num*-1)
            }
          })
    }

    toPayment = ( ) => {
        Swal.fire({
            title: 'Continue to Transaction?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                Axios.get(`${API_URL}/cart?userId=${this.props.userId}`)
                .then(res => {
                    let newDate = new Date()
                    var longDate = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}, ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
                    let obj = {
                        userId: this.props.userId,
                        grandTotal: this.state.grandTotal,
                        date: longDate,
                        product: res.data
                    }
                    Axios.post(`${API_URL}/transaction`, obj)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    res.data.forEach(val => {
                        Axios.delete(`${API_URL}/cart/${val.id}`)
                        .then(res => {
                            console.log(res)
                            this.setState({
                                finishCart: true
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })
    }

    render() { 
        if(this.state.finishCart){
            return(
                <Redirect to='/transaction' />
            )
        }else if(this.state.data.length === 0){
            return(
                <h1 style={{'textAlign' : 'center'}}>Your cart is empty.</h1>
            )
        }
        return ( 
            <div>
                <h1 style={{'textAlign' : 'center'}}>Cart</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th width='20%' >Image</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th width='30%' >Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCart()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='5' style={{textAlign: 'right'}}>Grand Totale</td>
                            <td>Rp. {this.state.grandTotal.toLocaleString('id-ID')}</td>
                            <td><Button color='success' onClick={this.toPayment}>Payment</Button></td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        );
    }
}
 
const mstp = ( state ) => {
    return {
        userId: state.auth.id
    }
}


export default connect(mstp)(Cart);