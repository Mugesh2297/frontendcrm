import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import leads from "../img/leads.png";
import { fontSize } from '@mui/system';



function Leads() {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        loadData()
    }, [])
    let loadData = async () => {
        setLoading(true)
        let users = await axios.get("https://crmappbackend22.herokuapp.com/leads/get", {
            headers: {
                accesstoken: localStorage.getItem("token"),
            }
        });
        setUsers(users.data)
        setLoading(false)
    }
    let deleteLeads = async (id) => {
        try {
            let ask = window.confirm("Are You Sure Want to Delete This Data");
            if (ask) {
                let response = await axios.delete(`https://crmappbackend22.herokuapp.com/leads/delete/${id}`,
                    {
                        headers: {
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
                            <h1 className="h3 mb-0 text-gray-800">Lead Details</h1>
                            <Link to="/createLeads" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                className="fas fa-download fa-sm text-white-50"></i> Create Leads</Link>
                        </div>

                        {/* <!-- DataTales Example --> */}
                        {
                            isLoading ? <span>Loading...</span> :

                                <div className="card mb-5" style={{backgroundColor: "#34568b"}}>
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
                                                                    <img class="card-img-top" src={leads} alt="Card image cap" />
                                                                    <div className="card-body">
                                                                        <h5 class="card-title" style={{ color: 'black' }}><b>{user.title}</b></h5>
                                                                        <p style={{ color: 'black' }}><b><u>Company:</u></b></p>
                                                                        <p class="card-text" style={{ color: 'black' }}>{user.company}</p>

                                                                    </div>
                                                                    <ul className="list-group list-group-flush ">
                                                                        <li class="list-group-item" style={{ color: 'black' }}><b>Lead Owner:</b> {user.leadOwner} </li>
                                                                        <li class="list-group-item" style={{ color: 'black' }}><b>Lead Source:</b>  {user.leadSource}</li>
                                                                        <li class="list-group-item text-capitalize" style={{ color: 'black' }}><b>Lead Status:</b>  {user.leadStatus}</li>
                                                                        <li class="list-group-item" style={{ color: 'black' }}><b>Annual Revenue:</b> $ {user.annualRevenue}</li>
                                                                        <li class="list-group-item" style={{ color: 'black' }}><b>Phone:</b>  {user.phone}</li>
                                                                        <li class="list-group-item" style={{ color: 'black', fontSize: "15px"}}><b>Website:</b> <br/><a href={user.website} target="_blank"> {user.website}</a></li>
                                                                        <li class="list-group-item" style={{ color: 'black' }}><b>Email:</b><br/>  {user.email}</li>
                                                                        <li className="list-group-item mx-auto">

                                                                            <Link to={`editleads/${user._id}`}
                                                                                className='btn btn-sm btn-primary mr-2  px-3 py-2'><FontAwesomeIcon icon={faEdit}>
                                                                                </FontAwesomeIcon> Edit</Link>

                                                                            <button onClick={() => {
                                                                                deleteLeads(user._id)
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

export default Leads;