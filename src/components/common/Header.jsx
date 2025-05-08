import { use, useState } from 'react';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase.config';
import Swal from 'sweetalert2'

const Header = () => {
    const { user } = use(AuthContext);
    // console.log(user)
    const [errorMessage, setErrorMessage] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        setDropdownOpen(false);
        setErrorMessage("")

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

        signOut(auth)
            .then(() => {
                navigate("/login");
                Toast.fire({
                    icon: "success",
                    title: "Logout successfully. See you again!",
                });
            })
            .catch((error) => {
                setErrorMessage(error.message)
                Toast.fire({
                    icon: "error",
                    title: errorMessage,
                });
            });
    };

    return (
        <header className="py-2 shadow">
            <div className="w-11/12 mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-lg md:text-2xl font-bold text-primary flex items-center gap-2 whitespace-nowrap">
                    <img src={logo} alt="Job Hunt Sync Logo" className="w-10 h-10" />
                    Job Hunt Sync
                </Link>

                {/* Navigation */}
                {user ? (
                    <div className="relative">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className='cursor-pointer'>
                            <img alt={user?.displayName} src={user?.photoURL} className="w-14 h-14 rounded-full object-cover border-2 border-primary" />
                        </button>
                        {dropdownOpen && (
                            <ul className="menu menu-sm bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow absolute right-0">
                                <h1 className='text-lg text-center font-semibold text-gray-700'>{user?.displayName}</h1>
                                <li><Link to="/my-profile" className='text-lg' onClick={() => setDropdownOpen(false)}>My Profile</Link></li>
                                <li><Link to="/saved-jobs" className='text-lg' onClick={() => setDropdownOpen(false)}>Saved Jobs</Link></li>
                                <li><button onClick={handleSignOut} className="btn btn-primary hover:btn-secondary text-white">Logout</button></li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-neutral text-lg font-medium hover:text-primary">Login</Link>
                        <Link to="/register" className="btn btn-primary hover:btn-secondary text-white">Register</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;