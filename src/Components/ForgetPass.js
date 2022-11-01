import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import forget from "../img/forgot.svg";


function ForgetPass() {
    const navigate = useNavigate();
    const[value,setValue]= useState();
    let formik = useFormik({
        initialValues: {
          email: "",
        },
        onSubmit: async (values) => {
            try{
          let response  = await axios.post('https://crmappbackend22.herokuapp.com/forgotpassword', values);
          console.log(response);
          if(response.status === 200){
            alert("Email sent to the mail ")
            navigate("/")
          }
        }catch(err){
                console.log(err.response.status);
                // alert(err.response.data.msg);
                setValue(err.response.data.msg);
                
            }
          
        },
      });
  return (
    <div class="container">

        {/* <!-- Outer Row --> */}
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        {/* <!-- Nested Row within Card Body --> */}
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block ">
                            <img alt="" src={forget} style={{width:"500px"}} />
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                        <p class="mb-4">We get it, stuff happens. Just enter your email address below
                                            and we'll send you a link to reset your password!</p>
                                    </div>
                                    <form class="user" onSubmit={formik.handleSubmit}>
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                               name="email"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..."
                                                onChange={formik.handleChange}
                                                  value={formik.values.email}/>
                                        </div>
                                        <button type="submit" class="btn btn-primary btn-user btn-block">
                                            Reset Password
                                        </button>
                                        <br/>
                                        <span style={{color:'red'}}>{value}</span>
                                    </form>
                                    <hr/>
                                    <div class="text-center">
                                        <Link class="small" to="/register">Create an Account!</Link>
                                    </div>
                                    <div class="text-center">
                                        <Link class="small" to="/">Already have an account? Login!</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
  )
}

export default ForgetPass