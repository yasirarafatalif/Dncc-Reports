import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageStaff = () => {
       const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxios();

    const { data: citizen,refetch  } = useQuery({
        queryKey: ['staff_manage'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user/cityzen?staffStatus=pending');
            console.log(res.data);
            return res.data;
        }
    });


    const handelApproved=(item)=>{
          Swal.fire({
                     title: "Are you sure?",
                     text: `${item?.display_name} Approved  `,
                     icon: "warning",
                     showCancelButton: true,
                     confirmButtonColor: "#3085d6",
                     cancelButtonColor: "#d33",
                     confirmButtonText: "Yes, delete it!"
                 }).then((result) => {
                        axiosSecure.patch(`/staff/${item._id}?staffStatus=approved&role=Field Staff`)
                         .then(res => {
                             refetch()
                             if (res.data.modifiedCount) {
                                 Swal.fire({
                                     position: "top-end",
                                     icon: "success",
                                     title: "Your Request has been Update",
                                     showConfirmButton: false,
                                     timer: 1500
                                 });
                             }
                         })
         
                 });

    }
    return (
        <div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No:</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>User Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        citizen?.map((c,i)=>( 
                             <tr key={c._id}>
                            <th>{i+1}</th>
                            <td>{c?.display_name}</td>
                            <td>{c?.email}</td>
                            <td>{c?.staffStatus}</td>
                            <td>{c?.role}</td>
                            <td>

                               {
                                c?.staffStatus==='pending' &&
                                  <button

                        
                                    onClick={()=>handelApproved(c)}
                                    className="btn btn-ghost  text-white bg-green-500 btn-md">
                                   Approved
                                </button>
                               }
                               {
                                c?.staffStatus==='approved' &&
                                  <span
                                    className=" text-green-500 btn-md">
                                   Approved
                                </span>
                               }
                                
                            </td>
                        </tr>))

                    }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default ManageStaff;