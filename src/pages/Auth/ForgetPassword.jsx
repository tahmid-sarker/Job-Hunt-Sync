import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebase.config';
import Swal from 'sweetalert2';

// Sweet Alert Toast
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

const ForgetPassword = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        sendPasswordResetEmail(auth, email)
            .then(() => {
                //Success
                Toast.fire({
                    icon: 'success',
                    title: `Reset link sent to ${email}`
                });
            })
    };

    return (
        <section className='min-h-[70vh] flex items-center justify-center bg-gray-50 px-4'>
            <div className='text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full'>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-700 mb-6">Reset Your Password</h1>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='text-left'>
                        <label className="block text-sm md:text-base font-medium text-gray-600 mb-1">Email Address</label>
                        <input type="email" name="email" placeholder="example@email.com" required
                            className="w-full text-sm md:text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"/>
                    </div>
                    <button type="submit" className="btn btn-primary hover:btn-secondary text-white w-full">Reset Password</button>
                </form>
            </div>
        </section>
    );
};

export default ForgetPassword;