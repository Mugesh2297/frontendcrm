import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function Createproduct() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
   
      productName: "",
      quantity: "",
      price: "",
      description: "",
    
      
    },
    validate: (values)=>{
      let errors = {};
      if (values.productName === "") {
        errors.productName = "Please Enter Product Name"
      }
      if (values.quantity === "") {
        errors.quantity = "Please Enter Product Color"
      }
      if (values.price === "") {
        errors.price = "Please Enter Manufacturer"
      }
      if (values.description === "") {
        errors.description = "Please Enter Month Of Manufacture"
      }
     
      return errors;
      
    },
  //   onSubmit: async (values) => {
  //     try{
  //     var response = await axios.post("http://localhost:3001/register/signin", values);
  //     console.log(response)
  //     localStorage.setItem("token",response.data);                
  //     navigate("/dashboard");
      
      
  // }catch(err){
  //     console.log(err.response.status);
  //     if(err.response.status=400){
  //      alert(err.response.data.msg)

  //       }
  // }
  //   }
    onSubmit: async (values) => {
     
     try{
      var response = await axios.post("https://crmappbackend22.herokuapp.com/products/create",values,{headers:{
        accesstoken: localStorage.getItem("token"),
    }});
    console.log(response)
    alert("User Created Successfully")
    navigate("/products")
  }catch(err){
    console.log(err.response.data.msg)
    alert(err.response.data.msg)
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
            <lable >Product Name</lable>
            <input className='form-control' type={"text"} placeholder="Enter Product Name" 
            value={formik.values.productName} onChange={formik.handleChange}
            name="productName"></input>
            <span style={{color:'red'}}>{formik.errors.name}</span>
            </div>
          
            <div className='col-lg-6 p-2 mx-auto'>
            <lable>Quantity</lable>
            <input className='form-control' type={"text"} placeholder="Enter Quantity"
            value={formik.values.quantity} onChange={formik.handleChange}
            name="quantity"></input>
            <span style={{color:'red'}}>{formik.errors.color}</span>
            </div>

         
            <div className='col-lg-6 p-2 mx-auto'>
            <lable>Price</lable>
            <input className='form-control' type={"text"} placeholder="Enter Price"
            value={formik.values.price} onChange={formik.handleChange}
            name="price"></input>
            <span style={{color:'red'}}>{formik.errors.manufacturer}</span>
            </div>
       
            <div className='col-lg-6 p-2 mx-auto'>
            <lable>Description</lable>
            <input className='form-control' type={"text"} placeholder="Enter Description"
            value={formik.values.description} onChange={formik.handleChange}
            name="description"></input>
            <span style={{color:'red'}}>{formik.errors.month}</span>
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

export default Createproduct