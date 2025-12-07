import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const UserIssue = () => {

    const axiosSecure = useAxios();
    const { user } = useAuth();
    const { data: issue, refetch } = useQuery({
        queryKey: ['user-all-issue-detalis', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/issue?email=${user.email}`)
            return res.data
        }
    })

    const handelDelete = (percel) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            axiosSecure.delete(`/user/issue/${percel._id}?email=${user.email}`)
                .then(res => {
                    refetch()
                    if (res.data.result.deletedCount) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your Request has been deleted",
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
                            <th>No</th>
                            <th>Submited By</th>
                            <th>Email</th>
                            <th>Issue Title</th>
                            <th>Issue Catagory</th>
                            <th>Issue Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            issue?.map((percel, i) => (
                                <tr key={percel._id} className="bg-base-200">

                                    {/* Row Number */}
                                    <th>{i + 1}</th>
                                    <th>{percel?.name}</th>

                                    {/* Issue Title */}
                                    <td>{percel.title}</td>

                                    {/* Issue Category */}
                                    <td>{percel.category}</td>




                                    {/* Issue Status */}
                                    <td>{percel.status}</td>

                                    <td>{percel.priority}</td>

                                    {/* Buttons */}
                                    <td>
                                        <button
                                            onClick={() => handelDelete(percel)}
                                            className="btn btn-ghost text-white bg-red-500 btn-xs">
                                            Delete Issue
                                        </button>

                                        <button

                                            className="btn btn-ghost mx-2 text-white bg-green-500 btn-xs">
                                            View Issue
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UserIssue;