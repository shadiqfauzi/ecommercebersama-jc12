import React, { Component } from 'react';
import { Button } from 'reactstrap'
import Select from 'react-select'
import { connect } from 'react-redux'
import { fetchProductId } from '../Redux/Action'
import Loader from 'react-loader-spinner'

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
        ]
    }
    
    componentDidMount(){
        // jika id 1 maka id = ?id=1
        // let id = this.props.location.search
        // ini props emang udah bawaan react
        // console.log(this.props)

        let id = this.props.location.search.split("=")[1]
        this.props.fetchProductId(id)
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
                            <strong>Price: Rp. {price ? price.toLocaleString() : null}</strong>
                        </div>
                        <div style={{width:'40%', marginTop: '20px', marginBottom: '10px'}}>
                            <Select options={this.state.options}></Select>
                        </div>
                        <div className='d-flex flex-row-reverse'>
                            <Button>Add To Cart</Button>
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
        error: state.product.error
    }
}

export default connect(mapStateToProps, { fetchProductId }) (ProductDetail);