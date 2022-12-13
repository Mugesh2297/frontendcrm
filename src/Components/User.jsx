import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Swal from 'sweetalert2';



function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        loadData()
    }, [])
    let loadData = async () => {
        setLoading(true)
        let users = await axios.get("https://crm-efrm.onrender.com/users/get", {
            headers: {
                accesstoken: localStorage.getItem("token"),
            }
        });
        setUsers(users.data)
        setLoading(false)
    }
    let deleteUser = async (id) => {
        try {
            let ask = window.confirm("Are You Sure Want to Delete This Data");
            if (ask) {
                let response = await axios.delete(`https://crm-efrm.onrender.com/users/delete/${id}`,
                    {
                        headers: {
                            accesstoken: localStorage.getItem("token"),
                        }
                    });
                console.log(response)
                Swal.fire({ title: 'User Deleted Successfully',  icon: 'success', confirmButtonText: 'okay'});
                loadData()
            }
        } catch (error) {
            console.log(error.response);
            Swal.fire({ title: error.response.data.msg,  icon: 'error', confirmButtonText: 'okay'});

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
                            <h1 className="h3 mb-0 text-gray-800">User Details</h1>
                            {/* <Link to="/createservices" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                className="fas fa-download fa-sm text-white-50"></i> Create User</Link> */}
                        </div>

                        {/* <!-- DataTales Example --> */}
                        {
                            isLoading ? <span>Loading...</span> :

                                <div className="card mb-5">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary"> Details</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className='container'>
                                            <div className='row'>

                                                {
                                                    users.map((user, index) => {
                                                        return <>
                                                            <div className='col-lg-4 mx-auto' key={index}>
                                                                <div className="card mb-3" style={{ width: '18rem' }}>
                                                                    <ul className="list-group list-group-flush ">
                                                                        <li class="list-group-item" style={{ color: 'black' }}><b> Name:</b> {user.name} </li>
                                                                        <li class="list-group-item" style={{ color: 'black' }}><b>Email:</b>  {user.email}</li>
                                                                        <li class="list-group-item text-capitalize " style={{ color: 'black' }}><b>Role:</b>  {user.role}</li>
                                                                        <li className="list-group-item mx-auto">

                                                                            <Link to={`edituser/${user._id}`}
                                                                                className='btn btn-sm btn-primary mr-2  px-3 py-2'><FontAwesomeIcon icon={faEdit}>
                                                                                </FontAwesomeIcon> Edit</Link>

                                                                            <button onClick={() => {
                                                                                deleteUser(user._id)
                                                                            }} className='btn btn-sm btn-danger mr-2 px-2 py-2'>
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

export default Users;