import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { faPlane, faBullhorn, faWrench, faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Sidebar() {

    return (

        <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    
                </div>
                <div className="sidebar-brand-text mx-3">CRM APP </div>
            </Link>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></Link>
            </li>



            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />


            {/* <!-- Nav Item - Pages Collapse Menu --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/products">
                <FontAwesomeIcon icon={faPlane}> &nbsp;</FontAwesomeIcon>
                &nbsp; <span>Products</span></Link>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
            <li className="nav-item active">
                <Link className="nav-link" to="/leads">
                <FontAwesomeIcon icon={faBullhorn}> &nbsp;</FontAwesomeIcon>                    
                &nbsp; <span>Leads</span></Link>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
            <li className="nav-item active">
                <Link className="nav-link" to="/services">
                <FontAwesomeIcon icon={faWrench}> &nbsp;</FontAwesomeIcon>
                &nbsp; <span>Services</span></Link>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />

            <li className="nav-item active">
                <Link className="nav-link" to="/users">
                <FontAwesomeIcon icon={faUser}> &nbsp;</FontAwesomeIcon>
                &nbsp; <span>Users</span></Link>
            </li>


            <hr className="sidebar-divider d-none d-md-block" />



        </ul>

    )
}

export default Sidebar;