import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { showErrorMsg, showSuccessMsg } from './helpers/message';
import { showLoading } from './helpers/loading';
import {isAuthenticated} from './helpers/auth';
import {signup } from '../api/auth';


const Signup = () => {
    let history = useHistory();

    useEffect(() => {
        if(isAuthenticated() && isAuthenticated().role === 1){
            history.push('/admin/dashboard');
            
        }
        else if(isAuthenticated() && isAuthenticated().role === 0){
            history.push('/user/dashboard');
        }
    }, [history]);
    //setup component state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        successMsg: false,
        errorMsg: false,
        loading: false 
    });

    //destructure state
    const {username,email,password,password2,successMsg,errorMsg,loading} = formData;

    //event handlers
    const handleChange = (evt) =>{
        setFormData({
            ...formData,
            [evt.target.name] : evt.target.value,
            successMsg: '',
            errorMsg: ''
        });
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        //validate input fields in client side
        if(isEmpty(username) || isEmpty(password) || isEmpty(email) || isEmpty(password2)){
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
        else if(!equals(password,password2)){
            setFormData({
                ...formData,
                errorMsg : `Passwords didn't match`
            });
        }
        else{
            //success 
            
            const { username, email, password } = formData;
            const data = { username, email, password };
            setFormData({...formData, loading:true});
            signup(data)
                .then(response => {
                    console.log('Axios success msg: ',response);
                    setFormData({
                        ...formData,
                        username: '',
                        email: '',
                        password: '',
                        password2: '',
                        loading: false,
                        successMsg: response.data.successMessage,
                    });
                }).catch(err => {
                    console.log('Inside it');
                    console.log('Axios Error: ',err);
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage
                    });

                })
        }
        //console.log(formData);
    };



    //views
    const showSignupForm = () => (
        <form className='signup-form' onSubmit={handleSubmit}>
        {/* username */}
        <div className="form-group input-group mb-3">
        <span className="input-group-text" id="basic-addon1"><i className='fa fa-user'></i></span>
        <input type="text" name='username' value = {username} className="form-control" placeholder="Username" onChange={handleChange} />
        </div>

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
        
        {/* password2 */}
        <div className="form-group input-group mb-3">
        <span className="input-group-text" id="basic-addon1"> <i className='fa fa-lock'></i></span>
        <input type="password" name='password2'value={password2}className="form-control" placeholder="Confirm Password" onChange={handleChange}/>
        </div>


        {/* signup button */}
        <div className='form-group'>
                <button type='submit' className='btn btn-primary btn-block'>
                    Signup
                </button>
        </div>
        {/* already have account */}
        <p className='text-center text-black'>
            Have an account? <Link to='/signin'>Log In</Link>
        </p>
    </form> 
    );

    return (
        <div className='signup-container'>
            <div className='row px-3 vh-100'>
                <div className='col-md-5 mx-auto align-self-center'>
                    <h2 className='text-center'>Create An Account</h2>
                    {successMsg && showSuccessMsg(successMsg) }
                    {errorMsg && showErrorMsg(errorMsg) }
                    {loading && <div className='text-center pb-4'>{showLoading()}</div>}
                    {showSignupForm()}
                </div>

            </div>
        </div>
    );
};

export default Signup;