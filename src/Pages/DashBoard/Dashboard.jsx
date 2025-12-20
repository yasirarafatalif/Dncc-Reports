import React from 'react';
import useRole from '../../Hooks/useRole';
import AdminDashboard from './Admin/AdminDashboard';
import UserDashboard from './NormalUser/UserDashboard';
import StaffDashboard from './Staff/StaffDashboard';

const Dashboard = () => {
      const { role } = useRole();
    return (
        <div>
            <title>Dashboard</title>
            {
                role==='admin' && <AdminDashboard></AdminDashboard>
            }

             {
                role==='citizen' && <UserDashboard></UserDashboard>
            }
             {
                role==='Field Staff' && <StaffDashboard></StaffDashboard>
            }
            
        </div>
    );
};

export default Dashboard;