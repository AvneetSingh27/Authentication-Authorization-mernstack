import React, { Fragment } from 'react'
import { Link , withRouter} from 'react-router-dom';
import {isAuthenticated,logout} from './helpers/auth';



const Header = ({history}) => {
    const handleLogout = (evt) => {
        logout(() => {
            history.push('/signin');
        });
    };

    //views
    const showNavigation = () => (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link  to='/' className="navbar-brand mb-0 h1" >Intern</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                        <Link to='/'className="nav-link" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link to='/signup'className="nav-link" aria-current="page">SignUp</Link>
                        </li>
                        <li className="nav-item">
                        <Link to='/signin'className="nav-link" aria-current="page" >SignIn</Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && isAuthenticated().role === 0 && (
                    <Fragment>
                        <li className="nav-item">
                        <Link to='/user/dashboard'className="nav-link" >Dashboard</Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && isAuthenticated().role === 1 && (
                    <Fragment>
                        <li className="nav-item">
                        <Link to='/admin/dashboard'className="nav-link" >Dashboard</Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                        <button className='btn btn-link text-secondary text-decoration-none pl-0' onClick={handleLogout}>
                            Logout
                        </button>
                        </li>
                    </Fragment>
                )}
            </ul>
            </div>
        </div>
        </nav>
    );
    //render 
    return(
        <header id="header"> 
            { showNavigation() }
        </header>
    );

};

export default withRouter(Header);
