import React, { Component } from 'react'
import '../components/Hello.css'
import logo1 from '../assets/logo_addressBook.jpg'
import cancel from '../assets/cancel.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Hello extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:'',
             address:'',
             city:'Nanded',
             state:'Maharashtra',
             zip:'',
             mobile:''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:8080/addressbookservice/create',this.state)
        .then(response => {
            console.log(response)
            this.props.history.push('/home')
            //window.open(`http://localhost:3000/home`); 
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <header className="header-container">
                    <div className="logo-content">
                        <img src={logo1}/>
                        <div>
                            <span className="add-text" >ADDRESS</span><br/>
                            <span className="add-text book">BOOK</span>
                        </div>
                    </div>
                </header>
                <div className="main-container">
                    <div className="form-container">
                        <div className="form-header">
                            PERSON ADDRESS FORM
                            <Link to="/home">
                            <img src={cancel} alt="cancel" width="3%" style={{float:'right'}}/>
                            </Link>
                        </div>
                    <form className="form" action="#" onreset="resetForm()" onSubmit={this.submitHandler} >
                        <div className="row-content">
                            <label className="label txt" for="name">Full Name</label>
                            <input className="input" type="text" id="name" value = {this.state.name} onChange={this.changeHandler} name="name" required />
                            <error-output className="text-error" for="text"></error-output>
                        </div>
                        <div className="row-content">
                            <label className="label txt" for="mobile">Phone Number</label>
                            <input className="input" type="number" id="mobile" value = {this.state.mobile} onChange={this.changeHandler}
                            name="mobile" placeholder="" required />
                            <error-output className="mobile-error" for="text"></error-output>
                            </div>
                        <div className="row-content">
                            <label className="label txt" for="address">Address</label>
                            <textarea id="address" value = {this.state.address} onChange={this.changeHandler} className="input" name="address" style={{height:50}} placeholder="" ></textarea>
                            <error-output className="address-error" for="address"></error-output>
                        </div>
                        <div className="city-state-zip-content">
                        <div className="row-content city">
                            <label className="label txt" for="city">City</label>
                            <select id="city" value = {this.state.city} onChange={this.changeHandler} name="city" >
                            <option value="Nanded">Nanded</option>
                            <option value="Latur">Latur</option>
                            </select>
                        </div>
                        <div className="row-content state">
                            <label className="label txt" for="state">State</label>
                            <select id="state" value = {this.state.state} onChange={this.changeHandler} name="state" >
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Goa">Goa</option>
                            </select>
                        </div>
                        <div className="row-content zip">
                            <label className="label txt" for="state">Zip</label>
                            <input className="input" type="number" id="zip" value = {this.state.zip} onChange={this.changeHandler} name="zip" placeholder="" required />
                        </div>
                        </div>
                        <div className="button-content">
                        <div className="empty-content"></div>
                        <div className="add-reset">
                            <button  type="submit" className="button addButton" id="addButton">Add</button>
                            <button type="reset" className="button resetButton">Reset</button>
                        </div>
                    </div>   
                    </form> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Hello

