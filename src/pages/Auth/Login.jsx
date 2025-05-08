import { Link, useLocation, useNavigate } from 'react-router';
import Banner from '../../assets/Form-Banner.svg';
import { use, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebase.config';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';

// Sweet Alert
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const Login = () => {
    const { user, signInUser, signInWithGoogle } = use(AuthContext);
    const [errorMessage, setErrorMessage] = useState("")
    const emailRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location)}

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Perform
        // console.log('Email:', email);
        // console.log('Password:', password);

        // Type Login
        signInUser(email, password)
            .then(() => {
                navigate(location.state || "/")
                //Success
                Toast.fire({
                    icon: "success",
                    title: "Login Successfully!",
                });
            })
            .catch((error) => {
                setErrorMessage(error)
                //Error
                Toast.fire({
                    icon: "error",
                    title: errorMessage,
                }); 
            })
    };

    //Sign In with Google
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                navigate(location.state || "/")
                //Success
                Toast.fire({
                    icon: "success",
                    title: "Login Successfully!",
                });
            })
            .catch((error) => {
                setErrorMessage(error)
                //Error
                Toast.fire({
                    icon: "error",
                    title: errorMessage,
                }); 
            })
    }

    if (user) {
        navigate(location.state || "/")
        return;
    } else {
        return (
            <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-between my-5">
                {/* Left Side - Banner */}
                <div className='flex flex-col items-center justify-center gap-2 w-full'>
                    <h1 className='text-2xl md:text-4xl font-bold text-gray-700'>Your Next <span className='text-primary'>Opportunity</span> Awaits</h1>
                    <h1 className='text-xl text-neutral'>Log in and take the next step toward your goals. We’re here to help you track every milestone.</h1>
                    <img src={Banner} alt="Login Banner" className='max-h-[75vh] object-contain' />
                </div>
                {/* Right Side - Login Form */}
                <div className='w-full'>
                    <div className="w-11/12 mx-auto bg-white p-8 rounded-2xl shadow-xl">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2 text-center">Sign In to Your Account</h1>
                        <form onSubmit={handleSubmit} className="space-y-1.5">
                            {/* Email */}
                            <div>
                                <label className="label text-sm md:text-lg">Email Address</label>
                                <input type="email" name="email" placeholder="example@email.com" ref={emailRef}
                                    required
                                    className="w-full text-xs md:text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            {/* Password */}
                            <div>
                                <label className="label text-sm md:text-lg">Password</label>
                                <input type="password" name="password" placeholder="Enter your password"
                                    required
                                    className="w-full text-xs md:text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            {/*Forget Password*/}
                            <p onClick={() => navigate("/forget-password")} className="text-sm md:text-lg text-primary text-right hover:text-secondary hover:underline cursor-pointer">Forget Password</p>
                            {/*Login Button*/}
                            <div className='flex justify-center'>
                                <button type="submit" className="w-full btn btn-primary hover:btn-secondary text-white text-sm md:text-lg">Login</button>
                            </div>
                            {/*OR*/}
                            <div className="flex items-center">
                                <hr className="flex-grow border-t border-gray-300" />
                                <span className="mx-4 text-gray-500 font-semibold">OR</span>
                                <hr className="flex-grow border-t border-gray-300" />
                            </div>
                            {/*Sign in with google*/}
                            <div className='flex justify-center'>
                                <button onClick={handleGoogleSignIn} className="w-full bg-white btn text-primary border-secondary hover:shadow-xl"><FcGoogle size={24} /> Login With Google</button>
                            </div>
                        </form>
                        <p className="mt-3 text-sm md:text-lg text-center text-gray-500">
                            Don't have an account? <Link to="/register" className="text-primary hover:text-secondary hover:underline">Register here</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;