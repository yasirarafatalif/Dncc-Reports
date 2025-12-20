import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import { useNavigate } from 'react-router';
import Spinar from '../Components/Shared/Spinar';


const AdminRoute = ({ children }) => {
    const {user,loading}= useAuth();
    const {role, roleLoading}= useRole();
    const navigate = useNavigate();
      if (loading || roleLoading) return <Spinar></Spinar>
      if (role !== 'admin'){
        return navigate('/')
      }
    return children;
};

export default AdminRoute;