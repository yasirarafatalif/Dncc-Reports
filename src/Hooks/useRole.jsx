import React from 'react';
import useAxios from './useAxios';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';


const useRole = () => {
    const axiosSecure= useAxios();
    const {user}= useAuth();
    const {data: role='citizen', isLoading: roleLoading}= useQuery({
        queryKey:['user-role', user?.email],
        enabled: !!user?.email,
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/users/${user?.email}/role`)
            console.log(res.data);
            return res.data
        }
    })
    return {role, roleLoading};
};

export default useRole;