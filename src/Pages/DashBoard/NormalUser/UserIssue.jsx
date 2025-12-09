import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const UserIssue = () => {

    const axiosSecure = useAxios();
    const { user } = useAuth();

    const { data: issue, refetch } = useQuery({
        queryKey: ['user-all-issue-details', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/issue?email=${user.email}`);
            return res.data;
        }
    });

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
            if (result.isConfirmed) {

                axiosSecure.delete(`/user/issue/${percel._id}?email=${user.email}`)
                    .then(res => {
                        refetch();
                        if (res.data.result.deletedCount) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Issue Deleted Successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">My Submitted Issues</h2>

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="table">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Issue Title</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {issue?.map((percel, i) => (
                            <tr key={percel._id} className="bg-base-200 hover:bg-base-300 transition">

                                <td>{i + 1}</td>

                                {/* Submitted By */}
                                <td>{percel?.name}</td>

                                {/* Email */}
                                <td>{percel?.email}</td>

                                {/* Issue Title */}
                                <td className="font-semibold">{percel.title}</td>

                                {/* Category */}
                                <td>
                                    <span className="badge badge-info px-3 py-2 text-white">
                                        {percel.category}
                                    </span>
                                </td>

                                {/* Priority */}
                                <td>
                                    <span className={`badge px-3 py-2 text-white 
                                        ${percel.priority === "High" ? "badge-error" : "badge-success"}
                                    `}>
                                        {percel.priority}
                                    </span>
                                </td>

                                {/* Action Buttons */}
                                <td className="flex gap-2">

                                    <button
                                        onClick={() => handelDelete(percel)}
                                        className="btn btn-error btn-xs text-white">
                                        Delete
                                    </button>

                                    <Link to={`/issue/${percel._id}`}>
                                        <button className="btn btn-success btn-xs text-white">
                                            View
                                        </button>
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default UserIssue;
