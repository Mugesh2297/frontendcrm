import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Swal from 'sweetalert2';


function CreateServices() {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {

            serviceName: "",
            company: "",
            price: "",
            status: "",


        },
        validate: (values) => {
            let errors = {};
            if (values.serviceName === "") {
                errors.serviceName = "Please Enter service Name"
            }
            if (values.company === "") {
                errors.company = "Please Enter Company"
            }
            if (values.price === "") {
                errors.price = "Please Enter price"
            }
            if (values.status === "") {
                errors.status = "Please select status"
            }

            return errors;

        },
        onSubmit: async (values) => {

            try {
                var response = await axios.post("https://crmappbackend22.herokuapp.com/services/create", values, {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    }
                });
                console.log(response)
                Swal.fire({ title: 'Service Created Successfully',  icon: 'success', confirmButtonText: 'okay'});
                navigate("/services")
            } catch (err) {
                console.log(err.response.data.msg)
                Swal.fire({ title: err.response.data.msg,  icon: 'error', confirmButtonText: 'okay'});
                navigate("/services")
            }

        }
    })
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
                    <div className='container'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='row'>

                                <div className='col-lg-4 p-2 mx-auto'>
                                    <lable >Service Name</lable>
                                    <input className='form-control' type={"text"} placeholder="Enter Service Name"
                                        value={formik.values.serviceName} onChange={formik.handleChange}
                                        name="serviceName"></input>
                                    <span style={{ color: 'red' }}>{formik.errors.serviceName}</span>
                                </div>

                                <div className='col-lg-4 p-2 mx-auto'>
                                    <lable>Company</lable>
                                    <input className='form-control' type={"text"} placeholder="Enter company"
                                        value={formik.values.company} onChange={formik.handleChange}
                                        name="company"></input>
                                    <span style={{ color: 'red' }}>{formik.errors.company}</span>
                                </div>


                                <div className='col-lg-4 p-2 mx-auto'>
                                    <lable>Price</lable>
                                    <input className='form-control' type={"number"} placeholder="Enter Price"
                                        value={formik.values.price} onChange={formik.handleChange}
                                        name="price"></input>
                                    <span style={{ color: 'red' }}>{formik.errors.price}</span>
                                </div>

                                {/* <div className='col-lg-6 p-2 mx-auto'>
            <lable>Status</lable>
            <input className='form-control' type={"text"} placeholder="Enter status"
            value={formik.values.status} onChange={formik.handleChange}
            name="status"></input>
            <span style={{color:'red'}}>{formik.errors.status}</span>
            </div> */}
                            <div className='col-lg-12 pt-2 mx-auto'>
                                <select style= {{width:"348px", height:"40px", borderRadius:"5px"}}class="form-select" aria-label="Default select example" lable="status" name="status"  value={formik.values.status} onChange={formik.handleChange}>
                                    <option >Select for Status</option>
                                    <option value="created">Created</option>
                                    <option value="open">Open</option>
                                    <option value="inprocess">Inprocess</option>
                                    <option value="released">Released</option>
                                    <option value="canceled">Canceled</option>
                                    <option value="completed">Completed</option>
                                </select>
                                </div>
                                <div className='col-lg-12 p-2 mx-auto'>

                                    <input className='btn btn-primary mt-2 ' type={"submit"} value="Submit" disabled={!formik.isValid}></input>
                                </div>

                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>



    )
}

export default CreateServices