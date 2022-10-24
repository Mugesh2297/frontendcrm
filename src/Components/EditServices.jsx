import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Alert from '@mui/material/Alert';

function EditServices() {
  const params = useParams()
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
        errors.serviceName = "Please Enter Service Name"
      }
      if (values.company === "") {
        errors.company = "Please Enter Company"
      }
      if (values.price === "") {
        errors.price = "Please Enter Price"
      }
      if (values.status === "") {
        errors.status = "Please Select status"
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      try{
     let response =  await axios.put(`https://crmappbackend22.herokuapp.com/services/update/${params.id}`, values,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
      })
      console.log(response)
      if(response.status===200){
        alert("Service Edited");
        
      navigate('/services');
      }
    }catch(err){
      console.log(err.response)
      alert(err.response.data.msg)
    
    }
    }
  })

  useEffect(() => {
    loadUser()
  }, [])

  let loadUser = async () => {
    try {
      let user = await axios.get(`https://crmappbackend22.herokuapp.com/services/get/${params.id}`,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
     
      });
      console.log("user")
      console.log(user)
    

      formik.setValues({
        
        serviceName: user.data[0].serviceName,
        company: user.data[0].company,
        price: user.data[0].price,
        status: user.data[0].status,
      
      })
    }
    catch (error) {
      console.log(error.user)

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

    <div className='container'>
      <form onSubmit={formik.handleSubmit}>
        <div className='row'>

          <div className='col-lg-4 p-2'>
            <lable >Service Name</lable>
            <input className='form-control' type={"text"} placeholder="Enter Service Name"
              value={formik.values.serviceName} onChange={formik.handleChange}
              name="serviceName"></input>
            <span style={{ color: 'red' }}>{formik.errors.serviceName}</span>
          </div>
          <div className='col-lg-4  p-2'>
            <lable >Company</lable>
            <input className='form-control' type={"text"} placeholder="Enter Company "
              value={formik.values.company} onChange={formik.handleChange}
              name="company"></input>
            <span style={{ color: 'red' }}>{formik.errors.company}</span>

          </div>
          <div className='col-lg-4  p-2'>
            <lable >Price</lable>
            <input className='form-control' type={"number"} placeholder="Enter Price"
              value={formik.values.price} onChange={formik.handleChange}
              name="price"></input>
            <span style={{ color: 'red' }}>{formik.errors.price}</span>
          </div>
          <div className='col-lg-12  mx-auto pt-2'>
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
          <div className='col-lg-12  p-2'>

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

export default EditServices