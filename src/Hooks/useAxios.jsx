import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000'

}
);
const useAxios = () => {
  const {user,logOut}= useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    const interceptor =axiosSecure.interceptors.request.use(config=>{
      config.headers.Authorization= `Berar ${user?.accessToken}`
      return config
    })

    //respone intercepteros
    const responeInterceptor = axiosSecure.interceptors.response.use((response)=>{
      return response
    },
    (error)=>{
      const statusCode = error.status
      if(statusCode== 401 || statusCode== 403){
        logOut()
        .then(()=>{
          navigate('/login')
        })
        
      }
      console.log(error)
      console.log(statusCode);
      return Promise.reject(error)
    }
  )
    return ()=>{
      axiosSecure.interceptors.request.eject(interceptor);
      axiosSecure.interceptors.request.eject(responeInterceptor);
    }


  },[user])
  return axiosSecure;
};

export default useAxios;