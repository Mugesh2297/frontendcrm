import './App.css';
import Login from './Components/Login';
import "./vendor/fontawesome-free/css/all.min.css";
import "./css/sb-admin-2.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Register from './Components/Register';
import ForgetPass from './Components/ForgetPass';
import Products from './Components/Proudcts';
import User from './Components/User';
import Createproduct from './Components/Createproduct'
import Editproduct from './Components/Editproduct'
import EditUser from './Components/EditUser';
import Confirm from './Components/Confirm';
import Leads from './Components/leads';
import CreateLeads from './Components/CreateLeads';
import LeadsView from './Components/LeadsView';
import EditLeads from './Components/Editleads';
import Services from './Components/Services';
import CreateServices from './Components/CreateServices';
import EditServices from './Components/EditServices';



function App() {
  return (
  <div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/resetpassword/:id/:token" element={<Confirm/>}/>
    <Route path="/forget" element={<ForgetPass/>}/>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/register" element={<Register/>} />
    <Route path="/products" element={<Products/>}/>
    <Route path='products/editproduct/:id' element={<Editproduct />} />
    <Route path="/create-product" element={<Createproduct/>}/>
    <Route path="/leads" element={<Leads/>}/>
    <Route path="/createLeads" element={<CreateLeads/>}/>
    <Route path='leads/:leadsid' element={<LeadsView/>}/>
    <Route path='leads/editleads/:leadsid' element={<EditLeads/>}/>
    <Route path="/services" element={<Services/>}/>
    <Route path="/createservices" element={<CreateServices/>}/>
    <Route path="/services/editservices/:id" element={<EditServices/>}/>
    <Route path="/users" element={<User/>} />
    <Route path='users/edituser/:id'element={<EditUser />} />
    </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
