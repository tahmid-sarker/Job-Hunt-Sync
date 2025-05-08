import React, { use, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';

const DynamicTitle = () => {
    const { id } = useParams();
    // console.log('id', id);
    const location = useLocation();
    // console.log('location', location);
    const companies = use(DataContext);
    // console.log('companies', companies);
    const { user } = use(AuthContext);
    // console.log('user', user.displayName);

    useEffect(() => {
        const currentPath = location.pathname;
        let title = 'Job Hunt Sync';
        if (currentPath === '/') {
            title = 'Home | Job Hunt Sync';
        } else if (currentPath === '/register') {
            title = 'Register | Job Hunt Sync';
        } else if (currentPath === '/login') {
            title = 'Login | Job Hunt Sync';
        } else if (currentPath === '/forgot-password') {
            title = 'Forgot Password | Job Hunt Sync';
        } else if (currentPath === `/company-details/${id}`) {
            const company = companies.find(company => company.id === id);
            if (company) {
                title = `${company.name} | Job Hunt Sync`;
            }
        } else if (currentPath === '/saved-jobs') {
            title = 'Saved Jobs | Job Hunt Sync';
        } else if(currentPath === '/my-profile' || currentPath === '/update-profile') {
            title = `${user?.displayName} | Job Hunt Sync`;
        } else {
            title = 'Page Not Found | Job Hunt Sync';
        } 
        document.title = title;
    }, [location.pathname, id, companies, user]);

    return null;
};

export default DynamicTitle;