import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnDrawProfile2 from "../img/undraw_profile_2.svg";


function Topbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Came")
        localStorage.removeItem("token");
        navigate("/")
    }
    return (
        <div><nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>

            {/* <!-- Topbar Search --> */}
            <form
                className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <b>CRM APP</b>
                    <div className="input-group-append">

                    </div>
                </div>
            </form>

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">


                {/* <!-- Nav Item - Alerts --> */}




                <div className="topbar-divider d-none d-sm-block"></div>

                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">
                    <div className="nav-link dropdown-toggle" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Welcome User!!</span>
                        <img className="img-profile rounded-circle"
                            src={UnDrawProfile2} />&nbsp;
                            <button class= "btn btn-outline-secondary"  onClick={handleLogout}>Logout</button>
                       
                </div>


            </li>

        </ul>

        </nav></div >
  )
}

export default Topbar