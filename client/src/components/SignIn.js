import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import {showLoading} from './helpers/loading';
import {showErrorMsg} from './helpers/message';
import {setAuthentication, isAuthenticated} from './helpers/auth'
import {signin} from './../api/auth';

const SignIn = () => {
    let history = useHistory();

    useEffect(() => {
        if(isAuthenticated() && isAuthenticated().role === 1){
            history.push('/admin/dashboard');
            
        }
        else if(isAuthenticated() && isAuthenticated().role === 0){
            history.push('/user/dashboard');
        }
    }, [history])
    //component state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        errorMsg: false,
        loading: false, 
    });

    //destructure the component state
    const {email,password,errorMsg,loading} = formData;
    
    //event handlers
    const handleChange = (evt) =>{
        setFormData({
            ...formData,
            [evt.target.name] : evt.target.value,
            errorMsg: ''
        });
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        //validate input fields in client side
        if(isEmpty(password) || isEmpty(email)){
            setFormData({
                ...formData,
                errorMsg : 'All fields are required'
            });
        }
        else if(!isEmail(email)){
            setFormData({
                ...formData,
                errorMsg : 'Invalid Email'
            });
        }
        else{
            //success 
            
            const {email, password } = formData;
            const data = {email, password };
            setFormData({...formData, loading:true});
            signin(data)
                .then(response => {
                    setAuthentication(response.data.token, response.data.user);
                    if(isAuthenticated() && isAuthenticated().role === 1){
                        history.push('/admin/dashboard');
                        
                    }
                    else{
                        history.push('/user/dashboard');
                    }
                })
                .catch(err => {
                    console.log('signin api function error: ',err);
                })
                
        }
        //console.log(formData);

    };


    //views
    const showSigninForm = () => (
        <form className='signin-form' onSubmit={handleSubmit}>
        

        {/* email */}
        <div className="form-group input-group mb-3">
        <span className="input-group-text" id="basic-addon1"><i className='fa fa-envelope'></i></span>
        <input type="email" name='email'value={email} className="form-control" placeholder="Email Address" onChange={handleChange}/>
        </div>
        
        {/* password */}
        <div className="form-group input-group mb-3">
        <span className="input-group-text" id="basic-addon1"> <i className='fa fa-lock'></i></span>
        <input type="password" name='password' value={password}className="form-control" placeholder="Create Password" onChange={handleChange}/>
        </div>


        {/* signin button */}
        <div className='form-group'>
                <button type='submit' className='btn btn-primary btn-block'>
                    Signin
                </button>
        </div>

        {/* already have account */}
        <p className='text-center text-black'>
           Don't Have an account? <Link to='/signup'>Register here</Link>
        </p>
    </form> 
    );


    return (
        <div className='signin-container'>
            <div className='row px-3 vh-100'>
                <div className='col-md-5 mx-auto align-self-center'>
                    <h2 className='text-center'>Login</h2>
                    {errorMsg && showErrorMsg(errorMsg) }
                    {loading && <div className='text-center pb-4'>{showLoading()}</div>}
                    {showSigninForm()}
                </div>
            </div>
        </div>
    );
};

export default SignIn;