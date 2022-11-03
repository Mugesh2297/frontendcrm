import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import register from "../img/register.jpg";


function Register() {
    const navigate = useNavigate();

    
    // const [formData, setFormData] = useState({
    //     name:"",
    //     email: "",
    //     password: "",
    //     confirmPassword: ""
    // })
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role:""
        },
        validate: (values) => {
            let errors = {};
            if (values.name === "") {
                errors.name = "Please Enter Name"
            }
            if (values.email === "") {
                errors.email = "Please Enter Email Id"
            }
            if (values.password === "") {
                errors.password = "Please Enter Password"
            }
            if (values.confirmPassword === "") {
                errors.confirmPassword = "Please Enter Confirm Password"
            }
            if (values.role === "") {
                errors.role = "Please Select Role"
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                var response = await axios.post("https://crmappbackend22.herokuapp.com/register/signup", values);
                localStorage.setItem("token", response.data);
                alert("User Created");
                navigate("/");
            }
            catch (err) {
                console.log(err.response);
                alert(err.response.data.msg);
            }
        }


    })


    return (
        <div class="container">

            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    {/* <!-- Nested Row within Card Body --> */}
                    <div class="row">
                        <div class="col-lg-5 d-none d-lg-block ">
                        <img alt="" src={register} style={{width:"500px"}} />
                        </div>
                        <div class="col-lg-7">
                            <div class="p-5">
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form class="user" onSubmit={formik.handleSubmit}>
                                    <div class="form-group row">
                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                                placeholder="Name"
                                                name="name"
                                                value={formik.values.name} onChange={formik.handleChange} />
                                            <span style={{ color: 'red' }}>{formik.errors.name}</span>
                                        </div>

                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                            placeholder="Email Address"
                                            name="email"
                                            value={formik.values.email} onChange={formik.handleChange} />
                                        <span style={{ color: 'red' }}>{formik.errors.email}</span>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password"
                                                name="password"
                                                value={formik.values.password} onChange={formik.handleChange} />
                                            <span style={{ color: 'red' }}>{formik.errors.password}</span>
                                        </div>
                                        <div class="col-sm-6">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleRepeatPassword" placeholder="Repeat Password"
                                                name="confirmPassword"
                                                value={formik.values.confirmPassword} onChange={formik.handleChange} />
                                            <span style={{ color: 'red' }}>{formik.errors.confirmPassword}</span>
                                        </div>
                                    </div>
                                   <center> <Box sx={{ minWidth: 120}}>
                                    <FormControl sx={{minWidth: 140}} style={{borderRadius:"10px"}}>

                                    <InputLabel id="demo-simple-select-label" >Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formik.values.role} onChange={formik.handleChange} 
                                        label="role"
                                        name="role"
                                        
                                    >
                                        <MenuItem value={"manager"}>Manager</MenuItem>
                                        <MenuItem value={"admin"}>Admin</MenuItem>
                                        <MenuItem value={"user"}>User</MenuItem>
                                    </Select>
                                    </FormControl>
                                    </Box></center><br/>
                                    <button type="submit" class="btn btn-primary btn-user btn-block" disabled={!formik.isValid}>
                                        Register Account
                                    </button>

                                </form>
                                <hr />
                                <div class="text-center">
                                    <Link class="small" to="/forget">Forgot Password?</Link>
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
    )
}

export default Register