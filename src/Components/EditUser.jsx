import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Swal from 'sweetalert2';

function EditServices() {
  const params = useParams()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      
    },
    validate: (values) => {
      let errors = {};
      if (values.name === "") {
        errors.name = "Please Enter Name"
      }
      if (values.email === "") {
        errors.email = "Please Enter Email"
      }
      if (values.role === "") {
        errors.role = "Please Select Role"
      }
      return errors;
    },
    onSubmit: async (values) => {
      try{
     let response =  await axios.put(`https://crm-efrm.onrender.com/users/update/${params.id}`, values,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
      })
      console.log(response)
      if(response.status===200){
        Swal.fire({ title: 'User Edited Successfully',  icon: 'success', confirmButtonText: 'okay'});
        
      navigate('/users');
      }
    }catch(err){
      console.log(err.response)
      Swal.fire({ title: err.response.data.msg,  icon: 'error', confirmButtonText: 'okay'});
    
    }
    }
  })

  useEffect(() => {
    loadUser()
  }, [])

  let loadUser = async () => {
    try {
      let user = await axios.get(`https://crm-efrm.onrender.com/users/get/${params.id}`,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
     
      });
      console.log("user")
      console.log(user)
    

      formik.setValues({
        
        name: user.data[0].name,
        email: user.data[0].email,
        role: user.data[0].role,
      
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

          <div className='col-lg-6 p-2'>
            <lable > Name</lable>
            <input className='form-control' type={"text"} placeholder="Enter Service Name"
              value={formik.values.name} onChange={formik.handleChange}
              name="name"></input>
            <span style={{ color: 'red' }}>{formik.errors.name}</span>
          </div>
          <div className='col-lg-6  p-2'>
            <lable >Email</lable>
            <input className='form-control' type={"email"} placeholder="Enter Email "
              value={formik.values.email} onChange={formik.handleChange}
              name="email"></input>
            <span style={{ color: 'red' }}>{formik.errors.email}</span>

          </div>
          <div className='col-lg-12  mx-auto pt-2'>
                                <select style= {{width:"348px", height:"40px", borderRadius:"5px"}}class="form-select"
                                 aria-label="Default select example" lable="role" name="role" 
                                 value={formik.values.role} onChange={formik.handleChange}>
                                    <option >Select a Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="user">User</option>
                                    
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