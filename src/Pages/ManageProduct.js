import React, { Component } from 'react';
import { Table, Button } from 'reactstrap'
import axios from 'axios'
import { API_URL } from '../Support/API_URL'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { fetchProduct, addProduct, editProduct } from '../Redux/Action'

class ManageProduct extends Component {
    state = {
        name: '',
        brand: '',
        price: '',
        category: '',
        image: '',
        selectedId: null,
        editname: '',
        editbrand: '',
        editprice: '',
        editcategory: '',
        editimage: ''
    }

    componentDidMount = () => {
        this.props.fetchProduct()
    }


    handleInput = (e) => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    // componentDidUpdate = () => {
    //     this.props.fetchProduct()
    // }

    addProduct = () => {
        let obj = {
            name: this.state.name,
            brand: this.state.brand,
            category: this.state.category,
            price: Number(this.state.price),
            image: this.state.image
        }
        this.props.addProduct(obj)
        this.setState({
            name: '',
            brand: '',
            price: '',
            category: '',
            image: '',
        })
    }

    selectEdit = (val) => {
        this.setState({
            selectedId: val.id,
            editname: val.name,
            editbrand: val.brand,
            editprice: val.price,
            editcategory: val.category,
            editimage: val.image
        })
    }

    confirmEdit = (id) => {
        let obj = {
            name: this.state.editname,
            brand: this.state.editbrand,
            category: this.state.editcategory,
            price: Number(this.state.editprice),
            image: this.state.editimage
        }
        this.props.editProduct(id, obj)
        this.setState({selectedId: null})
    }

    deleteData(id, image){
        Swal.fire({
            title: 'Are you sure you want to delete this product?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            imageUrl: image,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                axios.delete(`${API_URL}/products/${id}`)
                .then((res)=>{
                    this.componentDidMount()
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
                .catch(err => {
                    console.log(err)
                })
            }
          })
    }

    renderTable = () => {
        const map = this.props.data.map(val=>{
            if(val.id === this.state.selectedId){
                
                return(
                    <tr key={val.id}>
                        <td colSpan='2'>
                            <input name='editname' value={this.state.editname} type='text' placeholder='name' onChange={this.handleInput} ></input>
                        </td>
                        <td>
                            <input name='editbrand' value={this.state.editbrand} type='text' placeholder='brand' onChange={this.handleInput}></input>
                        </td>
                        <td>
                            <input name='editprice' value={this.state.editprice} type='number' placeholder='price' onChange={this.handleInput}></input>
                        </td>
                        <td>
                            <select name='editcategory' value={this.state.editcategory} type='select' onChange={this.handleInput}>
                                <option value='Men'>Men</option>
                                <option value='Woman'>Women</option>
                                <option value='Children'>Children</option>
                            </select>
                        </td>
                        <td>
                            <input name='editimage' value={this.state.editimage} type='text' placeholder='image' onChange={this.handleInput}></input>
                        </td>
                        <td>
                            <Button onClick={() => this.setState({selectedId: null})} color='danger'>
                                Cancel
                            </Button>
                        </td>
                        <td>
                            <Button color='primary' onClick={() => this.confirmEdit(val.id)}>
                                Save
                            </Button>
                        </td>
                    </tr>
                )
            }
            return (
                <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.brand}</td>
                    <td>Rp. {val.price.toLocaleString()}</td>
                    <td>{val.category}</td>
                    <td><img width='100%' src={val.image} alt='foto sepatu'/></td>
                    <td>
                        <Button color='success' onClick={() => this.selectEdit(val)}>
                            Edit
                        </Button>
                    </td>
                    <td>
                        <Button color='danger' onClick={() => this.deleteData(val.id, val.image)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        })
        return map
    }

    render() { 
        return (
            <div  style={{fontWeight: '600'}}>
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th colSpan='2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='2'>
                                <input 
                                    style={{width: '100%'}} 
                                    type='text' 
                                    placeholder='Name'
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.handleInput}>
                                </input>
                            </td>
                            <td>
                                <input 
                                    type='text' 
                                    placeholder='Brand'
                                    name='brand'
                                    value={this.state.brand}
                                    onChange={this.handleInput}>
                                </input>
                            </td>
                            <td>
                                <input 
                                    placeholder='price' 
                                    type='number'
                                    name='price'
                                    value={this.state.price}
                                    onChange={this.handleInput}>
                                </input>
                            </td>
                            <td>
                                <select name='category' onChange={this.handleInput} value={this.state.category}>
                                    <option value=''>---Choose Category---</option>
                                    <option value='Men'>Men</option>
                                    <option value='Woman'>Women</option>
                                    <option value='Children'>Children</option>
                                </select>
                            </td>
                            <td>
                                <input 
                                    style={{width: '100%'}} 
                                    type='text' 
                                    placeholder='Image'
                                    name='image'
                                    value={this.state.image}
                                    onChange={this.handleInput}>
                                </input>
                            </td>
                            <td colSpan='2'>
                                <Button style={{width: '100%'}} color='primary' onClick={this.addProduct}>Add Product</Button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        );
    }
}

const mstp = (state) => {
    return{
        data: state.product.productList
    }
}

export default connect(mstp, { fetchProduct, addProduct, editProduct } )(ManageProduct);