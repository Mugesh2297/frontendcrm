import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function Confirm() {
    const navigate = useNavigate();
    const test = useParams()
    let formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validate: (value) => {
            let errors = {}
            //Password;
            if (value.password === "") {
                errors.password = "Enter password"
            }
            if (value.confirmPassword === "") {
                errors.confirmPassword = "Enter confirm password"
            }
            return errors
        },
        onSubmit: async (values) => {
          
            try {
               var response =  await axios.post(`https://crmappbackend22.herokuapp.com/resetpass/${test.id}/${test.token}`, values);
               console.log(response)
                Swal.fire({ title: 'Password reset Successful', text: 'Updated Done', icon: 'success', confirmButtonText: 'Login'});
                navigate("/")

                
            } catch (err) {
               console.log(err.response);
                alert(err.response.data.msg);
                if(err.response.status === 500){
                    alert(err.response.data.Message);
                }
            }
        }
    });
    return (
        <>
            <span className='container'>
                <span className='row d-flex align-content-center justify-content-center mt-5'>
                    

                        {/* -------------------Forget form-------------------- */}
                        <form className='mx-2' onSubmit={formik.handleSubmit}>


                            {/* <!-- Email input --> */}
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input type="password" class="form-control form-control-user"
                                        id="exampleInputPassword" placeholder="Enter Password"
                                        name="password"
                                        value={formik.values.password} onChange={formik.handleChange}/>
                                        <span style={{color:'red'}}>{formik.errors.password}</span>
                                </div>
                                <div class="col-sm-6">
                                    <input type="password" class="form-control form-control-user"
                                        id="exampleRepeatPassword" placeholder="Repeat Password"
                                        name="confirmPassword"
                                        value={formik.values.confirmPassword} onChange={formik.handleChange}/>
                                        <span style={{color:'red'}}>{formik.errors.confirmPassword}</span>
                                </div>
                            </div>

                          
                            <button type={"submit"} className="btn btn-primary btn-lg btn-block" disabled={!formik.isValid}>Click to Update password</button>
                        </form>

                    </span>
               
            </span>
        </>
    )
}

export default Confirm;