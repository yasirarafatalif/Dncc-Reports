import React from 'react';
import useRole from '../../Hooks/useRole';
import AdminDashboard from './Admin/AdminDashboard';
import UserDashboard from './NormalUser/UserDashboard';
import StaffDashboard from './Staff/StaffDashboard';
import AdminDashboardSkeleton from '../../Components/Shared/AdminDashboardSkeleton';

const Dashboard = () => {
      const { role,roleLoading } = useRole();
    if (roleLoading) {
        return <AdminDashboardSkeleton></AdminDashboardSkeleton>
    }
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