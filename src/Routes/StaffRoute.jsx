import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import { useNavigate } from 'react-router';


const StaffRoute = ({ children }) => {
    const {user,loading}= useAuth();
    const {role, roleLoading}= useRole();
    const navigate = useNavigate();
      if (loading || roleLoading) return <p>Loadingg....</p>
      if (role !== 'Field Staff'){
        return navigate('/')
      }
    return children;
};

export default StaffRoute;