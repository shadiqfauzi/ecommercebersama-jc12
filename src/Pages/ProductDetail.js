import React, { Component } from 'react';
import { Button } from 'reactstrap'
import Select from 'react-select'
import { connect } from 'react-redux'
import { fetchProductId } from '../Redux/Action'
import Loader from 'react-loader-spinner'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom' 
class ProductDetail extends Component {
    state = {
        options: [
            { value: '38', label: '38' },
            { value: '39', label: '39' },
            { value: '40', label: '40' },
            { value: '41', label: '41' },
            { value: '42', label: '42' },
            { value: '43', label: '43' },
            { value: '44', label: '44' },
            { value: '45', label: '45' },
            { value: '46', label: '46' },
        ],
        selectedOption: null,
        confirmLogin: true
    }
    
    componentDidMount(){
        // jika id 1 maka id = ?id=1
        // let id = this.props.location.search
        // ini props emang udah bawaan react
        // console.log(this.props)
        let id = this.props.location.search.split("=")[1]
        this.props.fetchProductId(id)
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption: Number(selectedOption.value)});
        console.log(this.state.selectedOption)
    }

    addToCart = () => {
        if(!this.props.isLogged){
            this.setState({
                confirmLogin : false
            })
        }else{
            if(this.state.selectedOption){
                const {image, name, brand, category, price, id} = this.props.data
                let obj = {
                    userId: this.props.userId,
                    idProduct: id,
                    name,
                    brand,
                    category,
                    price,
                    image,
                    size: this.state.selectedOption,
                    count: 1
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Added To Cart',
                    text: `${obj.name} - size: ${obj.size}`,   
                })
                Axios.get(`${API_URL}/cart?userId=${obj.userId}&idProduct=${obj.idProduct}&size=${obj.size}`)
                .then(res => {
                    if(res.data.length > 0){
                        Axios.patch(`${API_URL}/cart/${res.data[0].id}`, {count: res.data[0].count + 1})
                        .then(res => {
                            console.log(res.data)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }else{
                        Axios.post(`${API_URL}/cart`, obj)
                        .then(res => {
                            console.log(res.data)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: 'Size has not been selected',
                    text: 'Please select size before adding to cart.'
                })
            }
        }
    }

    render() {
        if(!this.state.confirmLogin){
            return(
                <Redirect to='/login'/>
            )
        }else if(this.props.loading){
            return (
                <div className='d-flex justify-content-center'>
                    <Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
                    {/* LOADING */}
                </div>
            )

        }else if(this.props.error){
            return(
                <div className='d-flex justify-content-center'>
                    <h2>SERVER BELOM NYALAH</h2>
                </div>
            )

        }else{
            const {image, name, brand, category, price} = this.props.data
            return (
                <div className='row'>
                    <div className='col-5'>
                        <img src={image} alt='cepatu' width='100%'/>
                    </div>
                    <div className='col-7' style={{paddingRight: '40px'}}>
                        <h1>
                            {name}
                        </h1>
                        <h5>
                            {brand}
                        </h5>
                        <h6>
                            {category}
                        </h6>
                        <p>
                        Pork chop pig ball tip pastrami pork belly venison shoulder fatback landjaeger ribeye filet mignon leberkas bacon cow t-bone. Short ribs pastrami andouille spare ribs. Cow ham corned beef pork loin chuck pig. Turkey capicola burgdoggen pork chop pork loin jerky picanha pork belly pastrami.
                        </p>
                        <div>
                            <strong>Price: Rp. {price && price.toLocaleString()}</strong>
                        </div>
                        <div style={{width:'40%', marginTop: '20px', marginBottom: '10px'}}>
                            <Select 
                                options={this.state.options} 
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='d-flex flex-row-reverse'>
                            <Button onClick={this.addToCart}>Add To Cart</Button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return{
        data : state.product.productId,
        loading : state.product.loading,
        error: state.product.error,
        userId: state.auth.id,
        isLogged: state.auth.logged
    }
}

export default connect(mapStateToProps, { fetchProductId }) (ProductDetail);