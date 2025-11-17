import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../Social Login/SocialLogin';
import axios from 'axios';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth()
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const handleRegistration = (data) => {

        console.log(data.photo[0]);
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(result => {
                console.log(result)

                // store the image in form data and get the photo url
                const formData = new FormData();
                formData.append('image', profileImg);

                // send the ohoto to store and get the url
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`
                axios.post(image_API_URL, formData)
                    .then(res => {
                        console.log(res.data.data.url);

                        // update user profile here to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('done');
                                navigate(location.state || "/");
                            })
                            .catch(error => {
                                console.log(error);
                            })

                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h className="text-3xl text-center">Welcome to Zap Shift</h>
            <p className='text-center'>Please Register</p>
            <form className='card-body' onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    {/* Name */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Your name" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Name is required</p>}
                    {/*Photo */}
                    <label className="label">Photo</label>

                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your photo" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Photo is required</p>}

                    {/* Email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

                    {/* Password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/ })} className="input" placeholder="Password" />
                    {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>}
                    {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have one numeric digit, one lowercase letter, one uppercase word and at least one special character.</p>}

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p>Already have an account <Link state={location.state} className='text-blue-400 underline' to="/login">Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;