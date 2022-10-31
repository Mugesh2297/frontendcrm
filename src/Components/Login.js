import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from "../img/login.svg";


function Login() {
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: (values) => {
            let errors = {};
            if (values.email === "") {
                errors.email = "Please Enter Email Id"
            }
            if (values.password === "") {
                errors.password = "Please Enter Password"
            }

            return errors;
        },

        onSubmit: async (values) => {
            try {
                var response = await axios.post("https://crmappbackend22.herokuapp.com/register/signin", values);
                console.log(response)
                localStorage.setItem("token", response.data);
                navigate("/dashboard");


            } catch (err) {
                console.log(err.response.status);
                if (err.response.status = 400) {
                    setValue(err.response.data.msg);

                }
            }
        }
    })


    return (
        <div className="container">

            {/* <!-- Outer Row --> */}
            <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* <!-- Nested Row within Card Body --> */}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block " >
                                    <img alt="" src={login} />
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form className="user" onSubmit={formik.handleSubmit}>
                                            <div className="form-group">
                                                <input type="email" name="email" className="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    value={formik.values.email} onChange={formik.handleChange}
                                                />
                                                <span style={{ color: 'red' }}>{formik.errors.email}</span>

                                            </div>
                                            <div className="form-group">
                                                <input type="password"
                                                    name="password" className="form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Password"
                                                    value={formik.values.password} onChange={formik.handleChange}
                                                />
                                                <span style={{ color: 'red' }}>{formik.errors.password}</span>
                                                <span style={{ color: "red" }}>{value}</span>


                                            </div>

                                            <button className="btn btn-primary btn-user btn-block" type="submit" disabled={!formik.isValid}>
                                                Login
                                            </button>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link className="small" to="/forget" >Forgot Password?</Link>
                                        </div>
                                        <div className="text-center">
                                            <Link className="small" to="/register" >Create an Account!</Link>
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

export default Login;