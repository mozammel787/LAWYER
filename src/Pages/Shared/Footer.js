import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthProvider';

const Footer = () => {
    const {dark}= useContext(AuthContext)

    return (
        <>
            <footer className={`footer p-10 text-base-content ${dark?"bg-base-200":"bg-primary" }`}>

                <div>
                    <span className="footer-title">Services</span>
                    <Link className="link link-hover">Branding</Link>
                    <Link className="link link-hover">Design</Link>
                    <Link className="link link-hover">Marketing</Link>
                    <Link className="link link-hover">Advertisement</Link>
                </div>

                <div>
                    <span className="footer-title">Company</span>
                    <Link className="link link-hover">About us</Link>
                    <Link className="link link-hover">Contact</Link>
                    <Link className="link link-hover">Jobs</Link>
                    <Link className="link link-hover">Press kit</Link>
                </div>

                <div>
                    <span className="footer-title">Legal</span>
                    <Link className="link link-hover">Terms of use</Link>
                    <Link className="link link-hover">Privacy policy</Link>
                    <Link className="link link-hover">Cookie policy</Link>
                </div>

                <div>
                    <span className="footer-title">Newsletter</span>

                    <div className="form-control w-80">

                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>

                        <div className="relative hidden md:inline">

                            <input type="text" placeholder="username@site.com" className="input input-bordered bg-primary border-2 w-full pr-16" />

                            <button className="btn absolute top-0 right-0 rounded-l-none">Subscribe</button>
                            
                        </div>

                    </div>

                </div>

            </footer>
        </>
    );
};

export default Footer;