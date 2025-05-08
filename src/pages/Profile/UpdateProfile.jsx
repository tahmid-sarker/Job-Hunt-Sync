import { use, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

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

const UpdateProfile = () => {
    const { user } = use(AuthContext);
    const [errorMessage, setErrorMessage] = useState("")

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;

        const profile = { 
            displayName: name,
            photoURL: photo,
         }

        updateProfile(auth.currentUser, profile)
            .then(() => {
                // Success
                Toast.fire({
                    icon: "success",
                    title: "Profile Updated Successfully!",
                });
            })
            .catch((error) => {
                setErrorMessage(error)
                // Error
                Toast.fire({
                    icon: "success",
                    title: errorMessage,
                });
            })
    };

    return (
        <div className="flex justify-center my-15">
            <form onSubmit={handleUpdateProfile} className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-11/12 mx-auto md:w-full space-y-4">
                <img src={user?.photoURL} alt={user?.displayName} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-primary" />
                <h2 className="text-2xl font-bold text-center text-gray-800">Update Profile</h2>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Display Name</label>
                    <input type="text" name='name' placeholder="Enter your name" className="w-full text-xs md:text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Photo URL</label>
                    <input type="url" name="photo" placeholder="Enter photo URL" className="w-full text-xs md:text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <button type="submit" className="w-full btn btn-primary hover:btn-secondary text-white">Update</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
