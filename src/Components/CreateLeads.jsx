import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Swal from 'sweetalert2';

function CreateLeads() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {

      leadOwner: "",
      title: "",
      phone: "",
      leadSource: "",
      industry:"",
      annualRevenue: "",
      leadName:"",
      company:"",
      email:"",
      website:"",
      leadStatus:""

    
      
    },
    validate: (values)=>{
      let errors = {};
      if (values.leadOwner === "") {
        errors.leadOwner = "Please Enter Lead Owner"
      }
      if (values.title === "") {
        errors.title = "Please Enter title"
      }
      if (values.phone === "") {
        errors.phone = "Please Enter phone"
      }
      if (values.leadSource === "") {
        errors.leadSource = "Please Enter Lead Source"
      }
      if (values.industry === "") {
        errors.industry = "Please Enter Industry"
      }
      if (values.annualRevenue === "") {
        errors.annualRevenue = "Please Enter Annual Revenue"
      }
      if (values.leadName === "") {
        errors.leadName = "Please Enter Lead Name"
      }
      if (values.company === "") {
        errors.company = "Please Enter company"
      }
      if (values.email === "") {
        errors.email = "Please Enter email"
      }
      if (values.website === "") {
        errors.website = "Please Enter website"
      }
      if (values.leadStatus === "") {
        errors.leadStatus = "Please Enter Lead Status"
      }
     
      return errors;
      
    },
 
    onSubmit: async (values) => {
     
     try{
      var response = await axios.post("https://crm-efrm.onrender.com/leads/create",values,{headers:{
        accesstoken: localStorage.getItem("token"),
    }});
    console.log(response)
    Swal.fire({ title: 'Leads Created Successfully',  icon: 'success', confirmButtonText: 'okay'});
    navigate("/leads")
  }catch(err){
    console.log(err.response.data.msg)
    Swal.fire({ title: err.response.data.msg,  icon: 'error', confirmButtonText: 'okay'});
    navigate("/leads")
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

          <div className='col-lg-6 p-2 mx-auto'>
            <lable >Lead Owner</lable>
            <input className='form-control' type={"text"} placeholder="Enter Lead Owner " 
            value={formik.values.leadOwner} onChange={formik.handleChange}
            name="leadOwner"></input>
            <span style={{color:'red'}}>{formik.errors.leadOwner}</span>
            </div>
          
            <div className='col-lg-6 p-2 mx-auto'>
            <lable>Title</lable>
            <input className='form-control' type={"text"} placeholder="Enter title"
            value={formik.values.title} onChange={formik.handleChange}
            name="title"></input>
            <span style={{color:'red'}}>{formik.errors.title}</span>
            </div>

         
            <div className='col-lg-6 p-2 mx-auto'>
            <lable>Phone</lable>
            <input className='form-control' type={"number"} placeholder="Enter phone"
            value={formik.values.phone} onChange={formik.handleChange}
            name="phone"></input>
            <span style={{color:'red'}}>{formik.errors.phone}</span>
            </div>
       
            <div className='col-lg-6 p-2 mx-auto'>
            <lable>LeadSource</lable>
            <input className='form-control' type={"text"} placeholder="Enter Lead Source"
            value={formik.values.leadSource} onChange={formik.handleChange}
            name="leadSource"></input>
            <span style={{color:'red'}}>{formik.errors.leadSource}</span>
            </div>

            <div className='col-lg-6 p-2 mx-auto'>
            <lable>Industry</lable>
            <input className='form-control' type={"text"} placeholder="Enter industry"
            value={formik.values.industry} onChange={formik.handleChange}
            name="industry"></input>
            <span style={{color:'red'}}>{formik.errors.industry}</span>
            </div>


            <div className='col-lg-6 p-2 mx-auto'>
            <lable>Annual Revenue</lable>
            <input className='form-control' type={"number"} placeholder="Enter Annual Revenue"
            value={formik.values.annualRevenue} onChange={formik.handleChange}
            name="annualRevenue"></input>
            <span style={{color:'red'}}>{formik.errors.annualRevenue}</span>
            </div>


            <div className='col-lg-6 p-2 mx-auto'>
            <lable>Lead Name</lable>
            <input className='form-control' type={"text"} placeholder="Enter Lead Name"
            value={formik.values.leadName} onChange={formik.handleChange}
            name="leadName"></input>
            <span style={{color:'red'}}>{formik.errors.leadName}</span>
            </div>



            <div className='col-lg-6 p-2 mx-auto'>
            <lable>Company</lable>
            <input className='form-control' type={"text"} placeholder="Enter company"
            value={formik.values.company} onChange={formik.handleChange}
            name="company"></input>
            <span style={{color:'red'}}>{formik.errors.company}</span>
            </div>
           
            <div className='col-lg-6 p-2 mx-auto'>
            <lable>Email</lable>
            <input className='form-control' type={"email"} placeholder="Enter email"
            value={formik.values.email} onChange={formik.handleChange}
            name="email"></input>
            <span style={{color:'red'}}>{formik.errors.email}</span>
            </div>


            <div className='col-lg-6 p-2 mx-auto'>
            <lable>Website</lable>
            <input className='form-control' type={"text"} placeholder="Enter website"
            value={formik.values.website} onChange={formik.handleChange}
            name="website"></input>
            <span style={{color:'red'}}>{formik.errors.website}</span>
            </div>


            <div className='col-lg-12 pt-2 mx-auto'>
                                <select style= {{width:"535px", height:"40px", borderRadius:"5px"}}class="form-select" 
                                aria-label="Default select example" lable="leadStatus" name="leadStatus"  
                                value={formik.values.leadStatus} onChange={formik.handleChange}>
                                    <option >Select for Lead Status</option>
                                    <option value="new">New </option>
                                    <option value="contacted">Contacted</option>
                                    <option value="qualified">Qualified</option>
                                    <option value="lost">Lost</option>
                                    <option value="canceled">Canceled</option>
                                    <option value="Confirmed">Confirmed</option>
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

export default CreateLeads