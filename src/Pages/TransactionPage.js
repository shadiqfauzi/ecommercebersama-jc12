import React from 'react';
import { Table, Button } from 'reactstrap'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import Swal from 'sweetalert2';

class Transaction extends React.Component {
    state = {
        data: []
    }

    componentDidMount = () => {
        let token = localStorage.getItem('token')
        let userId = JSON.parse(token)
        this.fetchData(userId.id)
    }

    fetchData = (userId) => {
        Axios.get(`${API_URL}/transaction?userId=${userId}`)
            .then(res => {
                this.setState({
                    data: res.data,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderTransaction = () => {
        return this.state.data.map(val => {
            return (
                <React.Fragment key={val.id}>
                    <tr className="table-success" key={val.id}>
                        <td colSpan='4'>{val.date}</td>
                        <td>Rp. {val.grandTotal.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td colSpan='5'>
                            <Button className='float-right' color='primary' onClick={() => this.showDetail(val.product, val.grandTotal, val.date)}>
                                Click For Details ({val.product.length} {val.product.length > 1 ? 'items' : 'item'})
                            </Button>
                        </td>
                    </tr>
                </React.Fragment>
            )
        })
    }

    showDetail = (product, grandTotal, date) => {
        let innerHtml = `<strong><p>Pembelian pada tanggal: ${date}</p></strong><hr />`
        product.forEach((val, index) => {
            innerHtml += `<img width='30%' src='${val.image}' alt='foto'/>
            <h5>${val.name}</h5>
            <p>Size: ${val.size}</p>
            <p>Quantity: ${val.count} (@ Rp.${val.price.toLocaleString()})</p>
            <p>Subtotal: Rp. ${(val.count * val.price).toLocaleString()}</p>
            <hr/>
            `
        })
        innerHtml += `<strong>Grand Total: Rp. ${grandTotal.toLocaleString()}</strong>`
        Swal.fire({
            html: innerHtml
        })
    }

    render() { 
        if(this.state.data.length === 0 ){
            return(
                <h1 style={{'textAlign' : 'center'}}>You don't have any transaction history.</h1>
            )
        }
        return ( 
            <div>
                <h1>Halaman Transaction</h1>
                <Table style={{'width': '75%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                    <thead>
                        <tr>
                            <th colSpan='4'>Tanggal</th>
                            <th>Total Belanja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTransaction()}
                    </tbody>
                </Table>
            </div>

        );
    }
}
 
export default Transaction;