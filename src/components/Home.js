import React, { Component } from 'react'
import logo from '../assets/logo_addressBook.jpg'
import '../components/Home.css'
import add from '../assets/icons/add-24px.svg'
import axios from 'axios'
import deleteicon from '../assets/icons/delete-black-18dp.svg'
import editicon from '../assets/icons/create-black-18dp.svg'


class Home extends Component {

    constructor(props){
        super(props)

        this.state = {
            posts : []   
        }
    }

    componentDidMount(){
        
        this.getService();

    }

    componentDidUpdate(){
        this.getService()
    }

    getService(){
        axios.get('http://localhost:8080/addressbookservice')
        .then(response => {
            console.log(response)
            this.setState({posts: response.data.data})
        }).catch(error => {
            console.log(error)
        })
    }
    

    
    deleteRow(id, e){
        axios.delete(`http://localhost:8080/addressbookservice/delete/${id}`)
          .then(res => {
            console.log(res);
            console.log(res.data);
      
            const posts = this.state.posts.filter(item => item.pid !== id);
            this.setState({ posts });

          })
      
    }

    editRow(id,e){
        
        axios.get(`http://localhost:8080/addressbookservice/get/${id}`)
        .then(response => {
            console.log(response.data.data)   
            localStorage.setItem("details",JSON.stringify(response.data.data))
            this.props.history.push('/update')
        }).catch(error => {
            console.log(error)
        })
        

    }


    render() {
        const {posts} =this.state
        return (
            <div>
                <header className="header-container">
                    <div className="logo-content">
                        <img src={logo}/>
                        <div>
                            <span className="add-text" >ADDRESS</span><br/>
                            <span className="add-text book">BOOK</span>
                        </div>
                    </div>
                </header>
                <div className="main-container">
                    <div className="home-container">
                        <div className="home-header">
                            <div className="home-name">Person Details<div className = "emp-count">{posts.length}</div></div>
                            <a href = "http://localhost:3000/"  className="add-button"> 
                                <img src={add} alt="" style={{width:30}}/>
                                Add Person
                            </a>
                        </div>
                        <div className="table-main">
                            <table id="table-display" className="table">  
                            <th>Full Name </th> <th>Address</th> <th>City</th> <th>State</th>
                            <th>Zip</th> <th>Phone Number</th> <th>Actions</th>
                            {
                                posts.length ?
                                posts.map(post=> 
                                    <tr> 
                                        
                                        <td>{post.name}</td>
                                        <td>{post.address}</td>
                                        <td>{post.city}</td>
                                        <td>{post.state}</td>
                                        <td>{post.zip}</td>
                                        <td>{post.mobile}</td>
                                        <td>
                                            <img id = {post.pid} src = {deleteicon} style={{width:30}} onClick={(e) => this.deleteRow(post.pid, e)} alt = "delete"/>    
                                            <img id = {post.pid} src = {editicon} style={{width:30}} onClick={(e) => this.editRow(post.pid,e)} alt = "edit"/>                                                                                
                                        </td>
                                    </tr>
                                ):
                                null
                            }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
