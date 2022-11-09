import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthProvider';
import useTitle from '../../Hooks/useTitle';
import Swal from 'sweetalert2'

const SignUp = () => {
    const { userSignUp, userUpdate, LoginWithPopup } = useContext(AuthContext)
    useTitle('Sign Up')
    const googleProvider = new GoogleAuthProvider()

    const [error, setError] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value
        const photoURL = form.photoURL.value
        const email = form.email.value
        const password = form.password.value
        const profile = { displayName: name, photoURL: photoURL }
        // console.log(email, password, name, photoURL);
        userSignUp(email, password)
            .then(result => {
                userUpdate(profile)
                    .then(() => { })
                    .catch(() => { })
                // console.log(result.user)
                // jwt
                const user = (result.user);
                const currentUser = {
                    email: user.email
                }

                fetch('https://lawyer-sigma.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('geniusToken', data.token)
                        Toast.fire({
                            icon: 'success',
                            title: 'Sign Up successfully'
                        })
                        setError(null)
                        setErrorMsg(null)
                        form.reset()
                    })
            })
            .catch(err => {
                const errorMsg = (err.message).split(':').pop().split('(')[0];
                const error = (err.message).split('/').pop().split(')')[0];

                setError(error)
                setErrorMsg(errorMsg)
                // console.error(err);

            })
    }
    const handleGoogle = () => {
        LoginWithPopup(googleProvider)
            .then(result => {
                Toast.fire({
                    icon: 'success',
                    title: 'Log In successfully'
                })
                // console.log(result.user);

            })
            .catch(err => {
                const errorMsg = (err.message).split(':').pop().split('(')[0];
                const error = (err.message).split('/').pop().split(')')[0];

                setError(error)
                setErrorMsg(errorMsg)
                // console.error(err);

            })
    }
    return (
        <div className='w-full  lg:h-screen bg-primary py-5 lg:py-8'>
            <div className="w-full max-w-lg p-8 space-y-3 rounded-xl mx-auto  bg-primary lg:shadow-2xl">
                <h1 className="text-5xl font-bold text-center py-8">SignUp</h1>
                <form onSubmit={handleSubmit} className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="name" className="block ">Name</label>
                        <input type="text" name="name" id="name" placeholder="name" className="w-full px-4 py-3 rounded-md bg-primary border-2 " required />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="Photo URL" className="block ">Photo URL</label>
                        <input type="url" name="photoURL" id="Photo URL" placeholder="Photo URL" className="w-full px-4 py-3 rounded-md bg-primary border-2" required />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block ">Email</label>
                        <input type="email" name="email" id="email" placeholder="email" className="w-full px-4 py-3 rounded-md bg-primary border-2" required />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block ">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md bg-primary border-2" required />

                    </div>
                    <small className='text-error-content'>{error}<br />
                        {errorMsg}</small>
                    <button type='submit' className="block w-full p-3 text-center btn  ">Sign Up</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    <p className="px-3 text-sm text-gray-600">SignUp with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={handleGoogle} aria-label="Log in with Google" className="p-3 rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>

                </div>
                <p className="text-xs text-center sm:px-6 text-gray-600">Do have an account?
                    <Link to="/login" className="underline mx-2 text-gray-800">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;