import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../../AuthContext/AuthProvider';

const LoginBanner = () => {
    const {dark}= useContext(AuthContext)
    return (
        <div>
            <section className={`py-6 max-w-5xl shadow md:shadow-md mx-auto ${dark ? "bg-base-200  " : "bg-primary"} ${!dark?"text-base-100":"text-gray-100" }`}>
                <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
                    <h1 className="text-4xl font-bold leading-none text-center">Please login to add a Feedback</h1>
                   
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
                        <Link to='/login' className=" text-lg font-semibold btn btn-outline">Login</Link>
                        <Link to='/signup' className=" text-lg font-normal btn">Signup</Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default LoginBanner;