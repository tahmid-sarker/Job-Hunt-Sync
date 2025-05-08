import { createBrowserRouter } from 'react-router';
import MainLayouts from '../layouts/MainLayouts';
import Home from '../pages/Home';
import PrivateRoutes from './PrivateRoutes';
import CompanyDetails from '../pages/CompanyDetails';
import SavedJobs from '../pages/SavedJobs';
import Error from '../pages/Error';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import MyProfile from '../pages/Profile/MyProfile';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import UpdateProfile from '../pages/Profile/UpdateProfile';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayouts></MainLayouts>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/forget-password',
                element: <ForgetPassword></ForgetPassword>
            },
            {
                path: '/my-profile',
                element: <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>
            },
            {
                path: '/update-profile',
                element: <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>
            },
            {
                path: '/company-details/:id',
                element: <PrivateRoutes><CompanyDetails></CompanyDetails></PrivateRoutes>
            },
            {
                path: '/saved-jobs',
                element: <PrivateRoutes><SavedJobs></SavedJobs></PrivateRoutes>,
            },
        ]
    },
    {
        path: '/*',
        element: <Error></Error>,
    },
])