import React, { useRef, useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const UserIssue = () => {

    const axiosSecure = useAxios();
    const { user } = useAuth();
    const assignEdit = useRef();
       // Refs for collecting updated values
    const nameRef = useRef();
    const emailRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    const categoryRef = useRef();
    const [selectedpercel, setselectedpercel] = useState(null)

    const { data: issue = [], refetch } = useQuery({
        queryKey: ['user-all-issue-details', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/issue?email=${user.email}`);
            return res.data;
        }
    });

    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [searchText, setSearchText] = useState("");
    const filteredData = issue.filter((item) => {
        return (
            (statusFilter === "" || item.status === statusFilter) &&
            (priorityFilter === "" || item.priority === priorityFilter) &&
            (searchText === "" || item.title.toLowerCase().includes(searchText.toLowerCase()))
        );
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

    const handelEdit = (percel) => {
        setselectedpercel(percel)
        assignEdit.current.showModal()
    }
    const handelUpdateIssue = async () => {


           const updatedData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            title: titleRef.current.value,
            description: descRef.current.value,
            category: categoryRef.current.value,
        };
        assignEdit.current.close();
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update this issue?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const res = await axiosSecure.patch(
                        `/update-issue/${selectedpercel?._id}`,
                       updatedData
                    );

                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Updated!",
                            text: "Issue has been updated",
                            icon: "success",
                            timer: 1500,
                        });
                        // Refetch data (if using React Query)
                        refetch && refetch();
                    }

                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong!",
                        icon: "error",
                    });
                }
            }
        });
    };


    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">My Submitted Issues</h2>


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
                                        percel?.status === 'pending' &&
                                        <>
                                            <button
                                                onClick={() => handelDelete(percel)}
                                                className="btn btn-error btn-xs text-white">
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handelEdit(percel)}
                                                className="btn btn-error btn-xs text-white">
                                                Edit
                                            </button>

                                        </>
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

                        {/* thsi id modal section */}
            <dialog
                ref={assignEdit}
                className="modal modal-bottom sm:modal-middle"
                key={selectedpercel?._id}
            >
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Assign Issue</h3>

                    {/* Input Fields */}
                    <div className="my-4 space-y-4">

                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                defaultValue={selectedpercel?.name}
                                ref={nameRef}
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                defaultValue={selectedpercel?.email}
                                ref={emailRef}
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Issue Title</label>
                            <input
                                type="text"
                                defaultValue={selectedpercel?.title}
                                ref={titleRef}
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Description</label>
                            <textarea
                                defaultValue={selectedpercel?.description}
                                ref={descRef}
                                className="textarea textarea-bordered w-full"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Category</label>
                            <select
                                defaultValue={selectedpercel?.category}
                                ref={categoryRef}
                                className="select select-bordered w-full mt-1"
                            >
                                <option value="" disabled>Select category</option>
                                <option>Road Problem</option>
                                <option>Water Leakage</option>
                                <option>Garbage Overflow</option>
                                <option>Street Light Issue</option>
                                <option>Drainage Problem</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-action">
                        <button
                            className="btn btn-primary"
                            onClick={handelUpdateIssue}
                        >
                            Save
                        </button>

                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default UserIssue;
