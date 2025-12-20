import React from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import { IoLogoGoogle } from "react-icons/io";
import useAxios from '../../Hooks/useAxios';

const SocialLogIn = () => {
    const {signInWithGoogle}= useAuth();
    const axiosSecure= useAxios();
       const handeelgoogle = (data) => {
        signInWithGoogle()
            .then(res => {
                  const userInfo = {
                            display_name: res?.user?.displayName,
                            email: res?.user?.email,
                            createdAt: new Date(),
                            photoURl: res?.user?.photoURL,
                        }
                        axiosSecure.post('/users',userInfo)
                        .then((res)=>{
                            if(res.data.insertedId){
                               toast.success("You Are SuccessFully Log IN")
                            }
                        })
                        .catch(err=>{
                            
                        })
                toast.success("You Are SuccessFully Create Account")
            })
            .catch(err => {
               
            })
    }
    return (
        <div>
             <button onClick={handeelgoogle} className="w-full bg-blue-400 text-white rounded-md py-2 flex items-center justify-center gap-2 border border-gray-200">
                <IoLogoGoogle />
                <span className="text-sm">Login with google</span>
            </button>
            
        </div>
    );
};

export default SocialLogIn;