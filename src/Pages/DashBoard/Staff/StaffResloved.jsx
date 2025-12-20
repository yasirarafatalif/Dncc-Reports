import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Spinar from '../../../Components/Shared/Spinar';

const StaffResloved = () => {
    const { user ,loading} = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxios();

    const { data: citizen = [], refetch, isLoading } = useQuery({
        queryKey: ["staff_resloved_issue"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/resloved-issue/email?userEmail=${user?.email}`);
            return res.data;
        },
    });
  //   if (isLoading || loading) {
  //   return <Spinar></Spinar>
  // }
  



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
                    
                    <option value="resolved">Resolved</option>
                    {/* <option value="closed">Closed</option> */}
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




            <h2 className="text-2xl font-bold mb-4">My Resloved Issues</h2>

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
  {filteredData?.length > 0 ? (
    filteredData.map((percel, i) => (
      <tr
        key={percel._id}
        className="bg-base-200 hover:bg-base-300 transition"
      >
        <td>{i + 1}</td>
        <td>{percel?.name}</td>
        <td>{percel?.email}</td>
        <td className="font-semibold">{percel.title}</td>

        <td>
          <span className="badge badge-info px-3 py-2 text-white">
            {percel.category}
          </span>
        </td>

        <td>
          <span
            className={`badge px-3 py-2 text-white 
            ${percel.priority === "High" ? "badge-error" : "badge-success"}`}
          >
            {percel.priority}
          </span>
        </td>

        <td className="flex gap-2 justify-center">
  <Link to={`/issue/${percel._id}`}>
    <button className="btn btn-success btn-xs text-white">
      View
    </button>
  </Link>
</td>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center py-10">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-3xl">📭</span>
          <p className="font-semibold">No issues found</p>
          <p className="text-sm">
            Try changing filters or search keyword
          </p>
        </div>
      </td>
    </tr>
  )}
</tbody>


                </table>
            </div>
        </div>
    );
};

export default StaffResloved;