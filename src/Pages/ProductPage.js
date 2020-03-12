import React, { Component } from 'react';
import ProductCard from '../Components/ProductCard'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProduct } from '../Redux/Action'
import Loader from 'react-loader-spinner'

class ProductPage extends Component {
    state = {  }
    
    componentDidMount(){
        // axios.get(`${API_URL}/products`)
        // .then((res) => {
        //     this.setState({
        //         data: res.data
        //     })
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
        
        this.props.fetchProduct()
    }

    arrProductMap = () => {
        const jsx = this.props.data.map(val => {
            return (
                <div className='col-3' key={val.id}>
                  <Link to={`/product-detail?id=${val.id}`}>
                    <ProductCard
                        name={val.name}
                        brand={val.brand}
                        price={val.price}
                        image={val.image}
                    />
                  </Link>
                </div>
              )
        })
        return jsx
    } 
    
    render() {
        if(this.props.loading){
            return (
                <div className='d-flex justify-content-center'>
                    <Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
                    {/* LOADING */}
                </div>
            )
        }else if(this.props.error){
            return(
                <div className='d-flex justify-content-center'>
                    <h2>HMM... Internet anda atau saya ya...</h2>
                </div>
            )
        }else{
            return (
                <div className='d-flex'>
                    <div className='col-2'>
                        <p>hello</p>
                    </div>
                    <div className='col-10'>
                        <div className='row'>
                            {
                                this.props.data
                                ?
                                this.arrProductMap()
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return{
        data : state.product.productList,
        loading : state.product.loading,
        error: state.product.error
    }
}

export default connect(mapStateToProps, { fetchProduct })(ProductPage);