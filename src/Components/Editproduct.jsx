import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Alert from '@mui/material/Alert';

function EditProduct() {
  const params = useParams()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      productName: "",
      quantity: "",
      price: "",
      description: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.productName === "") {
        errors.productName = "Please Enter Product Name"
      }
      if (values.quantity === "") {
        errors.quantity = "Please Enter Quantity"
      }
      if (values.price === "") {
        errors.price = "Please Enter Price"
      }
      if (values.description === "") {
        errors.description = "Please Enter description"
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      try{
     let response =  await axios.put(`https://crmappbackend22.herokuapp.com/products/update/${params.id}`, values,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
      })
      console.log(response)
      if(response.status===200){
        alert("Product Edited");
        
      navigate('/products');
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
      let user = await axios.get(`https://crmappbackend22.herokuapp.com/products/get/${params.id}`,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
     
      });
      console.log("user")
      console.log(user)
    

      formik.setValues({
        
        productName: user.data[0].productName,
        quantity: user.data[0].quantity,
        price: user.data[0].price,
        description: user.data[0].description,
      
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
            <lable >Product Name</lable>
            <input className='form-control' type={"text"} placeholder="Enter Product Name"
              value={formik.values.productName} onChange={formik.handleChange}
              name="productName"></input>
            <span style={{ color: 'red' }}>{formik.errors.name}</span>
          </div>
          <div className='col-lg-6  p-2'>
            <lable >Quantity</lable>
            <input className='form-control' type={"number"} placeholder="Enter Quantity "
              value={formik.values.quantity} onChange={formik.handleChange}
              name="quantity"></input>
            <span style={{ color: 'red' }}>{formik.errors.quantity}</span>

          </div>
          <div className='col-lg-6  p-2'>
            <lable >Price</lable>
            <input className='form-control' type={"number"} placeholder="Enter Price"
              value={formik.values.price} onChange={formik.handleChange}
              name="price"></input>
            <span style={{ color: 'red' }}>{formik.errors.price}</span>
          </div>
          <div className='col-lg-6  p-2'>
            <lable >Description</lable>
            <input className='form-control' type={"text"} placeholder="Enter User Name"
              value={formik.values.description} onChange={formik.handleChange}
              name="description"></input>
            <span style={{ color: 'red' }}>{formik.errors.description}</span>
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

export default EditProduct