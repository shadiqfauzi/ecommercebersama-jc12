import React, { Component } from 'react';
import axios from 'axios'

class LatihanAxios extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            idData: 1,
            nama: '',
            age: '',
            laptop: ''
        }
        this.handleInput=this.handleInput.bind(this)
    }
    

    componentDidMount(){
        // axios.get('https://jsonplaceholder.typicode.com/posts')
        // .then( res => {
        //     this.setState({
        //         data: res.data
        //     })
        // })
        // .catch(err => {
        //     console.log(err)
        // })

        axios.get('http://localhost:2000/latihan')
        .then( res => {
            this.setState({
                data: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnAddData = () => {
        axios.post('http://localhost:2000/latihan', {nama: this.state.nameInput})
        .then((res) => {
            this.componentDidMount()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnEditData = (event) => {
        let {nama,age,laptop} = this.state 

        let obj = {}

        if(nama){
            obj.nama = nama
        }

        if(age){
            obj.age = age
        }

        if(laptop){
            obj.laptop = laptop
        }

        axios.patch(
            `http://localhost:2000/latihan/${this.state.idData}`, obj)
        .then((res) => {
            this.componentDidMount()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnEditDataPut = () => {
        // axios.put('http://localhost:2000/latihan/1', { boolean : false })
        // .then((res) => {
        //     console.log(res, 'ini put')
        // })
        // .catch((err) => {
        //     console.log(err)
        // }) 
        window.alert('disabled')
    }

    onBtnDeleteData = () => {
        axios.delete(`http://localhost:2000/latihan/${this.state.idData}`)
        .then((res) => {
            this.componentDidMount()
        })
        .catch((err) => {
            console.log(err)
        }) 
    }

    onBtnDeleteAll = () => {
        // axios.get('http://localhost:2000/latihan')
        // .then((res) => {
        //     res.data.forEach(val => {
        //         axios.delete(`http://localhost:2000/latihan/${val.id}`)
        //         .then((res) => {
        //             console.log(res, 'ini delete')
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         }) 
        //     })
        //     this.componentDidMount()
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
        window.alert('disabled')
    }

    renderTable() {
        let td = this.state.data.map(val => {
            return (
                    <tr key={val.id}>
                        <td>{val.id}</td>
                        <td>{val.nama}</td>
                        <td>{val.age}</td>
                        <td>{val.laptop}</td>
                    </tr>
            )
        })

        return (
            <table style={{border: "1px solid black"}}>
                <thead>
                    <tr style={{border: "1px solid black"}}>
                        <th>ID</th>
                        <th>NAMA</th>
                        <th>Age</th>
                        <th>Laptop</th>
                    </tr>

                </thead>
                <tbody>
                    {td}
                </tbody>
            </table>
        )

    }

    renderSelect(){
        let select = this.state.data.map(val => {
            return (
                    <option key={val.id} value={val.id}>{val.id}</option>
            )
        })

        return (
            <select onChange={(e) => {this.setState({idData: e.target.value})}}>
                {select}
            </select>
        )
    }

    handleInput(event){
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render() { 
        return (  
            <div>
                <div>
                    Ini halaman latihan
                    
                </div>
                <div>
                    {
                        this.state.data
                        ?
                        this.renderSelect()
                        :
                        null
                    }
                </div>
                <div>       
                    {
                        this.state.data
                        ?
                        this.renderTable()
                        :
                        null
                    }
                </div>
                <div>
                    <input 
                        type='text' 
                        name='nama'
                        ref='nama'
                        // value={this.state.nama} 
                        onChange={this.handleInput} 
                        placeholder='Nama'
                    />
                    <input 
                        type='number'
                        name='age'
                        ref='age'
                        // value={this.state.age} 
                        onChange={this.handleInput} 
                        placeholder='Umur'
                    />
                    <input 
                        type='text' 
                        name='laptop'
                        ref='laptop'
                        // value={this.state.laptop} 
                        onChange={this.handleInput} 
                        placeholder='Laptop'
                    />
                    <input type='button' value='Add' onClick={this.onBtnAddData} />
                    <input type='button' value='Edit' onClick={this.onBtnEditData} />
                    <input type='button' value='EditPut' onClick={this.onBtnEditDataPut} />
                    <input type='button' value='Delete' onClick={this.onBtnDeleteData} />
                    <input type='button' value='Delete All' onClick={this.onBtnDeleteAll} />

                    <h3>Name: {this.state.nama}</h3>
                    <h3>Age: {this.state.age}</h3>
                    <h3>Laptop: {this.state.laptop}</h3>
                </div>
            </div>
        );
    }
}
 
export default LatihanAxios;