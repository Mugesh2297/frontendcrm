import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import product from "../img/product.jpg";



function Products() {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        loadData()
    }, [])
    let loadData = async () => {
        setLoading(true)
        let users = await axios.get("https://crmappbackend22.herokuapp.com/products/get",{
            headers:{
                accesstoken: localStorage.getItem("token"),
            }
        });
        setUsers(users.data)
        setLoading(false)
    }
    let deleteProduct = async (id) => {
        try {
            let ask = window.confirm("Are You Sure Want to Delete This Data");
            if (ask) {
                let response = await axios.delete(`https://crmappbackend22.herokuapp.com/products/delete/${id}`,
                {
                    headers:{
                        accesstoken: localStorage.getItem("token"),
                    }
                });
                console.log(response)
                alert("Deleted Successfully")
                loadData()
            }
        } catch (error) {
            console.log(error.response);
            alert(error.response.data.msg)

        }
    }
    return (
        <div id="wrapper">

            {/* <!-- Sidebar --> */}
            <Sidebar />
            {/* <!-- End of Sidebar --> */}

            {/* <!-- Content Wrapper --> */}
            <div id="content-wrapper" class="d-flex flex-column">

                {/* <!-- Main Content --> */}
                <div id="content">

                    {/* <!-- Topbar --> */}
                    <Topbar />
                    <div className="container-fluid">

                        {/* <!-- Page Heading --> */}
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Product Details</h1>
                            <Link to="/create-product" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                className="fas fa-download fa-sm text-white-50"></i> Create Product</Link>
                        </div>

                        {/* <!-- DataTales Example --> */}
                        {
                            isLoading ? <span>Loading...</span> : 
                            
                            <div className="card mb-5" style={{backgroundColor: "#DDDDDD"}}>
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary"> Details</h6>
                        </div>
                        <div className="card-body">
                            <div className='container'>
                                 <div className='row'>
    
                                    {
                                        users.map((user, index) => {
                                            return <>
                                                <div className='col-lg-4 mx-auto' key = {index}>
                                                    <div className="card mb-3" style={{ width: '18rem' }}>
                                                    <img class="card-img-top" src={product} alt="Card image cap"/>
                                                        <div className="card-body">
                                                        <h5 class="card-title" style={{ color: 'black' }}><b>{user.productName}</b></h5>

                                                        <p class="card-text" style={{ color: 'black' }}>{user.description}</p>

                                                        </div>
                                                        <ul className="list-group list-group-flush ">
                                                        <li class="list-group-item"style={{ color: 'black' }}><b>Quantity:</b> {user.quantity} </li>
                                                   <li class="list-group-item" style={{ color: 'black' }}><b>Price:</b>  {user.price}</li>                                                            
                                                            <li className="list-group-item mx-auto">
                                                                <Link to={`editproduct/${user._id}`}
                                                                 className='btn btn-sm btn-primary mr-2  px-3 py-2'><FontAwesomeIcon icon={faEdit}>
                                                                    </FontAwesomeIcon> Edit</Link>

                                                                <button onClick={() => {
                                                                    deleteProduct(user._id)
                                                                }} className='btn btn-sm btn-danger mr-2 py-2'>
                                                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </>

                                        })
                                    }


                                </div>
                            </div>


                        </div>
                     </div> 
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;