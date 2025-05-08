import { Link, useLocation, useNavigate } from 'react-router';
import Banner from '../../assets/Form-Banner.svg';
import { use, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../firebase/firebase';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from 'sweetalert2';

// Sweet Alert
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const Register = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { user, createUser, signInWithGoogle } = use(AuthContext);
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkbox = e.target.checkbox.checked;

        // Password Validate
        const passwordRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRex.test(password)) {
            if (password.length < 8) {
                setPasswordErrorMessage("Password must be at least 8 characters long.");
            } else if (!/[a-z]/.test(password)) {
                setPasswordErrorMessage("Password must include at least one lowercase letter.");
            } else if (!/[A-Z]/.test(password)) {
                setPasswordErrorMessage("Password must include at least one uppercase letter.");
            } else if (!/\d/.test(password)) {
                setPasswordErrorMessage("Password must include at least one digit.");
            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                setPasswordErrorMessage("Password must include at least one special character.");
            } else {
                setPasswordErrorMessage("Password must meet all required conditions.");
            }
            return;
        }

        // Checkbox Check
        if (!checkbox) {
            Toast.fire({
                icon: "error",
                title: "You Have to Accept our Terms and Conditions!",
            });
            return;
        }

        // Set Default Empty
        setErrorMessage("");

        // Create User
        createUser(email, password)
            .then(() => {
                navigate(location.state || "/");
                // Send Email Verification
                // sendEmailVerification(auth.currentUser)
                //     .then(() => {
                //         Toast.fire({
                //             icon: "info",
                //             title: "An email has been sent to you. Please Verify!",
                //         });
                //     })

                // Update Profile
                const profile = {
                    displayName: name,
                    photoURL: photo,
                };

                updateProfile(auth.currentUser, profile)
                    .then(() => {
                        // Success
                        Toast.fire({
                            icon: "success",
                            title: "Create Account Successfully!",
                        });
                    })
                    .catch((error) => {
                        setErrorMessage(error.message);
                        // Error
                        Toast.fire({
                            icon: "error",
                            title: error.message,
                        });
                    });
            })
            .catch((error) => {
                setErrorMessage(error.message);
                // Error
                Toast.fire({
                    icon: "error",
                    title: error.message,
                });
            });
    };

    const handleGoogleSignUp = () => {
        signInWithGoogle()
            .then(() => {
                navigate(location.state || "/");
                // Success
                Toast.fire({
                    icon: "success",
                    title: "Create Account Successfully!",
                });
            })
            .catch((error) => {
                setErrorMessage(error);
                // Error
                Toast.fire({
                    icon: "error",
                    title: errorMessage,
                });
            });
    };

    if (user) {
        return navigate(location.state || "/");
    } else {
        return (
            <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-between my-5">
                {/* Left Side - Banner */}
                <div className='flex flex-col items-center justify-center gap-2 w-full'>
                    <h1 className='text-2xl md:text-4xl font-bold text-gray-700'>Your Next <span className='text-primary'>Opportunity</span> Awaits</h1>
                    <h1 className='text-xl text-neutral'>Log in and take the next step toward your goals. We’re here to help you track every milestone.</h1>
                    <img src={Banner} alt="Banner" className='max-h-[75vh] object-contain' />
                </div>
                {/* Right Side - Registration Form */}
                <div className='w-full'>
                    <div className="w-10/12 mx-auto bg-white p-8 rounded-2xl shadow-xl">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2 text-center">Sign Up for an Account</h1>
                        <form onSubmit={handleSubmit} className="space-y-1.5">
                            {/* Name */}
                            <div>
                                <label className="label text-sm md:text-lg">Your Name</label>
                                <input type="text" name="name" placeholder="Enter your name" required
                                    className="w-full text-xs md:text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            {/* Photo URL */}
                            <div>
                                <label className="label text-sm md:text-lg">Your Photo</label>
                                <input type="url" name="photo" placeholder="Enter your photo URL" required
                                    className="w-full text-xs md:text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="label text-sm md:text-lg">Email Address</label>
                                <input type="email" name="email" placeholder="example@email.com" required
                                    className="w-full text-xs md:text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            {/* Password */}
                            <div className="relative">
                                <label className="label text-sm md:text-lg">Password</label>
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" required
                                    className="w-full text-xs md:text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                                <div onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-8 md:top-10 right-4 cursor-pointer text-gray-500">
                                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                </div>
                            </div>
                            {/* Password Error Message */}
                            <div className='text-sm md:text-lg text-center text-red-600'>
                                {passwordErrorMessage}
                            </div>
                            {/* Terms and Conditions */}
                            <div className='flex gap-1 text-sm md:text-lg text-gray-700'>
                                <p>Accept our terms and conditions</p>
                                <input type="checkbox" name="checkbox" className="accent-primary" />
                            </div>
                            {/* Register Button*/}
                            <div>
                                <button type="submit" className="w-full btn btn-primary hover:btn-secondary text-white">Register</button>
                            </div>
                            {/* OR */}
                            <div className="flex items-center">
                                <hr className="flex-grow border-t border-gray-300" />
                                <span className="mx-4 text-gray-500 font-semibold">OR</span>
                                <hr className="flex-grow border-t border-gray-300" />
                            </div>
                            {/* Sign in with Google */}
                            <div className='flex justify-center'>
                                <button onClick={handleGoogleSignUp} className="w-full bg-white btn text-primary border-secondary hover:shadow-xl"><FcGoogle size={24} /> Register With Google</button>
                            </div>
                        </form>
                        {/* Check Link */}
                        <p className="mt-3 text-sm md:text-lg text-center text-gray-500">
                            Already Have an Account? <Link to="/login" className="text-primary hover:text-secondary hover:underline">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Register;