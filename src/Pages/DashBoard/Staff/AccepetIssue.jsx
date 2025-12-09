import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AccepetIssue = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxios();

    const { data: citizen = [], refetch } = useQuery({
        queryKey: ["staff_accepe_issue"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-issue/email?userEmail=${user?.email}`);
            return res.data;
        },
    });

    const handelStatusApproved = (item, status) => {

        const updateInfo = {
            staffName: user?.displayName,
            staffEmail: user?.email,
            phoneNumber: user?.phoneNumber || '0185188347',
        }

        Swal.fire({
            title: "Are you sure?",
            text: `${item?.display_name} will be updated`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16A34A",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/all-issue/${item._id}?status=${status}`, updateInfo)
                    .then((res) => {
                        refetch();
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Status updated successfully!",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    });
            }
        });

    }





    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [searchText, setSearchText] = useState("");
    const filteredData = citizen.filter((item) => {
        return (
            (statusFilter === "" || item.status === statusFilter) &&
            (priorityFilter === "" || item.priority === priorityFilter) &&
            (searchText === "" || item.title.toLowerCase().includes(searchText.toLowerCase()))
        );
    });


    return (
        <div className="p-5">




            <div className="flex gap-4 mb-4">

                {/* Status Filter */}
                <select
                    className="select select-bordered select-sm"
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="assign_staff">Assigned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="working">Working</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>

                {/* Priority Filter */}
                <select
                    className="select select-bordered select-sm"
                    onChange={(e) => setPriorityFilter(e.target.value)}
                >
                    <option value="">All Priority</option>
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                </select>

                {/* Search Title */}
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="input input-bordered input-sm"
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>




            <h2 className="text-2xl font-bold mb-4">My Assign Issues</h2>

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
                        {filteredData?.map((percel, i) => (
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
                                    {
                                        percel.status ==="closed" ? <select
                                        className="select select-bordered mx-2 select-sm"
                                        defaultValue={percel.status}
                                        disabled
                                        onChange={(e) => handelStatusApproved(percel, e.target.value)}
                                    >
                                        <option disabled>Status</option>
                                        <option disabled>pending</option>
                                        <option value="assign_staff">Assigned</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="working">Working</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="closed">Closed</option>
                                    </select>:  <select
                                        className="select select-bordered mx-2 select-sm"
                                        defaultValue={percel.status}
                                        onChange={(e) => handelStatusApproved(percel, e.target.value)}
                                    >
                                        <option disabled>Status</option>
                                        <option disabled>pending</option>
                                        <option value="assign_staff">Assigned</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="working">Working</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                        
                                    }
                                   

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

export default AccepetIssue;